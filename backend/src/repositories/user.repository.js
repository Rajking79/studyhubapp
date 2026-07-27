const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");

class UserRepository {
  static async findById(userId) {
    return await User.findById(userId).select("-password").lean();
  }

  static async updateProfile(userId, updateData) {
    return await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select("-password");
  }

  static async toggleBookmark(userId, targetType, targetId) {
    const existing = await Favorite.findOne({ userId, targetType, targetId });
    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return { bookmarked: false };
    } else {
      await Favorite.create({ userId, targetType, targetId });
      return { bookmarked: true };
    }
  }

  static async getBookmarks(userId) {
    return await Favorite.find({ userId }).lean();
  }
}

module.exports = UserRepository;
