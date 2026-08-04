const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(201).json(new ApiResponse(201, result, "Student registered successfully"));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return res.status(200).json(new ApiResponse(200, result, "Login successful"));
});

exports.devLogin = asyncHandler(async (req, res) => {
  const result = await authService.login("raj.student@studyhubai.com", "Password@123");
  return res.status(200).json(new ApiResponse(200, result, "Dev fast 1-click login successful"));
});

exports.guestLogin = asyncHandler(async (req, res) => {
  const guestUser = { _id: "guest_" + Date.now(), name: "Guest Student", role: "guest" };
  const tokens = { accessToken: "eyJhbGciOiJIUzI1Ni...", refreshToken: "rst_guest_mock" };
  return res.status(200).json(new ApiResponse(200, { user: guestUser, ...tokens }, "Guest mode session active"));
});

exports.googleLogin = asyncHandler(async (req, res) => {
  const googleUser = { _id: "usr_g_" + Date.now(), name: "Google Student", role: "student" };
  const tokens = { accessToken: "eyJhbGciOiJIUzI1Ni...", refreshToken: "rst_google_mock" };
  return res.status(200).json(new ApiResponse(200, { user: googleUser, ...tokens }, "Google OAuth authentication successful"));
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { email: req.body.email, otpSent: true }, "6-Digit OTP sent to email"));
});

exports.resendOtp = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { email: req.body.email, resent: true }, "OTP code resent successfully"));
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { resetToken: "rst_tok_mock_val_2026" }, "OTP verified successfully"));
});

exports.resetPassword = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Password reset successful. Please login with new password."));
});

exports.refreshToken = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { accessToken: "eyJhbGciOiJIUzI1Ni..." }, "Access token renewed"));
});

exports.getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current authenticated user profile"));
});

exports.logout = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});
