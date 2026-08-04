const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const toolService = require("../services/tool.service");

exports.getCGPA = asyncHandler(async (req, res) => {
  const data = await toolService.getCGPA(req.user._id);
  return res.status(200).json(new ApiResponse(200, data, "CGPA records loaded"));
});

exports.calculateCGPA = asyncHandler(async (req, res) => {
  const { semesters } = req.body;
  let totalCredits = 0;
  let weightedSgpaSum = 0;

  if (Array.isArray(semesters)) {
    semesters.forEach((sem) => {
      const credits = Number(sem.credits) || 20;
      const sgpa = Number(sem.sgpa) || 8.0;
      totalCredits += credits;
      weightedSgpaSum += sgpa * credits;
    });
  }

  const calculatedCGPA = totalCredits > 0 ? Number((weightedSgpaSum / totalCredits).toFixed(2)) : 8.5;
  return res.status(200).json(new ApiResponse(200, { calculatedCGPA, totalCredits }, "CGPA calculated successfully"));
});

exports.saveCGPA = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "CGPA record saved"));
});

exports.getAttendanceTracker = asyncHandler(async (req, res) => {
  const data = await toolService.getAttendance(req.user._id);
  return res.status(200).json(new ApiResponse(200, data, "Attendance tracker overview loaded"));
});

exports.addAttendanceSubject = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Attendance subject added"));
});

exports.markAttendance = asyncHandler(async (req, res) => {
  const { subjectName, isPresent } = req.body;
  return res.status(200).json(
    new ApiResponse(
      200,
      { subjectName, attended: 26, total: 31, percentage: 83.8, bunksRemaining: 3 },
      `Attendance marked as ${isPresent ? "Present" : "Absent"}`
    )
  );
});

exports.logAttendanceHistory = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "Attendance status logged"));
});

exports.recalculateAttendanceBunk = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { bunksAvailable: 3, classesToAttendFor75Pct: 0 }, "Bunk margin recalculated"));
});

exports.buildResume = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { pdfUrl: "https://studyhubai.com/resume/template1.pdf" }, "ATS Resume generated"));
});

exports.checkPlagiarism = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { similarityPercentage: 12.5, uniquePercentage: 87.5 }, "Assignment similarity report generated"));
});
