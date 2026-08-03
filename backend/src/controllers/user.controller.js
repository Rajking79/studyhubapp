const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const UserService = require("../services/user.service");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await UserService.getProfile(req.user._id);
  return res.status(200).json(new ApiResponse(200, profile, "Student profile fetched"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, college, course, semester, avatarUrl } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (phone) updateData.phone = phone;
  if (college) updateData.college = college;
  if (course) updateData.course = course;
  if (semester) updateData.semester = semester;
  if (avatarUrl) updateData.avatarUrl = avatarUrl;

  const updatedProfile = await UserService.updateProfile(req.user._id, updateData);
  return res.status(200).json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
});

const getMyUploads = asyncHandler(async (req, res) => {
  const uploads = await UserService.getMyUploads(req.user._id);
  return res.status(200).json(new ApiResponse(200, uploads.items || uploads, "My uploaded materials fetched"));
});

const exportUserData = asyncHandler(async (req, res) => {
  const data = await UserService.exportUserData(req.user._id);
  return res.status(200).json(new ApiResponse(200, data, "User profile and data exported successfully (GDPR)"));
});

const deleteMyAccount = asyncHandler(async (req, res) => {
  const { confirmText } = req.body;
  const result = await UserService.deleteUserAccount(req.user._id, confirmText);
  return res.status(200).json(new ApiResponse(200, result, "User account soft-deleted successfully"));
});

module.exports = {
  getProfile,
  updateProfile,
  getMyUploads,
  exportUserData,
  deleteMyAccount
};
