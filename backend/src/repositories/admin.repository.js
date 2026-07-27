const User = require("../models/User.model");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const Material = require("../models/Material.model");
const Banner = require("../models/Banner.model");
const Feedback = require("../models/Feedback.model");
const Notification = require("../models/Notification.model");

class AdminRepository {
  static async getStats() {
    const [students, colleges, subjects, materials] = await Promise.all([
      User.countDocuments({ role: "user" }),
      College.countDocuments({ isDeleted: { $ne: true } }),
      Subject.countDocuments({}),
      Material.countDocuments({ status: "approved" })
    ]);

    return {
      totalStudents: students,
      totalColleges: colleges,
      totalSubjects: subjects,
      totalMaterials: materials
    };
  }

  static async getStudents({ page = 1, limit = 20, search = "", sort = "createdAt", order = "desc" }) {
    const query = { role: "user" };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      User.find(query).select("-password").sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
      User.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async toggleBlockStudent(studentId) {
    const student = await User.findById(studentId);
    if (!student) return null;
    student.isBlocked = !student.isBlocked;
    await student.save();
    return student;
  }

  static async softDeleteStudent(studentId) {
    return await User.findByIdAndUpdate(studentId, { $set: { isBlocked: true, blockedReason: "Account soft deleted by admin" } }, { new: true });
  }

  static async getFeedbacks({ page = 1, limit = 20 }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Feedback.find({}).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Feedback.countDocuments({})
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }
}

module.exports = AdminRepository;
