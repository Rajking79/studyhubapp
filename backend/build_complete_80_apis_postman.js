const fs = require("fs");
const path = require("path");

const routesDir = path.join(__dirname, "src", "routes");
const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith(".js") && f !== "index.js");

const allEndpoints = [];

// Scan all route files for route definitions
routeFiles.forEach(file => {
  const filePath = path.join(routesDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const moduleName = file.replace(".routes.js", "").replace(".route.js", "");

  const lineRegex = /router\.(get|post|put|patch|delete)\s*\(\s*["']([^"']+)["']/g;
  let match;
  while ((match = lineRegex.exec(content)) !== null) {
    const method = match[1].toUpperCase();
    let routePath = match[2];

    // Determine parent mount path based on src/routes/index.js
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

    allEndpoints.push({
      module: moduleName,
      method: method,
      path: fullPath,
      name: `${moduleName.toUpperCase()} - ${method} ${routePath}`
    });
  }
});

// Group endpoints into Postman collection items
const groupedFolders = {};

allEndpoints.forEach(ep => {
  const folderKey = ep.module.charAt(0).toUpperCase() + ep.module.slice(1) + " Module";
  if (!groupedFolders[folderKey]) {
    groupedFolders[folderKey] = [];
  }

  const isAuthRequired = !ep.path.includes("/login") && !ep.path.includes("/register") && !ep.path.includes("/health") && !ep.path.includes("/ready");

  const sampleBody = ep.method !== "GET" ? getSampleRequestBody(ep.path, ep.method) : null;
  const sampleResp = getSampleResponseBody(ep.path, ep.method);

  groupedFolders[folderKey].push({
    name: ep.name,
    request: {
      method: ep.method,
      header: [
        { key: "Content-Type", value: "application/json" },
        ...(isAuthRequired ? [{ key: "Authorization", value: "Bearer {{accessToken}}" }] : [])
      ],
      body: sampleBody ? { mode: "raw", raw: JSON.stringify(sampleBody, null, 2) } : undefined,
      url: {
        raw: `{{baseUrl}}${ep.path}`,
        host: ["{{baseUrl}}"],
        path: ep.path.split("/").filter(Boolean)
      }
    },
    event: [
      {
        listen: "test",
        script: {
          type: "text/javascript",
          exec: [
            `pm.test("Status code is 200/201", () => pm.expect(pm.response.code).to.be.oneOf([200, 201, 204]));`,
            `pm.test("Response has valid JSON body", () => {`,
            `    const json = pm.response.json();`,
            `    pm.expect(json).to.be.an("object");`,
            `});`,
            `const json = pm.response.json();`,
            `if (json.data && json.data.accessToken) {`,
            `    pm.collectionVariables.set("accessToken", json.data.accessToken);`,
            `}`
          ]
        }
      }
    ],
    response: [
      {
        name: `200 OK Response (${ep.name})`,
        originalRequest: {
          method: ep.method,
          header: [{ key: "Content-Type", value: "application/json" }],
          url: { raw: `{{baseUrl}}${ep.path}`, host: ["{{baseUrl}}"], path: ep.path.split("/").filter(Boolean) }
        },
        status: "OK",
        code: 200,
        _postman_previewlanguage: "json",
        header: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify(sampleResp, null, 2)
      }
    ]
  });
});

// Postman Master Collection Object (Single All-In-One File)
const masterCollection = {
  info: {
    name: "StudyHub AI Backend - Complete All-in-One Collection (80+ APIs)",
    _postman_id: "studyhub-all-in-one-collection-v2",
    description: "Complete single-file Postman v2.1 collection containing all 80+ endpoints with built-in collection variables, auto auth scripts, test assertions, and pre-saved response payloads.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000", type: "string" },
    { key: "accessToken", value: "", type: "string" },
    { key: "refreshToken", value: "", type: "string" }
  ],
  event: [
    {
      listen: "prerequest",
      script: {
        type: "text/javascript",
        exec: [
          "// Collection Level Pre-request Script",
          "const token = pm.collectionVariables.get('accessToken');",
          "if (!token && pm.request.url.getPath() !== '/api/v1/auth/login') {",
          "    console.log('Using default collection variables for StudyHub API requests');",
          "}"
        ]
      }
    }
  ],
  item: Object.keys(groupedFolders).map(folderName => ({
    name: folderName,
    item: groupedFolders[folderName]
  }))
};

// Write Master Single File Collection
const collectionPath = path.join(__dirname, "postman_collection.json");
fs.writeFileSync(collectionPath, JSON.stringify(masterCollection, null, 2));

const innerPath = path.join(__dirname, "postman", "collection.json");
fs.writeFileSync(innerPath, JSON.stringify(masterCollection, null, 2));

console.log(`\n==================================================`);
console.log(`🚀 SUCCESSFULLY GENERATED MASTER POSTMAN COLLECTION`);
console.log(`==================================================`);
console.log(`📦 Total Endpoints Processed: ${allEndpoints.length}`);
console.log(`📁 Folders Created: ${Object.keys(groupedFolders).length}`);
console.log(`📄 Saved Single Import File: ${collectionPath}`);
console.log(`==================================================\n`);

function getSampleRequestBody(pathStr, method) {
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
  return { action: "update", status: "active" };
}

function getSampleResponseBody(pathStr, method) {
  return {
    success: true,
    statusCode: 200,
    message: "Request executed successfully",
    data: {
      id: "6a685d7b3d6e0376247c628e",
      name: "StudyHub Resource Data",
      status: "active",
      updatedAt: new Date().toISOString()
    },
    meta: {}
  };
}
