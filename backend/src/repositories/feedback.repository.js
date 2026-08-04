const Feedback = require("../models/Feedback.model");

class FeedbackRepository {
  async create(data) {
    return await Feedback.create(data);
  }

  async findAll() {
    return await Feedback.find().populate("userId", "name email").sort({ createdAt: -1 });
  }

  async updateStatus(id, status, adminReply = "") {
    const update = { status };
    if (adminReply) update.adminReply = adminReply;
    return await Feedback.findByIdAndUpdate(id, update, { new: true });
  }
}

module.exports = new FeedbackRepository();
