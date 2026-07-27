const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Notification = require("../models/Notification.model");

const getNotifications = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = {};
  if (category && category !== "All") query.category = category;

  const notifications = await Notification.find(query).sort({ createdAt: -1 }).lean();
  return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched from MongoDB"));
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({ isUnread: true });
  return res.status(200).json(new ApiResponse(200, { unreadCount: count }, "Unread badge count fetched"));
});

const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { $set: { isUnread: false } }, { new: true });
  return res.status(200).json(new ApiResponse(200, notification || { id: req.params.id, isUnread: false }, "Notification marked as read"));
});

const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ isUnread: true }, { $set: { isUnread: false } });
  return res.status(200).json(new ApiResponse(200, { markedAllRead: true }, "All notifications marked as read"));
});

const deleteNotification = asyncHandler(async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  return res.status(200).json(new ApiResponse(200, { deleted: true, id: req.params.id }, "Notification deleted"));
});

const broadcastNotice = asyncHandler(async (req, res) => {
  const { title, category, description, targetCollege } = req.body;
  const notice = await Notification.create({
    title,
    category: category || "Exams",
    message: description || "Notification message",
    isUnread: true
  });
  return res.status(201).json(new ApiResponse(201, notice, "Exam notice broadcasted to MongoDB successfully"));
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markRead,
  markAllRead,
  deleteNotification,
  broadcastNotice
};
