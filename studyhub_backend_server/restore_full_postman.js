const fs = require('fs');

function buildUrl(pathStr) {
  const fullUrl = `http://localhost:5000/api/v1/${pathStr}`;
  const cleanPath = pathStr.split('?')[0];
  const pathParts = ['api', 'v1', ...cleanPath.split('/').filter(Boolean)];
  return {
    raw: fullUrl,
    host: ["{{baseUrl}}"],
    path: cleanPath.split('/').filter(Boolean)
  };
}

function buildReq(name, method, pathStr, bodyObj = null, isAdmin = false) {
  const headers = [];
  if (bodyObj || method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers.push({ key: 'Content-Type', value: 'application/json' });
  }
  const tokenKey = isAdmin ? 'adminToken' : 'token';
  headers.push({ key: 'Authorization', value: `Bearer {{${tokenKey}}}` });

  const reqObj = {
    name: name,
    request: {
      method: method,
      header: headers,
      url: buildUrl(pathStr)
    }
  };

  if (bodyObj && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    reqObj.request.body = {
      mode: 'raw',
      raw: JSON.stringify(bodyObj, null, 2),
      options: { raw: { language: 'json' } }
    };
  }

  return reqObj;
}

const collection = {
  info: {
    _postman_id: "studyhub-complete-app-admin-2026-v3",
    name: "StudyHub Master REST API Suite (App & Admin Full CRUD)",
    description: "Exhaustive Postman Collection containing individual GET, POST, PUT, PATCH, DELETE endpoints for all Mobile App & Admin modules.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000/api/v1", type: "string" },
    { key: "token", value: "student_jwt_token_67890", type: "string" },
    { key: "adminToken", value: "saas_admin_jwt_token_12345", type: "string" }
  ],
  item: [
    {
      name: "1. 📱 Student Authentication",
      item: [
        buildReq("POST Register Student (with Confirm Password)", "POST", "auth/register", { name: "Rahul Sharma", email: "rahul@studyhub.com", password: "Password@123", confirmPassword: "Password@123", phone: "9876543210", college: "Delhi University", course: "B.Tech CS", semester: "Semester 4" }),
        buildReq("POST Login Student (Email & Password)", "POST", "auth/login", { email: "rahul@studyhub.com", password: "Password@123" }),
        buildReq("POST Google Sign-In / Login", "POST", "auth/google-login", { googleIdToken: "sample_google_token", email: "rahul.google@studyhub.com", name: "Rahul Sharma" }),
        buildReq("POST Continue as Guest Mode", "POST", "auth/guest-login", { deviceId: "android_device_12345" }),
        buildReq("POST Logout Student", "POST", "auth/logout"),
        buildReq("POST Forgot Password (Dynamic OTP)", "POST", "auth/forgot-password", { email: "rahul@studyhub.com" }),
        buildReq("POST Resend Dynamic OTP", "POST", "auth/resend-otp", { email: "rahul@studyhub.com" }),
        buildReq("POST Verify Dynamic OTP", "POST", "auth/verify-otp", { email: "rahul@studyhub.com", otp: "123456" }),
        buildReq("POST Reset Password", "POST", "auth/reset-password", { resetToken: "sample_token", newPassword: "NewPass@123" })
      ]
    },
    {
      name: "2. 📱 Dashboard & Home Feed",
      item: [
        buildReq("GET Home Feed (Banners & Quick Access)", "GET", "dashboard/home"),
        buildReq("GET Banners Carousel", "GET", "dashboard/banners"),
        buildReq("GET Continue Reading Progress", "GET", "dashboard/continue-reading"),
        buildReq("POST Update Reading Progress", "POST", "dashboard/update-progress", { materialId: "mat_os_notes_101", lastPage: 14, lastTimeSeconds: 480 }),
        buildReq("GET Global Search (Voice & Camera OCR)", "GET", "dashboard/search?q=operating system&type=all")
      ]
    },
    {
      name: "3. 📱 Academic Catalog & Hierarchy",
      item: [
        buildReq("GET Colleges List", "GET", "colleges?search=Delhi&category=State Univ"),
        buildReq("GET Single College Details", "GET", "colleges/du_dtu"),
        buildReq("GET Step 1: Choose Course", "GET", "courses?collegeId=du_dtu"),
        buildReq("GET Step 2: Select Year", "GET", "courses/btech_cs/years"),
        buildReq("GET Step 3: Select Semester", "GET", "courses/btech_cs/semesters?year=2"),
        buildReq("GET Step 4: Select Subjects", "GET", "subjects?courseId=btech_cs&semester=Sem 4&search=DBMS"),
        buildReq("GET Step 5: Subject Details Screen", "GET", "subjects/subj_dbms_101")
      ]
    },
    {
      name: "4. 📱 Study Content & 6 Cards System",
      item: [
        buildReq("GET Fetch Materials (PYQs, Notes, Books)", "GET", "materials?subjectId=subj_dbms_101&category=pyq&tab=pdf&examType=End Sem"),
        buildReq("GET Single Material Details / Stream", "GET", "materials/mat_dbms_2024_endsem"),
        buildReq("POST Record Material Download Action", "POST", "materials/mat_dbms_2024_endsem/download")
      ]
    },
    {
      name: "5. 📱 CGPA Tools & Attendance Tracker",
      item: [
        buildReq("GET CGPA / SGPA History", "GET", "tools/cgpa"),
        buildReq("POST Calculate & Save CGPA", "POST", "tools/cgpa/calculate", { semester: "Semester 4", subjects: [{ name: "Operating Systems", credits: 4, grade: "A+" }] }),
        buildReq("GET Attendance Tracker Summary", "GET", "tools/attendance"),
        buildReq("POST Add Subject to Attendance Tracker", "POST", "tools/attendance/subject", { subjectName: "Computer Architecture", attended: 22, total: 28, targetPercentage: 75 }),
        buildReq("PATCH Mark Daily Class Attendance", "PATCH", "tools/attendance/mark", { subjectId: "att_subj_101", status: "present" })
      ]
    },
    {
      name: "6. 📱 StudyHub AI Assistant & Snap & Solve",
      item: [
        buildReq("POST StudyHub AI Chat Assistant", "POST", "ai/chat", { prompt: "Explain B-Trees indexing in DBMS with example.", subjectContext: "DBMS" }),
        buildReq("POST Snap & Solve AI Image Solver", "POST", "ai/snap-solve", { imageBase64: "sample_image_base64", note: "Solve step by step" })
      ]
    },
    {
      name: "⚡ 7. ADMIN MODULE: Auth & Security",
      item: [
        buildReq("POST Admin Login", "POST", "admin/login", { email: "admin@studyhub.com", password: "Password@123" }, true),
        buildReq("POST Register New Admin Account", "POST", "admin/register", { name: "Super Admin", email: "admin@studyhub.com", password: "Password@123", phone: "+91 9876543210" }, true),
        buildReq("GET Get Admin Profile Details", "GET", "admin/profile", null, true),
        buildReq("PUT Update Admin Profile Details", "PUT", "admin/profile", { name: "Super Administrator", email: "admin@studyhub.com", phone: "+91 9876543210", role: "Master Super Admin" }, true),
        buildReq("PUT Change Admin Password", "PUT", "admin/change-password", { currentPassword: "Password@123", newPassword: "NewPassword@123" }, true)
      ]
    },
    {
      name: "⚡ 8. ADMIN MODULE: Executive Analytics",
      item: [
        buildReq("GET Get Executive 8 KPI Stats & Charts", "GET", "admin/stats", null, true)
      ]
    },
    {
      name: "⚡ 9. ADMIN MODULE: Academic Colleges CRUD",
      item: [
        buildReq("GET Get All Colleges List", "GET", "admin/colleges", null, true),
        buildReq("POST Add New College", "POST", "admin/colleges", { name: "IIT Delhi (IITD)", university: "Institute of National Importance", city: "New Delhi", state: "Delhi" }, true),
        buildReq("PUT Edit College Details", "PUT", "admin/colleges/col-1", { name: "Delhi University (DU)", university: "Central University", city: "New Delhi", state: "Delhi" }, true),
        buildReq("PATCH Toggle Featured College", "PATCH", "admin/colleges/col-1/featured", null, true),
        buildReq("DELETE Delete College", "DELETE", "admin/colleges/col-1", null, true)
      ]
    },
    {
      name: "⚡ 10. ADMIN MODULE: Courses & Subjects CRUD",
      item: [
        buildReq("GET Get All Degree Courses List", "GET", "admin/courses", null, true),
        buildReq("POST Add New Degree Course", "POST", "admin/courses", { collegeName: "Delhi University (DU)", name: "B.Tech Computer Science (CS)", code: "BT-CS", durationYears: 4 }, true),
        buildReq("DELETE Delete Degree Course", "DELETE", "admin/courses/crs-1", null, true),
        buildReq("GET Get All Subjects Catalog", "GET", "admin/subjects", null, true),
        buildReq("POST Add New Subject to Semester", "POST", "admin/subjects", { name: "Database Management Systems (DBMS)", code: "CS-401", semester: 4, teacherName: "Dr. A.K. Sharma" }, true),
        buildReq("DELETE Delete Subject", "DELETE", "admin/subjects/sbj-1", null, true)
      ]
    },
    {
      name: "⚡ 11. ADMIN MODULE: Materials & Video Upload",
      item: [
        buildReq("GET Get All Materials & Videos", "GET", "admin/materials", null, true),
        buildReq("POST Upload Study Material PDF Document", "POST", "admin/materials", { title: "DBMS 2024 End Sem Solved PYQ Paper.pdf", category: "Previous Papers", uploadType: "PDF", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://studyhub.com/pdf/sample.pdf" }, true),
        buildReq("POST Publish Video Lecture URL", "POST", "admin/materials", { title: "DBMS B-Trees & Indexing Video Lecture 14", category: "Video Lecture", uploadType: "Video", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://youtube.com/watch?v=demo1" }, true),
        buildReq("DELETE Delete Material or Video", "DELETE", "admin/materials/mat-1", null, true)
      ]
    },
    {
      name: "⚡ 12. ADMIN MODULE: Banners & Home Layout",
      item: [
        buildReq("GET Get Promotional Banners List", "GET", "admin/banners", null, true),
        buildReq("POST Add New Promotional Banner", "POST", "admin/banners", { title: "End-Sem Examination Datesheet Released", subtitle: "View complete May 2026 timetable now", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", buttonText: "View Datesheet", redirectRoute: "/notifications" }, true),
        buildReq("PATCH Toggle Banner On/Off Status", "PATCH", "admin/banners/bnr-1/toggle", null, true),
        buildReq("GET Get Home Layout Sections Order", "GET", "admin/home-sections", null, true),
        buildReq("PATCH Toggle Home Layout Section", "PATCH", "admin/home-sections/sec-1/toggle", null, true)
      ]
    },
    {
      name: "⚡ 13. ADMIN MODULE: Push Broadcast & Students",
      item: [
        buildReq("GET Get Broadcast Notice History", "GET", "admin/notifications", null, true),
        buildReq("POST Send Instant FCM Push Broadcast", "POST", "admin/notifications/broadcast", { title: "DU May 2026 End-Sem Examination Datesheet Released", description: "Complete timetable for B.Tech CS Sem 4 end sem exams is now available on feed.", category: "Exams", targetCollege: "Delhi University (DU)" }, true),
        buildReq("GET Get All App Students Directory", "GET", "admin/students", null, true),
        buildReq("PATCH Toggle Block/Unblock Student Account", "PATCH", "admin/students/std-1/block", null, true),
        buildReq("DELETE Delete Student Account", "DELETE", "admin/students/std-1", null, true),
        buildReq("GET Get Student Support & Feedback List", "GET", "admin/feedback", null, true)
      ]
    }
  ]
};

fs.writeFileSync('d:/studyhubapp/backend/postman_collection.json', JSON.stringify(collection, null, 2));
fs.copyFileSync('d:/studyhubapp/backend/postman_collection.json', 'C:/Users/hp/.gemini/antigravity-ide/brain/27126f0f-8db5-45c2-91b0-3b9fb97695ae/postman_collection.json');
console.log('✅ Postman Collection Full CRUD with ALL HTTP Verbs Generated Successfully!');
