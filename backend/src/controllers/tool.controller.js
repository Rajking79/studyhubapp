const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ToolService = require("../services/tool.service");

const getCgpa = asyncHandler(async (req, res) => {
  const records = await ToolService.getCgpaRecords(req.user._id);
  return res.status(200).json(new ApiResponse(200, { records }, "CGPA data fetched from database"));
});

const calculateCgpa = asyncHandler(async (req, res) => {
  const { semester, subjects, gradingSystem, semesters } = req.body;
  const record = await ToolService.calculateCgpa(req.user._id, { semester, subjects: subjects || semesters || [] });
  return res.status(200).json(new ApiResponse(200, record, "CGPA calculated successfully"));
});

const saveCgpa = asyncHandler(async (req, res) => {
  const record = await ToolService.saveCgpaRecord(req.user._id, req.body);
  return res.status(201).json(new ApiResponse(201, record, "CGPA calculation saved to database"));
});

const getMyCalculations = asyncHandler(async (req, res) => {
  const records = await ToolService.getCgpaRecords(req.user._id);
  return res.status(200).json(new ApiResponse(200, records, "Saved CGPA calculations retrieved from database"));
});

const getAttendance = asyncHandler(async (req, res) => {
  const records = await ToolService.getAttendanceRecords(req.user._id);
  return res.status(200).json(new ApiResponse(200, records, "Attendance records fetched from database"));
});

const getAttendanceSummary = asyncHandler(async (req, res) => {
  const summary = await ToolService.getAttendanceSummary(req.user._id);
  return res.status(200).json(new ApiResponse(200, summary, "Attendance summary & 75% minimum criteria alerts fetched"));
});

const addAttendanceSubject = asyncHandler(async (req, res) => {
  const { subjectName, attended, total, targetPercentage, attendedClasses, totalClasses } = req.body;
  const record = await ToolService.addAttendanceSubject(req.user._id, {
    subjectName,
    attended: Number(attended || attendedClasses || 0),
    total: Number(total || totalClasses || 0),
    targetPercentage: Number(targetPercentage || 75)
  });
  return res.status(201).json(new ApiResponse(201, record, "Subject added to attendance tracker"));
});

const markAttendance = asyncHandler(async (req, res) => {
  const { subjectId, status } = req.body;
  const updated = await ToolService.markAttendance(req.user._id, subjectId, status);
  return res.status(200).json(new ApiResponse(200, updated || { subjectId, status }, "Attendance marked"));
});

const logAttendance = asyncHandler(async (req, res) => {
  const { subjectId, status, date } = req.body;
  const updated = await ToolService.markAttendance(req.user._id, subjectId, status);
  return res.status(200).json(new ApiResponse(200, updated || { subjectId, status, date }, "Attendance logged successfully"));
});

const updateAttendanceSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;
  const updated = await ToolService.updateAttendanceSubject(req.user._id, subjectId, req.body);
  return res.status(200).json(new ApiResponse(200, updated, "Attendance target/subject updated successfully"));
});

const deleteAttendanceSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;
  await ToolService.deleteAttendanceSubject(req.user._id, subjectId);
  return res.status(200).json(new ApiResponse(200, { deletedId: subjectId }, "Attendance subject deleted successfully"));
});

const recalculateAttendance = asyncHandler(async (req, res) => {
  const records = await ToolService.getAttendanceRecords(req.user._id);
  return res.status(200).json(new ApiResponse(200, { recordsCount: records.length }, "Attendance recalculated successfully"));
});

module.exports = {
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
};
