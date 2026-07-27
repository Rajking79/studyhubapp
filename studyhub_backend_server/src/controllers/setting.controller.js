const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getSettings = asyncHandler(async (req, res) => {
  const settings = {
    language: "en",
    darkMode: true,
    pushNotifications: true,
    emailAnnouncements: false,
    dataSaver: false
  };
  return res.status(200).json(new ApiResponse(200, settings, "User settings fetched successfully"));
});

const updateSettings = asyncHandler(async (req, res) => {
  const { language, darkMode, pushNotifications, emailAnnouncements, dataSaver } = req.body;
  const updatedSettings = {
    language: language || "en",
    darkMode: darkMode !== undefined ? darkMode : true,
    pushNotifications: pushNotifications !== undefined ? pushNotifications : true,
    emailAnnouncements: emailAnnouncements !== undefined ? emailAnnouncements : false,
    dataSaver: dataSaver !== undefined ? dataSaver : false
  };
  return res.status(200).json(new ApiResponse(200, updatedSettings, "Settings updated successfully"));
});

module.exports = {
  getSettings,
  updateSettings
};
