const mongoose = require("mongoose");
const Favorite = require("../models/Favorite.model");

class FavoriteRepository {
  async getFavorites(userId) {
    if (mongoose.connection.readyState === 1) {
      return await Favorite.find({ userId }).populate("targetId");
    }
    return [];
  }

  async toggleFavorite(userId, targetId, targetType = "Material") {
    if (mongoose.connection.readyState === 1) {
      const existing = await Favorite.findOne({ userId, targetId });
      if (existing) {
        await Favorite.findByIdAndDelete(existing._id);
        return { isFavorited: false };
      } else {
        await Favorite.create({ userId, targetId, targetType });
        return { isFavorited: true };
      }
    }
    return { isFavorited: true };
  }
}

module.exports = new FavoriteRepository();
