const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const academicService = require("../services/academic.service");

exports.getColleges = asyncHandler(async (req, res) => {
  const colleges = await academicService.getColleges();
  return res.status(200).json(new ApiResponse(200, colleges, "Colleges list loaded"));
});

exports.getCourses = asyncHandler(async (req, res) => {
  const courses = await academicService.getCourses();
  return res.status(200).json(new ApiResponse(200, courses, "Courses list loaded"));
});

exports.getSemesters = asyncHandler(async (req, res) => {
  const semesters = [
    { semesterNumber: 1, name: "Semester 1", materialCount: 45 },
    { semesterNumber: 2, name: "Semester 2", materialCount: 38 },
    { semesterNumber: 3, name: "Semester 3", materialCount: 52 },
    { semesterNumber: 4, name: "Semester 4", materialCount: 60 },
    { semesterNumber: 5, name: "Semester 5", materialCount: 48 },
    { semesterNumber: 6, name: "Semester 6", materialCount: 75 },
    { semesterNumber: 7, name: "Semester 7", materialCount: 30 },
    { semesterNumber: 8, name: "Semester 8", materialCount: 25 }
  ];
  return res.status(200).json(new ApiResponse(200, semesters, "Semesters list loaded"));
});

exports.getSubjects = asyncHandler(async (req, res) => {
  const subjects = await academicService.getSubjects();
  return res.status(200).json(new ApiResponse(200, subjects, "Subjects list loaded"));
});
