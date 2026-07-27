const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const dataStore = require("../services/dataStore");

// 1. Get Colleges List (Sync with Admin Store)
const getColleges = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.colleges, "Colleges list fetched from Master Store"));
});

// 2. Get Single College Details
const getCollegeById = asyncHandler(async (req, res) => {
  const college = dataStore.colleges.find(c => c.id === req.params.collegeId) || dataStore.colleges[0];
  return res.status(200).json(new ApiResponse(200, college, "College details fetched"));
});

// 3. Get Courses List
const getCourses = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.courses, "Courses fetched from Master Store"));
});

// 4. Get Academic Years
const getYears = asyncHandler(async (req, res) => {
  const years = [
    { id: "y1", year: "1st Year", description: "Semesters 1 & 2" },
    { id: "y2", year: "2nd Year", description: "Semesters 3 & 4" },
    { id: "y3", year: "3rd Year", description: "Semesters 5 & 6" },
    { id: "y4", year: "4th Year", description: "Semesters 7 & 8" }
  ];
  return res.status(200).json(new ApiResponse(200, years, "Years fetched"));
});

// 5. Get Semesters
const getSemesters = asyncHandler(async (req, res) => {
  const semesters = [
    { id: "sem3", semester: "Semester 3" },
    { id: "sem4", semester: "Semester 4" }
  ];
  return res.status(200).json(new ApiResponse(200, semesters, "Semesters fetched"));
});

// 6. Get Subjects List (Sync with Admin Store)
const getSubjects = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.subjects, "Subjects fetched from Master Store"));
});

// 7. Get Single Subject Details
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = dataStore.subjects.find(s => s.id === req.params.subjectId) || dataStore.subjects[0];
  return res.status(200).json(new ApiResponse(200, subject, "Subject details fetched"));
});

module.exports = {
  getColleges,
  getCollegeById,
  getCourses,
  getYears,
  getSemesters,
  getSubjects,
  getSubjectById
};
