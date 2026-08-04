const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getFavorites = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Starred favorites list loaded"));
});

exports.toggleFavorite = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { isFavorited: true }, "Favorite status toggled"));
});
