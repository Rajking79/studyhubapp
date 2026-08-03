const mongoose = require("mongoose");
const User = require("../models/User.model");
const Favorite = require("../models/Favorite.model");

class UserRepository {
  static async findByEmail(email) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findOne({ email: email.toLowerCase().trim() }); } catch(e) {}
    }
    return null;
  }

  static async findByEmailWithPassword(email) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findOne({ email: email.toLowerCase().trim() }).select("+password"); } catch(e) {}
    }
    return null;
  }

  static async findByPhone(phone) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findOne({ phone: phone.trim() }); } catch(e) {}
    }
    return null;
  }

  static async findById(id) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findById(id).select("-password").lean(); } catch(e) {}
    }
    return null;
  }

  static async findByIdWithPassword(id) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findById(id).select("+password"); } catch(e) {}
    }
    return null;
  }

  static async createUser(userData) {
    return await User.create(userData);
  }

  static async updateUser(id, updateData) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password").lean(); } catch (e) {}
    }
    return { _id: id, ...updateData };
  }

  static async updateProfile(id, updateData) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select("-password").lean(); } catch (e) {}
    }
    return { _id: id, ...updateData };
  }

  static async softDeleteUser(id) {
    if (mongoose.connection.readyState === 1) {
      try { return await User.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date(), isActive: false } }, { new: true }); } catch (e) {}
    }
    return { _id: id, isDeleted: true };
  }

  static async saveUserInstance(userInstance) {
    if (mongoose.connection.readyState === 1) {
      try { return await userInstance.save(); } catch (e) {}
    }
    return userInstance;
  }

  static async toggleBookmark(userId, targetType, targetId) {
    if (mongoose.connection.readyState === 1) {
      try {
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
      } catch (e) {}
    }
    return { isBookmarked: true, targetType, targetId };
  }

  static async getBookmarks(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Favorite.find({ userId }).sort({ createdAt: -1 }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.favorites || [];
  }

  static async getAllStudents({ search = "", page = 1, limit = 20, isBlocked }) {
    if (mongoose.connection.readyState === 1) {
      try {
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

        if (items && items.length > 0) {
          return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
        }
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    const fallback = dataStore.users || [];
    return { items: fallback, total: fallback.length, page: Number(page), limit: Number(limit), totalPages: 1 };
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
