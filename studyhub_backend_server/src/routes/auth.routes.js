const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  forgotPassword,
  resendOtp,
  verifyOtp,
  resetPassword,
  refreshAccessToken,
  verifyEmail,
  resendEmailVerification,
  getCurrentUser,
  changePassword,
  getLoginHistory,
  logoutUser,
  logoutAllDevices,
  deleteAccount
} = require("../controllers/auth.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");
const {
  validateRegisterInput,
  validateLoginInput,
  validateGoogleLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResendOtp,
  validateVerifyOtp,
  validateResetPassword,
  validateVerifyEmail,
  validateRefreshToken
} = require("../validators/auth.validator");

// ==========================================
// PUBLIC AUTH APIs (Accessible without Login)
// ==========================================
router.post("/register", authRateLimiter, validateRegisterInput, registerUser);
router.post("/login", authRateLimiter, validateLoginInput, loginUser);
router.post("/google-login", validateGoogleLogin, googleLogin);
router.post("/guest-login", guestLogin);
router.post("/forgot-password", authRateLimiter, validateForgotPassword, forgotPassword);
router.post("/resend-otp", authRateLimiter, validateResendOtp, resendOtp);
router.post("/verify-otp", validateVerifyOtp, verifyOtp);
router.post("/reset-password", validateResetPassword, resetPassword);
router.post("/refresh-token", validateRefreshToken, refreshAccessToken);
router.post("/verify-email", validateVerifyEmail, verifyEmail);
router.post("/resend-email-verification", authRateLimiter, resendEmailVerification);

// ==========================================
// PROTECTED AUTH APIs (Requires Student JWT)
// ==========================================
router.get("/me", verifyJWT, getCurrentUser);
router.post("/change-password", verifyJWT, validateChangePassword, changePassword);
router.get("/login-history", verifyJWT, getLoginHistory);
router.post("/logout", verifyJWT, logoutUser);
router.post("/logout-all-devices", verifyJWT, logoutAllDevices);
router.delete("/delete-account", verifyJWT, deleteAccount);

module.exports = router;
