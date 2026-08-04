const academicService = require("../services/academic.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getColleges = asyncHandler(async (req, res) => {
  const search = req.query.search || req.query.q;
  const colleges = await academicService.getColleges(search);
  return res.status(200).json(new ApiResponse(200, colleges, "Colleges list loaded"));
});

const getCourses = asyncHandler(async (req, res) => {
  const collegeId = req.query.collegeId;
  const courses = await academicService.getCourses(collegeId);
  return res.status(200).json(new ApiResponse(200, courses, "Courses list loaded"));
});

const getSemesters = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;
  const semesters = await academicService.getSemesters(courseId);
  return res.status(200).json(new ApiResponse(200, semesters, "Semesters list loaded"));
});

const getSubjects = asyncHandler(async (req, res) => {
  const { courseId, semesterNumber } = req.query;
  const subjects = await academicService.getSubjects(courseId, semesterNumber);
  return res.status(200).json(new ApiResponse(200, subjects, "Subjects list loaded"));
});

module.exports = {
  getColleges,
  getCourses,
  getSemesters,
  getSubjects
};
