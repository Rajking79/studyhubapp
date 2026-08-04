const adminService = require("../services/admin.service");
const { mockUsers, mockColleges, mockCourses, mockSubjects, mockMaterials } = require("../services/dataStore");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getAdminStats();
  return res.status(200).json(new ApiResponse(200, stats, "Executive dashboard metrics loaded"));
});

const getHealth = asyncHandler(async (req, res) => {
  const health = await adminService.getHealthStatus();
  return res.status(200).json(new ApiResponse(200, health, "System health status check"));
});

const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = [
    { _id: "log_1", adminId: "usr_mock_admin_1", action: "APPROVE_MATERIAL", targetId: "mat_1", timestamp: new Date() }
  ];
  return res.status(200).json(new ApiResponse(200, logs, "Audit logs loaded"));
});

const getProfile = asyncHandler(async (req, res) => {
  const profile = mockUsers[1];
  return res.status(200).json(new ApiResponse(200, profile, "Admin profile loaded"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = mockUsers[1];
  Object.assign(profile, req.body);
  return res.status(200).json(new ApiResponse(200, profile, "Admin profile updated"));
});

const changePassword = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Admin password changed successfully"));
});

const getColleges = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, mockColleges, "Admin colleges list"));
});

const addCollege = asyncHandler(async (req, res) => {
  const newCol = { _id: "clg_" + Date.now(), ...req.body, isFeatured: false };
  mockColleges.push(newCol);
  return res.status(201).json(new ApiResponse(201, newCol, "College added successfully"));
});

const getCourses = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, mockCourses, "Admin courses list"));
});

const addCourse = asyncHandler(async (req, res) => {
  const newCrs = { _id: "crs_" + Date.now(), ...req.body };
  mockCourses.push(newCrs);
  return res.status(201).json(new ApiResponse(201, newCrs, "Course added successfully"));
});

const getSubjects = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, mockSubjects, "Admin subjects list"));
});

const addSubject = asyncHandler(async (req, res) => {
  const newSbj = { _id: "sbj_" + Date.now(), ...req.body };
  mockSubjects.push(newSbj);
  return res.status(201).json(new ApiResponse(201, newSbj, "Subject added successfully"));
});

const getMaterials = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, mockMaterials, "Admin materials moderation queue"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const newMat = { _id: "mat_" + Date.now(), ...req.body, isApproved: true };
  mockMaterials.push(newMat);
  return res.status(201).json(new ApiResponse(201, newMat, "Material published by admin"));
});

const getUsers = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, mockUsers, "Student directory loaded"));
});

const sendNotification = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { broadcastId: "bc_" + Date.now() }, "Notification broadcast sent"));
});

const getBanners = asyncHandler(async (req, res) => {
  const banners = [
    { _id: "b1", title: "Exam Preparation Special", imageUrl: "https://studyhubai.com/banner1.jpg", isActive: true }
  ];
  return res.status(200).json(new ApiResponse(200, banners, "Banners slider list"));
});

const addBanner = asyncHandler(async (req, res) => {
  const newBanner = { _id: "b_" + Date.now(), ...req.body, isActive: true };
  return res.status(201).json(new ApiResponse(201, newBanner, "Banner created successfully"));
});

const getReferrals = asyncHandler(async (req, res) => {
  const referrals = [
    { _id: "ref_1", userId: mockUsers[0], referralCode: "STUDY_6A685D", earnedCoins: 250 }
  ];
  return res.status(200).json(new ApiResponse(200, referrals, "Referral leaderboard list"));
});

const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = [
    { _id: "fb_1", userId: mockUsers[0], type: "feedback", message: "Great app!", status: "open" }
  ];
  return res.status(200).json(new ApiResponse(200, feedbacks, "Student feedback inbox"));
});

module.exports = {
  getStats,
  getHealth,
  getAuditLogs,
  getProfile,
  updateProfile,
  changePassword,
  getColleges,
  addCollege,
  getCourses,
  addCourse,
  getSubjects,
  addSubject,
  getMaterials,
  uploadMaterial,
  getUsers,
  sendNotification,
  getBanners,
  addBanner,
  getReferrals,
  getFeedbacks
};
