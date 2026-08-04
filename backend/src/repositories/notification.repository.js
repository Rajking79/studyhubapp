const mongoose = require("mongoose");
const Notification = require("../models/Notification.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockNotifications = [
  {
    _id: "notif_1",
    title: "Mid-Term Exam Datesheet Out!",
    description: "Check the official academic schedule for Semester 6.",
    isGlobal: true,
    createdAt: new Date()
  }
];

const getNotifications = async (userId) => {
  if (isDbConnected()) {
    return await Notification.find({
      $or: [{ userId }, { isGlobal: true }]
    }).sort({ createdAt: -1 }).lean();
  }
  return mockNotifications;
};

const markAllRead = async (userId) => {
  if (isDbConnected()) {
    return await Notification.updateMany(
      { $or: [{ userId }, { isGlobal: true }] },
      { $addToSet: { readBy: userId } }
    );
  }
  return { updatedCount: mockNotifications.length };
};

module.exports = {
  getNotifications,
  markAllRead
};
