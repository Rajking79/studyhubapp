const mongoose = require("mongoose");
const AIHistory = require("../models/AIHistory.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockAiHistories = [
  {
    _id: "ai_1",
    userId: "usr_mock_student_1",
    prompt: "Explain ACID properties in DBMS",
    response: "ACID stands for Atomicity, Consistency, Isolation, and Durability...",
    type: "chat",
    createdAt: new Date()
  }
];

const saveAiHistory = async (userId, prompt, response, type = "chat") => {
  if (isDbConnected()) {
    const entry = new AIHistory({ userId, prompt, response, type });
    return await entry.save();
  }
  const entry = { _id: "ai_" + Date.now(), userId, prompt, response, type, createdAt: new Date() };
  mockAiHistories.push(entry);
  return entry;
};

const getAiHistory = async (userId) => {
  if (isDbConnected()) {
    return await AIHistory.find({ userId }).sort({ createdAt: -1 }).lean();
  }
  return mockAiHistories.filter((h) => h.userId === userId);
};

const clearAiHistory = async (userId) => {
  if (isDbConnected()) {
    return await AIHistory.deleteMany({ userId });
  }
  const initialLength = mockAiHistories.length;
  for (let i = mockAiHistories.length - 1; i >= 0; i--) {
    if (mockAiHistories[i].userId === userId) {
      mockAiHistories.splice(i, 1);
    }
  }
  return { deletedCount: initialLength - mockAiHistories.length };
};

module.exports = {
  saveAiHistory,
  getAiHistory,
  clearAiHistory
};
