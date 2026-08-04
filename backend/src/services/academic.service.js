const academicRepo = require("../repositories/academic.repository");

const getColleges = async (search) => {
  return await academicRepo.getColleges(search ? { name: new RegExp(search, "i") } : {});
};

const getCourses = async (collegeId) => {
  return await academicRepo.getCourses(collegeId);
};

const getSemesters = async (courseId) => {
  return await academicRepo.getSemesters(courseId);
};

const getSubjects = async (courseId, semesterNumber) => {
  return await academicRepo.getSubjects(courseId, semesterNumber);
};

module.exports = {
  getColleges,
  getCourses,
  getSemesters,
  getSubjects
};
