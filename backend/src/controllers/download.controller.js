const downloadRepo = require("../repositories/download.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getMyDownloads = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const downloads = await downloadRepo.getDownloads(userId);
  return res.status(200).json(new ApiResponse(200, downloads, "Offline downloads history loaded"));
});

const syncDownloads = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { downloads } = req.body;
  const result = await downloadRepo.syncDownloads(userId, downloads);
  return res.status(200).json(new ApiResponse(200, result, "Offline downloads state synchronized"));
});

module.exports = {
  getMyDownloads,
  syncDownloads
};
