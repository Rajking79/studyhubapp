const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getNotifications = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const notifications = [
    {
      id: "notif_001",
      title: "End-Sem Examination Datesheet Released",
      category: "Exams",
      description: "Delhi University has released the official datesheet for May 2026 End-Sem exams.",
      timeAgo: "10 mins ago",
      isUnread: true,
      colorHex: "#2563EB"
    },
    {
      id: "notif_002",
      title: "New OS Unit-3 Handwritten Notes Uploaded",
      category: "New Uploads",
      description: "Operating System Unit 3 Process Synchronization notes are now available.",
      timeAgo: "2 hours ago",
      isUnread: true,
      colorHex: "#0D9488"
    },
    {
      id: "notif_003",
      title: "Scholarship Portal Registration Open",
      category: "Notices",
      description: "Merit scholarship applications for 2026 session are now open for B.Tech & BCA students.",
      timeAgo: "1 day ago",
      isUnread: false,
      colorHex: "#F97316"
    }
  ];

  const filtered = !category || category === "All"
    ? notifications
    : notifications.filter((n) => n.category === category);

  return res.status(200).json(new ApiResponse(200, filtered, "Notifications fetched successfully"));
});

const getUnreadCount = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { unreadCount: 2 }, "Unread badge count fetched"));
});

const markRead = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: req.params.id,
        isUnread: false,
        markedReadAt: new Date().toISOString()
      },
      "Notification marked as read"
    )
  );
});

const markAllRead = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        markedAllRead: true,
        count: 3,
        updatedAt: new Date().toISOString()
      },
      "All notifications marked as read"
    )
  );
});

const deleteNotification = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        deleted: true,
        notificationId: req.params.id,
        deletedAt: new Date().toISOString()
      },
      "Notification deleted"
    )
  );
});

const broadcastNotice = asyncHandler(async (req, res) => {
  const { title, category, description, targetCollege } = req.body;
  const notice = {
    id: "notif_" + Date.now(),
    title,
    category: category || "Exams",
    description,
    targetCollege: targetCollege || "all"
  };
  return res.status(201).json(new ApiResponse(201, notice, "Exam notice broadcasted to students successfully"));
});

module.exports = {
  getNotifications,
  getUnreadCount,
  markRead,
  markAllRead,
  deleteNotification,
  broadcastNotice
};
