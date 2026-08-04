const userService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const profile = await userService.getUserProfile(userId);
  return res.status(200).json(new ApiResponse(200, profile, "Student profile loaded successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const updated = await userService.updateUserProfile(userId, req.body);
  return res.status(200).json(new ApiResponse(200, updated, "Profile updated successfully"));
});

const getMyUploads = asyncHandler(async (req, res) => {
  const uploads = [
    { _id: "mat_1", title: "DBMS Lecture Notes Unit 1", downloadCount: 42, status: "approved" }
  ];
  return res.status(200).json(new ApiResponse(200, uploads, "Uploaded materials loaded"));
});

const exportUserData = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const data = await userService.exportUserData(userId);
  return res.status(200).json(new ApiResponse(200, data, "GDPR Article 20 Personal Data Export Report"));
});

const deleteMyAccount = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  await userService.softDeleteUser(userId);
  return res.status(200).json(new ApiResponse(200, {}, "Account soft deleted successfully"));
});

module.exports = {
  getProfile,
  updateProfile,
  getMyUploads,
  exportUserData,
  deleteMyAccount
};
