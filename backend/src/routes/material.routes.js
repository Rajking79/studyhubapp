const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

// Public Material Search Endpoints
router.get("/materials", materialController.getMaterials);
router.get("/pyqs", materialController.getPyqs);
router.get("/notes", materialController.getNotes);
router.get("/books", materialController.getBooks);
router.get("/videos", materialController.getVideos);
router.get("/question-bank", materialController.getQuestionBank);

// Protected Material Upload Endpoint
router.post("/materials/upload", authenticate, restrictGuest, upload.single("file"), materialController.uploadMaterial);

module.exports = router;
