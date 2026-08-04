const mongoose = require("mongoose");
const Setting = require("../models/Setting.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockSetting = {
  _id: "stg_1",
  userId: "usr_mock_student_1",
  notificationsEnabled: true,
  darkMode: false,
  emailAlerts: true,
  language: "en"
};

const getSetting = async (userId) => {
  if (isDbConnected()) {
    let setting = await Setting.findOne({ userId });
    if (!setting) {
      setting = await Setting.create({ userId });
    }
    return setting;
  }
  return mockSetting;
};

const updateSetting = async (userId, updateData) => {
  if (isDbConnected()) {
    return await Setting.findOneAndUpdate({ userId }, updateData, { new: true, upsert: true });
  }
  Object.assign(mockSetting, updateData);
  return mockSetting;
};

module.exports = {
  getSetting,
  updateSetting
};
