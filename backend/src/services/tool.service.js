const toolRepository = require("../repositories/tool.repository");

class ToolService {
  async getCGPA(userId) {
    return await toolRepository.getCGPA(userId);
  }

  async getAttendance(userId) {
    return await toolRepository.getAttendance(userId);
  }
}

module.exports = new ToolService();
