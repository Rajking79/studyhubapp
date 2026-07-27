const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const SettingService = require("../services/setting.service");

const getSettings = asyncHandler(async (req, res) => {
  const settings = await SettingService.getSettings(req.user._id);
  return res.status(200).json(new ApiResponse(200, settings, "User settings fetched successfully from MongoDB"));
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SettingService.updateSettings(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, settings, "Settings updated successfully in MongoDB"));
});

module.exports = {
  getSettings,
  updateSettings
};
