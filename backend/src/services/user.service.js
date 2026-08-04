const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

class UserService {
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new ApiError(404, "User profile not found");
    return user;
  }

  async updateProfile(userId, updateData) {
    return await userRepository.updateById(userId, updateData);
  }
}

module.exports = new UserService();
