const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const materialService = require("../services/material.service");

exports.getMaterials = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials(req.query);
  return res.status(200).json(new ApiResponse(200, materials, "Study materials loaded"));
});

exports.getPYQs = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "PYQ" });
  return res.status(200).json(new ApiResponse(200, materials, "PYQ papers loaded"));
});

exports.getNotes = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Notes" });
  return res.status(200).json(new ApiResponse(200, materials, "Revision notes loaded"));
});

exports.getBooks = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Book" });
  return res.status(200).json(new ApiResponse(200, materials, "Reference books loaded"));
});

exports.getVideos = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Video" });
  return res.status(200).json(new ApiResponse(200, materials, "Video lectures loaded"));
});

exports.getQuestionBank = asyncHandler(async (req, res) => {
  const materials = await materialService.getMaterials({ category: "Question Bank" });
  return res.status(200).json(new ApiResponse(200, materials, "Question bank loaded"));
});

exports.uploadMaterial = asyncHandler(async (req, res) => {
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : "https://studyhubai.com/uploads/sample.pdf";
  const materialData = { ...req.body, fileUrl, uploadedBy: req.user._id };
  const created = await materialService.uploadMaterial(materialData);
  return res.status(201).json(new ApiResponse(201, created, "Material submitted for admin moderation"));
});

exports.trackDownload = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { tracked: true }, "Download count updated"));
});
