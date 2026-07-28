const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getMyUploads } = require("../controllers/user.controller");
const { getSettings, updateSettings } = require("../controllers/setting.controller");
const { getReferralCode, applyReferralCode } = require("../controllers/referral.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");
const { validateProfileUpdate } = require("../validators/user.validator");

router.get("/profile", verifyJWT, getProfile);
router.put("/profile", verifyJWT, restrictGuest, validateProfileUpdate, updateProfile);
router.get("/uploads", verifyJWT, getMyUploads);
router.get("/settings", verifyJWT, getSettings);
router.patch("/settings", verifyJWT, updateSettings);

// Invite Friends / Referral System
router.get("/referral", verifyJWT, getReferralCode);
router.post("/referral/apply", verifyJWT, applyReferralCode);

module.exports = router;
