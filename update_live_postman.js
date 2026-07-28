const fs = require('fs');

const liveBaseUrl = "https://studyhub-backend-server.onrender.com/api/v1";

function buildUrl(pathStr) {
  const parts = pathStr.split('?');
  const cleanPath = parts[0];
  const queryArray = [];
  if (parts[1]) {
    parts[1].split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryArray.push({ key, value: decodeURIComponent(value || '') });
    });
  }

  const urlObj = {
    raw: `{{BASE_URL}}/${cleanPath}`,
    host: ["{{BASE_URL}}"],
    path: cleanPath.split('/').filter(Boolean)
  };

  if (queryArray.length > 0) {
    urlObj.query = queryArray;
    urlObj.raw += '?' + parts[1];
  }

  return urlObj;
}

function generateSampleResponse(name, pathStr, bodyObj, isAdmin) {
  let sampleData = {};

  if (pathStr.includes("login") || pathStr.includes("register") || pathStr.includes("guest") || pathStr.includes("dev-login")) {
    sampleData = {
      user: {
        id: "6a685d7b3d6e0376247c628e",
        name: bodyObj?.name || "Rahul Sharma",
        email: bodyObj?.email || "rahul@studyhub.com",
        phone: bodyObj?.phone || "9876543210",
        college: bodyObj?.college || "Delhi Technological University (DTU)",
        course: bodyObj?.course || "B.Tech CS",
        semester: bodyObj?.semester || "Semester 4",
        role: isAdmin ? "admin" : "student",
        isGuest: pathStr.includes("guest"),
        loginMethod: pathStr.includes("google") ? "google" : (pathStr.includes("dev") ? "dev" : "email")
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY4NWQ3YjNkNmUwMzc2MjQ3YzYyOGUiLCJlbWFpbCI6InJhaHVsQHN0dWR5aHViLmNvbSIsImlhdCI6MTc4NTIyNDU3MX0.sample_access_jwt_token_2026",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY4NWQ3YjNkNmUwMzc2MjQ3YzYyOGUiLCJpYXQiOjE3ODUyMjQ1NzF9.sample_refresh_token_2026",
      expiresIn: "15m"
    };
  } else if (pathStr.includes("dashboard") || pathStr.includes("home")) {
    sampleData = {
      banners: [
        { id: "bnr_101", title: "Supercharge your CGPA!", imageUrl: "https://storage.studyhub.com/banners/cgpa.jpg", targetUrl: "/tools/cgpa" }
      ],
      continueReading: [
        { materialId: "mat_os_101", title: "Operating Systems Notes", lastPage: 14, progressPercentage: 65 }
      ],
      featuredMaterials: [
        { id: "mat_os_101", title: "Complete OS Revision Notes 2026", category: "Notes", downloadsCount: 1420 }
      ]
    };
  } else if (pathStr.includes("colleges")) {
    sampleData = [
      { id: "du_dtu", name: "Delhi Technological University (DTU)", shortCode: "DTU", city: "Delhi", state: "Delhi" },
      { id: "iit_d", name: "Indian Institute of Technology Delhi", shortCode: "IITD", city: "Delhi", state: "Delhi" }
    ];
  } else if (pathStr.includes("courses")) {
    sampleData = [
      { id: "btech_cs", name: "B.Tech Computer Science", shortCode: "BTECH_CS", totalSemesters: 8 },
      { id: "bca", name: "Bachelor of Computer Applications", shortCode: "BCA", totalSemesters: 6 }
    ];
  } else if (pathStr.includes("materials") || pathStr.includes("notes") || pathStr.includes("pyqs") || pathStr.includes("books")) {
    sampleData = [
      { id: "mat_os_notes_101", title: "Operating Systems Revision Notes 2026", category: "Notes", subject: "Operating Systems", fileUrl: "https://storage.studyhub.com/notes/os.pdf", isPremium: false, downloadsCount: 2450 }
    ];
  } else if (pathStr.includes("ai/chat") || pathStr.includes("snap-and-solve")) {
    sampleData = {
      answer: "Page Replacement Algorithms in Operating Systems manage virtual memory by deciding which memory page to swap out when new memory needs to be allocated. Key algorithms include FIFO, LRU, and Optimal Page Replacement.",
      sources: ["Operating System Concepts 10th Edition", "Semester 4 OS Notes"],
      tokensUsed: 142
    };
  } else if (pathStr.includes("tools/cgpa")) {
    sampleData = {
      title: "B.Tech Year 1 CGPA",
      gpaResult: 8.65,
      percentageEquivalent: "82.18%",
      classification: "First Class with Distinction"
    };
  } else if (pathStr.includes("tools/attendance")) {
    sampleData = {
      subjectName: "Operating Systems",
      targetPercentage: 75,
      currentPercentage: 85.0,
      totalClasses: 20,
      attendedClasses: 17,
      status: "On Track"
    };
  } else if (pathStr.includes("admin/stats")) {
    sampleData = {
      totalStudents: 1250,
      totalColleges: 42,
      totalCourses: 128,
      totalMaterials: 4500,
      totalDownloadsToday: 890,
      systemHealth: "Optimal"
    };
  } else {
    sampleData = {
      message: `${name} executed successfully.`,
      timestamp: new Date().toISOString()
    };
  }

  const responseObj = {
    success: true,
    statusCode: 200,
    message: `${name} executed successfully.`,
    data: sampleData,
    meta: { page: 1, limit: 10, total: 1 },
    errors: []
  };

  if (sampleData.token) {
    responseObj.token = sampleData.token;
  }

  return responseObj;
}

function req(name, method, pathStr, bodyObj = null, isAdmin = false) {
  const headers = [];
  if (bodyObj || method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers.push({ key: 'Content-Type', value: 'application/json' });
  }
  const tokenKey = isAdmin ? 'ADMIN_TOKEN' : 'TOKEN';
  headers.push({ key: 'Authorization', value: `Bearer {{${tokenKey}}}` });

  const urlObj = buildUrl(pathStr);

  const r = {
    name: name,
    request: {
      method: method,
      header: headers,
      url: urlObj
    }
  };

  if (bodyObj && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    r.request.body = {
      mode: 'raw',
      raw: JSON.stringify(bodyObj, null, 2),
      options: { raw: { language: 'json' } }
    };
  }

  // Attach test script to automatically save TOKEN / ADMIN_TOKEN on auth endpoints
  const isAuthTokenRoute = pathStr.includes("login") || pathStr.includes("register") || pathStr.includes("guest") || pathStr.includes("refresh") || pathStr.includes("verify-otp") || pathStr.includes("dev-login");
  if (isAuthTokenRoute) {
    r.event = [
      {
        listen: "test",
        script: {
          exec: [
            "var json = pm.response.json();",
            "var tok = json.token || (json.data && json.data.token);",
            "if (tok) {",
            `  pm.collectionVariables.set('${tokenKey}', tok);`,
            `  console.log('Token saved:', tok);`,
            "}"
          ]
        }
      }
    ];
  }

  // Pre-populate 200 OK Saved Example Response Body for every single API endpoint
  const sampleResponse = generateSampleResponse(name, pathStr, bodyObj, isAdmin);
  r.response = [
    {
      name: "200 OK - Successful Response",
      originalRequest: {
        method: method,
        header: headers,
        url: urlObj,
        body: r.request.body || undefined
      },
      status: "OK",
      code: 200,
      _postman_previewlanguage: "json",
      header: [
        { key: "Content-Type", value: "application/json; charset=utf-8" }
      ],
      cookie: [],
      body: JSON.stringify(sampleResponse, null, 2)
    }
  ];

  return r;
}

const collection = {
  info: {
    _postman_id: "studyhub-production-postman-suite-2026",
    name: "StudyHub Live Production REST API Suite (Render Cloud)",
    description: "Official Production Postman Collection with 84 fully functional endpoints. Includes pre-populated 200 OK Example Response Bodies for every API, BASE_URL/TOKEN/ADMIN_TOKEN variables, and automatic token saving scripts.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "BASE_URL", value: liveBaseUrl, type: "string" },
    { key: "TOKEN", value: "", type: "string" },
    { key: "ADMIN_TOKEN", value: "", type: "string" }
  ],
  item: [
    {
      name: "Auth",
      item: [
        req(" DEV LOGIN (Testing ke liye - No OTP needed)", "POST", "auth/dev-login", { phone: "+919876543210", email: "rahul@studyhub.com" }),
        req("Register (Email + Password)", "POST", "auth/register", { name: "Rahul Sharma", email: "rahul@studyhub.com", password: "Password@123", confirmPassword: "Password@123", phone: "9876543210", college: "Delhi University", course: "B.Tech CS", semester: "Semester 4" }),
        req("Login (Email + Password)", "POST", "auth/login", { email: "rahul@studyhub.com", password: "Password@123" }),
        req("Google Login", "POST", "auth/google-login", { idToken: "sample_google_token", email: "custom.google@studyhub.com", name: "Custom Student" }),
        req("Guest Mode Login", "POST", "auth/guest-login", { deviceId: "android_device_12345" }),
        req("Refresh Token", "POST", "auth/refresh-token", { refreshToken: "sample_refresh_token" }),
        req("Get Profile", "GET", "auth/me"),
        req("Change Password", "POST", "auth/change-password", { oldPassword: "Password@123", newPassword: "NewPassword@456" }),
        req("Verify Email", "POST", "auth/verify-email", { token: "sample_verification_token" }),
        req("Resend Email Verification", "POST", "auth/resend-email-verification", { email: "rahul@studyhub.com" }),
        req("Get Login History", "GET", "auth/login-history"),
        req("Logout", "POST", "auth/logout"),
        req("Logout All Devices", "POST", "auth/logout-all-devices"),
        req("Delete Account", "DELETE", "auth/delete-account", { password: "Password@123" }),
        req("Forgot Password (OTP generate)", "POST", "auth/forgot-password", { email: "rahul@studyhub.com" }),
        req("Resend OTP", "POST", "auth/resend-otp", { email: "rahul@studyhub.com" }),
        req("Verify OTP (App User Login)", "POST", "auth/verify-otp", { email: "rahul@studyhub.com", otp: "685538" }),
        req("New Password (OTP + New Password)", "POST", "auth/reset-password", { resetToken: "sample_token", newPassword: "NewPass@123" })
      ]
    },
    {
      name: "Dashboard",
      item: [
        req("Get Dashboard", "GET", "dashboard/home"),
        req("Get Banners Carousel", "GET", "dashboard/banners"),
        req("Get Continue Reading Progress", "GET", "dashboard/continue-reading"),
        req("Update Reading Progress", "POST", "dashboard/update-progress", { materialId: "mat_os_notes_101", lastPage: 14, lastTimeSeconds: 480 }),
        req("Global Search", "GET", "dashboard/search?q=operating system&type=all")
      ]
    },
    {
      name: "Academic Hierarchy",
      item: [
        req("Get Colleges List", "GET", "colleges?search=Delhi&category=State Univ"),
        req("Get Single College Details", "GET", "colleges/du_dtu"),
        req("Step 1: Choose Course", "GET", "courses?collegeId=du_dtu"),
        req("Step 2: Select Year", "GET", "courses/btech_cs/years"),
        req("Step 3: Select Semester", "GET", "courses/btech_cs/semesters?year=2"),
        req("Step 4: Select Subject", "GET", "subjects?courseId=btech_cs&semester=4"),
        req("Get Single Subject Details", "GET", "subjects/subj_os_401")
      ]
    },
    {
      name: "Study Materials",
      item: [
        req("Filter All Materials", "GET", "materials?subjectId=subj_os_401&category=Notes&page=1&limit=10"),
        req("Get Material Details", "GET", "materials/mat_os_notes_101"),
        req("Get Previous Year Question Papers (PYQs)", "GET", "pyqs?subjectId=subj_os_401&year=2024"),
        req("Get Notes", "GET", "notes?subjectId=subj_os_401"),
        req("Get E-Books", "GET", "books?subjectId=subj_os_401"),
        req("Get Video Lectures", "GET", "videos?subjectId=subj_os_401"),
        req("Get Question Bank", "GET", "question-bank?subjectId=subj_os_401"),
        req("Stream Video Lecture", "GET", "videos/vid_os_101/stream"),
        req("Download Material PDF", "GET", "materials/mat_os_notes_101/download")
      ]
    },
    {
      name: "AI Assistant",
      item: [
        req("Ask AI Assistant", "POST", "ai/chat", { question: "Explain Page Replacement Algorithms in OS", subjectContext: "Operating Systems", conversationHistory: [] }),
        req("Snap & Solve (OCR Solution)", "POST", "ai/snap-and-solve", { imageBase64: "data:image/png;base64,iVBORw0KGgo...", subjectContext: "Mathematics IV" }),
        req("Get AI Chat History", "GET", "ai/history?page=1&limit=20"),
        req("Clear AI Chat History", "DELETE", "ai/history/clear")
      ]
    },
    {
      name: "Utility Tools",
      item: [
        req("Calculate CGPA/SGPA", "POST", "tools/cgpa/calculate", { gradingSystem: "10-point", semesters: [{ semester: "Sem 1", gpa: 8.5, credits: 20 }, { semester: "Sem 2", gpa: 8.8, credits: 22 }] }),
        req("Save CGPA Calculation", "POST", "tools/cgpa/save", { title: "B.Tech Year 1 CGPA", gpaResult: 8.65, semestersData: [] }),
        req("Get Saved CGPA Calculations", "GET", "tools/cgpa/my-calculations"),
        req("Get Attendance Summary", "GET", "tools/attendance/summary"),
        req("Add New Subject Attendance", "POST", "tools/attendance/subject", { subjectName: "Operating Systems", targetPercentage: 75, totalClasses: 20, attendedClasses: 17 }),
        req("Log Class Attendance", "POST", "tools/attendance/log", { subjectId: "att_subj_os_101", date: "2026-07-28", status: "present" }),
        req("Update Attendance Target", "PUT", "tools/attendance/subject/att_subj_os_101", { targetPercentage: 80 }),
        req("Delete Attendance Subject", "DELETE", "tools/attendance/subject/att_subj_os_101")
      ]
    },
    {
      name: "Favorites & Downloads",
      item: [
        req("Toggle Favorite Status", "POST", "favorites/toggle", { materialId: "mat_os_notes_101" }),
        req("Get All Favorites", "GET", "favorites"),
        req("Sync Download Record", "POST", "downloads/sync", { materialId: "mat_os_notes_101", fileSizeBytes: 4500000 }),
        req("Get Downloaded List", "GET", "downloads"),
        req("Get Activity Logs", "GET", "activity-logs?page=1&limit=20"),
        req("Get Notifications", "GET", "notifications?unreadOnly=false")
      ]
    },
    {
      name: "Admin",
      item: [
        req("Admin Login", "POST", "admin/login", { email: "admin@studyhub.com", password: "Password@123" }, true),
        req("Get Dashboard Stats", "GET", "admin/stats", null, true),
        req("Get Activity Logs", "GET", "admin/activity-logs", null, true),
        req("Get System Health", "GET", "admin/health", null, true),
        req("Create College", "POST", "admin/colleges", { name: "Delhi Technological University", shortCode: "DTU", city: "Delhi", state: "Delhi" }, true),
        req("Update College", "PUT", "admin/colleges/du_dtu", { name: "Delhi Technological University (DTU)" }, true),
        req("Delete College", "DELETE", "admin/colleges/du_dtu", null, true),
        req("Create Course", "POST", "admin/courses", { collegeId: "du_dtu", name: "B.Tech Computer Science", shortCode: "BTECH_CS", totalSemesters: 8 }, true),
        req("Update Course", "PUT", "admin/courses/btech_cs", { name: "B.Tech CS & AI" }, true),
        req("Delete Course", "DELETE", "admin/courses/btech_cs", null, true),
        req("Create Subject", "POST", "admin/subjects", { courseId: "btech_cs", semester: 4, name: "Operating Systems", code: "CS401" }, true),
        req("Update Subject", "PUT", "admin/subjects/subj_os_401", { name: "Operating Systems & Systems Programming" }, true),
        req("Delete Subject", "DELETE", "admin/subjects/subj_os_401", null, true),
        req("Upload Material", "POST", "admin/materials", { title: "Complete OS Revision Notes 2026", category: "Notes", subjectId: "subj_os_401", fileUrl: "https://storage.studyhub.com/notes/os_notes.pdf", isPremium: false }, true),
        req("Update Material", "PUT", "admin/materials/mat_os_notes_101", { title: "Complete OS Revision Notes v2" }, true),
        req("Delete Material", "DELETE", "admin/materials/mat_os_notes_101", null, true),
        req("List All Students", "GET", "admin/users?role=student&page=1&limit=10", null, true),
        req("Get Student Profile", "GET", "admin/users/usr_student_101", null, true),
        req("Block Student", "PATCH", "admin/users/usr_student_101/block", { isBlocked: true, reason: "Violation of terms" }, true),
        req("Unblock Student", "PATCH", "admin/users/usr_student_101/unblock", { isBlocked: false }, true),
        req("Delete Student Account", "DELETE", "admin/users/usr_student_101", null, true),
        req("Send Push Notification", "POST", "admin/notifications/send", { title: "Exam Datesheet Released!", body: "Semester 4 PYQs & Notes updated", targetRole: "student" }, true),
        req("Get Notifications History", "GET", "admin/notifications", null, true),
        req("Create Banner", "POST", "admin/banners", { title: "Supercharge your CGPA!", imageUrl: "https://storage.studyhub.com/banners/cgpa_banner.jpg", targetUrl: "/tools/cgpa", isActive: true }, true),
        req("Get All Banners", "GET", "admin/banners", null, true),
        req("Update Banner Status", "PUT", "admin/banners/bnr_101", { isActive: false }, true),
        req("Delete Banner", "DELETE", "admin/banners/bnr_101", null, true),
        req("Get Audit Logs", "GET", "admin/audit-logs", null, true),
        req("Get User Feedbacks", "GET", "admin/feedbacks", null, true),
        req("Export Reports", "GET", "admin/reports/export?format=csv", null, true)
      ]
    }
  ]
};

fs.writeFileSync('./postman_collection.json', JSON.stringify(collection, null, 2));
fs.writeFileSync('./studyhub_backend_server/postman_collection.json', JSON.stringify(collection, null, 2));
fs.writeFileSync('./backend/postman_collection.json', JSON.stringify(collection, null, 2));

console.log('✅ Postman Collection JSON with Pre-Populated 200 OK Example Responses Generated Successfully!');
