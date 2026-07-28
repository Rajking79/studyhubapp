const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AcademicService = require("../services/academic.service");

// 1. Get Colleges List
const getColleges = asyncHandler(async (req, res) => {
  const result = await AcademicService.getColleges(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Colleges list retrieved successfully from MongoDB", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

// 2. Get Single College Details
const getCollegeById = asyncHandler(async (req, res) => {
  const college = await AcademicService.getCollegeById(req.params.collegeId);
  return res.status(200).json(new ApiResponse(200, college, "College details retrieved successfully"));
});

// 3. Step 1: Choose Course
const getCourses = asyncHandler(async (req, res) => {
  const result = await AcademicService.getCourses(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Courses list retrieved successfully from MongoDB", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

// 4. Step 2: Select Academic Year (Query MongoDB Year Collection)
const getYears = asyncHandler(async (req, res) => {
  const years = await AcademicService.getYears(req.query);
  return res.status(200).json(new ApiResponse(200, { years }, "Academic years retrieved successfully from MongoDB"));
});

// 5. Step 3: Select Semester (Query MongoDB Semester Collection)
const getSemesters = asyncHandler(async (req, res) => {
  const semesters = await AcademicService.getSemesters(req.query);
  return res.status(200).json(new ApiResponse(200, { semesters }, "Semesters retrieved successfully from MongoDB"));
});

// 6. Step 4: Select Subjects
const getSubjects = asyncHandler(async (req, res) => {
  const result = await AcademicService.getSubjects(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Subjects list retrieved successfully from MongoDB", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

// 7. Step 5: Subject Details Screen
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await AcademicService.getSubjectById(req.params.subjectId);
  return res.status(200).json(new ApiResponse(200, subject, "Subject details retrieved successfully from MongoDB"));
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
