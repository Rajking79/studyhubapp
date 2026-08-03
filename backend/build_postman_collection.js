const fs = require("fs");
const path = require("path");

const collection = {
  info: {
    name: "StudyHub AI Backend API Collection (Blueprint v2.2)",
    _postman_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    description: "Production-ready Postman collection for StudyHub AI Backend APIs featuring automatic JWT token refresh scripts, test assertions, and saved example responses.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  event: [
    {
      listen: "prerequest",
      script: {
        type: "text/javascript",
        exec: [
          "// Pre-request Script: Auto Token Refresh if Expired",
          "const tokenExpiry = pm.environment.get('tokenExpiry');",
          "const now = Date.now();",
          "if (tokenExpiry && now >= parseInt(tokenExpiry)) {",
          "    pm.sendRequest({",
          "        url: pm.environment.get('baseUrl') + '/api/v1/auth/refresh',",
          "        method: 'POST',",
          "        header: { 'Content-Type': 'application/json' },",
          "    }, function (err, res) {",
          "        if (!err && res.code === 200) {",
          "            const token = res.json().data.accessToken;",
          "            pm.environment.set('accessToken', token);",
          "            pm.environment.set('tokenExpiry', Date.now() + 14 * 60 * 1000);",
          "        }",
          "    });",
          "}"
        ]
      }
    }
  ],
  item: [
    {
      name: "1. Auth Module",
      item: [
        createApiItem("Register User", "POST", "/api/v1/auth/register", {
          name: "Rahul Sharma",
          email: "student@studyhub.com",
          password: "Password123!",
          college: "DTU"
        }, false, 201, "Student registered successfully. Please verify your email.", {
          user: { _id: "6a685d7b3d6e0376247c628e", name: "Rahul Sharma", email: "student@studyhub.com" },
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }),
        createApiItem("Login User", "POST", "/api/v1/auth/login", {
          email: "student@studyhub.com",
          password: "Password123!"
        }, false, 200, "User logged in successfully", {
          user: { _id: "6a685d7b3d6e0376247c628e", name: "Rahul Sharma", email: "student@studyhub.com", role: "student" },
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }, true),
        createApiItem("Dev 1-Click Login", "POST", "/api/v1/auth/dev-login", { role: "student" }, false, 200, "Dev Login successful", {
          user: { _id: "6a685d7b3d6e0376247c628e", role: "student" },
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }, true),
        createApiItem("Guest Fast Login", "POST", "/api/v1/auth/guest-login", { deviceId: "device_guest_99" }, false, 200, "Guest login successful", {
          user: { _id: "guest_6a685d7b", role: "guest", isGuest: true },
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }),
        createApiItem("Get Current User (Me)", "GET", "/api/v1/auth/me", null, true, 200, "Current user loaded successfully", {
          _id: "6a685d7b3d6e0376247c628e",
          name: "Rahul Sharma",
          email: "student@studyhub.com",
          role: "student",
          isGuest: false
        }),
        createApiItem("Refresh Token", "POST", "/api/v1/auth/refresh", { refreshToken: "{{refreshToken}}" }, false, 200, "Access token refreshed successfully", {
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new..."
        }),
        createApiItem("Logout User", "POST", "/api/v1/auth/logout", null, true, 200, "User logged out successfully", {})
      ]
    },
    {
      name: "2. User & Profile Module",
      item: [
        createApiItem("Get Profile", "GET", "/api/v1/user/profile", null, true, 200, "Student profile fetched", {
          _id: "6a685d7b3d6e0376247c628e",
          name: "Rahul Sharma",
          college: "Delhi Technological University (DTU)",
          course: "B.Tech CS",
          semester: "Semester 4"
        }),
        createApiItem("Update Profile", "PUT", "/api/v1/user/profile", {
          name: "Rahul Sharma",
          phone: "+919876543210",
          college: "DTU",
          course: "B.Tech CS",
          semester: "Semester 4"
        }, true, 200, "Profile updated successfully", {
          _id: "6a685d7b3d6e0376247c628e",
          name: "Rahul Sharma",
          phone: "+919876543210",
          college: "DTU"
        }),
        createApiItem("Get My Uploads", "GET", "/api/v1/user/uploads", null, true, 200, "My uploaded materials fetched", [
          { _id: "mat_101", title: "Operating Systems Notes", category: "Notes", downloadsCount: 120 }
        ]),
        createApiItem("Get Settings", "GET", "/api/v1/user/settings", null, true, 200, "User settings fetched successfully", {
          notificationsEnabled: true,
          darkMode: true,
          emailAlerts: true
        }),
        createApiItem("Update Settings", "PATCH", "/api/v1/user/settings", { darkMode: true, emailAlerts: false }, true, 200, "Settings updated successfully", {
          darkMode: true,
          emailAlerts: false
        }),
        createApiItem("Get Referral Code", "GET", "/api/v1/user/referral", null, true, 200, "Referral details loaded", {
          referralCode: "STUDY_6A685D",
          inviteUrl: "https://studyhub.app/invite/STUDY_6A685D",
          totalInvited: 3,
          earnedCoins: 150
        }),
        createApiItem("Export Data (GDPR)", "GET", "/api/v1/user/me/export", null, true, 200, "User profile and data exported successfully (GDPR)", {
          profile: { _id: "6a685d7b3d6e0376247c628e", name: "Rahul Sharma" },
          uploads: [],
          exportedAt: "2026-08-03T12:00:00.000Z"
        }),
        createApiItem("Delete Account (Soft Delete)", "DELETE", "/api/v1/user/me", { confirmText: "DELETE MY ACCOUNT" }, true, 200, "User account soft-deleted successfully", {
          success: true,
          message: "Account deleted successfully."
        })
      ]
    },
    {
      name: "3. Academic Directory Module",
      item: [
        createApiItem("Get Colleges", "GET", "/api/v1/colleges", null, false, 200, "Colleges list retrieved", {
          items: [{ _id: "col_1", name: "Delhi Technological University (DTU)", shortCode: "DTU" }],
          total: 1,
          page: 1,
          limit: 20
        }),
        createApiItem("Get Courses", "GET", "/api/v1/courses", null, false, 200, "Courses list retrieved", {
          items: [{ _id: "crs_1", name: "B.Tech Computer Science", code: "BTECH-CS" }],
          total: 1,
          page: 1,
          limit: 20
        }),
        createApiItem("Get Semesters", "GET", "/api/v1/semesters", null, false, 200, "Semesters list retrieved", [
          { semesterNumber: 1, name: "Semester 1" },
          { semesterNumber: 2, name: "Semester 2" }
        ]),
        createApiItem("Get Subjects", "GET", "/api/v1/subjects", null, false, 200, "Subjects list retrieved", {
          items: [{ _id: "sub_1", name: "Operating Systems", code: "CS401", credits: 4 }],
          total: 1,
          page: 1,
          limit: 20
        })
      ]
    },
    {
      name: "4. Study Materials Module",
      item: [
        createApiItem("Get All Materials", "GET", "/api/v1/materials", null, false, 200, "Study materials retrieved", {
          items: [{ _id: "mat_1", title: "OS Revision Notes", category: "Notes", fileUrl: "https://storage.studyhub.com/os.pdf" }],
          total: 1,
          page: 1,
          limit: 20
        }),
        createApiItem("Get PYQs", "GET", "/api/v1/pyqs", null, false, 200, "PYQs retrieved successfully", {
          items: [{ _id: "pyq_1", title: "OS 2025 Mid Sem PYQ", category: "PYQ" }]
        }),
        createApiItem("Get Lecture Notes", "GET", "/api/v1/notes", null, false, 200, "Notes retrieved successfully", {
          items: [{ _id: "note_1", title: "Process Scheduling Notes", category: "Notes" }]
        }),
        createApiItem("Get Reference Books", "GET", "/api/v1/books", null, false, 200, "Books retrieved successfully", {
          items: [{ _id: "book_1", title: "Silberschatz OS Concepts 10th Ed", category: "Book" }]
        }),
        createApiItem("Get Video Lectures", "GET", "/api/v1/videos", null, false, 200, "Videos retrieved successfully", {
          items: [{ _id: "vid_1", title: "Deadlock Detection Lecture", category: "Video" }]
        }),
        createApiItem("Get Question Bank", "GET", "/api/v1/question-bank", null, false, 200, "Question Bank retrieved successfully", {
          items: [{ _id: "qb_1", title: "OS MCQ Question Bank", category: "Question Bank" }]
        })
      ]
    },
    {
      name: "5. Tools & Calculators Module",
      item: [
        createApiItem("Get CGPA Records", "GET", "/api/v1/tools/gpa-calculator", null, true, 200, "CGPA records loaded", [
          { id: "cgpa_1", currentCgpa: 8.5, targetCgpa: 9.0 }
        ]),
        createApiItem("Calculate CGPA", "POST", "/api/v1/tools/gpa-calculator", {
          semesters: [{ semester: 1, sgpa: 8.2, credits: 20 }, { semester: 2, sgpa: 8.8, credits: 22 }]
        }, true, 200, "CGPA calculated successfully", { cgpa: 8.51, totalCredits: 42 }),
        createApiItem("Attendance Tracker Summary", "GET", "/api/v1/tools/attendance-tracker", null, true, 200, "Attendance summary loaded", [
          { subjectName: "Operating Systems", attended: 28, total: 32, percentage: 87.5 }
        ]),
        createApiItem("Resume Builder Templates", "GET", "/api/v1/tools/resume-builder", null, true, 200, "Resume Builder tool active", {
          templates: ["ATS Friendly", "Creative", "Minimalist"]
        }),
        createApiItem("Plagiarism Checker", "POST", "/api/v1/tools/plagiarism-checker", { text: "Operating system manages computer hardware." }, true, 200, "Plagiarism analysis completed", {
          similarity: "2%",
          unique: "98%"
        })
      ]
    },
    {
      name: "6. AI Assistant Module",
      item: [
        createApiItem("AI Summarize Text", "POST", "/api/v1/ai/summarize", { content: "Process management involves deadlock prevention..." }, true, 200, "Summary generated", {
          summary: "Operating systems handle process scheduling and deadlock avoidance efficiently."
        }),
        createApiItem("AI Explain Concept", "POST", "/api/v1/ai/explain", { topic: "Virtual Memory" }, true, 200, "Topic explanation generated", {
          explanation: "Virtual memory uses paging to expand physical RAM capacity seamlessly."
        }),
        createApiItem("AI Flashcards", "POST", "/api/v1/ai/flashcards", { topic: "Data Structures" }, true, 200, "Flashcards generated", {
          cards: [{ question: "What is a Binary Search Tree?", answer: "A tree node structure where left child < root < right child." }]
        }),
        createApiItem("AI Quiz Generator", "POST", "/api/v1/ai/quiz", { subject: "DBMS" }, true, 200, "Quiz generated", {
          questions: [{ id: 1, question: "What is BCNF?", options: ["Normal form", "Index type", "Query plan"], answer: "Normal form" }]
        }),
        createApiItem("AI Tutor Chat", "POST", "/api/v1/ai/chat", { prompt: "Explain Mutex vs Semaphore" }, true, 200, "AI answer generated", {
          answer: "A Mutex is a locking mechanism; a Semaphore is a signaling mechanism."
        })
      ]
    },
    {
      name: "7. Favorites & Downloads Module",
      item: [
        createApiItem("Get Bookmarks", "GET", "/api/v1/favorites", null, true, 200, "Bookmarked items fetched", {
          bookmarks: [{ targetType: "Material", targetId: "mat_1" }]
        }),
        createApiItem("Toggle Bookmark", "POST", "/api/v1/favorites/toggle", { targetType: "Material", targetId: "mat_1" }, true, 200, "Favorite toggled successfully", {
          isBookmarked: true
        }),
        createApiItem("Download History", "GET", "/api/v1/downloads", null, true, 200, "User download history loaded", [
          { materialTitle: "OS Revision Notes", downloadedAt: "2026-08-03T10:00:00.000Z" }
        ])
      ]
    },
    {
      name: "8. Dashboard & Notifications",
      item: [
        createApiItem("Student Dashboard Feed", "GET", "/api/v1/dashboard/student", null, true, 200, "Student feed loaded", {
          recentUploads: [],
          stats: { studyHours: 14 }
        }),
        createApiItem("Get Notifications", "GET", "/api/v1/notifications", null, true, 200, "Notifications loaded", [
          { title: "Exam Date Announced", message: "Mid sem starts next week." }
        ])
      ]
    },
    {
      name: "9. Admin Management Module",
      item: [
        createApiItem("Admin System Stats", "GET", "/api/v1/admin/stats", null, true, 200, "System metrics loaded", {
          totalStudents: 12450,
          totalMaterials: 8900,
          serverStatus: "Healthy"
        }),
        createApiItem("Admin Student Directory", "GET", "/api/v1/admin/users", null, true, 200, "Student directory loaded", {
          items: [{ _id: "usr_1", name: "Rahul Sharma", role: "student" }]
        }),
        createApiItem("Admin Material Management", "GET", "/api/v1/admin/materials", null, true, 200, "Material directory loaded", {
          items: [{ _id: "mat_1", title: "OS Notes", status: "approved" }]
        })
      ]
    }
  ]
};

function createApiItem(name, method, urlPath, reqBody = null, requiresAuth = true, statusCode = 200, respMessage = "Success", respData = {}, saveToken = false) {
  const headers = [{ key: "Content-Type", value: "application/json" }];
  if (requiresAuth) {
    headers.push({ key: "Authorization", value: "Bearer {{accessToken}}" });
  }

  const sampleResponseBody = JSON.stringify({
    success: statusCode >= 200 && statusCode < 300,
    statusCode: statusCode,
    message: respMessage,
    data: respData,
    meta: {}
  }, null, 2);

  const testScriptLines = [
    `pm.test("Status code is ${statusCode}", () => pm.response.to.have.status(${statusCode}));`,
    `pm.test("Response has success: true", () => {`,
    `    const json = pm.response.json();`,
    `    pm.expect(json.success).to.be.true;`,
    `    pm.expect(json.statusCode).to.eql(${statusCode});`,
    `});`
  ];

  if (saveToken) {
    testScriptLines.push(
      `const json = pm.response.json();`,
      `if (json.data && json.data.accessToken) {`,
      `    pm.environment.set("accessToken", json.data.accessToken);`,
      `    pm.environment.set("tokenExpiry", Date.now() + 14 * 60 * 1000);`,
      `}`
    );
  }

  return {
    name: name,
    request: {
      method: method,
      header: headers,
      body: reqBody ? { mode: "raw", raw: JSON.stringify(reqBody, null, 2) } : undefined,
      url: {
        raw: `{{baseUrl}}${urlPath}`,
        host: ["{{baseUrl}}"],
        path: urlPath.split("/").filter(Boolean)
      }
    },
    event: [
      {
        listen: "test",
        script: {
          type: "text/javascript",
          exec: testScriptLines
        }
      }
    ],
    response: [
      {
        name: `${statusCode} ${respMessage}`,
        originalRequest: {
          method: method,
          header: headers,
          body: reqBody ? { mode: "raw", raw: JSON.stringify(reqBody, null, 2) } : undefined,
          url: { raw: `{{baseUrl}}${urlPath}`, host: ["{{baseUrl}}"], path: urlPath.split("/").filter(Boolean) }
        },
        status: statusCode === 200 ? "OK" : statusCode === 201 ? "Created" : "OK",
        code: statusCode,
        _postman_previewlanguage: "json",
        header: [{ key: "Content-Type", value: "application/json" }],
        body: sampleResponseBody
      }
    ]
  };
}

// Postman Environment JSON Template
const envJson = {
  id: "e1f2a3b4-c5d6-7890-1234-567890abcdef",
  name: "StudyHub Local Environment",
  values: [
    { key: "baseUrl", value: "http://localhost:5000", enabled: true },
    { key: "accessToken", value: "", enabled: true },
    { key: "refreshToken", value: "", enabled: true },
    { key: "tokenExpiry", value: "", enabled: true }
  ],
  _postman_variable_scope: "environment"
};

// Write files to both d:\studyhubapp\backend and backend/postman/
const rootCollectionPath = path.join(__dirname, "postman_collection.json");
const postmanDir = path.join(__dirname, "postman");
if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
}

fs.writeFileSync(rootCollectionPath, JSON.stringify(collection, null, 2));
fs.writeFileSync(path.join(postmanDir, "collection.json"), JSON.stringify(collection, null, 2));
fs.writeFileSync(path.join(postmanDir, "environment.json"), JSON.stringify(envJson, null, 2));

console.log("✅ Postman Collection JSON created successfully at:");
console.log(`   - ${rootCollectionPath}`);
console.log(`   - ${path.join(postmanDir, "collection.json")}`);
console.log(`   - ${path.join(postmanDir, "environment.json")}`);
