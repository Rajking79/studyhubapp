const favoriteRepo = require("../repositories/favorite.repository");

const getFavorites = async (userId) => {
  return await favoriteRepo.getFavorites(userId);
};

const toggleFavorite = async (userId, targetId) => {
  return await favoriteRepo.toggleFavorite(userId, targetId);
};

module.exports = {
  getFavorites,
  toggleFavorite
};
