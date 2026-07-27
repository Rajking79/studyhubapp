const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const FavoriteService = require("../services/favorite.service");

const toggleFavorite = asyncHandler(async (req, res) => {
  const { targetType, targetId } = req.body;
  const result = await FavoriteService.toggleFavorite(req.user._id, targetType, targetId);
  return res.status(200).json(new ApiResponse(200, { targetType, targetId, ...result }, "Favorite toggled successfully"));
});

const getFavorites = asyncHandler(async (req, res) => {
  const bookmarks = await FavoriteService.getFavorites(req.user._id);
  return res.status(200).json(new ApiResponse(200, { bookmarks }, "Bookmarked items fetched successfully"));
});

module.exports = {
  toggleFavorite,
  getFavorites
};
