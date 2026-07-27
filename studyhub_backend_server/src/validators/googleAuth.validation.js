const ApiError = require("../utils/ApiError");

const validateGoogleLoginRequest = (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken || typeof idToken !== "string" || idToken.trim().length === 0) {
    return next(new ApiError(400, "ID Token Missing or Invalid. Request body must contain { idToken: string }"));
  }

  next();
};

module.exports = {
  validateGoogleLoginRequest
};
