const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Handle specific Mongoose and JWT Error instances
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    error = new ApiError(400, message, [message]);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const message = `An account or resource with this ${field} already exists.`;
    error = new ApiError(409, message, [message]);
  } else if (err.name === "ValidationError") {
    const message = Object.values(err.errors || {}).map(val => val.message).join(", ");
    error = new ApiError(400, `Validation Failed: ${message}`, [message]);
  } else if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid authentication token. Access denied.", ["JsonWebTokenError"]);
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Authentication token expired. Please login again.", ["TokenExpiredError"]);
  } else if (err.name === "MongooseError" || err.name === "MongoServerSelectionError" || err.message?.includes("buffering timed out")) {
    error = new ApiError(503, "Database Service Unavailable. Please start MongoDB service or check MONGO_URI.", [err.message || "MongoDB Unreachable"]);
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const errorsList = error.errors ? (Array.isArray(error.errors) ? error.errors : [error.errors]) : [message];
    error = new ApiError(statusCode, message, errorsList, err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong",
    data: {},
    meta: {},
    errors: error.errors && error.errors.length > 0 ? error.errors : [error.message || "Error occurred"]
  };

  return res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
