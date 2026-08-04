const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getHomeFeed = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        banners: [{ _id: "bnr_1", title: "Mid-Term Exam PYQs Released", imageUrl: "https://studyhubai.com/banners/b1.jpg" }],
        trendingNotes: [{ _id: "mat_1", title: "DBMS Unit 1 to 5 Notes", downloadCount: 1420 }],
        dailyStreakDays: 5,
        userCoins: 250
      },
      "Home feed loaded"
    )
  );
});

exports.getContinueReading = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      { materialId: "mat_1", materialTitle: "DBMS Unit 1 Notes", lastPage: 14, totalPages: 45, percentage: 31.1 },
      "Continue reading progress loaded"
    )
  );
});

exports.updateProgress = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.body, "Reading progress updated"));
});

exports.globalSearch = asyncHandler(async (req, res) => {
  const query = req.query.q || req.query.search || "";
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        colleges: [{ _id: "clg_1", name: "Delhi Technological University" }],
        subjects: [{ _id: "sbj_1", name: "Database Management Systems" }],
        materials: [{ _id: "mat_1", title: "DBMS Unit 1 Notes" }]
      },
      `Universal search results for '${query}'`
    )
  );
});
