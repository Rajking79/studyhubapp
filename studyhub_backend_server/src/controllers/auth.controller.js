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
  const deviceId = req.headers["x-device-id"] || "";
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

// 5. Get Current User Me
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "Current user loaded successfully")
  );
});

// 6. Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json(
    new ApiResponse(200, {}, "User logged out successfully")
  );
});

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  getCurrentUser,
  logoutUser
};
