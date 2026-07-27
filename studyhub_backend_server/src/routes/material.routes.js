const express = require("express");
const router = express.Router();
const {
  getMaterials,
  getMaterialById,
  uploadMaterial,
  recordDownload
} = require("../controllers/material.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.get("/materials", getMaterials);
router.get("/materials/:id", getMaterialById);
router.post("/materials/upload", verifyJWT, upload.single("file"), uploadMaterial);
router.post("/materials/:id/download", verifyJWT, recordDownload);

module.exports = router;
