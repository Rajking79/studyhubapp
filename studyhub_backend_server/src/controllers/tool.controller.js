const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getCgpa = asyncHandler(async (req, res) => {
  const cgpaHistory = [
    { semester: "Semester 1", sgpa: 8.5 },
    { semester: "Semester 2", sgpa: 8.8 },
    { semester: "Semester 3", sgpa: 9.1 },
    { semester: "Semester 4", sgpa: 9.25 }
  ];
  return res.status(200).json(new ApiResponse(200, { cgpaHistory, overallCgpa: 8.91 }, "CGPA data fetched"));
});

const calculateCgpa = asyncHandler(async (req, res) => {
  const { semester, subjects } = req.body;
  return res.status(200).json(new ApiResponse(200, { semester, sgpa: 9.25, overallCgpa: 8.95 }, "CGPA calculated & saved"));
});

const getAttendance = asyncHandler(async (req, res) => {
  const attendanceList = [
    { id: "att_1", subjectName: "Operating Systems", attended: 26, total: 30, percentage: 86.6, safeBunks: 4 },
    { id: "att_2", subjectName: "DBMS", attended: 22, total: 28, percentage: 78.5, safeBunks: 1 },
    { id: "att_3", subjectName: "Computer Networks", attended: 18, total: 26, percentage: 69.2, safeBunks: 0, requiredClasses: 4 }
  ];
  return res.status(200).json(new ApiResponse(200, attendanceList, "Attendance log fetched"));
});

const addAttendanceSubject = asyncHandler(async (req, res) => {
  const { subjectName, attended, total, targetPercentage } = req.body;
  const newSubject = {
    id: "att_" + Date.now(),
    subjectName: subjectName || "New Subject",
    attended: attended || 0,
    total: total || 0,
    percentage: total > 0 ? (attended / total) * 100 : 0,
    safeBunks: 2
  };
  return res.status(201).json(new ApiResponse(201, newSubject, "Subject added to attendance tracker"));
});

const markAttendance = asyncHandler(async (req, res) => {
  const { subjectId, status } = req.body;
  return res.status(200).json(new ApiResponse(200, { subjectId, status, newAttended: 27, newTotal: 31 }, "Attendance marked"));
});

const recalculateAttendance = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { safeBunks: 3, classesNeeded: 0 }, "Attendance recalculated"));
});

module.exports = {
  getCgpa,
  calculateCgpa,
  getAttendance,
  addAttendanceSubject,
  markAttendance,
  recalculateAttendance
};
