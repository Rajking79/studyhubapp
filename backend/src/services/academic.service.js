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

  static async createCollege(data) {
    return await AcademicRepository.createCollege(data);
  }

  static async updateCollege(id, data) {
    const college = await AcademicRepository.updateCollege(id, data);
    if (!college) throw new ApiError(404, "College not found");
    return college;
  }

  static async toggleFeaturedCollege(id) {
    const college = await AcademicRepository.toggleFeaturedCollege(id);
    if (!college) throw new ApiError(404, "College not found");
    return college;
  }

  static async deleteCollege(id) {
    const college = await AcademicRepository.softDeleteCollege(id);
    if (!college) throw new ApiError(404, "College not found");
    return college;
  }

  static async getCourses(queryParams) {
    return await AcademicRepository.getCourses(queryParams);
  }

  static async createCourse(data) {
    return await AcademicRepository.createCourse(data);
  }

  static async updateCourse(id, data) {
    const course = await AcademicRepository.updateCourse(id, data);
    if (!course) throw new ApiError(404, "Course not found");
    return course;
  }

  static async deleteCourse(id) {
    const course = await AcademicRepository.softDeleteCourse(id);
    if (!course) throw new ApiError(404, "Course not found");
    return course;
  }

  static async getYears(queryParams) {
    return await AcademicRepository.getYears(queryParams);
  }

  static async getSemesters(queryParams) {
    return await AcademicRepository.getSemesters(queryParams);
  }

  static async getSubjects(queryParams) {
    return await AcademicRepository.getSubjects(queryParams);
  }

  static async getSubjectById(subjectId) {
    const subject = await AcademicRepository.getSubjectById(subjectId);
    if (!subject) throw new ApiError(404, "Subject not found");
    return subject;
  }

  static async createSubject(data) {
    return await AcademicRepository.createSubject(data);
  }

  static async updateSubject(id, data) {
    const subject = await AcademicRepository.updateSubject(id, data);
    if (!subject) throw new ApiError(404, "Subject not found");
    return subject;
  }

  static async deleteSubject(id) {
    const subject = await AcademicRepository.softDeleteSubject(id);
    if (!subject) throw new ApiError(404, "Subject not found");
    return subject;
  }
}

module.exports = AcademicService;
