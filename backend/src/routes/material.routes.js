const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.get("/materials", materialController.getMaterials);
router.get("/pyqs", materialController.getPYQs);
router.get("/notes", materialController.getNotes);
router.get("/books", materialController.getBooks);
router.get("/videos", materialController.getVideos);
router.get("/question-bank", materialController.getQuestionBank);

router.post("/materials/upload", authenticate, restrictGuest, upload.single("file"), materialController.uploadMaterial);
router.post("/materials/:id/download", authenticate, materialController.trackDownload);

module.exports = router;
