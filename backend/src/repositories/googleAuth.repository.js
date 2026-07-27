const User = require("../models/User.model");
const LoginHistory = require("../models/LoginHistory.model");
const RefreshToken = require("../models/RefreshToken.model");
const ActivityLog = require("../models/ActivityLog.model");

class GoogleAuthRepository {
  static async findUserByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  static async findUserByGoogleId(googleId) {
    return await User.findOne({ googleId });
  }

  static async createGoogleUser(userData) {
    return await User.create({
      name: userData.name,
      email: userData.email.toLowerCase(),
      avatarUrl: userData.avatar,
      googleId: userData.googleId,
      provider: "google",
      role: "student",
      college: "",
      course: "",
      semester: "",
      isEmailVerified: true,
      isGuest: false,
      isBlocked: false,
      loginMethod: "google",
      lastLogin: new Date()
    });
  }

  static async updateGoogleUser(userId, updateData) {
    return await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          googleId: updateData.googleId,
          provider: "google",
          avatarUrl: updateData.avatar || updateData.avatarUrl,
          isEmailVerified: true,
          lastLogin: new Date()
        }
      },
      { new: true }
    );
  }

  static async saveRefreshToken(userId, token, deviceId, ipAddress) {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 Days
    return await RefreshToken.create({
      userId,
      token,
      deviceId: deviceId || "mobile",
      ipAddress,
      expiresAt
    });
  }

  static async recordLoginHistory(historyData) {
    return await LoginHistory.create({
      userId: historyData.userId,
      deviceName: historyData.deviceName || "Android Mobile",
      androidVersion: historyData.androidVersion || "Android 14",
      appVersion: historyData.appVersion || "1.0.0",
      ipAddress: historyData.ipAddress || "127.0.0.1",
      country: historyData.country || "India",
      city: historyData.city || "New Delhi",
      loginMethod: "google",
      loginTime: new Date()
    });
  }

  static async recordActivity(userId, action, details, ipAddress) {
    return await ActivityLog.create({
      userId,
      action,
      details,
      ipAddress
    });
  }
}

module.exports = GoogleAuthRepository;
