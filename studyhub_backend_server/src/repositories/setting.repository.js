const Setting = require("../models/Setting.model");

class SettingRepository {
  static async getSettingsByUserId(userId) {
    let setting = await Setting.findOne({ userId }).lean();
    if (!setting) {
      setting = await Setting.create({ userId });
    }
    return setting;
  }

  static async updateSettingsByUserId(userId, updateData) {
    return await Setting.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { upsert: true, new: true }
    ).lean();
  }
}

module.exports = SettingRepository;
