const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const userService = require("../services/user.service");

exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user._id);
  return res.status(200).json(new ApiResponse(200, profile, "User profile loaded"));
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const updated = await userService.updateProfile(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, updated, "User profile updated"));
});

exports.uploadAvatar = asyncHandler(async (req, res) => {
  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : "https://studyhubai.com/avatars/default.png";
  const updated = await userService.updateProfile(req.user._id, { avatarUrl });
  return res.status(200).json(new ApiResponse(200, updated, "Profile avatar updated"));
});

exports.getUserUploads = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "User uploaded materials list"));
});

exports.exportUserData = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user._id);
  return res.status(200).json(new ApiResponse(200, { profile, exportsAt: new Date() }, "GDPR Data Report generated"));
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  await userService.updateProfile(req.user._id, { isDeleted: true });
  return res.status(200).json(new ApiResponse(200, null, "Account soft deleted successfully"));
});
