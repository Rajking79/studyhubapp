const mongoose = require("mongoose");
const Favorite = require("../models/Favorite.model");
const { mockMaterials } = require("../services/dataStore");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockFavorites = [
  { _id: "fav_1", userId: "usr_mock_student_1", targetType: "material", targetId: "mat_1" }
];

const getFavorites = async (userId) => {
  if (isDbConnected()) {
    return await Favorite.find({ userId }).populate("targetId").lean();
  }
  return mockMaterials;
};

const toggleFavorite = async (userId, targetId) => {
  if (isDbConnected()) {
    const existing = await Favorite.findOne({ userId, targetId });
    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return { isFavorited: false };
    } else {
      await Favorite.create({ userId, targetId });
      return { isFavorited: true };
    }
  }
  const idx = mockFavorites.findIndex((f) => f.userId === userId && f.targetId === targetId);
  if (idx !== -1) {
    mockFavorites.splice(idx, 1);
    return { isFavorited: false };
  } else {
    mockFavorites.push({ _id: "fav_" + Date.now(), userId, targetType: "material", targetId });
    return { isFavorited: true };
  }
};

module.exports = {
  getFavorites,
  toggleFavorite
};
