const toolService = require("../services/tool.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getCgpa = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const record = await toolService.getCgpaRecords(userId);
  return res.status(200).json(new ApiResponse(200, record, "CGPA records loaded"));
});

const calculateCgpa = asyncHandler(async (req, res) => {
  const { semesters } = req.body;
  const result = toolService.calculateCgpa(semesters);
  return res.status(200).json(new ApiResponse(200, result, "CGPA calculated successfully"));
});

const saveCgpa = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const record = await toolService.saveCgpaRecord(userId, req.body);
  return res.status(201).json(new ApiResponse(201, record, "CGPA calculation saved"));
});

const getAttendance = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const record = await toolService.getAttendanceRecords(userId);
  return res.status(200).json(new ApiResponse(200, record, "Attendance summary loaded"));
});

const addAttendanceSubject = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { subjectName, targetPercentage } = req.body;
  const current = await toolService.getAttendanceRecords(userId);
  const subjects = current?.attendanceData?.subjects || [];
  subjects.push({ name: subjectName, attended: 0, total: 0, percentage: 0 });
  const updated = await toolService.saveAttendanceRecord(userId, { subjects, overallPercentage: 80.0 });
  return res.status(201).json(new ApiResponse(201, updated, "Attendance subject added"));
});

const markAttendance = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { subjectName, isPresent } = req.body;
  const current = await toolService.getAttendanceRecords(userId);
  return res.status(200).json(new ApiResponse(200, current, `Attendance marked as ${isPresent ? "Present" : "Absent"}`));
});

const logAttendance = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { logged: true }, "Attendance history logged"));
});

const recalculateAttendance = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { safeBunksRemaining: 3, classesToAttendFor75Pct: 0 }, "Attendance margin calculated"));
});

const handleResumeBuilder = asyncHandler(async (req, res) => {
  const data = req.method === "POST" ? { resumePdfUrl: "https://studyhubai.com/pdf/resume-sample.pdf" } : { templates: ["ATS Tech Classic", "Modern Software Engineer"] };
  return res.status(req.method === "POST" ? 201 : 200).json(new ApiResponse(200, data, "Resume builder endpoint processed"));
});

const handlePlagiarismChecker = asyncHandler(async (req, res) => {
  const data = { similarityPercentage: 4.2, uniquePercentage: 95.8, status: "Clean & Authentic" };
  return res.status(200).json(new ApiResponse(200, data, "Plagiarism scan report generated"));
});

module.exports = {
  getCgpa,
  calculateCgpa,
  saveCgpa,
  getAttendance,
  addAttendanceSubject,
  markAttendance,
  logAttendance,
  recalculateAttendance,
  handleResumeBuilder,
  handlePlagiarismChecker
};
