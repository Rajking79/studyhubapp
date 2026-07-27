const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const DashboardService = require("../services/dashboard.service");

const getHomeFeed = asyncHandler(async (req, res) => {
  const data = await DashboardService.getHomeFeed(req.user);
  return res.status(200).json(new ApiResponse(200, data, "Home feed data retrieved successfully"));
});

const getBanners = asyncHandler(async (req, res) => {
  const banners = await DashboardService.getBanners();
  return res.status(200).json(new ApiResponse(200, { banners }, "Banners retrieved successfully"));
});

const getContinueReading = asyncHandler(async (req, res) => {
  const data = await DashboardService.getHomeFeed(req.user);
  return res.status(200).json(new ApiResponse(200, { continueReading: data.continueReading }, "Continue reading list retrieved successfully"));
});

const updateProgress = asyncHandler(async (req, res) => {
  const { materialId, lastPage, lastTimeSeconds } = req.body;
  return res.status(200).json(
    new ApiResponse(
      200,
      { updated: true, materialId, lastPage, lastTimeSeconds, timestamp: new Date().toISOString() },
      "Reading progress updated successfully"
    )
  );
});

const globalSearch = asyncHandler(async (req, res) => {
  const result = await DashboardService.globalSearch(req.query);
  return res.status(200).json(new ApiResponse(200, result, "Global search completed successfully"));
});

module.exports = {
  getHomeFeed,
  getBanners,
  getContinueReading,
  updateProgress,
  globalSearch
};
