const Progress = require("../models/Progress.model");

class ProgressRepository {
  static async updateProgress(userId, materialId, { lastPage = 1, totalPages = 1, lastTimeSeconds = 0 }) {
    const percentage = totalPages > 0 ? Math.min(100, Math.round((lastPage / totalPages) * 100)) : 0;
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
  }

  static async getUserProgressList(userId) {
    return await Progress.find({ userId }).populate("materialId").sort({ updatedAt: -1 }).lean();
  }
}

module.exports = ProgressRepository;
