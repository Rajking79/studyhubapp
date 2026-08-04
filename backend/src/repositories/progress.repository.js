const mongoose = require("mongoose");
const Progress = require("../models/Progress.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockProgress = {
  _id: "prg_1",
  userId: "usr_mock_student_1",
  materialId: "mat_1",
  lastPage: 12,
  totalPages: 45,
  percentageCompleted: 26.6
};

const getContinueReading = async (userId) => {
  if (isDbConnected()) {
    return await Progress.find({ userId }).populate("materialId").lean();
  }
  return [mockProgress];
};

const updateProgress = async (userId, materialId, lastPage, totalPages) => {
  const percentage = totalPages > 0 ? Math.round((lastPage / totalPages) * 100 * 10) / 10 : 0;
  if (isDbConnected()) {
    return await Progress.findOneAndUpdate(
      { userId, materialId },
      { lastPage, totalPages, percentageCompleted: percentage },
      { upsert: true, new: true }
    );
  }
  mockProgress.lastPage = lastPage;
  mockProgress.totalPages = totalPages;
  mockProgress.percentageCompleted = percentage;
  return mockProgress;
};

module.exports = {
  getContinueReading,
  updateProgress
};
