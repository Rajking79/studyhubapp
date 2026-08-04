const ApiError = require("./ApiError");

const assertOwnership = (resourceUserId, requestingUser) => {
  if (!requestingUser) {
    throw new ApiError(401, "Authentication required");
  }

  // Admin and Super Admin can bypass ownership check
  if (requestingUser.role === "admin" || requestingUser.role === "super_admin") {
    return true;
  }

  const resourceIdStr = resourceUserId ? resourceUserId.toString() : "";
  const requestingIdStr = requestingUser._id ? requestingUser._id.toString() : "";

  if (resourceIdStr !== requestingIdStr) {
    throw new ApiError(403, "Access denied: You do not own this resource");
  }

  return true;
};

module.exports = { assertOwnership };
