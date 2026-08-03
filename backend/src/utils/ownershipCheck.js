const mongoose = require("mongoose");
const ApiError = require("./ApiError");

/**
 * Asserts that a resource exists and belongs to the specified userId.
 * Returns generic 404 (never 403) to prevent resource enumeration & IDOR attacks.
 */
async function assertOwnership(ModelClass, resourceId, userId, userField = "userId") {
  if (!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)) {
    throw new ApiError(404, "Resource not found");
  }

  const query = { _id: resourceId, isDeleted: { $ne: true } };
  query[userField] = userId;

  const doc = await ModelClass.findOne(query);

  if (!doc) {
    throw new ApiError(404, "Resource not found");
  }

  return doc;
}

module.exports = { assertOwnership };
