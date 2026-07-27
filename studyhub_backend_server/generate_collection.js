const fs = require('fs');

function buildUrl(pathStr) {
  const fullUrl = `http://localhost:5000/api/v1/${pathStr}`;
  const cleanPath = pathStr.split('?')[0];
  const pathParts = ['api', 'v1', ...cleanPath.split('/').filter(Boolean)];
  
  return {
    raw: fullUrl,
    protocol: 'http',
    host: ['localhost'],
    port: '5000',
    path: pathParts
  };
}

function buildRequest(name, method, pathStr, bodyObj = null, isAuth = false) {
  const headers = [];
  if (bodyObj || method === 'POST' || method === 'PUT' || method === 'PATCH') {
    headers.push({ key: 'Content-Type', value: 'application/json' });
  }
  if (isAuth) {
    headers.push({ key: 'Authorization', value: 'Bearer {{adminToken}}' });
  }

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
      options: {
        raw: {
          language: 'json'
        }
      }
    };
  }

  return reqObj;
}

const collection = {
  info: {
    _postman_id: "studyhub-master-suite-v2026",
    name: "StudyHub Master REST API Suite 2026",
    description: "Exhaustive collection containing all Mobile App & Admin Control Panel endpoints with full JSON request bodies.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000/api/v1", type: "string" },
    { key: "adminToken", value: "saas_admin_jwt_token_12345", type: "string" },
    { key: "userToken", value: "student_jwt_token_67890", type: "string" }
  ],
  item: [
    {
      name: "1. 🔐 Admin Authentication & Security",
      item: [
        buildRequest("Admin Login", "POST", "admin/login", { email: "admin@studyhub.com", password: "Password@123" }),
        buildRequest("Register New Admin", "POST", "admin/register", { name: "Super Admin", email: "admin@studyhub.com", password: "Password@123", phone: "+91 9876543210" }),
        buildRequest("Get Admin Profile", "GET", "admin/profile", null, true),
        buildRequest("Update Admin Profile", "PUT", "admin/profile", { name: "Super Administrator", email: "admin@studyhub.com", phone: "+91 9876543210", role: "Master Super Admin" }, true),
        buildRequest("Change Admin Password", "PUT", "admin/change-password", { currentPassword: "Password@123", newPassword: "NewPassword@123" }, true)
      ]
    },
    {
      name: "2. 📊 Executive Dashboard & Real-Time Analytics",
      item: [
        buildRequest("Get Executive 8 KPI Stats & Charts", "GET", "admin/stats", null, true)
      ]
    },
    {
      name: "3. 🏛️ Academic Hierarchy (Colleges, Courses, Subjects)",
      item: [
        buildRequest("Get All Colleges List", "GET", "admin/colleges"),
        buildRequest("Add New College", "POST", "admin/colleges", { name: "Indian Institute of Technology Delhi (IITD)", university: "Institute of National Importance", city: "New Delhi", state: "Delhi", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&q=80" }, true),
        buildRequest("Edit College Details", "PUT", "admin/colleges/col-1", { name: "Delhi University (DU)", university: "Central University", city: "New Delhi", state: "Delhi" }, true),
        buildRequest("Toggle Featured College Status", "PATCH", "admin/colleges/col-1/featured", null, true),
        buildRequest("Delete College", "DELETE", "admin/colleges/col-1", null, true),
        buildRequest("Get All Degree Courses", "GET", "admin/courses"),
        buildRequest("Add New Degree Course", "POST", "admin/courses", { collegeName: "Delhi University (DU)", name: "B.Tech Computer Science (CS)", code: "BT-CS", durationYears: 4 }, true),
        buildRequest("Delete Course", "DELETE", "admin/courses/crs-1", null, true),
        buildRequest("Get All Subjects Catalog", "GET", "admin/subjects"),
        buildRequest("Add New Subject to Semester", "POST", "admin/subjects", { name: "Database Management Systems (DBMS)", code: "CS-401", semester: 4, teacherName: "Dr. A.K. Sharma" }, true),
        buildRequest("Delete Subject", "DELETE", "admin/subjects/sbj-1", null, true)
      ]
    },
    {
      name: "4. 📁 Media & Study Materials (PDFs & Videos)",
      item: [
        buildRequest("Get All PDFs & Videos List", "GET", "admin/materials"),
        buildRequest("Upload Study Material (PDF Document)", "POST", "admin/materials", { title: "DBMS 2024 End Sem Solved PYQ Paper.pdf", category: "Previous Papers", uploadType: "PDF", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://studyhub.com/pdf/sample.pdf" }, true),
        buildRequest("Publish Video Lecture URL", "POST", "admin/materials", { title: "DBMS B-Trees & Indexing Video Lecture 14", category: "Video Lecture", uploadType: "Video", subjectName: "DBMS", collegeName: "Delhi University (DU)", courseName: "B.Tech CS", semester: 4, pdfUrl: "https://youtube.com/watch?v=demo1" }, true),
        buildRequest("Delete Study Material / Video", "DELETE", "admin/materials/mat-1", null, true)
      ]
    },
    {
      name: "5. 🖼️ Banners & Home Layout Manager",
      item: [
        buildRequest("Get Promotional Banners List", "GET", "admin/banners"),
        buildRequest("Add New Promotional Banner", "POST", "admin/banners", { title: "End-Sem Examination Datesheet Released", subtitle: "View complete May 2026 timetable now", imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", buttonText: "View Datesheet", redirectRoute: "/notifications" }, true),
        buildRequest("Toggle Banner On/Off", "PATCH", "admin/banners/bnr-1/toggle", null, true),
        buildRequest("Get Home Layout Sections", "GET", "admin/home-sections"),
        buildRequest("Toggle Home Layout Section", "PATCH", "admin/home-sections/sec-1/toggle", null, true)
      ]
    },
    {
      name: "6. 🔔 Push Notification Broadcast",
      item: [
        buildRequest("Get Broadcast History", "GET", "admin/notifications", null, true),
        buildRequest("Send Instant FCM Push Notification", "POST", "admin/notifications/broadcast", { title: "DU May 2026 End-Sem Examination Datesheet Released", description: "Complete timetable for B.Tech CS Sem 4 end sem exams is now available on feed.", category: "Exams", targetCollege: "Delhi University (DU)" }, true)
      ]
    },
    {
      name: "7. 👥 Student Users Directory & Moderation",
      item: [
        buildRequest("Get All App Students Directory", "GET", "admin/students", null, true),
        buildRequest("Toggle Block/Unblock Student Account", "PATCH", "admin/students/std-1/block", null, true),
        buildRequest("Delete Student Account", "DELETE", "admin/students/std-1", null, true),
        buildRequest("Get Student Support & Feedback List", "GET", "admin/feedback", null, true)
      ]
    },
    {
      name: "8. 📱 Mobile App Student APIs",
      item: [
        buildRequest("Student Register (with Confirm Password)", "POST", "auth/register", { name: "Rahul Sharma", email: "rahul@studyhub.com", password: "Password@123", confirmPassword: "Password@123", phone: "9876543210", college: "Delhi University", course: "B.Tech CS", semester: "Semester 4" }),
        buildRequest("Student Login (Email & Password)", "POST", "auth/login", { email: "rahul@studyhub.com", password: "Password@123" }),
        buildRequest("Student Google Sign-In", "POST", "auth/google-login", { googleIdToken: "sample_google_token", email: "rahul.google@studyhub.com", name: "Rahul Sharma" }),
        buildRequest("Continue as Guest Mode", "POST", "auth/guest-login", { deviceId: "android_device_unique_12345" }),
        buildRequest("Get Home Feed (Banners, Continue Reading)", "GET", "dashboard/home"),
        buildRequest("StudyHub AI Chat Assistant", "POST", "ai/chat", { prompt: "Explain B-Trees indexing in DBMS with example.", subjectContext: "DBMS" }),
        buildRequest("Snap & Solve AI Image Solver", "POST", "ai/snap-solve", { imageBase64: "sample_base64_image", note: "Solve integral step by step" }),
        buildRequest("Get CGPA Calculator Rules", "GET", "tools/cgpa"),
        buildRequest("Get Attendance Tracker Summary", "GET", "tools/attendance"),
        buildRequest("Submit Student Feedback", "POST", "support/feedback", { type: "suggestion", message: "Please add more PYQs for Semester 5 Computer Networks.", rating: 5 })
      ]
    }
  ]
};

fs.writeFileSync('d:/studyhubapp/backend/postman_collection.json', JSON.stringify(collection, null, 2));
fs.copyFileSync('d:/studyhubapp/backend/postman_collection.json', 'C:/Users/hp/.gemini/antigravity-ide/brain/27126f0f-8db5-45c2-91b0-3b9fb97695ae/postman_collection.json');
console.log('✅ Postman v2.1 Schema Compliant Master Collection JSON 2026 written successfully!');
