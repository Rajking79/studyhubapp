const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getNotifications = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      [
        { _id: "not_1", title: "Mid-Term Exam Alert", description: "Datesheet has been uploaded", isRead: false }
      ],
      "Notifications loaded"
    )
  );
});

exports.markAllRead = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "All notifications marked as read"));
});
