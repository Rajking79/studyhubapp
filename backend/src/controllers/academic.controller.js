const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AcademicService = require("../services/academic.service");

const getColleges = asyncHandler(async (req, res) => {
  const result = await AcademicService.getColleges(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Colleges list retrieved successfully", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

const getCollegeById = asyncHandler(async (req, res) => {
  const college = await AcademicService.getCollegeById(req.params.collegeId);
  return res.status(200).json(new ApiResponse(200, college, "College details retrieved successfully"));
});

const getCourses = asyncHandler(async (req, res) => {
  const result = await AcademicService.getCourses(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Courses list retrieved successfully", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

const getYears = asyncHandler(async (req, res) => {
  const years = [
    { year: 1, name: "1st Year", label: "Freshman Year" },
    { year: 2, name: "2nd Year", label: "Sophomore Year" },
    { year: 3, name: "3rd Year", label: "Junior Year" },
    { year: 4, name: "4th Year", label: "Senior Year" }
  ];
  return res.status(200).json(new ApiResponse(200, { years }, "Academic years list retrieved successfully"));
});

const getSemesters = asyncHandler(async (req, res) => {
  const yearNum = Number(req.query.year || 2);
  const sem1 = yearNum * 2 - 1;
  const sem2 = yearNum * 2;
  const semesters = [
    { semester: sem1, name: `Semester ${sem1}`, label: `Sem ${sem1}` },
    { semester: sem2, name: `Semester ${sem2}`, label: `Sem ${sem2}` }
  ];
  return res.status(200).json(new ApiResponse(200, { year: yearNum, semesters }, "Semesters list retrieved successfully"));
});

const getSubjects = asyncHandler(async (req, res) => {
  const result = await AcademicService.getSubjects(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Subjects list retrieved successfully", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await AcademicService.getSubjectById(req.params.subjectId);
  return res.status(200).json(new ApiResponse(200, subject, "Subject details retrieved successfully"));
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
