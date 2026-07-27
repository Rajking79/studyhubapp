const AcademicRepository = require("../repositories/academic.repository");
const MaterialRepository = require("../repositories/material.repository");
const AdminRepository = require("../repositories/admin.repository");
const ProgressRepository = require("../repositories/progress.repository");

class DashboardService {
  static async getHomeFeed(user) {
    const [banners, colleges, trendingMaterials, continueReading] = await Promise.all([
      AdminRepository.getBanners(),
      AcademicRepository.getColleges({ page: 1, limit: 6 }),
      MaterialRepository.getMaterials({ page: 1, limit: 6, sort: "downloadsCount", order: "desc" }),
      user ? ProgressRepository.getUserProgressList(user._id) : Promise.resolve([])
    ]);

    return {
      banners,
      featuredColleges: colleges.items,
      trendingMaterials: trendingMaterials.items,
      continueReading
    };
  }

  static async getBanners() {
    return await AdminRepository.getBanners();
  }

  static async updateProgress(userId, materialId, progressData) {
    return await ProgressRepository.updateProgress(userId, materialId, progressData);
  }

  static async globalSearch({ q = "", type = "all" }) {
    const [colleges, courses, subjects, materials] = await Promise.all([
      AcademicRepository.getColleges({ search: q, limit: 5 }),
      AcademicRepository.getCourses({ search: q, limit: 5 }),
      AcademicRepository.getSubjects({ search: q, limit: 5 }),
      MaterialRepository.getMaterials({ search: q, limit: 10 })
    ]);

    return {
      query: q,
      colleges: colleges.items,
      courses: courses.items,
      subjects: subjects.items,
      materials: materials.items
    };
  }
}

module.exports = DashboardService;
