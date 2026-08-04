const favoriteService = require("../services/favorite.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const favorites = await favoriteService.getFavorites(userId);
  return res.status(200).json(new ApiResponse(200, favorites, "Starred favorites list loaded"));
});

const toggleFavorite = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { targetId } = req.body;
  const result = await favoriteService.toggleFavorite(userId, targetId);
  return res.status(200).json(new ApiResponse(200, result, "Favorite status updated"));
});

module.exports = {
  getFavorites,
  toggleFavorite
};
