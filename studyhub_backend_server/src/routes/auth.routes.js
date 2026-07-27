const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  logoutUser,
  getCurrentUser
} = require("../controllers/auth.controller");

const { verifyJWT } = require("../middlewares/auth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");
const {
  validateRegisterInput,
  validateLoginInput,
  validateGoogleLogin
} = require("../validators/auth.validator");

// Public Auth Endpoints
router.post("/register", authRateLimiter, validateRegisterInput, registerUser);
router.post("/login", authRateLimiter, validateLoginInput, loginUser);
router.post("/google-login", validateGoogleLogin, googleLogin);
router.post("/guest-login", guestLogin);

// Authenticated User Endpoints
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);

module.exports = router;
