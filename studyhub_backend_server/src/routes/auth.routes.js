const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  logoutUser,
  forgotPassword,
  resendOTP,
  verifyOTP,
  resetPassword
} = require("../controllers/auth.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/guest-login", guestLogin);
router.post("/logout", verifyJWT, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
