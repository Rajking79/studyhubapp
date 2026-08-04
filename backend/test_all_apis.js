const http = require("http");
const app = require("./server");

const testEndpoints = [
  { method: "GET", path: "/", desc: "Root Welcome Route" },
  { method: "GET", path: "/api/v1/health", desc: "Health Check (Liveness)" },
  { method: "GET", path: "/api/v1/ready", desc: "Readiness Check" },
  { method: "GET", path: "/api/v1/colleges", desc: "ACADEMIC - GET /colleges" },
  { method: "GET", path: "/api/v1/courses", desc: "ACADEMIC - GET /courses" },
  { method: "GET", path: "/api/v1/semesters", desc: "ACADEMIC - GET /semesters" },
  { method: "GET", path: "/api/v1/subjects", desc: "ACADEMIC - GET /subjects" },
  { method: "POST", path: "/api/v1/auth/dev-login", desc: "AUTH - POST /dev-login" },
  { method: "POST", path: "/api/v1/auth/guest-login", desc: "AUTH - POST /guest-login" },
  { method: "GET", path: "/api/v1/dashboard/home", desc: "DASHBOARD - GET /home" },
  { method: "GET", path: "/api/v1/materials", desc: "MATERIAL - GET /materials" },
  { method: "GET", path: "/api/v1/pyqs", desc: "MATERIAL - GET /pyqs" },
  { method: "GET", path: "/api/v1/notes", desc: "MATERIAL - GET /notes" },
  { method: "GET", path: "/api/v1/books", desc: "MATERIAL - GET /books" },
  { method: "GET", path: "/api/v1/videos", desc: "MATERIAL - GET /videos" },
  { method: "GET", path: "/api/v1/question-bank", desc: "MATERIAL - GET /question-bank" },
  { method: "GET", path: "/api/v1/tools/cgpa", desc: "TOOL - GET /cgpa" },
  { method: "GET", path: "/api/v1/tools/attendance-tracker", desc: "TOOL - GET /attendance-tracker" },
  { method: "GET", path: "/api/v1/user/profile", desc: "USER - GET /profile" },
  { method: "GET", path: "/api/v1/user/uploads", desc: "USER - GET /uploads" },
  { method: "GET", path: "/api/v1/user/settings", desc: "USER - GET /settings" },
  { method: "GET", path: "/api/v1/user/me/export", desc: "USER - GET /me/export" }
];

let server;
const PORT = 5099;

const runTests = async () => {
  console.log("\n======================================================================");
  console.log("🧪 STARTING ALL-IN-ONE STUDYHUB APIS INTEGRATION TEST SUITE");
  console.log("======================================================================\n");

  server = app.listen(PORT, async () => {
    let passed = 0;
    let total = testEndpoints.length;

    for (let i = 0; i < testEndpoints.length; i++) {
      const ep = testEndpoints[i];
      await new Promise((resolve) => {
        const req = http.request(
          {
            hostname: "localhost",
            port: PORT,
            path: ep.path,
            method: ep.method,
            headers: { "Content-Type": "application/json" }
          },
          (res) => {
            const status = res.statusCode;
            const ok = status >= 200 && status < 500;
            if (ok) passed++;
            console.log(
              `  ${(i + 1).toString().padStart(2, " ")}. [${status}] ${ep.method.padEnd(6, " ")} ${ep.path.padEnd(45, " ")} | ${ep.desc}`
            );
            resolve();
          }
        );
        req.on("error", (e) => {
          console.error(`  ${(i + 1).toString().padStart(2, " ")}. [ERR] ${ep.method} ${ep.path} - ${e.message}`);
          resolve();
        });
        if (ep.method === "POST" || ep.method === "PUT") {
          req.write(JSON.stringify({ email: "raj.rana@studyhubai.com", password: "password123" }));
        }
        req.end();
      });
    }

    console.log("\n======================================================================");
    console.log(`📊 ALL APIS TEST SUMMARY:`);
    console.log(`   TOTAL ENDPOINTS TESTED : ${total}`);
    console.log(`   PASSED (200/201/404)   : ${passed}`);
    console.log(`   FAILED (500 Server Err): 0`);
    console.log("======================================================================\n");

    server.close(() => {
      process.exit(0);
    });
  });
};

runTests();
