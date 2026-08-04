const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const apiKey = process.env.POSTMAN_API_KEY;
if (!apiKey) {
  console.error("❌ POSTMAN_API_KEY missing in .env file.");
  process.exit(1);
}

const collectionPath = path.join(__dirname, "postman_collection.json");

if (!fs.existsSync(collectionPath)) {
  console.error("❌ Collection file postman_collection.json not found.");
  process.exit(1);
}

const collectionData = JSON.parse(fs.readFileSync(collectionPath, "utf8"));

// Assign valid UUID v4 for Postman Cloud API requirement
if (collectionData.info) {
  collectionData.info._postman_id = crypto.randomUUID();
}

const payload = JSON.stringify({
  collection: collectionData
});

console.log("\n==================================================");
console.log("🚀 SYNCING COLLECTION DIRECTLY TO YOUR POSTMAN ACCOUNT...");
console.log("==================================================\n");

const options = {
  hostname: "api.getpostman.com",
  port: 443,
  path: "/collections",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": apiKey,
    "Content-Length": Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let responseData = "";
  res.on("data", (chunk) => (responseData += chunk));
  res.on("end", () => {
    try {
      const parsed = JSON.parse(responseData);
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log("==================================================");
        console.log("🎉 SUCCESS! LIVE COLLECTION PUSHED TO YOUR POSTMAN!");
        console.log("==================================================");
        console.log(`📌 Collection ID: ${parsed.collection?.id}`);
        console.log(`📌 Collection Name: ${parsed.collection?.name}`);
        console.log(`📌 UID: ${parsed.collection?.uid}`);
        console.log("\n👉 Postman Desktop App par jaakar dekhein, Live Update ho gaya hai!\n");
      } else {
        console.error(`❌ Postman API Error [${res.statusCode}]:`, parsed);
      }
    } catch (err) {
      console.error("❌ Failed to parse Postman API response:", responseData);
    }
  });
});

req.on("error", (error) => {
  console.error("❌ Network request failed:", error.message);
});

req.write(payload);
req.end();
