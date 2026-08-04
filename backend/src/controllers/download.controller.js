const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getMyDownloads = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Offline downloads history loaded"));
});

exports.syncDownloads = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { syncedCount: 3 }, "Offline downloads synced"));
});
