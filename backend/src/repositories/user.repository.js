const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");

class UserRepository {
  static async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase().trim() });
  }

  static async findByEmailWithPassword(email) {
    return await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  }

  static async findByPhone(phone) {
    return await User.findOne({ phone: phone.trim() });
  }

  static async findById(id) {
    return await User.findById(id).select("-password").lean();
  }

  static async findByIdWithPassword(id) {
    return await User.findById(id).select("+password");
  }

  static async createUser(userData) {
    return await User.create(userData);
  }

  static async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password").lean();
  }

  static async updateProfile(id, updateData) {
    return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password").lean();
  }

  static async softDeleteUser(id) {
    return await User.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date(), isActive: false } }, { new: true });
  }

  static async saveUserInstance(userInstance) {
    return await userInstance.save();
  }

  static async toggleBookmark(userId, targetType, targetId) {
    const existing = await Favorite.findOne({ userId, targetType, targetId });
    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      await User.findByIdAndUpdate(userId, { $inc: { favoritesCount: -1 } });
      return { isBookmarked: false };
    } else {
      await Favorite.create({ userId, targetType, targetId });
      await User.findByIdAndUpdate(userId, { $inc: { favoritesCount: 1 } });
      return { isBookmarked: true };
    }
  }

  static async getBookmarks(userId) {
    return await Favorite.find({ userId }).sort({ createdAt: -1 }).lean();
  }

  static async getAllStudents({ search = "", page = 1, limit = 20, isBlocked }) {
    const query = { role: { $in: ["user", "student", "guest"] }, isDeleted: { $ne: true } };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }
    if (isBlocked !== undefined) {
      query.isBlocked = isBlocked === "true" || isBlocked === true;
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      User.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async toggleBlockStudent(studentId, blockedReason = "") {
    const student = await User.findById(studentId);
    if (!student) return null;
    student.isBlocked = !student.isBlocked;
    if (student.isBlocked) {
      student.blockedReason = blockedReason || "Terms violation";
    } else {
      student.blockedReason = "";
    }
    await student.save();
    return student;
  }
}

module.exports = UserRepository;
