const SettingRepository = require("../repositories/setting.repository");

class SettingService {
  static async getSettings(userId) {
    return await SettingRepository.getSettingsByUserId(userId);
  }

  static async updateSettings(userId, updateData) {
    return await SettingRepository.updateSettingsByUserId(userId, updateData);
  }
}

module.exports = SettingService;
