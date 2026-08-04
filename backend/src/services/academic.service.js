const academicRepository = require("../repositories/academic.repository");

class AcademicService {
  async getColleges() {
    return await academicRepository.getColleges();
  }

  async getCourses() {
    return await academicRepository.getCourses();
  }

  async getSubjects() {
    return await academicRepository.getSubjects();
  }
}

module.exports = new AcademicService();
