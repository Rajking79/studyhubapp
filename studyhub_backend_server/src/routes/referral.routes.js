const express = require("express");
const router = express.Router();
const { getReferralCode, applyReferralCode } = require("../controllers/referral.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/my-code", verifyJWT, getReferralCode);
router.post("/apply", verifyJWT, applyReferralCode);

module.exports = router;
