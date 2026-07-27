const { body, param } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (value && value !== req.body.password) {
        throw new Error("Password and confirm password do not match");
      }
      return true;
    }),
  body("phone")
    .optional()
    .trim(),
  validate
];

const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  validate
];

const validateGoogleLogin = [
  body("idToken")
    .notEmpty()
    .withMessage("Google ID Token is required"),
  validate
];

const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
  validate
];

const validateForgotPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  validate
];

const validateResetPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("otp")
    .notEmpty()
    .withMessage("OTP is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validate
];

module.exports = {
  validateRegisterInput: validateRegister,
  validateLoginInput: validateLogin,
  validateRegister,
  validateLogin,
  validateGoogleLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword
};
