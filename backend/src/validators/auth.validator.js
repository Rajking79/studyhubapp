const ApiError = require("../utils/ApiError");

const validateEmailFormat = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePasswordStrength = (password) => {
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
};

const validateRegisterInput = (req, res, next) => {
  const { name, email, password, confirmPassword, phone, college, course, semester } = req.body;

  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters");
  if (!email || !validateEmailFormat(email)) errors.push("A valid email address is required");
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push("Password and Confirm Password do not match");
  }
  if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
    errors.push("Phone number format is invalid");
  }

  if (errors.length > 0) {
    return next(new ApiError(400, "Validation failed", errors));
  }
  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !validateEmailFormat(email)) errors.push("A valid email address is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    return next(new ApiError(400, "Validation failed", errors));
  }
  next();
};

module.exports = {
  validateEmailFormat,
  validatePasswordStrength,
  validateRegisterInput,
  validateLoginInput
};
