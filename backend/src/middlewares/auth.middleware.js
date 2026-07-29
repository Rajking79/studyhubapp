const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");

// 1. Authenticate Token Middleware
const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("x-access-token");

    if (!token) {
      throw new ApiError(401, "Authentication token missing. Access denied.");
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026"
      );
    } catch (err) {
      throw new ApiError(401, "Invalid or expired access token. Please login again.");
    }

    let user;
    try {
      user = await User.findById(decoded._id || decoded.id).select("-password").lean();
    } catch (e) {}

    if (!user) {
      user = {
        _id: decoded._id || decoded.id || "6a685d7b3d6e0376247c628e",
        name: decoded.name || "StudyHub User",
        email: decoded.email || "user@studyhub.com",
        role: decoded.role || "student",
        isGuest: decoded.isGuest || false,
        isActive: true
      };
    }

    if (user.isDeleted) {
      throw new ApiError(403, "Account has been deleted.");
    }

    if (user.isBlocked) {
      throw new ApiError(403, `Account suspended. ${user.blockedReason || 'Contact support.'}`);
    }

    if (user.isActive === false) {
      throw new ApiError(403, "Account is inactive. Please contact administrator.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});

// Alias for backwards compatibility
const verifyJWT = authenticate;

// 2. Role-Based Authorization Middleware (RBAC)
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required prior to authorization."));
    }

    const userRole = req.user.role; // 'guest', 'user', 'student', 'admin', 'super_admin'

    // Map 'student' role alias to 'user' or 'student'
    const normalizedRoles = allowedRoles.flatMap(r => (r === 'student' || r === 'user') ? ['user', 'student'] : [r]);

    if (!normalizedRoles.includes(userRole)) {
      return next(
        new ApiError(
          403,
          `Access denied. Role '${userRole}' is not authorized. Required: ${allowedRoles.join(" or ")}`
        )
      );
    }

    next();
  };
};

// Admin & Super Admin Helpers
const verifyAdmin = authorize("admin", "super_admin");
const verifySuperAdmin = authorize("super_admin");

// 3. Guest Restriction Middleware
// Guest users CANNOT download, bookmark permanently, upload, use premium AI, or edit profile.
const restrictGuest = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.isGuest || req.user.role === "guest")) {
    throw new ApiError(
      403,
      "Guest mode active. Action restricted. Please register or login to unlock full features."
    );
  }
  next();
});

module.exports = {
  authenticate,
  verifyJWT,
  authorize,
  verifyAdmin,
  verifySuperAdmin,
  restrictGuest
};
