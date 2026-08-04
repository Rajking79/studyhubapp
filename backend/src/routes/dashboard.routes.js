const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.get("/home", dashboardController.getHomeFeed);
router.get("/banners", dashboardController.getHomeFeed);
router.get("/continue-reading", authenticate, dashboardController.getContinueReading);
router.post("/update-progress", authenticate, dashboardController.updateProgress);
router.get("/search", dashboardController.globalSearch);

module.exports = router;
