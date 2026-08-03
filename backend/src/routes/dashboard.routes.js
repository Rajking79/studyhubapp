const express = require("express");
const router = express.Router();
const {
  getHomeFeed,
  getBanners,
  getContinueReading,
  updateProgress,
  globalSearch
} = require("../controllers/dashboard.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/home", verifyJWT, getHomeFeed);
router.get("/student", verifyJWT, getHomeFeed);
router.get("/admin", verifyJWT, getHomeFeed);
router.get("/banners", getBanners);
router.get("/continue-reading", verifyJWT, getContinueReading);
router.post("/update-progress", verifyJWT, updateProgress);
router.get("/search", globalSearch);

module.exports = router;
