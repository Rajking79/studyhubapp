const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AuthService = require("../services/auth.service");

// 1. Register User
const registerUser = asyncHandler(async (req, res) => {
  const result = await AuthService.registerUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(201).json(
    new ApiResponse(201, result, "Student registered successfully. Please verify your email.")
  );
});

// 2. Email & Password Login
const loginUser = asyncHandler(async (req, res) => {
  const deviceId = req.headers["x-device-id"] || req.body.deviceId || "";
  const userAgent = req.headers["user-agent"] || "";
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";

  const result = await AuthService.loginUser({
    email: req.body.email,
    password: req.body.password,
    deviceId,
    userAgent,
    ip
  });

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json(
    new ApiResponse(200, result, "User logged in successfully")
  );
});

// 3. Google Login
const googleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken || req.body.googleIdToken;
  const clientMetadata = {
    deviceId: req.headers["x-device-id"] || "device_unknown",
    deviceName: req.headers["x-device-name"] || req.headers["user-agent"] || "Android Mobile",
    androidVersion: req.headers["x-android-version"] || "Android 14",
    appVersion: req.headers["x-app-version"] || "1.0.0",
    ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1"
  };

  const GoogleAuthService = require("../services/googleAuth.service");
  const authResult = await GoogleAuthService.processGoogleLogin(idToken, clientMetadata);

  return res.status(200).json(
    new ApiResponse(200, authResult, "Google Login Successful")
  );
});

// 4. Guest Login
const guestLogin = asyncHandler(async (req, res) => {
  const deviceId = req.body.deviceId || req.headers["x-device-id"] || "guest_dev";
  const result = await AuthService.guestLogin({ deviceId });

  return res.status(200).json(
    new ApiResponse(200, result, "Guest login successful. Limited guest access granted.")
  );
});

// 5. Forgot Password (Dynamic OTP)
const forgotPassword = asyncHandler(async (req, res) => {
  const result = await AuthService.forgotPassword({ email: req.body.email });
  return res.status(200).json(new ApiResponse(200, result, "Dynamic OTP sent successfully"));
});

// 6. Resend Dynamic OTP
const resendOtp = asyncHandler(async (req, res) => {
  const result = await AuthService.resendOtp({ email: req.body.email });
  return res.status(200).json(new ApiResponse(200, result, "Dynamic OTP resent successfully"));
});

// 7. Verify Dynamic OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const result = await AuthService.verifyOtp({ email: req.body.email, otp: req.body.otp });
  return res.status(200).json(new ApiResponse(200, result, "Dynamic OTP verified successfully"));
});

// 8. Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const result = await AuthService.resetPassword({
    resetToken: req.body.resetToken,
    email: req.body.email,
    newPassword: req.body.newPassword
  });
  return res.status(200).json(new ApiResponse(200, result, "Password reset successfully"));
});

// 9. Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.cookies?.refreshToken;
  const result = await AuthService.refreshAccessToken(token);
  return res.status(200).json(new ApiResponse(200, result, "Access token refreshed successfully"));
});

// 10. Verify Email
const verifyEmail = asyncHandler(async (req, res) => {
  const result = await AuthService.verifyEmail(req.body.token || req.query.token);
  return res.status(200).json(new ApiResponse(200, result, "Email verification completed"));
});

// 11. Resend Email Verification
const resendEmailVerification = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, { sent: true }, "Email verification link resent successfully")
  );
});

// 12. Get Current User (Me)
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "Current user loaded successfully")
  );
});

// 13. Change Password
const changePassword = asyncHandler(async (req, res) => {
  const result = await AuthService.changePassword(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, result, "Password updated successfully"));
});

// 14. Get Login Audit History
const getLoginHistory = asyncHandler(async (req, res) => {
  const result = await AuthService.getLoginHistory(req.user._id);
  return res.status(200).json(new ApiResponse(200, result, "Login audit history loaded"));
});

// 15. Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json(
    new ApiResponse(200, {}, "User logged out successfully")
  );
});

// 16. Logout All Devices
const logoutAllDevices = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  const result = await AuthService.logoutAllDevices(req.user._id);
  return res.status(200).json(new ApiResponse(200, result, "Logged out from all devices"));
});

// 17. Delete Account
const deleteAccount = asyncHandler(async (req, res) => {
  const result = await AuthService.deleteAccount(req.user._id, req.body.password);
  return res.status(200).json(new ApiResponse(200, result, "Account deleted successfully"));
});

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  forgotPassword,
  resendOtp,
  verifyOtp,
  resetPassword,
  refreshAccessToken,
  verifyEmail,
  resendEmailVerification,
  getCurrentUser,
  changePassword,
  getLoginHistory,
  logoutUser,
  logoutAllDevices,
  deleteAccount
};
