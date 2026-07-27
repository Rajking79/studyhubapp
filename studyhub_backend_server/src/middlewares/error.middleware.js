const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong",
    errors: error.errors || []
  };

  return res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
