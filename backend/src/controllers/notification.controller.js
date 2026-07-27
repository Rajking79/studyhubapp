const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const NotificationRepository = require("../repositories/notification.repository");

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await NotificationRepository.getNotificationsForUser(req.user._id);
  return res.status(200).json(new ApiResponse(200, notifications, "Notifications loaded from MongoDB"));
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const unreadCount = await NotificationRepository.getUnreadCount(req.user._id);
  return res.status(200).json(new ApiResponse(200, { unreadCount }, "Unread count loaded"));
});

const markRead = asyncHandler(async (req, res) => {
  const notification = await NotificationRepository.markAsRead(req.params.id, req.user._id);
  return res.status(200).json(new ApiResponse(200, notification, "Notification marked as read"));
});

const markAllRead = asyncHandler(async (req, res) => {
  await NotificationRepository.markAllAsRead(req.user._id);
  return res.status(200).json(new ApiResponse(200, { success: true }, "All notifications marked as read"));
});

const deleteNotification = asyncHandler(async (req, res) => {
  await NotificationRepository.softDeleteNotification(req.params.id);
  return res.status(200).json(new ApiResponse(200, { id: req.params.id, deleted: true }, "Notification deleted"));
});

const broadcastNotice = asyncHandler(async (req, res) => {
  const notice = await NotificationRepository.createNotice({ ...req.body, isGlobal: true });
  return res.status(201).json(new ApiResponse(201, notice, "Notice broadcasted successfully"));
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markRead,
  markAllRead,
  deleteNotification,
  broadcastNotice
};
