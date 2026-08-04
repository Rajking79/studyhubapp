const settingRepo = require("../repositories/setting.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getSettings = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const settings = await settingRepo.getSetting(userId);
  return res.status(200).json(new ApiResponse(200, settings, "User settings loaded"));
});

const updateSettings = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const updated = await settingRepo.updateSetting(userId, req.body);
  return res.status(200).json(new ApiResponse(200, updated, "User settings updated"));
});

module.exports = {
  getSettings,
  updateSettings
};
