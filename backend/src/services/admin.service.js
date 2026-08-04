const adminRepo = require("../repositories/admin.repository");

const getAdminStats = async () => {
  return await adminRepo.getAdminStats();
};

const getHealthStatus = async () => {
  return await adminRepo.getHealthStatus();
};

module.exports = {
  getAdminStats,
  getHealthStatus
};
