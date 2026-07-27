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
  getHomeSections,
  toggleHomeSection,
  getNotifications,
  broadcastNotice,
  getStudents,
  toggleBlockStudent,
  deleteStudent,
  getFeedback
} = require("../controllers/admin.controller");

// Admin Auth & Profile
router.post("/login", adminLogin);
router.post("/register", adminRegister);
router.get("/profile", getAdminProfile);
router.put("/profile", updateAdminProfile);
router.put("/change-password", changeAdminPassword);

// Executive Dashboard & Analytics
router.get("/stats", getDashboardStats);

// Academic Hierarchy (Colleges, Courses, Subjects)
router.get("/colleges", getColleges);
router.post("/colleges", addCollege);
router.put("/colleges/:collegeId", editCollege);
router.patch("/colleges/:collegeId/featured", toggleFeaturedCollege);
router.delete("/colleges/:collegeId", deleteCollege);

router.get("/courses", getCourses);
router.post("/courses", addCourse);
router.delete("/courses/:courseId", deleteCourse);

router.get("/subjects", getSubjects);
router.post("/subjects", addSubject);
router.delete("/subjects/:subjectId", deleteSubject);

// Media & Study Materials (PDFs & Videos)
router.get("/materials", getMaterials);
router.post("/materials", uploadMaterial);
router.delete("/materials/:materialId", deleteMaterial);

// Banners & Home Screen Manager
router.get("/banners", getBanners);
router.post("/banners", addBanner);
router.patch("/banners/:bannerId/toggle", toggleBanner);

router.get("/home-sections", getHomeSections);
router.patch("/home-sections/:sectionId/toggle", toggleHomeSection);

// Notifications Push Broadcast
router.get("/notifications", getNotifications);
router.post("/notifications/broadcast", broadcastNotice);

// Student Users Manager
router.get("/students", getStudents);
router.patch("/students/:studentId/block", toggleBlockStudent);
router.delete("/students/:studentId", deleteStudent);

// Feedback & Support
router.get("/feedback", getFeedback);

module.exports = router;
