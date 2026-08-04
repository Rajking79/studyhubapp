const Notification = require("../models/Notification.model");

class NotificationRepository {
  async getNotifications(userId) {
    return await Notification.find({ $or: [{ userId }, { userId: null }] }).sort({ createdAt: -1 });
  }

  async markAllRead(userId) {
    return await Notification.updateMany({ $or: [{ userId }, { userId: null }] }, { isRead: true });
  }

  async createBroadcast(title, description, category = "General") {
    return await Notification.create({ title, description, category, userId: null });
  }
}

module.exports = new NotificationRepository();
