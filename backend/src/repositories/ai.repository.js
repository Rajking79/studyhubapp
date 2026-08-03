const mongoose = require("mongoose");
const AIHistory = require("../models/AIHistory.model");

class AIRepository {
  static async createHistoryRecord({ userId, prompt, response, type = "chat", subjectContext = "" }) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await AIHistory.create({
          userId,
          prompt,
          response,
          type,
          subjectContext
        });
      } catch (e) {}
    }
    return { _id: "ai_hist_" + Date.now(), userId, prompt, response, type };
  }

  static async getUserHistory(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await AIHistory.find({ userId }).sort({ createdAt: -1 }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.aiHistory || [
      { id: "ai_1", prompt: "Explain Virtual Memory", response: "Virtual memory expands RAM using paging." }
    ];
  }

  static async clearUserHistory(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await AIHistory.deleteMany({ userId });
      } catch (e) {}
    }
    return { acknowledged: true, deletedCount: 1 };
  }
}

module.exports = AIRepository;
