const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getSettings = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      { isDarkMode: true, emailNotifications: true, pushNotifications: true, language: "en" },
      "User settings loaded"
    )
  );
});

exports.updateSettings = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "User settings updated"));
});
