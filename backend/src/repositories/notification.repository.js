const Notification = require("../models/Notification.model");

class NotificationRepository {
  static async getNotificationsForUser(userId) {
    return await Notification.find({
      isDeleted: { $ne: true },
      $or: [{ userId }, { isGlobal: true }]
    }).sort({ createdAt: -1 }).lean();
  }

  static async getUnreadCount(userId) {
    const notifications = await Notification.find({
      isDeleted: { $ne: true },
      $or: [{ userId }, { isGlobal: true }]
    }).lean();

    const unread = notifications.filter(n => {
      if (n.isGlobal) {
        return !n.readBy || !n.readBy.some(id => id.toString() === userId.toString());
      }
      return n.isUnread;
    });

    return unread.length;
  }

  static async markAsRead(notificationId, userId) {
    const notification = await Notification.findById(notificationId);
    if (!notification) return null;

    if (notification.isGlobal) {
      if (!notification.readBy.includes(userId)) {
        notification.readBy.push(userId);
      }
    } else {
      notification.isUnread = false;
    }
    await notification.save();
    return notification;
  }

  static async markAllAsRead(userId) {
    await Notification.updateMany({ userId, isUnread: true }, { $set: { isUnread: false } });
    await Notification.updateMany(
      { isGlobal: true, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );
    return true;
  }

  static async createNotice(data) {
    return await Notification.create(data);
  }

  static async softDeleteNotification(id) {
    return await Notification.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }

  static async getAllNotifications({ page = 1, limit = 20 }) {
    const query = { isDeleted: { $ne: true } };
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Notification.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }
}

module.exports = NotificationRepository;
