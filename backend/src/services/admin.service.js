const AdminRepository = require("../repositories/admin.repository");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const Material = require("../models/Material.model");
const Banner = require("../models/Banner.model");
const Notification = require("../models/Notification.model");

class AdminService {
  static async getStats() {
    return await AdminRepository.getStats();
  }

  static async getStudents(queryParams) {
    return await AdminRepository.getStudents(queryParams);
  }

  static async toggleBlockStudent(studentId) {
    return await AdminRepository.toggleBlockStudent(studentId);
  }

  static async deleteStudent(studentId) {
    return await AdminRepository.softDeleteStudent(studentId);
  }

  static async getFeedbacks(queryParams) {
    return await AdminRepository.getFeedbacks(queryParams);
  }

  // Colleges CRUD
  static async getColleges() {
    return await College.find({ isDeleted: { $ne: true } }).lean();
  }

  static async addCollege(data) {
    return await College.create(data);
  }

  static async editCollege(collegeId, data) {
    return await College.findByIdAndUpdate(collegeId, { $set: data }, { new: true });
  }

  static async deleteCollege(collegeId) {
    return await College.findByIdAndUpdate(collegeId, { $set: { isDeleted: true } }, { new: true });
  }

  // Courses CRUD
  static async getCourses() {
    return await Course.find({ isDeleted: { $ne: true } }).lean();
  }

  static async addCourse(data) {
    return await Course.create(data);
  }

  static async deleteCourse(courseId) {
    return await Course.findByIdAndUpdate(courseId, { $set: { isDeleted: true } }, { new: true });
  }

  // Subjects CRUD
  static async getSubjects() {
    return await Subject.find({}).lean();
  }

  static async addSubject(data) {
    return await Subject.create(data);
  }

  static async deleteSubject(subjectId) {
    return await Subject.findByIdAndDelete(subjectId);
  }

  // Banners CRUD
  static async getBanners() {
    return await Banner.find({ isDeleted: { $ne: true } }).lean();
  }

  static async addBanner(data) {
    return await Banner.create(data);
  }

  static async toggleBanner(bannerId) {
    const banner = await Banner.findById(bannerId);
    if (!banner) return null;
    banner.isActive = !banner.isActive;
    await banner.save();
    return banner;
  }

  // Broadcast Notification
  static async broadcastNotice(title, message, category) {
    return await Notification.create({
      title,
      message,
      category: category || "general",
      createdAt: new Date()
    });
  }
}

module.exports = AdminService;
