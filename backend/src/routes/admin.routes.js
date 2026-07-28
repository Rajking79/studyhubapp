const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminRegister,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getDashboardStats,
  getColleges,
  addCollege,
  editCollege,
  toggleFeaturedCollege,
  deleteCollege,
  getCourses,
  addCourse,
  editCourse,
  deleteCourse,
  getSubjects,
  addSubject,
  editSubject,
  deleteSubject,
  getMaterials,
  uploadMaterial,
  editMaterial,
  deleteMaterial,
  getBanners,
  addBanner,
  editBanner,
  toggleBanner,
  deleteBanner,
  getStudents,
  toggleBlockStudent,
  deleteStudent,
  getHealthCheck,
  getActivityLogs,
  getReferrals,
  broadcastNotice,
  getFeedback
} = require("../controllers/admin.controller");

const { authenticate, verifyAdmin } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");
const { validateCollege, validateCourse, validateSubject } = require("../validators/academic.validator");
const { validateBanner, validateBroadcastNotice } = require("../validators/admin.validator");

// Public Admin Auth Routes
router.post("/login", authRateLimiter, adminLogin);
router.post("/register", authRateLimiter, adminRegister);

// All subsequent Admin endpoints REQUIRE Admin JWT Authentication & Role Authorization!
router.use(authenticate);
router.use(verifyAdmin);

// Executive Dashboard Stats, Activity Logs & System Health
router.get("/stats", getDashboardStats);
router.get("/health", getHealthCheck);
router.get("/activity-logs", getActivityLogs);
router.get("/audit-logs", getActivityLogs);

// Admin Profile
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);
router.put("/change-password", changeAdminPassword);

// Academic Hierarchy Management (Colleges)
router.get("/colleges", getColleges);
router.post("/colleges", validateCollege, addCollege);
router.put("/colleges/:collegeId", validateCollege, editCollege);
router.put("/colleges/:id", validateCollege, editCollege);
router.patch("/colleges/:collegeId/featured", toggleFeaturedCollege);
router.delete("/colleges/:collegeId", deleteCollege);
router.delete("/colleges/:id", deleteCollege);

// Academic Hierarchy Management (Courses)
router.get("/courses", getCourses);
router.post("/courses", validateCourse, addCourse);
router.put("/courses/:courseId", validateCourse, editCourse);
router.put("/courses/:id", validateCourse, editCourse);
router.delete("/courses/:courseId", deleteCourse);
router.delete("/courses/:id", deleteCourse);

// Academic Hierarchy Management (Subjects)
router.get("/subjects", getSubjects);
router.post("/subjects", validateSubject, addSubject);
router.put("/subjects/:subjectId", validateSubject, editSubject);
router.put("/subjects/:id", validateSubject, editSubject);
router.delete("/subjects/:subjectId", deleteSubject);
router.delete("/subjects/:id", deleteSubject);

// Media & Materials Management
router.get("/materials", getMaterials);
router.post("/materials", uploadMaterial);
router.put("/materials/:materialId", editMaterial);
router.put("/materials/:id", editMaterial);
router.delete("/materials/:materialId", deleteMaterial);
router.delete("/materials/:id", deleteMaterial);

// Student Users Manager
router.get("/users", getStudents);
router.get("/students", getStudents);
router.patch("/users/:id", toggleBlockStudent);
router.patch("/users/:id/block", toggleBlockStudent);
router.patch("/users/:id/unblock", toggleBlockStudent);
router.patch("/students/:studentId/block", toggleBlockStudent);
router.delete("/users/:id", deleteStudent);
router.delete("/students/:studentId", deleteStudent);

// Notifications Broadcast
router.post("/notifications/send", validateBroadcastNotice, broadcastNotice);
router.post("/notifications/broadcast", validateBroadcastNotice, broadcastNotice);

// Banners Manager
router.get("/banners", getBanners);
router.post("/banners", validateBanner, addBanner);
router.put("/banners/:bannerId", editBanner);
router.put("/banners/:id", editBanner);
router.patch("/banners/:bannerId/toggle", toggleBanner);
router.delete("/banners/:bannerId", deleteBanner);
router.delete("/banners/:id", deleteBanner);

// Referrals Analytics & Leaderboard
router.get("/referrals", getReferrals);

// Feedback & Support
router.get("/feedbacks", getFeedback);
router.get("/feedback", getFeedback);

module.exports = router;
