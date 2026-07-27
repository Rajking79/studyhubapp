const Feedback = require("../models/Feedback.model");

class FeedbackRepository {
  static async createFeedback(data) {
    return await Feedback.create(data);
  }

  static async getAllFeedback({ status = "", type = "", page = 1, limit = 20 }) {
    const query = { isDeleted: { $ne: true } };
    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Feedback.find(query).populate("userId", "name email").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Feedback.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async updateFeedbackStatus(id, { status, adminReply }) {
    const updateData = {};
    if (status) updateData.status = status;
    if (adminReply) updateData.adminReply = adminReply;
    return await Feedback.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();
  }
}

module.exports = FeedbackRepository;
