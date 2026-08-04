const userRepo = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

const getUserProfile = async (userId) => {
  const user = await userRepo.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User profile not found");
  }
  return user;
};

const updateUserProfile = async (userId, updateData) => {
  return await userRepo.updateUserProfile(userId, updateData);
};

const exportUserData = async (userId) => {
  const user = await userRepo.findUserById(userId);
  return {
    exportDate: new Date(),
    profile: user,
    privacyNotice: "GDPR Article 20 Compliant Personal Data Export Report"
  };
};

const softDeleteUser = async (userId) => {
  return await userRepo.softDeleteUser(userId);
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  exportUserData,
  softDeleteUser
};
