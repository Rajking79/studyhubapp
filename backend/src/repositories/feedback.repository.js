const mongoose = require("mongoose");
const Feedback = require("../models/Feedback.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const createFeedback = async (userId, type, message) => {
  if (isDbConnected()) {
    const feedback = new Feedback({ userId, type, message });
    return await feedback.save();
  }
  return { _id: "fb_" + Date.now(), userId, type, message, status: "open", createdAt: new Date() };
};

module.exports = {
  createFeedback
};
