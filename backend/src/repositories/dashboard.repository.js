const Banner = require("../models/Banner.model");

class DashboardRepository {
  async getBanners() {
    return await Banner.find({ isActive: true }).sort({ order: 1 });
  }

  async createBanner(data) {
    return await Banner.create(data);
  }

  async updateBanner(id, data) {
    return await Banner.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBanner(id) {
    return await Banner.findByIdAndDelete(id);
  }
}

module.exports = new DashboardRepository();
