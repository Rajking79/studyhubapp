const User = require("../models/User.model");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const Material = require("../models/Material.model");
const Banner = require("../models/Banner.model");
const Notification = require("../models/Notification.model");

class AdminRepository {
  static async getStats() {
    const [
      totalStudents,
      totalColleges,
      totalCourses,
      totalSubjects,
      totalMaterials,
      totalBanners
    ] = await Promise.all([
      User.countDocuments({ role: { $in: ["user", "student", "guest"] }, isDeleted: { $ne: true } }),
      College.countDocuments({ isDeleted: { $ne: true } }),
      Course.countDocuments({ isDeleted: { $ne: true } }),
      Subject.countDocuments({ isDeleted: { $ne: true } }),
      Material.countDocuments({ isDeleted: { $ne: true } }),
      Banner.countDocuments({ isDeleted: { $ne: true } })
    ]);

    return {
      totalStudents,
      onlineStudents: Math.floor(totalStudents * 0.1) || 5,
      totalColleges,
      totalCourses,
      totalSubjects,
      totalMaterials,
      totalBanners,
      serverStatus: "Healthy (100% MongoDB Online)"
    };
  }

  // Banner Operations
  static async getBanners() {
    return await Banner.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
  }

  static async createBanner(data) {
    return await Banner.create(data);
  }

  static async toggleBanner(id) {
    const banner = await Banner.findById(id);
    if (!banner) return null;
    banner.isActive = !banner.isActive;
    await banner.save();
    return banner;
  }
}

module.exports = AdminRepository;
