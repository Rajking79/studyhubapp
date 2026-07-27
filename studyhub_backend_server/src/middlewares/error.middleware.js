const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
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
