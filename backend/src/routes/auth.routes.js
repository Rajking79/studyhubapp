const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");

router.post("/register", authRateLimiter, authController.register);
router.post("/login", authRateLimiter, authController.login);
router.post("/dev-login", authController.devLogin);
router.post("/guest-login", authController.guestLogin);
router.post("/google-login", authController.googleLogin);
router.post("/forgot-password", authRateLimiter, authController.forgotPassword);
router.post("/resend-otp", authRateLimiter, authController.resendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/refresh-token", authController.refreshToken);

router.get("/me", authenticate, authController.getMe);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
