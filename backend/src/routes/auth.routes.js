const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");

// Public Auth Endpoints
router.post("/register", authRateLimiter, registerValidator, validate, authController.register);
router.post("/login", authRateLimiter, loginValidator, validate, authController.login);
router.post("/sign-in", authRateLimiter, authController.login); // Legacy Alias
router.post("/dev-login", authController.devLogin);
router.post("/guest-login", authController.guestLogin);
router.post("/google-login", authController.googleLogin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/resend-otp", authController.resendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

// Protected Auth Endpoints
router.get("/me", authenticate, authController.getMe);
router.post("/logout", authenticate, authController.logout);
router.post("/logout-all-devices", authenticate, authController.logoutAllDevices);

module.exports = router;
