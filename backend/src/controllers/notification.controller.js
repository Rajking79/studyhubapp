const notificationRepo = require("../repositories/notification.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const notifications = await notificationRepo.getNotifications(userId);
  return res.status(200).json(new ApiResponse(200, notifications, "Notifications list loaded"));
});

const markAllRead = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const result = await notificationRepo.markAllRead(userId);
  return res.status(200).json(new ApiResponse(200, result, "All notifications marked as read"));
});

module.exports = {
  getNotifications,
  markAllRead
};
