const Banner = require("../models/Banner.model");
const Material = require("../models/Material.model");
const Subject = require("../models/Subject.model");
const College = require("../models/College.model");

class DashboardRepository {
  static async getBanners() {
    try {
      const banners = await Banner.find({ isActive: true, isDeleted: { $ne: true } }).lean();
      if (banners && banners.length > 0) return banners;
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    return dataStore.banners || [];
  }

  static async globalSearch({ q = "", type = "all", page = 1, limit = 20 }) {
    const searchRegex = { $regex: q, $options: "i" };
    const skip = (page - 1) * limit;

    let materials = [], subjects = [], colleges = [];

    try {
      if (type === "all" || type === "materials") {
        materials = await Material.find({ title: searchRegex, status: "approved" }).skip(skip).limit(Number(limit)).lean();
      }
      if (type === "all" || type === "subjects") {
        subjects = await Subject.find({ title: searchRegex }).skip(skip).limit(Number(limit)).lean();
      }
      if (type === "all" || type === "colleges") {
        colleges = await College.find({ name: searchRegex, isDeleted: { $ne: true } }).skip(skip).limit(Number(limit)).lean();
      }
    } catch (e) {
      const dataStore = require("../services/dataStore");
      const lowerQ = q.toLowerCase();
      materials = (dataStore.materials || []).filter(m => m.title?.toLowerCase().includes(lowerQ));
      subjects = (dataStore.subjects || []).filter(s => s.name?.toLowerCase().includes(lowerQ));
      colleges = (dataStore.colleges || []).filter(c => c.name?.toLowerCase().includes(lowerQ));
    }

    return {
      query: q,
      results: {
        materials,
        subjects,
        colleges
      }
    };
  }
}

module.exports = DashboardRepository;
