const AcademicRepository = require("../repositories/academic.repository");
const ApiError = require("../utils/ApiError");

class AcademicService {
  static async getColleges(queryParams) {
    return await AcademicRepository.getColleges(queryParams);
  }

  static async getCollegeById(collegeId) {
    const college = await AcademicRepository.getCollegeById(collegeId);
    if (!college) throw new ApiError(404, "College not found");
    return college;
  }

  static async getCourses(queryParams) {
    return await AcademicRepository.getCourses(queryParams);
  }

  static async getSubjects(queryParams) {
    return await AcademicRepository.getSubjects(queryParams);
  }

  static async getSubjectById(subjectId) {
    const subject = await AcademicRepository.getSubjectById(subjectId);
    if (!subject) throw new ApiError(404, "Subject not found");
    return subject;
  }
}

module.exports = AcademicService;
