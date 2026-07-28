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
  deleteCourse,
  getSubjects,
  addSubject,
  deleteSubject,
  getMaterials,
  uploadMaterial,
  deleteMaterial,
  getBanners,
  addBanner,
  toggleBanner,
  getStudents,
  toggleBlockStudent,
  deleteStudent,
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

// Admin Profile & Executive Analytics
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);
router.put("/change-password", changeAdminPassword);
router.get("/stats", getDashboardStats);

// Academic Hierarchy Management
router.get("/colleges", getColleges);
router.post("/colleges", validateCollege, addCollege);
router.put("/colleges/:collegeId", validateCollege, editCollege);
router.patch("/colleges/:collegeId/featured", toggleFeaturedCollege);
router.delete("/colleges/:collegeId", deleteCollege);

router.get("/courses", getCourses);
router.post("/courses", validateCourse, addCourse);
router.delete("/courses/:courseId", deleteCourse);

router.get("/subjects", getSubjects);
router.post("/subjects", validateSubject, addSubject);
router.delete("/subjects/:subjectId", deleteSubject);

// Media & Materials Management
router.get("/materials", getMaterials);
router.post("/materials", uploadMaterial);
router.delete("/materials/:materialId", deleteMaterial);

// Banners Manager
router.get("/banners", getBanners);
router.post("/banners", validateBanner, addBanner);
router.patch("/banners/:bannerId/toggle", toggleBanner);

// Notifications Broadcast
router.post("/notifications/broadcast", validateBroadcastNotice, broadcastNotice);

// Student Users Manager
router.get("/students", getStudents);
router.patch("/students/:studentId/block", toggleBlockStudent);
router.delete("/students/:studentId", deleteStudent);

// Referrals Analytics & Leaderboard
router.get("/referrals", getReferrals);

// Feedback & Support
router.get("/feedback", getFeedback);

module.exports = router;
