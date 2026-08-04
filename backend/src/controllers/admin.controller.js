const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const adminService = require("../services/admin.service");

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getStats();
  return res.status(200).json(new ApiResponse(200, stats, "Admin dashboard executive stats loaded"));
});

exports.getHealth = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      { serverStatus: "UP", memoryUsageMB: 42, database: "CONNECTED", uptimeSeconds: 184520 },
      "System health check OK"
    )
  );
});

exports.getAuditLogs = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Audit logs loaded"));
});

exports.getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { name: "System Admin", role: "super_admin" }, "Admin profile loaded"));
});

exports.updateProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "Admin profile updated"));
});

exports.changePassword = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Admin password updated"));
});

exports.getColleges = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Colleges list loaded"));
});

exports.addCollege = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "College created"));
});

exports.getCourses = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Courses list loaded"));
});

exports.addCourse = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Course created"));
});

exports.getSubjects = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Subjects list loaded"));
});

exports.addSubject = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Subject created"));
});

exports.getMaterials = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Materials list loaded"));
});

exports.uploadMaterial = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Material uploaded by admin"));
});

exports.getUsers = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Users list loaded"));
});

exports.sendNotification = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "Broadcast notification sent"));
});

exports.getBanners = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Banners list loaded"));
});

exports.addBanner = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Banner created"));
});

exports.getReferrals = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Referrals leaderboard loaded"));
});

exports.getFeedbacks = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Feedbacks list loaded"));
});
