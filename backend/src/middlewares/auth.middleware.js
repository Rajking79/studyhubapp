const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("x-access-token");

    if (!token) {
      throw new ApiError(401, "Authentication token missing. Please login.");
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026"
      );
    } catch (err) {
      throw new ApiError(401, "Invalid or expired access token. Please refresh token or login again.");
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid token. User no longer exists.");
    }

    if (user.isBlocked) {
      throw new ApiError(403, `Account disabled. Reason: ${user.blockedReason || 'Violation of terms'}`);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin privileges required.");
  }
  next();
});

// Guest Permission Restriction Middleware
const restrictGuest = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isGuest) {
    throw new ApiError(
      403,
      "Guest users are restricted from performing this action. Please register or login to unlock full access."
    );
  }
  next();
});

module.exports = { verifyJWT, verifyAdmin, restrictGuest };
