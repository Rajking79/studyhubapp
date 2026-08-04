const mongoose = require("mongoose");
const AIHistory = require("../models/AIHistory.model");

class AIRepository {
  async getHistory(userId) {
    if (mongoose.connection.readyState === 1) return await AIHistory.find({ userId });
    return [
      { prompt: "Explain DBMS", response: "DBMS is database management system...", type: "chat" }
    ];
  }
}

module.exports = new AIRepository();
