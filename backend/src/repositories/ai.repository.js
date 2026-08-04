const mongoose = require("mongoose");
const AIHistory = require("../models/AIHistory.model");

class AIRepository {
  async saveInteraction(userId, prompt, response, type = "chat") {
    if (mongoose.connection.readyState === 1) {
      return await AIHistory.create({ userId, prompt, response, type });
    }
    return { _id: "ai_" + Date.now(), userId, prompt, response, type };
  }

  async getHistory(userId) {
    if (mongoose.connection.readyState === 1) {
      return await AIHistory.find({ userId }).sort({ createdAt: -1 });
    }
    return [
      { prompt: "Explain DBMS", response: "DBMS is database management system...", type: "chat" }
    ];
  }

  async clearHistory(userId) {
    if (mongoose.connection.readyState === 1) {
      return await AIHistory.deleteMany({ userId });
    }
    return true;
  }
}

module.exports = new AIRepository();
