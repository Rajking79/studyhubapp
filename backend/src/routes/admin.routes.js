const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authenticate, verifyAdmin } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");

router.post("/login", authRateLimiter, adminController.getProfile);
router.post("/register", authenticate, verifyAdmin, adminController.getProfile);

router.get("/stats", authenticate, verifyAdmin, adminController.getStats);
router.get("/health", authenticate, verifyAdmin, adminController.getHealth);
router.get("/audit-logs", authenticate, verifyAdmin, adminController.getAuditLogs);
router.get("/profile", authenticate, verifyAdmin, adminController.getProfile);
router.put("/profile", authenticate, verifyAdmin, adminController.updateProfile);
router.put("/change-password", authenticate, verifyAdmin, adminController.changePassword);

router.get("/colleges", authenticate, verifyAdmin, adminController.getColleges);
router.post("/colleges", authenticate, verifyAdmin, adminController.addCollege);
router.get("/courses", authenticate, verifyAdmin, adminController.getCourses);
router.post("/courses", authenticate, verifyAdmin, adminController.addCourse);
router.get("/subjects", authenticate, verifyAdmin, adminController.getSubjects);
router.post("/subjects", authenticate, verifyAdmin, adminController.addSubject);
router.get("/materials", authenticate, verifyAdmin, adminController.getMaterials);
router.post("/materials", authenticate, verifyAdmin, adminController.uploadMaterial);

router.get("/users", authenticate, verifyAdmin, adminController.getUsers);
router.post("/notifications/send", authenticate, verifyAdmin, adminController.sendNotification);

router.get("/banners", authenticate, verifyAdmin, adminController.getBanners);
router.post("/banners", authenticate, verifyAdmin, adminController.addBanner);
router.get("/referrals", authenticate, verifyAdmin, adminController.getReferrals);
router.get("/feedbacks", authenticate, verifyAdmin, adminController.getFeedbacks);

module.exports = router;
