const dashboardService = require("../services/dashboard.service");
const progressRepo = require("../repositories/progress.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getHomeFeed = asyncHandler(async (req, res) => {
  const data = await dashboardService.getHomeFeed();
  return res.status(200).json(new ApiResponse(200, data, "Student home feed loaded"));
});

const getContinueReading = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const data = await progressRepo.getContinueReading(userId);
  return res.status(200).json(new ApiResponse(200, data, "Continue reading resume data loaded"));
});

const updateProgress = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { materialId, lastPage, totalPages } = req.body;
  const data = await progressRepo.updateProgress(userId, materialId, lastPage, totalPages);
  return res.status(200).json(new ApiResponse(200, data, "PDF reading progress updated"));
});

const globalSearch = asyncHandler(async (req, res) => {
  const query = req.query.query || req.query.q;
  const data = await dashboardService.universalSearch(query);
  return res.status(200).json(new ApiResponse(200, data, "Universal global search results"));
});

module.exports = {
  getHomeFeed,
  getContinueReading,
  updateProgress,
  globalSearch
};
