const fs = require("fs");
const path = require("path");

const sharedRoutes = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/dev-login",
  "/api/v1/auth/guest-login",
  "/api/v1/auth/refresh-token",
  "/api/v1/auth/me",
  "/api/v1/auth/logout",
  "/api/v1/colleges",
  "/api/v1/courses",
  "/api/v1/semesters",
  "/api/v1/subjects",
  "/api/v1/materials",
  "/api/v1/pyqs",
  "/api/v1/notes",
  "/api/v1/books",
  "/api/v1/videos",
  "/api/v1/question-bank",
  "/api/v1/dashboard/search",
  "/api/v1/dashboard/banners"
];

const mobileOnlyPrefixes = [
  "/api/v1/user",
  "/api/v1/tools",
  "/api/v1/ai",
  "/api/v1/favorites",
  "/api/v1/downloads",
  "/api/v1/dashboard/home",
  "/api/v1/dashboard/student",
  "/api/v1/dashboard/continue-reading",
  "/api/v1/dashboard/update-progress",
  "/api/v1/notifications",
  "/api/v1/referrals",
  "/api/v1/support"
];

const adminOnlyPrefixes = [
  "/api/v1/admin"
];

// Scan route files to organize into 3 distinct sections
const routesDir = path.join(__dirname, "src", "routes");
const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith(".js") && f !== "index.js");

const categorisedItems = {
  mobileApp: [],
  adminPanel: [],
  sharedBoth: []
};

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

    const apiItem = createPostmanItem(moduleName.toUpperCase(), method, fullPath, routePath);

    if (sharedRoutes.includes(fullPath) || (moduleName === "academic" && method === "GET") || (moduleName === "material" && method === "GET")) {
      categorisedItems.sharedBoth.push(apiItem);
    } else if (fullPath.startsWith("/api/v1/admin")) {
      categorisedItems.adminPanel.push(apiItem);
    } else {
      categorisedItems.mobileApp.push(apiItem);
    }
  }
});

// Master Collection Structure with 3 Clean Master Folders
const masterCollection = {
  info: {
    name: "StudyHub AI Backend - Categorized API Collection (Mobile App, Admin Panel & Shared)",
    _postman_id: "studyhub-categorized-collection-v3",
    description: "Production Postman collection organized into 3 clear categories: Mobile App Student APIs, Admin Panel Management APIs, and Shared Common APIs.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000", type: "string" },
    { key: "accessToken", value: "", type: "string" }
  ],
  item: [
    {
      name: "📱 1. Mobile App APIs (Student App)",
      item: categorisedItems.mobileApp
    },
    {
      name: "🛠️ 2. Admin Panel APIs (Management)",
      item: categorisedItems.adminPanel
    },
    {
      name: "🔄 3. Shared APIs (App + Admin Both)",
      item: categorisedItems.sharedBoth
    }
  ]
};

// Write Postman Files
fs.writeFileSync(path.join(__dirname, "postman_collection.json"), JSON.stringify(masterCollection, null, 2));
fs.writeFileSync(path.join(__dirname, "postman", "collection.json"), JSON.stringify(masterCollection, null, 2));

console.log("✅ Postman Collection successfully categorized into 3 master folders:");
console.log(`   - 📱 Mobile App APIs: ${categorisedItems.mobileApp.length}`);
console.log(`   - 🛠️ Admin Panel APIs: ${categorisedItems.adminPanel.length}`);
console.log(`   - 🔄 Shared APIs (Both): ${categorisedItems.sharedBoth.length}`);

function createPostmanItem(modName, method, fullPath, routePath) {
  const isAuthRequired = !fullPath.includes("/login") && !fullPath.includes("/register") && !fullPath.includes("/health") && !fullPath.includes("/ready");

  return {
    name: `[${method}] ${routePath} (${modName})`,
    request: {
      method: method,
      header: [
        { key: "Content-Type", value: "application/json" },
        ...(isAuthRequired ? [{ key: "Authorization", value: "Bearer {{accessToken}}" }] : [])
      ],
      url: {
        raw: `{{baseUrl}}${fullPath}`,
        host: ["{{baseUrl}}"],
        path: fullPath.split("/").filter(Boolean)
      }
    },
    response: [
      {
        name: `200 OK Response`,
        status: "OK",
        code: 200,
        _postman_previewlanguage: "json",
        header: [{ key: "Content-Type", value: "application/json" }],
        body: JSON.stringify({
          success: true,
          statusCode: 200,
          message: "Request executed successfully",
          data: { path: fullPath, method: method },
          meta: {}
        }, null, 2)
      }
    ]
  };
}
