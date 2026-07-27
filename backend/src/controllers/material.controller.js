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

const recordDownload = asyncHandler(async (req, res) => {
  const material = await MaterialService.recordDownload(req.params.id);
  return res.status(200).json(new ApiResponse(200, material, "Material download recorded successfully"));
});

module.exports = {
  getMaterials,
  getMaterialById,
  uploadMaterial,
  recordDownload
};
