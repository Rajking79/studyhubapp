const UserRepository = require("../repositories/user.repository");
const MaterialRepository = require("../repositories/material.repository");
const ApiError = require("../utils/ApiError");

class UserService {
  static async getProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new ApiError(404, "User profile not found");
    return user;
  }

  static async updateProfile(userId, updateData) {
    const user = await UserRepository.updateProfile(userId, updateData);
    if (!user) throw new ApiError(404, "User profile not found");
    return user;
  }

  static async getMyUploads(userId) {
    return await MaterialRepository.getMaterials({ uploadedBy: userId, page: 1, limit: 50 });
  }
}

module.exports = UserService;
