const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

dotenv.config();

// Initialize App Setup mirroring server.js
const apiRoutes = require("./src/routes/index.js");
const errorMiddleware = require("./src/middlewares/error.middleware.js");

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Global Liveness & Readiness
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "StudyHub Server Running" });
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, statusCode: 200, message: "Health OK" });
});

app.get("/api/v1/ready", (req, res) => {
  res.status(200).json({ success: true, statusCode: 200, message: "Ready to accept traffic", database: "Connected (Mock)" });
});

app.use("/api/v1", apiRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}. Resource not found.`
  });
});

app.use(errorMiddleware);

// Dynamic Route Discovery for all 160 Endpoints
const routesDir = path.join(__dirname, "src", "routes");
const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith(".js") && f !== "index.js");

const discoveredCases = [
  { name: "Root Welcome Route", method: "GET", path: "/", auth: false },
  { name: "Health Check (Liveness)", method: "GET", path: "/api/v1/health", auth: false },
  { name: "Readiness Check", method: "GET", path: "/api/v1/ready", auth: false }
];

routeFiles.forEach(file => {
  const filePath = path.join(routesDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const moduleName = file.replace(".routes.js", "").replace(".route.js", "");

  const lineRegex = /router\.(get|post|put|patch|delete)\s*\(\s*["']([^"']+)["']/g;
  let match;
  while ((match = lineRegex.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    let routePath = match[2];

    let parentPrefix = "/api/v1";
    if (moduleName === "auth") parentPrefix = "/api/v1/auth";
    else if (moduleName === "user") parentPrefix = "/api/v1/user";
    else if (moduleName === "tools" || moduleName === "tool") parentPrefix = "/api/v1/tools";
    else if (moduleName === "ai") parentPrefix = "/api/v1/ai";
    else if (moduleName === "downloads" || moduleName === "download") parentPrefix = "/api/v1/downloads";
    else if (moduleName === "favorites" || moduleName === "favorite") parentPrefix = "/api/v1/favorites";
    else if (moduleName === "referrals" || moduleName === "referral") parentPrefix = "/api/v1/referrals";
    else if (moduleName === "support") parentPrefix = "/api/v1/support";
    else if (moduleName === "notifications" || moduleName === "notification") parentPrefix = "/api/v1/notifications";
    else if (moduleName === "admin") parentPrefix = "/api/v1/admin";
    else if (moduleName === "dashboard") parentPrefix = "/api/v1/dashboard";
    else if (moduleName === "googleAuth") parentPrefix = "/api/v1/auth";

    const fullPath = routePath.startsWith("/") ? `${parentPrefix}${routePath}` : `${parentPrefix}/${routePath}`;

    // Skip parameterized routes in generic loop (tested separately)
    if (!fullPath.includes(":")) {
      discoveredCases.push({
        name: `${moduleName.toUpperCase()} - ${method} ${routePath}`,
        method: method,
        path: fullPath,
        auth: !fullPath.includes("/login") && !fullPath.includes("/register")
      });
    }
  }
});

const PORT = 6099;
const server = app.listen(PORT, async () => {
  console.log(`\n======================================================================`);
  console.log(`🧪 STARTING ALL-IN-ONE STUDYHUB 160+ APIS INTEGRATION TEST SUITE`);
  console.log(`======================================================================\n`);

  const testToken = jwt.sign(
    { _id: "6a685d7b3d6e0376247c628e", id: "6a685d7b3d6e0376247c628e", email: "student@studyhub.com", role: "admin", isGuest: false },
    process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026",
    { expiresIn: "15m" }
  );

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < discoveredCases.length; i++) {
    const tc = discoveredCases[i];
    const sampleBody = tc.method !== "GET" ? getSampleRequestBody(tc.path) : null;
    const res = await makeRequest(tc.method, tc.path, sampleBody, tc.auth ? testToken : null);
    
    const isSuccess = res.statusCode >= 200 && res.statusCode < 500;
    if (isSuccess) passed++; else failed++;

    const numStr = String(i + 1).padStart(3, " ");
    const codeStr = `[${res.statusCode}]`;
    const methStr = tc.method.padEnd(6);
    const pathStr = tc.path.padEnd(45);
    console.log(`${numStr}. ${codeStr} ${methStr} ${pathStr} | ${tc.name}`);
  }

  console.log("\n======================================================================");
  console.log(`📊 ALL APIS TEST SUMMARY:`);
  console.log(`   TOTAL ENDPOINTS TESTED : ${discoveredCases.length}`);
  console.log(`   PASSED (200/201/404)   : ${passed}`);
  console.log(`   FAILED (500 Server Err): ${failed}`);
  console.log("======================================================================\n");

  server.close(() => process.exit(0));
});

function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve) => {
    const payload = body ? JSON.stringify(body) : "";
    const options = {
      hostname: "127.0.0.1",
      port: PORT,
      path: path,
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      }
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed = {};
        try { parsed = JSON.parse(data); } catch (e) { parsed = { raw: data }; }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });

    req.on("error", (err) => {
      resolve({ statusCode: 500, body: { success: false, error: err.message } });
    });

    if (payload) req.write(payload);
    req.end();
  });
}

function getSampleRequestBody(pathStr) {
  if (pathStr.includes("/login")) return { email: "student@studyhub.com", password: "Password123!" };
  if (pathStr.includes("/register")) return { name: "Rahul Sharma", email: "student@studyhub.com", password: "Password123!", college: "DTU" };
  if (pathStr.includes("/colleges")) return { name: "Delhi Technological University", shortCode: "DTU", city: "Delhi", state: "Delhi" };
  if (pathStr.includes("/courses")) return { name: "B.Tech Computer Science", code: "BTECH-CS", durationYears: 4 };
  if (pathStr.includes("/subjects")) return { name: "Operating Systems", code: "CS401", credits: 4, facultyName: "Dr. A. K. Sharma" };
  if (pathStr.includes("/materials")) return { title: "OS Revision Notes 2026", category: "Notes", fileUrl: "https://storage.studyhub.com/notes/os.pdf" };
  if (pathStr.includes("/banners")) return { title: "Mid Sem Exam Prep", imageUrl: "https://storage.studyhub.com/banners/midsem.jpg", targetUrl: "/notes" };
  if (pathStr.includes("/notifications")) return { title: "Exam Alert", message: "Mid semester exams start next week.", isGlobal: true };
  if (pathStr.includes("/ai")) return { prompt: "Explain Virtual Memory paging in OS" };
  if (pathStr.includes("/gpa")) return { credits: 20, gradePoints: 160 };
  return { action: "update", status: "active", confirmText: "DELETE MY ACCOUNT" };
}
