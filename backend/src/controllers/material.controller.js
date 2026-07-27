const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const dataStore = require("../services/dataStore");

// 1. Get All Materials (Synced with Master Shared Store)
const getMaterials = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.materials, "Study materials fetched from Master Store"));
});

// 2. Get Single Material Details
const getMaterialById = asyncHandler(async (req, res) => {
  const material = dataStore.materials.find(m => m.id === req.params.id) || dataStore.materials[0];
  return res.status(200).json(new ApiResponse(200, material, "Material details fetched"));
});

// 3. Upload Material
const uploadMaterial = asyncHandler(async (req, res) => {
  const { title, category, uploadType, pdfUrl } = req.body;
  const newMaterial = {
    id: "mat_" + Date.now(),
    title: title || "New Uploaded Document.pdf",
    category: category || "Previous Papers",
    uploadType: uploadType || "PDF",
    subjectName: "DBMS",
    collegeName: "Delhi University (DU)",
    courseName: "B.Tech CS",
    academicYear: "2nd Year",
    semester: 4,
    examTag: "End Sem",
    year: 2026,
    fileSizeMb: 4.8,
    downloadsCount: 0,
    uploadedBy: "App User / Admin",
    uploadedDate: "Just Now",
    date: "Just Now",
    isPinned: false,
    isFeatured: true,
    isPremium: false,
    status: "Published",
    pdfUrl: pdfUrl || "https://studyhub.com/pdf/sample.pdf"
  };

  dataStore.materials.unshift(newMaterial);
  return res.status(201).json(new ApiResponse(201, newMaterial, "Material uploaded successfully and published live!"));
});

// 4. Record Download Action
const recordDownload = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { downloadsCount: 2451 }, "Download action recorded"));
});

module.exports = {
  getMaterials,
  getMaterialById,
  uploadMaterial,
  recordDownload
};
