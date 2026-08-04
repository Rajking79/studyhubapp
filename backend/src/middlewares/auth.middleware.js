const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.startsWith("Bearer "))
    ? authHeader.split(" ")[1]
    : req.cookies?.accessToken || req.body?.accessToken;

  if (!token) {
    throw new ApiError(401, "Authentication token missing");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_key_2026_x99"
    );
    req.user = {
      _id: decoded._id,
      role: decoded.role || "student",
      isGuest: decoded.role === "guest"
    };
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});

const verifyAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "super_admin")) {
    return next(new ApiError(403, "Access denied: Admin role required"));
  }
  next();
};

const restrictGuest = (req, res, next) => {
  if (req.user && req.user.isGuest) {
    return next(new ApiError(403, "Guest users are restricted from performing this action. Please register."));
  }
  next();
};

module.exports = {
  authenticate,
  verifyJWT: authenticate,
  verifyAdmin,
  restrictGuest
};
