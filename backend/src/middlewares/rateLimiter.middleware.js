const rateLimit = require("express-rate-limit");

const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests from this IP, please try again after a minute."
  }
});

const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, // 10 auth requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: "Too many authentication attempts, please try again later."
  }
});

module.exports = {
  globalRateLimiter,
  authRateLimiter
};
