const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getUnreadCount,
  markRead,
  markAllRead,
  deleteNotification,
  broadcastNotice
} = require("../controllers/notification.controller");
const { verifyJWT, verifyAdmin } = require("../middlewares/auth.middleware");

router.get("/", verifyJWT, getNotifications);
router.get("/unread-count", verifyJWT, getUnreadCount);
router.patch("/:id/read", verifyJWT, markRead);
router.patch("/mark-all-read", verifyJWT, markAllRead);
router.delete("/:id", verifyJWT, deleteNotification);
router.post("/broadcast-notice", verifyJWT, verifyAdmin, broadcastNotice);

module.exports = router;
