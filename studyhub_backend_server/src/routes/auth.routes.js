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
  resetPassword,
  refreshToken,
  getCurrentUser,
  changePassword,
  verifyEmail,
  resendEmailVerification,
  getLoginHistory,
  logoutAllDevices,
  deleteAccount
} = require("../controllers/auth.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");
const { authRateLimiter, otpRateLimiter } = require("../middlewares/rateLimiter.middleware");
const { validateRegisterInput, validateLoginInput } = require("../validators/auth.validator");

// Public Auth Endpoints
router.post("/register", validateRegisterInput, authRateLimiter, registerUser);
router.post("/login", validateLoginInput, authRateLimiter, loginUser);
router.post("/google-login", googleLogin);
router.post("/guest-login", guestLogin);

// Password Recovery Endpoints
router.post("/forgot-password", otpRateLimiter, forgotPassword);
router.post("/resend-otp", otpRateLimiter, resendOTP);
router.post("/verify-otp", otpRateLimiter, verifyOTP);
router.post("/reset-password", resetPassword);

// Token Refresh
router.post("/refresh-token", refreshToken);

// Email Verification
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification", resendEmailVerification);

// Authenticated User Endpoints (Protected by verifyJWT)
router.get("/me", verifyJWT, getCurrentUser);
router.post("/change-password", verifyJWT, changePassword);
router.get("/login-history", verifyJWT, getLoginHistory);
router.post("/logout", verifyJWT, logoutUser);
router.post("/logout-all-devices", verifyJWT, logoutAllDevices);
router.delete("/delete-account", verifyJWT, deleteAccount);

module.exports = router;
