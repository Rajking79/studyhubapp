const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/material.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const { validateUploadMaterial } = require("../validators/material.validator");

// Public & Category Materials APIs
router.get("/materials", getMaterials);
router.get("/pyqs", getPyqs);
router.get("/notes", getNotes);
router.get("/books", getBooks);
router.get("/videos", getVideos);
router.get("/question-bank", getQuestionBank);
router.get("/videos/:id/stream", streamVideo);
router.get("/materials/:id", getMaterialById);

// Restricted Guest / Authenticated Actions
router.get("/materials/:id/download", verifyJWT, restrictGuest, downloadMaterial);
router.post("/materials/:id/download", verifyJWT, restrictGuest, recordDownload);
router.post("/materials/upload", verifyJWT, restrictGuest, upload.single("file"), validateUploadMaterial, uploadMaterial);

module.exports = router;
