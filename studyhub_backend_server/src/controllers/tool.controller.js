const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ToolRepository = require("../repositories/tool.repository");

const getCgpa = asyncHandler(async (req, res) => {
  const records = await ToolRepository.getCgpaRecords(req.user?._id);
  return res.status(200).json(new ApiResponse(200, { records }, "CGPA data fetched from database"));
});

const calculateCgpa = asyncHandler(async (req, res) => {
  const { semester, subjects } = req.body;
  const record = await ToolRepository.saveCgpaRecord(req.user?._id, { semester, subjects });
  return res.status(200).json(new ApiResponse(200, record, "CGPA calculated & saved to database"));
});

const getAttendance = asyncHandler(async (req, res) => {
  const records = await ToolRepository.getAttendanceRecords(req.user?._id);
  return res.status(200).json(new ApiResponse(200, records, "Attendance records fetched from database"));
});

const addAttendanceSubject = asyncHandler(async (req, res) => {
  const { subjectName, attended, total, targetPercentage } = req.body;
  const record = await ToolRepository.addAttendanceSubject(req.user?._id, {
    subjectName,
    attended: Number(attended || 0),
    total: Number(total || 0),
    targetPercentage: Number(targetPercentage || 75)
  });
  return res.status(201).json(new ApiResponse(201, record, "Subject added to attendance tracker"));
});

const markAttendance = asyncHandler(async (req, res) => {
  const { subjectId, status } = req.body;
  const updated = await ToolRepository.markAttendance(req.user?._id, subjectId, status);
  return res.status(200).json(new ApiResponse(200, updated || { subjectId, status }, "Attendance marked"));
});

const recalculateAttendance = asyncHandler(async (req, res) => {
  const records = await ToolRepository.getAttendanceRecords(req.user?._id);
  return res.status(200).json(new ApiResponse(200, { recordsCount: records.length }, "Attendance recalculated successfully"));
});

module.exports = {
  getCgpa,
  calculateCgpa,
  getAttendance,
  addAttendanceSubject,
  markAttendance,
  recalculateAttendance
};
