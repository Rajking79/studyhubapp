const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getMyUploads } = require("../controllers/user.controller");
const { getSettings, updateSettings } = require("../controllers/setting.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/profile", verifyJWT, getProfile);
router.put("/profile", verifyJWT, updateProfile);
router.get("/uploads", verifyJWT, getMyUploads);
router.get("/settings", verifyJWT, getSettings);
router.patch("/settings", verifyJWT, updateSettings);

module.exports = router;
