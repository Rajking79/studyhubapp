const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const toggleFavorite = asyncHandler(async (req, res) => {
  const { targetType, targetId } = req.body;
  return res.status(200).json(new ApiResponse(200, { targetType, targetId, isBookmarked: true }, "Favorite toggled"));
});

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = {
    subjects: [
      { id: "subj_os_101", title: "Operating Systems", rating: 4.8 }
    ],
    materials: [
      { id: "mat_dbms_pyq_2024", title: "DBMS 2024 PYQ", fileSizeMB: 3.4 }
    ]
  };
  return res.status(200).json(new ApiResponse(200, favorites, "Bookmarked items fetched"));
});

module.exports = {
  toggleFavorite,
  getFavorites
};
