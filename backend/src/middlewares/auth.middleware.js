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
      throw new ApiError(401, "Authentication token missing. Please login.");
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026"
      );
    } catch (err) {
      throw new ApiError(401, "Invalid or expired access token. Please login or refresh token.");
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid authentication token. User account no longer exists.");
    }

    if (user.isBlocked) {
      throw new ApiError(403, `Account suspended. Reason: ${user.blockedReason || 'Terms violation'}`);
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
      return next(new ApiError(401, "Authentication required prior to permission authorization."));
    }

    const userRole = req.user.role; // 'guest', 'user' (student), 'admin', 'super_admin'

    // Map 'student' role alias to 'user' or 'student'
    const normalizedRoles = allowedRoles.flatMap(r => r === 'student' ? ['user', 'student'] : [r]);

    if (!normalizedRoles.includes(userRole)) {
      return next(
        new ApiError(
          403,
          `Access denied. Role '${userRole}' is not authorized to access this resource. Required role: ${allowedRoles.join(" or ")}`
        )
      );
    }

    next();
  };
};

// 3. Admin Verification Middleware
const verifyAdmin = authorize("admin", "super_admin");

// 4. Super Admin Verification Middleware
const verifySuperAdmin = authorize("super_admin");

// 5. Guest Restriction Middleware
const restrictGuest = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isGuest) {
    throw new ApiError(
      403,
      "Guest mode active. Restricted action. Please register or login to unlock full student features."
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
