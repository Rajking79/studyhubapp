const express = require("express");
const router = express.Router();
const referralController = require("../controllers/referral.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/my-code", referralController.getReferralCode);
router.post("/apply", restrictGuest, referralController.applyReferralCode);

module.exports = router;
