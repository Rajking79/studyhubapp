const { body, param } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

// 1. Register Validation
const validateRegisterInput = [
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
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 15 })
    .withMessage("Please enter a valid phone number (10 to 15 digits)"),
  body("college")
    .optional()
    .trim(),
  body("course")
    .optional()
    .trim(),
  body("semester")
    .optional()
    .trim(),
  validate
];

// 2. Login Validation
const validateLoginInput = [
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

// 3. Google Login Validation
const validateGoogleLogin = [
  body("googleIdToken")
    .optional()
    .trim(),
  body("idToken")
    .optional()
    .trim(),
  body().custom((value, { req }) => {
    const token = req.body.googleIdToken || req.body.idToken;
    if (!token || token.trim().length === 0) {
      throw new Error("Google ID token (idToken or googleIdToken) is required");
    }
    return true;
  }),
  validate
];

// 4. Change Password Validation
const validateChangePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
  validate
];

// 5. Forgot Password Validation
const validateForgotPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  validate
];

// 6. Resend OTP Validation
const validateResendOtp = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  validate
];

// 7. Verify OTP Validation
const validateVerifyOtp = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 4, max: 6 })
    .withMessage("OTP must be 4 to 6 digits"),
  validate
];

// 8. Reset Password Validation
const validateResetPassword = [
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate
];

// 9. Verify Email Validation
const validateVerifyEmail = [
  body("token")
    .optional()
    .trim(),
  validate
];

// 10. Refresh Token Validation
const validateRefreshToken = [
  body("refreshToken")
    .optional()
    .trim(),
  validate
];

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateGoogleLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResendOtp,
  validateVerifyOtp,
  validateResetPassword,
  validateVerifyEmail,
  validateRefreshToken
};
