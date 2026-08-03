const fs = require("fs");
const path = require("path");

const orderedModules = [
  {
    folderName: "01. Auth Module (Register -> Login -> OTP -> Token)",
    tag: "AUTH",
    targetApp: "App + Admin Shared",
    apis: [
      { name: "01. Register User (Email & Password)", method: "POST", path: "/api/v1/auth/register", body: { name: "Rahul Sharma", email: "student@studyhub.com", password: "Password123!", college: "DTU" } },
      { name: "02. Login User (Email & Password)", method: "POST", path: "/api/v1/auth/login", body: { email: "student@studyhub.com", password: "Password123!" } },
      { name: "03. Dev 1-Click Login (Instant Test)", method: "POST", path: "/api/v1/auth/dev-login", body: { email: "student@studyhub.com" } },
      { name: "04. Guest Mode Login", method: "POST", path: "/api/v1/auth/guest-login", body: { deviceId: "guest_device_99" } },
      { name: "05. Google One-Tap Login", method: "POST", path: "/api/v1/auth/google-login", body: { idToken: "sample_google_token" } },
      { name: "06. Forgot Password - Send OTP", method: "POST", path: "/api/v1/auth/forgot-password", body: { email: "student@studyhub.com" } },
      { name: "07. Resend OTP Code", method: "POST", path: "/api/v1/auth/resend-otp", body: { email: "student@studyhub.com" } },
      { name: "08. Verify OTP Code", method: "POST", path: "/api/v1/auth/verify-otp", body: { email: "student@studyhub.com", otp: "123456" } },
      { name: "09. Reset Password", method: "POST", path: "/api/v1/auth/reset-password", body: { email: "student@studyhub.com", otp: "123456", newPassword: "NewPassword123!" } },
      { name: "10. Refresh Access Token", method: "POST", path: "/api/v1/auth/refresh-token", body: { refreshToken: "{{refreshToken}}" } },
      { name: "11. Get Current User (Me)", method: "GET", path: "/api/v1/auth/me" },
      { name: "12. Logout Current Session", method: "POST", path: "/api/v1/auth/logout" },
      { name: "13. Logout All Active Devices", method: "POST", path: "/api/v1/auth/logout-all-devices" }
    ]
  },
  {
    folderName: "02. User Profile & Account (Profile -> Uploads -> Settings)",
    tag: "USER",
    targetApp: "Mobile App",
    apis: [
      { name: "01. Get Student Profile", method: "GET", path: "/api/v1/user/profile" },
      { name: "02. Update Student Profile", method: "PUT", path: "/api/v1/user/profile", body: { name: "Rahul Sharma", phone: "+919876543210", college: "DTU" } },
      { name: "03. Get My Uploaded Materials", method: "GET", path: "/api/v1/user/uploads" },
      { name: "04. Get App Preferences & Settings", method: "GET", path: "/api/v1/user/settings" },
      { name: "05. Update App Preferences", method: "PATCH", path: "/api/v1/user/settings", body: { darkMode: true, emailAlerts: true } },
      { name: "06. Get Referral Code & Stats", method: "GET", path: "/api/v1/user/referral" },
      { name: "07. Apply Referral Code", method: "POST", path: "/api/v1/user/referral/apply", body: { referralCode: "STUDY_HUB123" } },
      { name: "08. Export User Data (GDPR Compliance)", method: "GET", path: "/api/v1/user/me/export" },
      { name: "09. Soft Delete Account", method: "DELETE", path: "/api/v1/user/me", body: { confirmText: "DELETE MY ACCOUNT" } }
    ]
  },
  {
    folderName: "03. Academic Directory (Colleges -> Courses -> Subjects)",
    tag: "ACADEMIC",
    targetApp: "App + Admin Shared",
    apis: [
      { name: "01. Get Colleges Directory", method: "GET", path: "/api/v1/colleges" },
      { name: "02. Get Courses Directory", method: "GET", path: "/api/v1/courses" },
      { name: "03. Get Semesters Directory", method: "GET", path: "/api/v1/semesters" },
      { name: "04. Get Subjects Directory", method: "GET", path: "/api/v1/subjects" }
    ]
  },
  {
    folderName: "04. Study Materials (Notes -> PYQs -> Books -> Videos)",
    tag: "MATERIALS",
    targetApp: "App + Admin Shared",
    apis: [
      { name: "01. Get All Study Materials", method: "GET", path: "/api/v1/materials" },
      { name: "02. Get Previous Year Questions (PYQs)", method: "GET", path: "/api/v1/pyqs" },
      { name: "03. Get Lecture Notes", method: "GET", path: "/api/v1/notes" },
      { name: "04. Get Reference Textbooks", method: "GET", path: "/api/v1/books" },
      { name: "05. Get Video Lectures", method: "GET", path: "/api/v1/videos" },
      { name: "06. Get Question Bank", method: "GET", path: "/api/v1/question-bank" },
      { name: "07. Upload Material (Student)", method: "POST", path: "/api/v1/materials/upload", body: { title: "OS Revision Notes", category: "Notes", fileUrl: "https://storage.studyhub.com/os.pdf" } }
    ]
  },
  {
    folderName: "05. Student Tools (CGPA -> Attendance -> Resume)",
    tag: "TOOLS",
    targetApp: "Mobile App",
    apis: [
      { name: "01. Get CGPA Records", method: "GET", path: "/api/v1/tools/cgpa" },
      { name: "02. Get GPA Calculator", method: "GET", path: "/api/v1/tools/gpa-calculator" },
      { name: "03. Calculate CGPA", method: "POST", path: "/api/v1/tools/cgpa/calculate", body: { semesters: [{ semester: 1, sgpa: 8.5, credits: 20 }] } },
      { name: "04. Save CGPA Record", method: "POST", path: "/api/v1/tools/cgpa/save", body: { currentCgpa: 8.5, targetCgpa: 9.0 } },
      { name: "05. Get Attendance Tracker Summary", method: "GET", path: "/api/v1/tools/attendance-tracker" },
      { name: "06. Add Attendance Subject", method: "POST", path: "/api/v1/tools/attendance/subject", body: { subjectName: "Operating Systems", targetPercentage: 75 } },
      { name: "07. Mark Class Attendance", method: "PATCH", path: "/api/v1/tools/attendance/mark", body: { subjectId: "sub_1", status: "present" } },
      { name: "08. Log Attendance Entry", method: "POST", path: "/api/v1/tools/attendance/log", body: { subjectId: "sub_1", date: "2026-08-03", status: "present" } },
      { name: "09. Recalculate Attendance Stats", method: "POST", path: "/api/v1/tools/attendance/recalculate", body: { subjectId: "sub_1" } },
      { name: "10. Get Resume Templates", method: "GET", path: "/api/v1/tools/resume-builder" },
      { name: "11. Generate Resume PDF", method: "POST", path: "/api/v1/tools/resume-builder", body: { template: "ATS Friendly", name: "Rahul Sharma" } },
      { name: "12. Plagiarism Checker Tool", method: "POST", path: "/api/v1/tools/plagiarism-checker", body: { text: "Sample assignment content..." } }
    ]
  },
  {
    folderName: "06. AI Assistant (Chat -> Summarize -> Explain -> Quiz)",
    tag: "AI",
    targetApp: "Mobile App",
    apis: [
      { name: "01. AI Tutor Chat Prompt", method: "POST", path: "/api/v1/ai/chat", body: { prompt: "Explain Virtual Memory Paging" } },
      { name: "02. AI Text Summarizer", method: "POST", path: "/api/v1/ai/summarize", body: { content: "Operating system handles process scheduling..." } },
      { name: "03. AI Concept Explainer", method: "POST", path: "/api/v1/ai/explain", body: { topic: "Deadlocks" } },
      { name: "04. AI Flashcards Generator", method: "POST", path: "/api/v1/ai/flashcards", body: { topic: "DBMS Normalization" } },
      { name: "05. AI Quiz Generator", method: "POST", path: "/api/v1/ai/quiz", body: { subject: "Data Structures" } },
      { name: "06. AI Snap & Solve OCR", method: "POST", path: "/api/v1/ai/snap-solve", body: { note: "Solve dx/dy integral" } },
      { name: "07. Get AI Chat History", method: "GET", path: "/api/v1/ai/history" },
      { name: "08. Clear AI Chat History", method: "DELETE", path: "/api/v1/ai/history/clear" }
    ]
  },
  {
    folderName: "07. Bookmarks, Downloads & Dashboard (Feed -> Favorites)",
    tag: "DASHBOARD",
    targetApp: "Mobile App",
    apis: [
      { name: "01. Student Home Dashboard Feed", method: "GET", path: "/api/v1/dashboard/home" },
      { name: "02. Continue Reading Progress Feed", method: "GET", path: "/api/v1/dashboard/continue-reading" },
      { name: "03. Update Material Progress", method: "POST", path: "/api/v1/dashboard/update-progress", body: { materialId: "mat_1", lastPage: 5, totalPages: 20 } },
      { name: "04. Global Search Across Materials", method: "GET", path: "/api/v1/dashboard/search" },
      { name: "05. Get Bookmarked Favorites", method: "GET", path: "/api/v1/favorites" },
      { name: "06. Toggle Bookmark Favorite", method: "POST", path: "/api/v1/favorites/toggle", body: { targetType: "Material", targetId: "mat_1" } },
      { name: "07. Get Offline Downloads", method: "GET", path: "/api/v1/downloads/my-downloads" },
      { name: "08. Sync Offline Downloads", method: "POST", path: "/api/v1/downloads/sync", body: { materialIds: ["mat_1"] } },
      { name: "09. Get User Notifications", method: "GET", path: "/api/v1/notifications" },
      { name: "10. Mark Notifications As Read", method: "PATCH", path: "/api/v1/notifications/mark-all-read" },
      { name: "11. Submit Feedback Ticket", method: "POST", path: "/api/v1/support/feedback", body: { type: "Bug Report", message: "Download button issue" } }
    ]
  },
  {
    folderName: "08. Admin Panel Management (Stats -> Hierarchy -> Users)",
    tag: "ADMIN",
    targetApp: "Admin Panel",
    apis: [
      { name: "01. Admin Login", method: "POST", path: "/api/v1/admin/login", body: { email: "admin@studyhub.com", password: "Password@123" } },
      { name: "02. Admin Register", method: "POST", path: "/api/v1/admin/register", body: { name: "System Admin", email: "admin.new@studyhub.com", password: "Password@123" } },
      { name: "03. Executive System Stats", method: "GET", path: "/api/v1/admin/stats" },
      { name: "04. System Health Check", method: "GET", path: "/api/v1/admin/health" },
      { name: "05. Activity & Audit Logs", method: "GET", path: "/api/v1/admin/audit-logs" },
      { name: "06. Get Admin Profile", method: "GET", path: "/api/v1/admin/profile" },
      { name: "07. Update Admin Profile", method: "PUT", path: "/api/v1/admin/profile", body: { name: "Lead Admin" } },
      { name: "08. Change Admin Password", method: "PUT", path: "/api/v1/admin/change-password", body: { oldPassword: "Password@123", newPassword: "NewPassword@123" } },
      { name: "09. Admin Get Colleges", method: "GET", path: "/api/v1/admin/colleges" },
      { name: "10. Admin Add College", method: "POST", path: "/api/v1/admin/colleges", body: { name: "DTU", shortCode: "DTU", city: "Delhi", state: "Delhi" } },
      { name: "11. Admin Get Courses", method: "GET", path: "/api/v1/admin/courses" },
      { name: "12. Admin Add Course", method: "POST", path: "/api/v1/admin/courses", body: { name: "B.Tech CS", code: "BTECH-CS", durationYears: 4 } },
      { name: "13. Admin Get Subjects", method: "GET", path: "/api/v1/admin/subjects" },
      { name: "14. Admin Add Subject", method: "POST", path: "/api/v1/admin/subjects", body: { name: "Operating Systems", code: "CS401", credits: 4 } },
      { name: "15. Admin Get Materials", method: "GET", path: "/api/v1/admin/materials" },
      { name: "16. Admin Add Material", method: "POST", path: "/api/v1/admin/materials", body: { title: "OS Notes", category: "Notes", fileUrl: "https://storage.studyhub.com/os.pdf" } },
      { name: "17. Admin Get Student Users Directory", method: "GET", path: "/api/v1/admin/users" },
      { name: "18. Admin Block/Unblock Student", method: "PATCH", path: "/api/v1/admin/users/usr_1/block", body: { blockedReason: "Terms violation" } },
      { name: "19. Admin Soft Delete Student", method: "DELETE", path: "/api/v1/admin/users/usr_1" },
      { name: "20. Admin Broadcast Notice", method: "POST", path: "/api/v1/admin/notifications/send", body: { title: "Exam Notice", description: "Mid sem exams starting next week.", category: "Notices" } },
      { name: "21. Admin Get Banners", method: "GET", path: "/api/v1/admin/banners" },
      { name: "22. Admin Add Banner", method: "POST", path: "/api/v1/admin/banners", body: { title: "Mid Sem Exam Prep", imageUrl: "https://storage.studyhub.com/banners/midsem.jpg" } },
      { name: "23. Admin Get Referrals Leaderboard", method: "GET", path: "/api/v1/admin/referrals" },
      { name: "24. Admin Get Feedback Inbox", method: "GET", path: "/api/v1/admin/feedbacks" }
    ]
  }
];

// Build Ordered Postman Items
const collectionItems = orderedModules.map(mod => {
  return {
    name: `[${mod.targetApp}] ${mod.folderName}`,
    item: mod.apis.map(api => {
      const isAuthRequired = !api.path.includes("/login") && !api.path.includes("/register") && !api.path.includes("/health") && !api.path.includes("/ready");

      return {
        name: api.name,
        request: {
          method: api.method,
          header: [
            { key: "Content-Type", value: "application/json" },
            ...(isAuthRequired ? [{ key: "Authorization", value: "Bearer {{accessToken}}" }] : [])
          ],
          body: api.body ? { mode: "raw", raw: JSON.stringify(api.body, null, 2) } : undefined,
          url: {
            raw: `{{baseUrl}}${api.path}`,
            host: ["{{baseUrl}}"],
            path: api.path.split("/").filter(Boolean)
          }
        },
        event: [
          {
            listen: "test",
            script: {
              type: "text/javascript",
              exec: [
                `pm.test("${api.name} - Status is 200/201", () => pm.expect(pm.response.code).to.be.oneOf([200, 201, 204]));`,
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
            name: "200 OK Response Contract",
            status: api.method === "POST" ? "Created" : "OK",
            code: api.method === "POST" ? 201 : 200,
            _postman_previewlanguage: "json",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: JSON.stringify({
              success: true,
              statusCode: api.method === "POST" ? 201 : 200,
              message: `${api.name} executed successfully`,
              data: api.body || { id: "res_sample_101", status: "active" },
              meta: {}
            }, null, 2)
          }
        ]
      };
    })
  };
});

// Master Single Collection Object
const masterCollection = {
  info: {
    name: "StudyHub AI Backend - Master Sequential User Journey Collection (Numbered 1-to-N)",
    _postman_id: "studyhub-ordered-master-v4",
    description: "Clean, logically ordered and numbered Postman collection structured by real user step-by-step journey (Register -> Login -> Profile -> Academic -> Materials -> Tools -> AI -> Admin).",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000", type: "string" },
    { key: "accessToken", value: "", type: "string" },
    { key: "refreshToken", value: "", type: "string" }
  ],
  item: collectionItems
};

// Write Postman Files
const rootFile = path.join(__dirname, "postman_collection.json");
const folderFile = path.join(__dirname, "postman", "collection.json");

fs.writeFileSync(rootFile, JSON.stringify(masterCollection, null, 2));
fs.writeFileSync(folderFile, JSON.stringify(masterCollection, null, 2));

console.log(`\n======================================================================`);
console.log(`🚀 SUCCESSFULLY GENERATED SEQUENTIALLY ORDERED POSTMAN COLLECTION`);
console.log(`======================================================================`);
console.log(`📄 Saved to: ${rootFile}`);
console.log(`📁 Folders Created: ${collectionItems.length}`);
console.log(`======================================================================\n`);
