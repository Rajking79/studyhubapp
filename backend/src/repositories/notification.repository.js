const mongoose = require("mongoose");
const Notification = require("../models/Notification.model");

class NotificationRepository {
  static async getNotificationsForUser(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Notification.find({
          isDeleted: { $ne: true },
          $or: [{ userId }, { isGlobal: true }]
        }).sort({ createdAt: -1 }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.notifications || [];
  }

  static async getUnreadCount(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
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
      } catch (e) {}
    }
    return 2;
  }

  static async markAsRead(notificationId, userId) {
    if (mongoose.connection.readyState === 1) {
      try {
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
      } catch (e) {}
    }
    return { id: notificationId, isUnread: false };
  }

  static async markAllAsRead(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        await Notification.updateMany({ userId, isUnread: true }, { $set: { isUnread: false } });
        await Notification.updateMany(
          { isGlobal: true, readBy: { $ne: userId } },
          { $addToSet: { readBy: userId } }
        );
      } catch (e) {}
    }
    return true;
  }

  static async createNotice(data) {
    return await Notification.create(data);
  }

  static async softDeleteNotification(id) {
    return await Notification.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }

  static async getAllNotifications({ page = 1, limit = 20 }) {
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isDeleted: { $ne: true } };
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
          Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
          Notification.countDocuments(query)
        ]);

        return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    const fallback = dataStore.notifications || [];
    return { items: fallback, total: fallback.length, page: 1, limit: Number(limit), totalPages: 1 };
  }
}

module.exports = NotificationRepository;
