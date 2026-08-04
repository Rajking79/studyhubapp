const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/download.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/", downloadController.getMyDownloads);
router.get("/my-downloads", downloadController.getMyDownloads);
router.post("/sync", downloadController.syncDownloads);

module.exports = router;
