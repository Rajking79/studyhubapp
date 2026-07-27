const UserRepository = require("../repositories/user.repository");

class FavoriteService {
  static async toggleFavorite(userId, targetType, targetId) {
    return await UserRepository.toggleBookmark(userId, targetType, targetId);
  }

  static async getFavorites(userId) {
    return await UserRepository.getBookmarks(userId);
  }
}

module.exports = FavoriteService;
