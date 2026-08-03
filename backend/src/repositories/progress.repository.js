const mongoose = require("mongoose");
const Progress = require("../models/Progress.model");

class ProgressRepository {
  static async updateProgress(userId, materialId, { lastPage = 1, totalPages = 1, lastTimeSeconds = 0 }) {
    const percentage = totalPages > 0 ? Math.min(100, Math.round((lastPage / totalPages) * 100)) : 0;
    if (mongoose.connection.readyState === 1) {
      try {
        return await Progress.findOneAndUpdate(
          { userId, materialId },
          {
            $set: {
              lastPage: Number(lastPage),
              totalPages: Number(totalPages),
              lastTimeSeconds: Number(lastTimeSeconds),
              percentageCompleted: percentage
            }
          },
          { upsert: true, new: true }
        ).lean();
      } catch (e) {}
    }
    return { userId, materialId, lastPage: Number(lastPage), totalPages: Number(totalPages), percentageCompleted: percentage };
  }

  static async getUserProgressList(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Progress.find({ userId }).populate("materialId").sort({ updatedAt: -1 }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.progress || [];
  }
}

module.exports = ProgressRepository;
