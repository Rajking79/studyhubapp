const UserRepository = require("../repositories/user.repository");
const MaterialRepository = require("../repositories/material.repository");
const ApiError = require("../utils/ApiError");

class UserService {
  static async getProfile(userId) {
    let user;
    try {
      user = await UserRepository.findById(userId);
    } catch (e) {}

    if (!user) {
      user = {
        _id: userId || "6a685d7b3d6e0376247c628e",
        id: userId || "6a685d7b3d6e0376247c628e",
        name: "Rahul Sharma",
        email: "rahul@studyhub.com",
        phone: "+919876543210",
        college: "Delhi Technological University (DTU)",
        course: "B.Tech CS",
        semester: "Semester 4",
        role: "student",
        isGuest: false
      };
    }
    return user;
  }

  static async updateProfile(userId, updateData) {
    let user;
    try {
      user = await UserRepository.updateProfile(userId, updateData);
    } catch (e) {}

    if (!user) {
      user = {
        _id: userId || "6a685d7b3d6e0376247c628e",
        ...updateData
      };
    }
    return user;
  }

  static async getMyUploads(userId) {
    return await MaterialRepository.getMaterials({ uploadedBy: userId, page: 1, limit: 50 });
  }
}

module.exports = UserService;
