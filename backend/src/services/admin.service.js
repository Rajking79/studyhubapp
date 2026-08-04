class AdminService {
  async getStats() {
    return {
      totalStudents: 12450,
      totalColleges: 85,
      totalCourses: 32,
      totalMaterials: 15800,
      pendingUploads: 14,
      serverUptimeSeconds: 184520
    };
  }
}

module.exports = new AdminService();
