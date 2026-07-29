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
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI6YTY4NWQ3YjNkNmUwMzc2MjQ3YzYyOGUiLCJlbWFpbCI6InJhaHVsQHN0dWR5aHViLmNvbSIsImlhdCI6MTc4NTIyNDU3MX0.sample_access_jwt_token_2026",
      refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY4NWQ3YjNkNmUwMzc2MjQ3YzYyOGUiLCJpYXQiOjE3ODUyMjQ1NzF9.sample_refresh_token_2026",
      expiresIn: "15m"
    };
  } else if (pathStr.includes("user/profile") || pathStr.includes("profile")) {
    sampleData = {
      id: "6a685d7b3d6e0376247c628e",
      name: "Rahul Sharma",
      email: "rahul@studyhub.com",
      phone: "9876543210",
      college: "Delhi Technological University (DTU)",
      course: "B.Tech CS",
      semester: "Semester 4",
      avatarUrl: "https://storage.studyhub.com/avatars/rahul.png",
      downloadsCount: 14,
      favoritesCount: 8,
      role: "student"
    };
  } else if (pathStr.includes("user/referral") || pathStr.includes("referral")) {
    sampleData = {
      referralCode: "STUDYHUB-RAHU8E24",
      referralLink: "https://studyhub-backend-server.onrender.com/invite?ref=STUDYHUB-RAHU8E24",
      shareMessage: "Hey classmate! Join me on StudyHub App to access Semester Notes, PYQs, Books & AI Assistant. Click here: https://studyhub-backend-server.onrender.com/invite?ref=STUDYHUB-RAHU8E24",
      totalInvitedFriends: 5,
      rewardPoints: 250
    };
  } else if (pathStr.includes("admin/referrals")) {
    sampleData = {
      totalAppInvites: 1420,
      topReferrers: [
        { studentId: "usr_101", name: "Rahul Sharma", email: "rahul@studyhub.com", referralCode: "STUDYHUB-RAHU8E24", invitedFriendsCount: 24, rewardPoints: 1200 },
        { studentId: "usr_102", name: "Amit Verma", email: "amit@studyhub.com", referralCode: "STUDYHUB-AMIT9F12", invitedFriendsCount: 18, rewardPoints: 900 }
      ]
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
  } else if (pathStr.includes("subjects")) {
    sampleData = {
      id: "subj_os_401",
      name: "Operating Systems",
      code: "CS401",
      credits: 4,
      facultyName: "Dr. A. K. Sharma",
      description: "Core Operating Systems concepts including Process Management, Memory Management, File Systems, and Virtualization."
    };
  } else if (pathStr.includes("materials") || pathStr.includes("notes") || pathStr.includes("pyqs") || pathStr.includes("books") || pathStr.includes("videos") || pathStr.includes("question-bank")) {
    sampleData = [
      { id: "mat_os_notes_101", title: "Operating Systems Revision Notes 2026", category: "Notes", subject: "Operating Systems", fileUrl: "https://storage.studyhub.com/notes/os.pdf", isPremium: false, downloadsCount: 2450 }
    ];
  } else if (pathStr.includes("ai/chat") || pathStr.includes("snap-and-solve") || pathStr.includes("snap-solve")) {
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
      overallPercentage: 82.5,
      totalSubjects: 4,
      alertCount: 0,
      subjects: [
        { subjectName: "Operating Systems", targetPercentage: 75, currentPercentage: 85.0, totalClasses: 20, attendedClasses: 17, status: "On Track", minimum75Alert: "Safe" }
      ]
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
    description: "Official Master Postman Collection containing all 87 REST API endpoints across 8 core modules. Built for MongoDB Atlas, Google OAuth, Student Utilities & Admin Control Panel Web Suite.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "BASE_URL", value: liveBaseUrl, type: "string" },
    { key: "TOKEN", value: "", type: "string" },
    { key: "ADMIN_TOKEN", value: "", type: "string" }
  ],
  item: [
    {
      name: "1. Auth (18 APIs)",
      item: [
        req("1. DEV LOGIN (Fast 1-Click Token Generator)", "POST", "auth/dev-login", { phone: "+919876543210", email: "rahul@studyhub.com" }),
        req("2. Register Student", "POST", "auth/register", { name: "Rahul Sharma", email: "rahul@studyhub.com", password: "Password@123", confirmPassword: "Password@123", phone: "9876543210", college: "Delhi Technological University (DTU)", course: "B.Tech CS", semester: "Semester 4" }),
        req("3. Login Student (Email + Password)", "POST", "auth/login", { email: "rahul@studyhub.com", password: "Password@123" }),
        req("4. Google Login (Auto-registers missing account)", "POST", "auth/google-login", { idToken: "sample_google_id_token_2026", email: "rahul.google@studyhub.com", name: "Rahul Google Student" }),
        req("5. Guest Mode Login (Restricted permissions)", "POST", "auth/guest-login", { deviceId: "android_device_12345" }),
        req("6. Refresh Access Token", "POST", "auth/refresh-token", { refreshToken: "sample_refresh_token" }),
        req("7. Get Current User Profile", "GET", "auth/me"),
        req("8. Change Password", "POST", "auth/change-password", { oldPassword: "Password@123", newPassword: "NewPassword@456" }),
        req("9. Verify Email Token", "POST", "auth/verify-email", { token: "sample_verification_token" }),
        req("10. Resend Email Verification", "POST", "auth/resend-email-verification", { email: "rahul@studyhub.com" }),
        req("11. Get Login History Audit Logs", "GET", "auth/login-history"),
        req("12. Logout User Session", "POST", "auth/logout"),
        req("13. Logout All Devices", "POST", "auth/logout-all-devices"),
        req("14. Delete Account", "DELETE", "auth/delete-account", { password: "Password@123" }),
        req("15. Forgot Password (OTP Generator)", "POST", "auth/forgot-password", { email: "rahul@studyhub.com" }),
        req("16. Resend Dynamic OTP", "POST", "auth/resend-otp", { email: "rahul@studyhub.com" }),
        req("17. Verify Dynamic OTP", "POST", "auth/verify-otp", { email: "rahul@studyhub.com", otp: "685538" }),
        req("18. Reset Password (OTP & New Password)", "POST", "auth/reset-password", { email: "rahul@studyhub.com", otp: "685538", newPassword: "NewPassword@123", confirmPassword: "NewPassword@123" })
      ]
    },
    {
      name: "2. Dashboard (5 APIs)",
      item: [
        req("19. Get Home Feed & Dashboard Summary", "GET", "dashboard/home"),
        req("20. Get Banners Carousel", "GET", "dashboard/banners"),
        req("21. Get Continue Reading Progress", "GET", "dashboard/continue-reading"),
        req("22. Update Reading Progress", "POST", "dashboard/update-progress", { materialId: "mat_os_notes_101", lastPage: 14, lastTimeSeconds: 480 }),
        req("23. Global Search (Voice, Text & Camera OCR)", "GET", "dashboard/search?q=operating system&type=all")
      ]
    },
    {
      name: "3. Academic Hierarchy (7 APIs)",
      item: [
        req("24. Get Colleges List", "GET", "colleges?search=Delhi&category=State Univ"),
        req("25. Get College Details by ID", "GET", "colleges/du_dtu"),
        req("26. Step 1: Choose Course (by College ID)", "GET", "courses?collegeId=du_dtu"),
        req("27. Step 2: Choose Academic Year", "GET", "courses/btech_cs/years"),
        req("28. Step 3: Choose Semester", "GET", "courses/btech_cs/semesters?year=2"),
        req("29. Step 4: Choose Subject (Course + Semester)", "GET", "subjects?courseId=btech_cs&semester=4"),
        req("30. Get Subject Details (Code, Credits, Faculty)", "GET", "subjects/subj_os_401")
      ]
    },
    {
      name: "4. Study Materials & Media (9 APIs)",
      item: [
        req("31. Filter Materials by Category", "GET", "materials?subjectId=subj_os_401&category=Notes&page=1&limit=10"),
        req("32. Get Material Details by ID", "GET", "materials/mat_os_notes_101"),
        req("33. Get Previous 5 Years Question Papers (PYQs)", "GET", "pyqs?subjectId=subj_os_401&year=2024"),
        req("34. Get Semester Notes", "GET", "notes?subjectId=subj_os_401"),
        req("35. Get E-Books & Textbooks", "GET", "books?subjectId=subj_os_401"),
        req("36. Get Video Lectures", "GET", "videos?subjectId=subj_os_401"),
        req("37. Get Question Bank", "GET", "question-bank?subjectId=subj_os_401"),
        req("38. Stream Video Lecture URL", "GET", "videos/vid_os_101/stream"),
        req("39. Download Material PDF", "GET", "materials/mat_os_notes_101/download")
      ]
    },
    {
      name: "5. AI Assistant & Snap & Solve (4 APIs)",
      item: [
        req("40. Ask AI Assistant (GPT-4o Mini Doubt Solver)", "POST", "ai/chat", { prompt: "Explain Page Replacement Algorithms in OS", subjectContext: "Operating Systems" }),
        req("41. Snap & Solve (Camera OCR Question Solver)", "POST", "ai/snap-and-solve", { note: "Calculate LRU Page Faults for sequence 7,0,1,2,0,3,0,4", subjectContext: "Operating Systems" }),
        req("42. Get AI Chat History", "GET", "ai/history?page=1&limit=20"),
        req("43. Clear AI Chat History", "DELETE", "ai/history/clear")
      ]
    },
    {
      name: "6. Student Utility Tools (8 APIs)",
      item: [
        req("44. Calculate CGPA / SGPA", "POST", "tools/cgpa/calculate", { gradingSystem: "10-point", semesters: [{ semester: "Sem 1", gpa: 8.5, credits: 20 }, { semester: "Sem 2", gpa: 8.8, credits: 22 }] }),
        req("45. Save CGPA Calculation Record", "POST", "tools/cgpa/save", { title: "B.Tech Year 1 CGPA", gpaResult: 8.65, percentageEquivalent: "82.18%", classification: "First Class with Distinction" }),
        req("46. Get My Saved CGPA Calculations", "GET", "tools/cgpa/my-calculations"),
        req("47. Get Attendance Summary & 75% Alerts", "GET", "tools/attendance/summary"),
        req("48. Add New Subject to Attendance Tracker", "POST", "tools/attendance/subject", { subjectName: "Operating Systems", targetPercentage: 75, totalClasses: 20, attendedClasses: 17 }),
        req("49. Log Class Attendance (Present / Absent)", "POST", "tools/attendance/log", { subjectId: "att_subj_os_101", date: "2026-07-28", status: "present" }),
        req("50. Update Attendance Target Percentage", "PUT", "tools/attendance/subject/att_subj_os_101", { targetPercentage: 80 }),
        req("51. Delete Attendance Subject", "DELETE", "tools/attendance/subject/att_subj_os_101")
      ]
    },
    {
      name: "7. Profile, Settings, Favorites, Downloads & Referrals (8 APIs)",
      item: [
        req("52. Get Student User Profile", "GET", "user/profile"),
        req("53. Update Profile Info", "PUT", "user/profile", { name: "Rahul Sharma", phone: "9876543210", college: "Delhi Technological University (DTU)", course: "B.Tech CS", semester: "Semester 4", avatarUrl: "https://storage.studyhub.com/avatars/rahul.png" }),
        req("54. Get Referral Code & Share Link", "GET", "user/referral"),
        req("55. Apply Friend Referral Code", "POST", "user/referral/apply", { referralCode: "STUDYHUB-RAHU8E24" }),
        req("56. Get User App Settings", "GET", "user/settings"),
        req("57. Update Preferred Language (en/hi)", "PATCH", "user/settings", { preferredLanguage: "en", darkTheme: true }),
        req("58. Toggle Material Favorite Status", "POST", "favorites/toggle", { materialId: "mat_os_notes_101" }),
        req("59. Get Saved Favorite Materials", "GET", "favorites"),
        req("60. Sync Offline Download Record", "POST", "downloads/sync", { materialId: "mat_os_notes_101", fileSizeBytes: 4500000 }),
        req("61. Get Downloaded Materials History", "GET", "downloads")
      ]
    },
    {
      name: "8. Admin Control Panel Web Suite (28 APIs)",
      item: [
        req("62. Admin Login", "POST", "admin/login", { email: "admin@studyhub.com", password: "Password@123" }, true),
        req("62b. Register New Admin Account", "POST", "admin/register", { name: "System Admin", email: "new.admin@studyhub.com", password: "Password@123", phone: "9876543210" }, false),
        req("63. Get Dashboard Executive Stats", "GET", "admin/stats", null, true),
        req("64. Get Activity Logs", "GET", "admin/activity-logs", null, true),
        req("65. Get System Health Report", "GET", "admin/health", null, true),
        req("66. Add New College", "POST", "admin/colleges", { name: "Delhi Technological University", shortCode: "DTU", city: "Delhi", state: "Delhi" }, true),
        req("67. Update College Details", "PUT", "admin/colleges/du_dtu", { name: "Delhi Technological University (DTU)" }, true),
        req("68. Delete College", "DELETE", "admin/colleges/du_dtu", null, true),
        req("69. Create New Course", "POST", "admin/courses", { collegeId: "du_dtu", name: "B.Tech Computer Science", shortCode: "BTECH_CS", totalSemesters: 8 }, true),
        req("70. Update Course Details", "PUT", "admin/courses/btech_cs", { name: "B.Tech CS & AI" }, true),
        req("71. Delete Course", "DELETE", "admin/courses/btech_cs", null, true),
        req("72. Create Subject (Code & Faculty Name)", "POST", "admin/subjects", { courseId: "btech_cs", semester: 4, name: "Operating Systems", code: "CS401", facultyName: "Dr. A. K. Sharma", credits: 4 }, true),
        req("73. Update Subject Details", "PUT", "admin/subjects/subj_os_401", { name: "Operating Systems & Systems Programming" }, true),
        req("74. Delete Subject", "DELETE", "admin/subjects/subj_os_401", null, true),
        req("75. Upload Material (Notes/PYQs/Books/Videos)", "POST", "admin/materials", { title: "Complete OS Revision Notes 2026", category: "Notes", subjectId: "subj_os_401", fileUrl: "https://storage.studyhub.com/notes/os_notes.pdf", isPremium: false }, true),
        req("76. Update Material Details", "PUT", "admin/materials/mat_os_notes_101", { title: "Complete OS Revision Notes v2" }, true),
        req("77. Delete Material", "DELETE", "admin/materials/mat_os_notes_101", null, true),
        req("78. List All Students", "GET", "admin/users?role=student&page=1&limit=10", null, true),
        req("79. Block / Unblock Student Account", "PATCH", "admin/users/usr_student_101/block", { isBlocked: true, reason: "Violation of app policies" }, true),
        req("80. Delete Student Account", "DELETE", "admin/users/usr_student_101", null, true),
        req("81. Send Mobile Push Notification", "POST", "admin/notifications/send", { title: "Exam Datesheet Released!", body: "Semester 4 PYQs & Notes updated for all subjects.", targetRole: "student" }, true),
        req("82. Create Promotional Banner", "POST", "admin/banners", { title: "Supercharge your CGPA!", imageUrl: "https://storage.studyhub.com/banners/cgpa_banner.jpg", targetUrl: "/tools/cgpa", isActive: true }, true),
        req("83. Update Banner Status", "PUT", "admin/banners/bnr_101", { isActive: false }, true),
        req("84. Delete Banner", "DELETE", "admin/banners/bnr_101", null, true),
        req("85. Get Referral Leaderboard & Invite Analytics", "GET", "admin/referrals", null, true),
        req("86. Get Student Feedbacks & Support Tickets", "GET", "admin/feedbacks", null, true)
      ]
    }
  ]
};

fs.writeFileSync('./postman_collection.json', JSON.stringify(collection, null, 2));
fs.writeFileSync('./studyhub_backend_server/postman_collection.json', JSON.stringify(collection, null, 2));

console.log('✅ Master Postman Collection JSON with 87 Endpoints Generated Successfully!');
