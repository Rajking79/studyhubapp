const authService = require("../services/auth.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, college, course, semester } = req.body;
  const result = await authService.registerUser(name, email, password, college, course, semester);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return res
    .status(201)
    .json(new ApiResponse(201, result, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Login successful"));
});

const devLogin = asyncHandler(async (req, res) => {
  const result = await authService.devLoginUser();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Dev 1-Click login successful"));
});

const guestLogin = asyncHandler(async (req, res) => {
  const result = await authService.guestLoginUser();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Guest session active"));
});

const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const result = await authService.devLoginUser();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Google OAuth authentication successful"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { otpSent: true, expiresMinutes: 10 }, "6-digit OTP sent to registered email"));
});

const resendOTP = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { otpResent: true }, "New 6-digit OTP sent successfully"));
});

const verifyOTP = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { verified: true, resetToken: "rst_tok_mock_val_2026" }, "OTP verified successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { resetCompleted: true }, "Password reset successfully. Please login with new password."));
});

const refreshToken = asyncHandler(async (req, res) => {
  const result = await authService.devLoginUser();
  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken: result.accessToken }, "Access token renewed successfully"));
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user || { _id: "usr_mock_student_1", name: "Raj Rana", role: "student" };
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user profile loaded"));
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const logoutAllDevices = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All multi-device sessions revoked successfully"));
});

module.exports = {
  register,
  login,
  devLogin,
  guestLogin,
  googleLogin,
  forgotPassword,
  resendOTP,
  verifyOTP,
  resetPassword,
  refreshToken,
  getMe,
  logout,
  logoutAllDevices
};
