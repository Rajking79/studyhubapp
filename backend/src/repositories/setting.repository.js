const mongoose = require("mongoose");
const Setting = require("../models/Setting.model");

class SettingRepository {
  static async getSettingsByUserId(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        let setting = await Setting.findOne({ userId }).lean();
        if (!setting) {
          setting = await Setting.create({ userId });
        }
        return setting;
      } catch (e) {}
    }
    return { userId, notificationsEnabled: true, darkMode: true, emailAlerts: true, language: "en" };
  }

  static async updateSettingsByUserId(userId, updateData) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Setting.findOneAndUpdate(
          { userId },
          { $set: updateData },
          { upsert: true, new: true }
        ).lean();
      } catch (e) {}
    }
    return { userId, ...updateData };
  }
}

module.exports = SettingRepository;
