const AdminRepository = require("../repositories/admin.repository");
const UserRepository = require("../repositories/user.repository");
const AcademicRepository = require("../repositories/academic.repository");
const MaterialRepository = require("../repositories/material.repository");
const NotificationRepository = require("../repositories/notification.repository");
const FeedbackRepository = require("../repositories/feedback.repository");
const ApiError = require("../utils/ApiError");
const { generateTokens } = require("../utils/generateTokens");

class AdminService {
  static async adminLogin({ email, password }) {
    const admin = await UserRepository.findByEmailWithPassword(email);
    if (!admin || !["admin", "super_admin"].includes(admin.role)) {
      throw new ApiError(401, "Invalid admin credentials or non-admin account.");
    }

    const isMatch = await admin.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Invalid admin credentials.");

    if (admin.isBlocked) throw new ApiError(403, "Admin account suspended.");
    if (admin.isDeleted) throw new ApiError(403, "Admin account deleted.");

    const tokens = generateTokens(admin);
    return { user: admin, token: tokens.accessToken, refreshToken: tokens.refreshToken };
  }

  static async adminRegister({ name, email, password, phone }) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new ApiError(409, "Account already exists with this email.");

    const admin = await UserRepository.createUser({
      name,
      email: email.toLowerCase().trim(),
      password,
      phone: phone || "",
      role: "admin",
      isEmailVerified: true
    });

    const tokens = generateTokens(admin);
    return { user: admin, token: tokens.accessToken, refreshToken: tokens.refreshToken };
  }

  static async getStats() {
    return await AdminRepository.getStats();
  }

  // Banner Operations
  static async getBanners() {
    return await AdminRepository.getBanners();
  }

  static async addBanner(data) {
    return await AdminRepository.createBanner(data);
  }

  static async toggleBanner(id) {
    const banner = await AdminRepository.toggleBanner(id);
    if (!banner) throw new ApiError(404, "Banner not found");
    return banner;
  }

  // Students Operations
  static async getStudents(queryParams) {
    return await UserRepository.getAllStudents(queryParams);
  }

  static async toggleBlockStudent(studentId, blockedReason) {
    const student = await UserRepository.toggleBlockStudent(studentId, blockedReason);
    if (!student) throw new ApiError(404, "Student not found");
    return student;
  }

  static async deleteStudent(studentId) {
    const student = await UserRepository.softDeleteUser(studentId);
    if (!student) throw new ApiError(404, "Student not found");
    return student;
  }

  // Notifications Broadcast
  static async broadcastNotice({ title, description, category, colorHex, targetCollege }) {
    return await NotificationRepository.createNotice({
      title,
      description,
      category: category || "Notices",
      colorHex: colorHex || "#2563EB",
      targetCollege: targetCollege || "all",
      isGlobal: true,
      userId: null
    });
  }

  // Feedback Operations
  static async getFeedback(queryParams) {
    return await FeedbackRepository.getAllFeedback(queryParams);
  }
}

module.exports = AdminService;
