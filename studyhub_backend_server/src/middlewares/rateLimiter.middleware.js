const rateLimit = require("express-rate-limit");
const ApiError = require("../utils/ApiError");

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    next(new ApiError(429, "Too many authentication requests from this IP. Please try again after 15 minutes."));
  }
});

const otpRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 OTP requests per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    next(new ApiError(429, "Too many OTP requests. Please wait 1 hour before requesting again."));
  }
});

module.exports = { authRateLimiter, otpRateLimiter };
