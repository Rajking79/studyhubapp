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

// 3. Dev Login Validation
const validateDevLogin = [
  body("phone").optional().trim(),
  body("email").optional().trim(),
  validate
];

// 4. Google Login Validation
const validateGoogleLogin = [
  body("googleIdToken")
    .optional()
    .trim(),
  body("idToken")
    .optional()
    .trim(),
  validate
];

// 5. Change Password Validation
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

// 6. Forgot Password Validation
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

// 7. Resend OTP Validation
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

// 8. Verify OTP Validation
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
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits"),
  validate
];

// 9. Reset Password Validation (2-step Flow: email + otp + newPassword + confirmPassword)
const validateResetPassword = [
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("otp")
    .optional()
    .trim(),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .optional()
    .trim(),
  validate
];

// 10. Verify Email Validation
const validateVerifyEmail = [
  body("token")
    .optional()
    .trim(),
  validate
];

// 11. Refresh Token Validation
const validateRefreshToken = [
  body("refreshToken")
    .optional()
    .trim(),
  validate
];

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateDevLogin,
  validateGoogleLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResendOtp,
  validateVerifyOtp,
  validateResetPassword,
  validateVerifyEmail,
  validateRefreshToken
};
