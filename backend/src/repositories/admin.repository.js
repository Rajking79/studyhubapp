const { mockUsers, mockColleges, mockCourses, mockSubjects, mockMaterials } = require("../services/dataStore");

const getAdminStats = async () => {
  return {
    totalStudents: 1250,
    totalColleges: mockColleges.length,
    totalCourses: mockCourses.length,
    totalSubjects: mockSubjects.length,
    totalMaterials: mockMaterials.length,
    pendingUploads: 3,
    activeBanners: 2,
    serverUptimeSeconds: process.uptime()
  };
};

const getHealthStatus = async () => {
  return {
    server: "UP",
    uptime: process.uptime(),
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    database: "CONNECTED (Mock Engine Active)"
  };
};

module.exports = {
  getAdminStats,
  getHealthStatus
};
