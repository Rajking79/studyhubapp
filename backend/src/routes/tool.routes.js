const express = require("express");
const router = express.Router();
const {
  getCgpa,
  calculateCgpa,
  getAttendance,
  addAttendanceSubject,
  markAttendance,
  recalculateAttendance
} = require("../controllers/tool.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/cgpa", verifyJWT, getCgpa);
router.post("/cgpa/calculate", verifyJWT, calculateCgpa);
router.get("/attendance", verifyJWT, getAttendance);
router.post("/attendance/subject", verifyJWT, addAttendanceSubject);
router.patch("/attendance/mark", verifyJWT, markAttendance);
router.post("/attendance/recalculate", verifyJWT, recalculateAttendance);

module.exports = router;
