const express = require("express");
const router = express.Router();
const {
  getMaterials,
  getMaterialById,
  uploadMaterial,
  recordDownload
} = require("../controllers/material.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const { validateUploadMaterial } = require("../validators/material.validator");

router.get("/materials", getMaterials);
router.get("/materials/:id", getMaterialById);
router.post("/materials/upload", verifyJWT, restrictGuest, upload.single("file"), validateUploadMaterial, uploadMaterial);
router.post("/materials/:id/download", verifyJWT, restrictGuest, recordDownload);

module.exports = router;
