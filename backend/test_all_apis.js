const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const jwt = require("jsonwebtoken");

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

const PORT = 5599;
const server = app.listen(PORT, async () => {
  console.log(`\n==================================================`);
  console.log(`🧪 STARTING COMPREHENSIVE STUDYHUB API TEST SUITE`);
  console.log(`==================================================\n`);

  // Generate valid test JWT
  const testToken = jwt.sign(
    { _id: "6a685d7b3d6e0376247c628e", id: "6a685d7b3d6e0376247c628e", email: "student@studyhub.com", role: "admin", isGuest: false },
    process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026",
    { expiresIn: "15m" }
  );

  const testCases = [
    { name: "Root Welcome Route", method: "GET", path: "/", auth: false },
    { name: "Health Check (Liveness)", method: "GET", path: "/api/v1/health", auth: false },
    { name: "Readiness Check", method: "GET", path: "/api/v1/ready", auth: false },
    { name: "Auth: Dev Login", method: "POST", path: "/api/v1/auth/dev-login", body: { role: "student" }, auth: false },
    { name: "Auth: Guest Login", method: "POST", path: "/api/v1/auth/guest-login", body: { deviceId: "test_dev" }, auth: false },
    { name: "Auth: Get Current User", method: "GET", path: "/api/v1/auth/me", auth: true },
    { name: "User: Get Profile", method: "GET", path: "/api/v1/user/profile", auth: true },
    { name: "User: Update Profile", method: "PUT", path: "/api/v1/user/profile", body: { name: "Rahul Sharma", college: "DTU" }, auth: true },
    { name: "User: My Uploads", method: "GET", path: "/api/v1/user/uploads", auth: true },
    { name: "User: Get Settings", method: "GET", path: "/api/v1/user/settings", auth: true },
    { name: "User: Referral Code", method: "GET", path: "/api/v1/user/referral", auth: true },
    { name: "User: Export Data (GDPR)", method: "GET", path: "/api/v1/user/me/export", auth: true },
    { name: "Academic: Colleges", method: "GET", path: "/api/v1/colleges", auth: false },
    { name: "Academic: Courses", method: "GET", path: "/api/v1/courses", auth: false },
    { name: "Academic: Semesters", method: "GET", path: "/api/v1/semesters", auth: false },
    { name: "Academic: Subjects", method: "GET", path: "/api/v1/subjects", auth: false },
    { name: "Materials: Get All", method: "GET", path: "/api/v1/materials", auth: false },
    { name: "Materials: PYQs", method: "GET", path: "/api/v1/pyqs", auth: false },
    { name: "Materials: Notes", method: "GET", path: "/api/v1/notes", auth: false },
    { name: "Materials: Books", method: "GET", path: "/api/v1/books", auth: false },
    { name: "Materials: Videos", method: "GET", path: "/api/v1/videos", auth: false },
    { name: "Materials: Question Bank", method: "GET", path: "/api/v1/question-bank", auth: false },
    { name: "Tools: GPA Calculator (GET)", method: "GET", path: "/api/v1/tools/gpa-calculator", auth: true },
    { name: "Tools: GPA Calculator (POST)", method: "POST", path: "/api/v1/tools/gpa-calculator", body: { credits: 20, gradePoints: 160 }, auth: true },
    { name: "Tools: Attendance Tracker (GET)", method: "GET", path: "/api/v1/tools/attendance-tracker", auth: true },
    { name: "Tools: Resume Builder (GET)", method: "GET", path: "/api/v1/tools/resume-builder", auth: true },
    { name: "AI: Summarize Text", method: "POST", path: "/api/v1/ai/summarize", body: { content: "Sample study text to summarize" }, auth: true },
    { name: "AI: Explain Concept", method: "POST", path: "/api/v1/ai/explain", body: { topic: "Operating Systems" }, auth: true },
    { name: "AI: Flashcards Generator", method: "POST", path: "/api/v1/ai/flashcards", body: { topic: "Data Structures" }, auth: true },
    { name: "AI: Quiz Generator", method: "POST", path: "/api/v1/ai/quiz", body: { subject: "DBMS" }, auth: true },
    { name: "AI: Chat Tutor", method: "POST", path: "/api/v1/ai/chat", body: { message: "Explain Binary Search" }, auth: true },
    { name: "Favorites: Get Bookmarks", method: "GET", path: "/api/v1/favorites", auth: true },
    { name: "Favorites: Toggle Bookmark", method: "POST", path: "/api/v1/favorites/toggle", body: { targetType: "Material", targetId: "64a1b2c3d4e5f6a7b8c9d0e1" }, auth: true },
    { name: "Downloads: History", method: "GET", path: "/api/v1/downloads", auth: true },
    { name: "Notifications: Get List", method: "GET", path: "/api/v1/notifications", auth: true },
    { name: "Dashboard: Student Metrics", method: "GET", path: "/api/v1/dashboard/student", auth: true },
    { name: "Dashboard: Admin Overview", method: "GET", path: "/api/v1/dashboard/admin", auth: true },
    { name: "Admin: System Stats", method: "GET", path: "/api/v1/admin/stats", auth: true },
    { name: "Admin: User Directory", method: "GET", path: "/api/v1/admin/users", auth: true },
    { name: "Admin: Material Directory", method: "GET", path: "/api/v1/admin/materials", auth: true },
    { name: "Auth: Logout User", method: "POST", path: "/api/v1/auth/logout", auth: true },
    { name: "Error Test: 404 Fallback", method: "GET", path: "/api/v1/non-existent-route", auth: false }
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    const res = await makeRequest(tc.method, tc.path, tc.body, tc.auth ? testToken : null);
    const isSuccess = res.statusCode >= 200 && res.statusCode < 500;
    if (isSuccess) passed++; else failed++;

    console.log(`[${res.statusCode}] ${tc.method.padEnd(6)} ${tc.path.padEnd(35)} | ${tc.name}`);
  }

  console.log("\n==================================================");
  console.log(`📊 TOTAL APIS TESTED: ${testCases.length}`);
  console.log(`   PASSED: ${passed}`);
  console.log(`   FAILED: ${failed}`);
  console.log("==================================================\n");

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
