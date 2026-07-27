const AIHistory = require("../models/AIHistory.model");

class AIRepository {
  static async createHistoryRecord({ userId, prompt, response, type = "chat", subjectContext = "" }) {
    return await AIHistory.create({
      userId,
      prompt,
      response,
      type,
      subjectContext
    });
  }

  static async getUserHistory(userId) {
    return await AIHistory.find({ userId }).sort({ createdAt: -1 }).lean();
  }
}

module.exports = AIRepository;
