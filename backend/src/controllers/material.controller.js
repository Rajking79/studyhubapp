const materialService = require("../services/material.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getMaterials = asyncHandler(async (req, res) => {
  const { category, subjectId, collegeId, courseId, search } = req.query;
  const filters = {};
  if (category) filters.category = category;
  if (subjectId) filters.subjectId = subjectId;
  if (collegeId) filters.collegeId = collegeId;
  if (courseId) filters.courseId = courseId;

  const materials = await materialService.getMaterials(filters, search);
  return res.status(200).json(new ApiResponse(200, materials, "Study materials search results"));
});

const getPyqs = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "PYQ" }, req.query.search);
  return res.status(200).json(new ApiResponse(200, materials, "PYQ papers loaded"));
});

const getNotes = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Notes" }, req.query.search);
  return res.status(200).json(new ApiResponse(200, materials, "Notes loaded"));
});

const getBooks = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Book" }, req.query.search);
  return res.status(200).json(new ApiResponse(200, materials, "Books loaded"));
});

const getVideos = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Video" }, req.query.search);
  return res.status(200).json(new ApiResponse(200, materials, "Video lectures loaded"));
});

const getQuestionBank = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Question Bank" }, req.query.search);
  return res.status(200).json(new ApiResponse(200, materials, "Question Bank loaded"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const uploaderId = req.user?._id || "usr_mock_student_1";
  const { title, category, subjectId } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : "https://studyhubai.com/pdf/sample-notes.pdf";

  const material = await materialService.uploadMaterial(uploaderId, title, category, subjectId, fileUrl);
  return res.status(201).json(new ApiResponse(201, material, "Material uploaded successfully and submitted for admin review"));
});

module.exports = {
  getMaterials,
  getPyqs,
  getNotes,
  getBooks,
  getVideos,
  getQuestionBank,
  uploadMaterial
};
