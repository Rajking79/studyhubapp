const Banner = require("../models/Banner.model");
const Material = require("../models/Material.model");
const Subject = require("../models/Subject.model");
const College = require("../models/College.model");

class DashboardRepository {
  static async getBanners() {
    return await Banner.find({ isActive: true, isDeleted: { $ne: true } }).lean();
  }

  static async globalSearch({ q = "", type = "all", page = 1, limit = 20 }) {
    const searchRegex = { $regex: q, $options: "i" };
    const skip = (page - 1) * limit;

    let materials = [], subjects = [], colleges = [];

    if (type === "all" || type === "materials") {
      materials = await Material.find({ title: searchRegex, status: "approved" }).skip(skip).limit(Number(limit)).lean();
    }
    if (type === "all" || type === "subjects") {
      subjects = await Subject.find({ title: searchRegex }).skip(skip).limit(Number(limit)).lean();
    }
    if (type === "all" || type === "colleges") {
      colleges = await College.find({ name: searchRegex, isDeleted: { $ne: true } }).skip(skip).limit(Number(limit)).lean();
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
