const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const UserRepository = require("../repositories/user.repository");

const toggleFavorite = asyncHandler(async (req, res) => {
  const { targetType, targetId } = req.body;
  const result = await UserRepository.toggleBookmark(req.user._id, targetType, targetId);
  return res.status(200).json(new ApiResponse(200, { targetType, targetId, ...result }, "Favorite toggled successfully"));
});

const getFavorites = asyncHandler(async (req, res) => {
  const bookmarks = await UserRepository.getBookmarks(req.user._id);
  return res.status(200).json(new ApiResponse(200, { bookmarks }, "Bookmarked items fetched successfully"));
});

module.exports = {
  toggleFavorite,
  getFavorites
};
