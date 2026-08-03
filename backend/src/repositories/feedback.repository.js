const mongoose = require("mongoose");
const Feedback = require("../models/Feedback.model");

class FeedbackRepository {
  static async createFeedback(data) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Feedback.create(data);
      } catch (e) {}
    }
    return { _id: "fb_new_" + Date.now(), ...data, status: "pending" };
  }

  static async getAllFeedback({ status = "", type = "", page = 1, limit = 20 }) {
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { isDeleted: { $ne: true } };
        if (status) query.status = status;
        if (type) query.type = type;

        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
          Feedback.find(query).populate("userId", "name email").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
          Feedback.countDocuments(query)
        ]);

        if (items && items.length > 0) {
          return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
        }
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    const fallback = dataStore.feedback || [];
    return { items: fallback, total: fallback.length, page: Number(page), limit: Number(limit), totalPages: 1 };
  }

  static async updateFeedbackStatus(id, { status, adminReply }) {
    if (mongoose.connection.readyState === 1) {
      try {
        const updateData = {};
        if (status) updateData.status = status;
        if (adminReply) updateData.adminReply = adminReply;
        return await Feedback.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
      } catch (e) {}
    }
    return { _id: id, status, adminReply };
  }
}

module.exports = FeedbackRepository;
