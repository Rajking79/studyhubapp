const fs = require('fs');

const liveBaseUrl = "https://studyhub-backend-server.onrender.com/api/v1";

function buildUrl(pathStr) {
  const cleanPath = pathStr.split('?')[0];
  const queryStr = pathStr.includes('?') ? '?' + pathStr.split('?')[1] : '';
  return {
    raw: `${liveBaseUrl}/${pathStr}`,
    host: ["{{baseUrl}}"],
    path: cleanPath.split('/').filter(Boolean)
  };
}

function req(name, method, pathStr, bodyObj = null, isAdmin = false) {
  const headers = [];
  if (bodyObj || method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers.push({ key: 'Content-Type', value: 'application/json' });
  }
  const tokenKey = isAdmin ? 'adminToken' : 'token';
  headers.push({ key: 'Authorization', value: `Bearer {{${tokenKey}}}` });

  const r = {
    name: name,
    request: {
      method: method,
      header: headers,
      url: buildUrl(pathStr)
    }
  };

  if (bodyObj && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    r.request.body = {
      mode: 'raw',
      raw: JSON.stringify(bodyObj, null, 2),
      options: { raw: { language: 'json' } }
    };
  }

  return r;
}

const collection = {
  info: {
    _postman_id: "studyhub-live-render-suite-2026",
    name: "StudyHub Live Production REST API Suite (Render Cloud)",
    description: "Official Live Production Postman Collection pointing directly to Render Cloud deployment: https://studyhub-backend-server.onrender.com/api/v1",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: liveBaseUrl, type: "string" },
    { key: "token", value: "student_jwt_token_67890", type: "string" },
    { key: "adminToken", value: "saas_admin_jwt_token_12345", type: "string" }
  ],
  item: [
    {
      name: "📱 1. StudyHub Mobile App APIs (Live Render Server)",
      item: [
        {
          name: "Authentication & Login",
          item: [
            req("Register Student (with Confirm Password)", "POST", "auth/register", { name: "Rahul Sharma", email: "rahul@studyhub.com", password: "Password@123", confirmPassword: "Password@123", phone: "9876543210", college: "Delhi University", course: "B.Tech CS", semester: "Semester 4" }),
            req("Login Student (Email & Password)", "POST", "auth/login", { email: "rahul@studyhub.com", password: "Password@123" }),
            req("Google Sign-In / Login", "POST", "auth/google-login", { googleIdToken: "sample_google_token", email: "rahul.google@studyhub.com", name: "Rahul Sharma" }),
            req("Continue as Guest Mode", "POST", "auth/guest-login", { deviceId: "android_device_12345" }),
            req("Logout Student", "POST", "auth/logout"),
            req("Forgot Password (Dynamic OTP)", "POST", "auth/forgot-password", { email: "rahul@studyhub.com" }),
            req("Resend Dynamic OTP", "POST", "auth/resend-otp", { email: "rahul@studyhub.com" }),
            req("Verify Dynamic OTP", "POST", "auth/verify-otp", { email: "rahul@studyhub.com", otp: "123456" }),
            req("Reset Password", "POST", "auth/reset-password", { resetToken: "sample_token", newPassword: "NewPass@123" })
          ]
        },
        {
          name: "Dashboard & Home Feed",
          item: [
            req("Get Home Feed (Banners & Quick Access)", "GET", "dashboard/home"),
            req("Get Banners Carousel", "GET", "dashboard/banners"),
            req("Get Continue Reading Progress", "GET", "dashboard/continue-reading"),
            req("Update Reading Progress", "POST", "dashboard/update-progress", { materialId: "mat_os_notes_101", lastPage: 14, lastTimeSeconds: 480 }),
            req("Global Search (Voice & Camera OCR)", "GET", "dashboard/search?q=operating system&type=all")
          ]
        },
        {
          name: "Academic Catalog & Hierarchy",
          item: [
            req("Get Colleges List", "GET", "colleges?search=Delhi&category=State Univ"),
            req("Get Single College Details", "GET", "colleges/du_dtu"),
            req("Step 1: Choose Course", "GET", "courses?collegeId=du_dtu"),
            req("Step 2: Select Year", "GET", "courses/btech_cs/years"),
            req("Step 3: Select Semester", "GET", "courses/btech_cs/semesters?year=2"),
            req("Step 4: Select Subjects", "GET", "subjects?courseId=btech_cs&semester=Sem 4&search=DBMS"),
            req("Step 5: Subject Details Screen", "GET", "subjects/subj_dbms_101")
          ]
        },
        {
          name: "Study Content & 6 Cards System",
          item: [
            req("Fetch Materials (PYQs, Notes, Books)", "GET", "materials?subjectId=subj_dbms_101&category=pyq&tab=pdf&examType=End Sem"),
            req("Get Single Material Details / Stream", "GET", "materials/mat_dbms_2024_endsem"),
            req("Record Material Download Action", "POST", "materials/mat_dbms_2024_endsem/download")
          ]
        },
        {
          name: "CGPA Tools & Attendance Tracker",
          item: [
            req("Get CGPA / SGPA History", "GET", "tools/cgpa"),
            req("Calculate & Save CGPA", "POST", "tools/cgpa/calculate", { semester: "Semester 4", subjects: [{ name: "Operating Systems", credits: 4, grade: "A+" }] }),
            req("Get Attendance Tracker Summary", "GET", "tools/attendance"),
            req("Add Subject to Attendance Tracker", "POST", "tools/attendance/subject", { subjectName: "Computer Architecture", attended: 22, total: 28, targetPercentage: 75 }),
            req("Mark Daily Class Attendance", "PATCH", "tools/attendance/mark", { subjectId: "att_subj_101", status: "present" })
          ]
        },
        {
          name: "StudyHub AI Assistant & Snap & Solve",
          item: [
            req("StudyHub AI Chat Assistant", "POST", "ai/chat", { prompt: "Explain B-Trees indexing in DBMS with example.", subjectContext: "DBMS" }),
            req("Snap & Solve AI Image Solver", "POST", "ai/snap-solve", { imageBase64: "sample_image_base64", note: "Solve step by step" })
          ]
        },
        {
          name: "Offline Downloads & Bookmarks",
          item: [
            req("Get User Downloaded Files List", "GET", "downloads/my-downloads"),
            req("Sync Local Offline Storage Usage", "POST", "downloads/sync-storage", { totalStorageUsedMB: 245.8, downloadedIds: ["mat_os_101"] }),
            req("Toggle Bookmark / Favorite", "POST", "favorites/toggle", { targetType: "material", targetId: "mat_dbms_2024_endsem" }),
            req("Get Bookmarks List", "GET", "favorites")
          ]
        },
        {
          name: "Student Profile & Support",
          item: [
            req("Get Student Profile", "GET", "user/profile"),
            req("Edit Student Profile", "PUT", "user/profile", { name: "Rahul Sharma", phone: "9876543210", college: "Delhi Tech Univ", course: "B.Tech CS", semester: "Semester 5" }),
            req("Submit Student Feedback", "POST", "support/feedback", { type: "suggestion", message: "Please add more PYQs for Semester 5 Computer Networks.", rating: 5 }),
            req("Get All Notifications", "GET", "notifications?category=Exams")
          ]
        }
      ]
    },
    {
      name: "⚡ 2. StudyHub Admin Control Panel APIs (Live Render Server)",
      item: [
        {
          name: "Admin Auth & Profile Security",
          item: [
            req("Admin Login", "POST", "admin/login", { email: "admin@studyhub.com", password: "Password@123" }, true),
            req("Register New Admin Account", "POST", "admin/register", { name: "Super Admin", email: "admin@studyhub.com", password: "Password@123", phone: "+91 9876543210" }, true),
            req("Get Admin Profile Details", "GET", "admin/profile", null, true),
            req("Update Admin Profile Details", "PUT", "admin/profile", { name: "Super Administrator", email: "admin@studyhub.com", phone: "+91 9876543210", role: "Master Super Admin" }, true),
            req("Change Admin Password", "PUT", "admin/change-password", { currentPassword: "Password@123", newPassword: "NewPassword@123" }, true)
          ]
        },
        {
          name: "Executive Analytics & Dashboard",
          item: [
            req("Get Executive 8 KPI Stats & Charts", "GET", "admin/stats", null, true)
          ]
        },
        {
          name: "Academic Colleges Management (CRUD)",
          item: [
            req("Get All Colleges List", "GET", "admin/colleges", null, true),
            req("Add New College", "POST", "admin/colleges", { name: "IIT Delhi (IITD)", university: "Institute of National Importance", city: "New Delhi", state: "Delhi" }, true),
            req("Edit College Details", "PUT", "admin/colleges/col-1", { name: "Delhi University (DU)", university: "Central University", city: "New Delhi", state: "Delhi" }, true),
            req("Toggle Featured College", "PATCH", "admin/colleges/col-1/featured", null, true),
            req("Delete College", "DELETE", "admin/colleges/col-1", null, true)
          ]
        },
        {
          name: "Degree Courses & Subjects Management (CRUD)",
          item: [
            req("Get All Degree Courses List", "GET", "admin/courses", null, true),
            req("Add New Degree Course", "POST", "admin/courses", { collegeName: "Delhi University (DU)", name: "B.Tech Computer Science (CS)", code: "BT-CS", durationYears: 4 }, true),
            req("Delete Degree Course", "DELETE", "admin/courses/crs-1", null, true),
            req("Get All Subjects Catalog", "GET", "admin/subjects", null, true),
            req("Add New Subject to Semester", "POST", "admin/subjects", { name: "Database Management Systems (DBMS)", code: "CS-401", semester: 4, teacherName: "Dr. A.K. Sharma" }, true),
            req("Delete Subject", "DELETE", "admin/subjects/sbj-1", null, true)
          ]
        },
        {
          name: "Materials & Video Upload System",
          item: [
            req("Get All Materials & Videos", "GET", "admin/materials", null, true),
            req("Upload Study Material PDF Document", "POST", "admin/materials", { title: "DBMS 2024 End Sem Solved PYQ Paper.pdf", category: "Previous Papers", uploadType: "PDF", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://studyhub.com/pdf/sample.pdf" }, true),
            req("Publish Video Lecture URL", "POST", "admin/materials", { title: "DBMS B-Trees & Indexing Video Lecture 14", category: "Video Lecture", uploadType: "Video", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://youtube.com/watch?v=demo1" }, true),
            req("Delete Material or Video", "DELETE", "admin/materials/mat-1", null, true)
          ]
        },
        {
          name: "Banners & Home Layout Manager",
          item: [
            req("Get Promotional Banners List", "GET", "admin/banners", null, true),
            req("Add New Promotional Banner", "POST", "admin/banners", { title: "End-Sem Examination Datesheet Released", subtitle: "View complete May 2026 timetable now", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", buttonText: "View Datesheet", redirectRoute: "/notifications" }, true),
            req("Toggle Banner On/Off Status", "PATCH", "admin/banners/bnr-1/toggle", null, true),
            req("Get Home Layout Sections Order", "GET", "admin/home-sections", null, true),
            req("Toggle Home Layout Section", "PATCH", "admin/home-sections/sec-1/toggle", null, true)
          ]
        },
        {
          name: "Push Notification Broadcast",
          item: [
            req("Get Broadcast Notice History", "GET", "admin/notifications", null, true),
            req("Send Instant FCM Push Broadcast", "POST", "admin/notifications/broadcast", { title: "DU May 2026 End-Sem Examination Datesheet Released", description: "Complete timetable for B.Tech CS Sem 4 end sem exams is now available on feed.", category: "Exams", targetCollege: "Delhi University (DU)" }, true)
          ]
        },
        {
          name: "Student Directory & Moderation",
          item: [
            req("Get All App Students Directory", "GET", "admin/students", null, true),
            req("Toggle Block/Unblock Student Account", "PATCH", "admin/students/std-1/block", null, true),
            req("Delete Student Account", "DELETE", "admin/students/std-1", null, true),
            req("Get Student Support & Feedback List", "GET", "admin/feedback", null, true)
          ]
        }
      ]
    }
  ]
};

const jsonContent = JSON.stringify(collection, null, 2);
fs.writeFileSync('d:/studyhubapp/studyhub_backend_server/postman_collection.json', jsonContent);
fs.writeFileSync('d:/studyhubapp/backend/postman_collection.json', jsonContent);
fs.writeFileSync('C:/Users/hp/.gemini/antigravity-ide/brain/27126f0f-8db5-45c2-91b0-3b9fb97695ae/postman_collection.json', jsonContent);

console.log('✅ Postman Collection Updated with Live Render Base URL: https://studyhub-backend-server.onrender.com/api/v1 !');
