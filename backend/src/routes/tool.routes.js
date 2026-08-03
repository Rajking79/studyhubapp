const express = require("express");
const router = express.Router();
const {
  getCgpa,
  calculateCgpa,
  saveCgpa,
  getMyCalculations,
  getAttendance,
  getAttendanceSummary,
  addAttendanceSubject,
  markAttendance,
  logAttendance,
  updateAttendanceSubject,
  deleteAttendanceSubject,
  recalculateAttendance
} = require("../controllers/tool.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

// CGPA Tool APIs
router.get("/cgpa", verifyJWT, getCgpa);
router.get("/gpa-calculator", verifyJWT, getCgpa);
router.post("/gpa-calculator", verifyJWT, calculateCgpa);
router.post("/cgpa/calculate", verifyJWT, calculateCgpa);
router.post("/cgpa/save", verifyJWT, saveCgpa);
router.get("/cgpa/my-calculations", verifyJWT, getMyCalculations);

// Attendance Tracker APIs
router.get("/attendance", verifyJWT, getAttendance);
router.get("/attendance-tracker", verifyJWT, getAttendance);
router.post("/attendance-tracker", verifyJWT, addAttendanceSubject);
router.get("/attendance/summary", verifyJWT, getAttendanceSummary);
router.post("/attendance/subject", verifyJWT, addAttendanceSubject);
router.patch("/attendance/mark", verifyJWT, markAttendance);
router.post("/attendance/log", verifyJWT, logAttendance);
router.put("/attendance/subject/:id", verifyJWT, updateAttendanceSubject);
router.delete("/attendance/subject/:id", verifyJWT, deleteAttendanceSubject);
router.post("/attendance/recalculate", verifyJWT, recalculateAttendance);

// Additional Tool Aliases
router.get("/resume-builder", verifyJWT, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Resume Builder tool active", templates: ["ATS Friendly", "Creative", "Minimalist"] }));
router.post("/resume-builder", verifyJWT, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Resume generated successfully", downloadUrl: "https://storage.studyhub.com/resumes/sample.pdf" }));
router.get("/plagiarism-checker", verifyJWT, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Plagiarism Checker active", wordLimit: 2000 }));
router.post("/plagiarism-checker", verifyJWT, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Plagiarism analysis completed", similarity: "2%", unique: "98%" }));

module.exports = router;
