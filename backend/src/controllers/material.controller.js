const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const MaterialService = require("../services/material.service");

const getMaterials = asyncHandler(async (req, res) => {
  const result = await MaterialService.getMaterials(req.query);
  return res.status(200).json(
    new ApiResponse(200, result, "Study materials retrieved successfully", {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages
    })
  );
});

const getMaterialById = asyncHandler(async (req, res) => {
  const material = await MaterialService.getMaterialById(req.params.id);
  return res.status(200).json(new ApiResponse(200, material, "Study material details retrieved successfully"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const material = await MaterialService.uploadMaterial(req.body, req.user?._id);
  return res.status(201).json(new ApiResponse(201, material, "Study material uploaded successfully"));
});

const getPyqs = asyncHandler(async (req, res) => {
  const query = { ...req.query, category: "PYQ" };
  const result = await MaterialService.getMaterials(query);
  return res.status(200).json(new ApiResponse(200, result, "PYQs retrieved successfully"));
});

const getNotes = asyncHandler(async (req, res) => {
  const query = { ...req.query, category: "Notes" };
  const result = await MaterialService.getMaterials(query);
  return res.status(200).json(new ApiResponse(200, result, "Notes retrieved successfully"));
});

const getBooks = asyncHandler(async (req, res) => {
  const query = { ...req.query, category: "Book" };
  const result = await MaterialService.getMaterials(query);
  return res.status(200).json(new ApiResponse(200, result, "Books retrieved successfully"));
});

const getVideos = asyncHandler(async (req, res) => {
  const query = { ...req.query, category: "Video" };
  const result = await MaterialService.getMaterials(query);
  return res.status(200).json(new ApiResponse(200, result, "Videos retrieved successfully"));
});

const getQuestionBank = asyncHandler(async (req, res) => {
  const query = { ...req.query, category: "Question Bank" };
  const result = await MaterialService.getMaterials(query);
  return res.status(200).json(new ApiResponse(200, result, "Question Bank retrieved successfully"));
});

const streamVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await MaterialService.getMaterialById(videoId);
  return res.status(200).json(new ApiResponse(200, {
    videoId: video._id || videoId,
    title: video.title || "Video Lecture",
    streamUrl: video.fileUrl || "https://storage.studyhub.com/videos/sample.mp4",
    playbackQuality: ["1080p", "720p", "480p"]
  }, "Video stream link generated"));
});

const downloadMaterial = asyncHandler(async (req, res) => {
  const material = await MaterialService.recordDownload(req.params.id);
  return res.status(200).json(new ApiResponse(200, material, "Material download link & stats updated successfully"));
});

const recordDownload = downloadMaterial;

module.exports = {
  getMaterials,
  getMaterialById,
  uploadMaterial,
  recordDownload,
  getPyqs,
  getNotes,
  getBooks,
  getVideos,
  getQuestionBank,
  streamVideo,
  downloadMaterial
};
