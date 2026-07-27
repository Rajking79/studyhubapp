const DashboardRepository = require("../repositories/dashboard.repository");
const MaterialRepository = require("../repositories/material.repository");

class DashboardService {
  static async getHomeFeed(user) {
    const [banners, recentMaterials] = await Promise.all([
      DashboardRepository.getBanners(),
      MaterialRepository.getMaterials({ limit: 10 })
    ]);

    return {
      greeting: `Welcome back, ${user ? user.name : "Student"}! 👋`,
      banners,
      continueReading: recentMaterials.items.slice(0, 3),
      trendingMaterials: recentMaterials.items
    };
  }

  static async getBanners() {
    return await DashboardRepository.getBanners();
  }

  static async globalSearch(queryParams) {
    return await DashboardRepository.globalSearch(queryParams);
  }
}

module.exports = DashboardService;
