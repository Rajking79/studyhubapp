const express = require("express");
const router = express.Router();
const toolController = require("../controllers/tool.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/cgpa", toolController.getCgpa);
router.get("/gpa-calculator", toolController.getCgpa);
router.post("/gpa-calculator", toolController.calculateCgpa);
router.post("/cgpa/calculate", toolController.calculateCgpa);
router.post("/cgpa/save", toolController.saveCgpa);
router.get("/cgpa/my-calculations", toolController.getCgpa);

router.get("/attendance", toolController.getAttendance);
router.get("/attendance-tracker", toolController.getAttendance);
router.post("/attendance-tracker", toolController.addAttendanceSubject);
router.get("/attendance/summary", toolController.getAttendance);
router.post("/attendance/subject", toolController.addAttendanceSubject);
router.patch("/attendance/mark", toolController.markAttendance);
router.post("/attendance/log", toolController.logAttendance);
router.post("/attendance/recalculate", toolController.recalculateAttendance);

router.get("/resume-builder", toolController.handleResumeBuilder);
router.post("/resume-builder", toolController.handleResumeBuilder);
router.get("/plagiarism-checker", toolController.handlePlagiarismChecker);
router.post("/plagiarism-checker", toolController.handlePlagiarismChecker);

module.exports = router;
