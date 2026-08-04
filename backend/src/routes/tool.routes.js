const express = require("express");
const router = express.Router();
const toolController = require("../controllers/tool.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/cgpa", toolController.getCGPA);
router.get("/gpa-calculator", toolController.getCGPA);
router.post("/cgpa/calculate", toolController.calculateCGPA);
router.post("/cgpa/save", toolController.saveCGPA);

router.get("/attendance-tracker", toolController.getAttendanceTracker);
router.post("/attendance/subject", toolController.addAttendanceSubject);
router.patch("/attendance/mark", toolController.markAttendance);
router.post("/attendance/log", toolController.logAttendanceHistory);
router.post("/attendance/recalculate", toolController.recalculateAttendanceBunk);

router.get("/resume-builder", toolController.buildResume);
router.post("/resume-builder", toolController.buildResume);

router.get("/plagiarism-checker", toolController.checkPlagiarism);
router.post("/plagiarism-checker", toolController.checkPlagiarism);

module.exports = router;
