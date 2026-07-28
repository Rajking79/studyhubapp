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
router.post("/cgpa/calculate", verifyJWT, calculateCgpa);
router.post("/cgpa/save", verifyJWT, saveCgpa);
router.get("/cgpa/my-calculations", verifyJWT, getMyCalculations);

// Attendance Tracker APIs
router.get("/attendance", verifyJWT, getAttendance);
router.get("/attendance/summary", verifyJWT, getAttendanceSummary);
router.post("/attendance/subject", verifyJWT, addAttendanceSubject);
router.patch("/attendance/mark", verifyJWT, markAttendance);
router.post("/attendance/log", verifyJWT, logAttendance);
router.put("/attendance/subject/:id", verifyJWT, updateAttendanceSubject);
router.delete("/attendance/subject/:id", verifyJWT, deleteAttendanceSubject);
router.post("/attendance/recalculate", verifyJWT, recalculateAttendance);

module.exports = router;
