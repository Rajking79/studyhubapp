const express = require("express");
const router = express.Router();

const GoogleAuthController = require("../controllers/googleAuth.controller");
const { validateGoogleLoginRequest } = require("../validators/googleAuth.validation");
const { extractClientMetadata } = require("../middlewares/googleAuth.middleware");
const { authRateLimiter } = require("../middlewares/rateLimiter.middleware");

router.post(
  "/google-login",
  authRateLimiter,
  validateGoogleLoginRequest,
  extractClientMetadata,
  GoogleAuthController.googleLogin
);

module.exports = router;
