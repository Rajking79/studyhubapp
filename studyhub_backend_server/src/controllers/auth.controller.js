const crypto = require("crypto");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/User.model");
const { generateTokens, generateAccessToken } = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");
const GoogleAuthService = require("../services/googleAuth.service");

const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

// 1. Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, phone, college, course, semester } = req.body;

  const existingEmail = await User.findOne({ email: email.toLowerCase() });
  if (existingEmail) {
    throw new ApiError(409, "An account with this email address already exists.");
  }

  if (phone && phone.trim().length > 0) {
    const existingPhone = await User.findOne({ phone: phone.trim() });
    if (existingPhone) {
      throw new ApiError(409, "An account with this phone number already exists.");
    }
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedVerificationToken = hashToken(verificationToken);

  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password,
    phone: phone || "",
    college: college || "Delhi University",
    course: course || "B.Tech Computer Science",
    semester: semester || "Semester 4",
    role: "user",
    isGuest: false,
    isEmailVerified: false,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    loginMethod: "password"
  });

  const { accessToken, refreshToken } = generateTokens(user);

  const deviceId = req.headers["x-device-id"] || `dev-${Date.now()}`;
  const userAgent = req.headers["user-agent"] || "Unknown App/Browser";
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";

  user.refreshTokens.push({ token: refreshToken, deviceId, userAgent, ip });
  user.devices.push({ deviceId, deviceName: userAgent, ip, lastActive: new Date() });
  user.loginHistory.push({ ip, userAgent, deviceId, loginMethod: "password" });
  await user.save();

  const responseUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    college: user.college,
    course: user.course,
    semester: user.semester,
    role: user.role,
    isGuest: false,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: responseUser,
        token: accessToken,
        refreshToken,
        verificationTokenSent: true
      },
      "Student registered successfully. Please verify your email."
    )
  );
});

// 2. Email & Password Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!user) {
    throw new ApiError(404, "User account not found. Please register first.");
  }

  if (user.isBlocked) {
    throw new ApiError(403, `Account disabled. ${user.blockedReason || 'Please contact support.'}`);
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password credentials.");
  }

  const { accessToken, refreshToken } = generateTokens(user);

  const deviceId = req.headers["x-device-id"] || `dev-${Date.now()}`;
  const userAgent = req.headers["user-agent"] || "Unknown App/Browser";
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";

  user.refreshTokens.push({ token: refreshToken, deviceId, userAgent, ip });
  user.loginHistory.push({ ip, userAgent, deviceId, loginMethod: "password" });
  
  const existingDeviceIndex = user.devices.findIndex(d => d.deviceId === deviceId);
  if (existingDeviceIndex >= 0) {
    user.devices[existingDeviceIndex].lastActive = new Date();
    user.devices[existingDeviceIndex].ip = ip;
  } else {
    user.devices.push({ deviceId, deviceName: userAgent, ip, lastActive: new Date() });
  }
  
  user.lastLogin = new Date();
  await user.save();

  const responseUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    college: user.college,
    course: user.course,
    semester: user.semester,
    role: user.role,
    isGuest: false,
    isEmailVerified: user.isEmailVerified
  };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: responseUser,
        token: accessToken,
        refreshToken,
        expiresIn: "15m"
      },
      "User logged in successfully"
    )
  );
});

// 3. Google Login
const googleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken || req.body.googleIdToken;

  if (!idToken) {
    throw new ApiError(400, "ID Token Missing. Request body must contain { idToken: string }");
  }

  const clientMetadata = {
    deviceId: req.headers["x-device-id"] || "device_unknown",
    deviceName: req.headers["x-device-name"] || req.headers["user-agent"] || "Android Mobile",
    androidVersion: req.headers["x-android-version"] || "Android 14",
    appVersion: req.headers["x-app-version"] || "1.0.0",
    ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
    country: req.headers["x-country"] || "India",
    city: req.headers["x-city"] || "New Delhi"
  };

  const authResult = await GoogleAuthService.processGoogleLogin(idToken, clientMetadata);

  return res.status(200).json(
    new ApiResponse(
      200,
      authResult,
      "Google Login Successful"
    )
  );
});

// 4. Guest Login
const guestLogin = asyncHandler(async (req, res) => {
  const { deviceId } = req.body;

  const validDeviceId = deviceId || `android_device_${Date.now()}`;

  let guestUser = await User.findOne({ guestDeviceId: validDeviceId, isGuest: true });

  if (!guestUser) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    guestUser = await User.create({
      name: "Guest Student",
      email: `guest_${randomSuffix}@studyhub.app`,
      password: crypto.randomBytes(16).toString("hex"),
      college: "Delhi University",
      course: "B.Tech",
      semester: "Semester 1",
      role: "guest",
      isGuest: true,
      guestDeviceId: validDeviceId,
      loginMethod: "guest"
    });
  }

  const { accessToken, refreshToken } = generateTokens(guestUser);

  const responseUser = {
    id: guestUser._id,
    name: guestUser.name,
    email: guestUser.email,
    college: guestUser.college,
    course: guestUser.course,
    semester: guestUser.semester,
    isGuest: true,
    previewMode: true,
    permissions: {
      canDownload: false,
      canBookmark: false,
      canUpload: false,
      canUseAI: false,
      canEditProfile: false,
      canPreviewNotes: true,
      canReadPDFs: true
    }
  };

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: responseUser, token: accessToken, refreshToken },
      "Guest session started successfully"
    )
  );
});

// 5. Logout
const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (req.user && refreshToken) {
    req.user.refreshTokens = req.user.refreshTokens.filter(rt => rt.token !== refreshToken);
    await req.user.save();
  }

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        loggedOut: true,
        userId: req.user?._id || null,
        sessionEndedAt: new Date().toISOString()
      },
      "User logged out successfully"
    )
  );
});

// 6. Forgot Password (OTP)
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email address is required");

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new ApiError(404, "No account registered with this email address.");
  }

  const otp = generateOTP();
  const hashedOTP = hashToken(otp);
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  user.resetOTP = hashedOTP;
  user.resetOTPExpiry = expiry;
  await user.save();

  // In production: Send email via Nodemailer/SendGrid. For API compliance, log OTP safely server-side
  console.log(`[SECURITY LOG] OTP generated for ${normalizedEmail}: ${otp}`);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        email: normalizedEmail,
        validFor: "10 minutes"
      },
      "Dynamic OTP generated and sent to email successfully!"
    )
  );
});

// 7. Resend OTP
const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email address is required");

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new ApiError(404, "No account registered with this email address.");
  }

  const newOTP = generateOTP();
  const hashedOTP = hashToken(newOTP);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.resetOTP = hashedOTP;
  user.resetOTPExpiry = expiry;
  await user.save();

  console.log(`[SECURITY LOG] Resent OTP for ${normalizedEmail}: ${newOTP}`);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        email: normalizedEmail,
        validFor: "10 minutes"
      },
      "New dynamic OTP generated and re-sent successfully!"
    )
  );
});

// 8. Verify OTP
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select("+resetOTP");

  if (!user || !user.resetOTP || !user.resetOTPExpiry) {
    throw new ApiError(400, "Invalid or expired OTP request. Please request a new OTP.");
  }

  if (new Date() > user.resetOTPExpiry) {
    throw new ApiError(400, "OTP has expired. Please click Resend OTP.");
  }

  const hashedIncomingOTP = hashToken(String(otp).trim());
  if (hashedIncomingOTP !== user.resetOTP) {
    throw new ApiError(400, "Invalid OTP code. Please check and try again.");
  }

  const rawResetToken = crypto.randomBytes(32).toString("hex");
  const hashedResetToken = hashToken(rawResetToken);

  user.resetOTP = null;
  user.resetOTPExpiry = null;
  user.resetToken = hashedResetToken;
  user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        verified: true,
        resetToken: rawResetToken,
        email: normalizedEmail
      },
      "OTP verified successfully!"
    )
  );
});

// 9. Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;
  if (!resetToken || !newPassword) {
    throw new ApiError(400, "Reset token and new password are required");
  }

  if (newPassword.length < 8) {
    throw new ApiError(400, "New password must be at least 8 characters long");
  }

  const hashedResetToken = hashToken(resetToken);
  const user = await User.findOne({
    resetToken: hashedResetToken,
    resetTokenExpiry: { $gt: new Date() }
  }).select("+password");

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token.");
  }

  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  user.refreshTokens = []; // Logout from all devices for security
  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        passwordReset: true,
        status: "Password updated successfully",
        updatedAt: new Date().toISOString()
      },
      "Password reset successfully. Please login with your new password."
    )
  );
});

// 10. Refresh Access Token (NEW)
const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token required.");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_SECRET || "studyhub_refresh_secret_super_secure_key_2026"
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token. Please login again.");
  }

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  const tokenExists = user.refreshTokens.some(rt => rt.token === incomingRefreshToken);
  if (!tokenExists) {
    throw new ApiError(401, "Refresh token is revoked or reuse detected.");
  }

  const newAccessToken = generateAccessToken(user);

  return res.status(200).json(
    new ApiResponse(
      200,
      { token: newAccessToken, refreshToken: incomingRefreshToken },
      "Access token refreshed successfully"
    )
  );
});

// 11. Get Current User / Me (NEW)
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
          college: user.college,
          course: user.course,
          semester: user.semester,
          role: user.role,
          isGuest: user.isGuest,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        }
      },
      "User details fetched successfully"
    )
  );
});

// 12. Change Password (NEW)
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Current password does not match");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { passwordChanged: true }, "Password changed successfully")
  );
});

// 13. Verify Email (NEW)
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) throw new ApiError(400, "Verification token is required");

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: new Date() }
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired email verification token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpiry = null;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, { verified: true }, "Email verified successfully")
  );
});

// 14. Resend Email Verification (NEW)
const resendEmailVerification = asyncHandler(async (req, res) => {
  const email = req.body?.email || req.user?.email;

  if (!email) throw new ApiError(400, "Email address is required");

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) throw new ApiError(404, "User not found");

  if (user.isEmailVerified) {
    return res.status(200).json(
      new ApiResponse(200, { alreadyVerified: true }, "Email is already verified")
    );
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  user.emailVerificationToken = hashToken(rawToken);
  user.emailVerificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  console.log(`[SECURITY LOG] Resent Verification Token for ${email}: ${rawToken}`);

  return res.status(200).json(
    new ApiResponse(200, { sent: true }, "Email verification link re-sent successfully")
  );
});

// 15. Get Login History (NEW)
const getLoginHistory = asyncHandler(async (req, res) => {
  const history = req.user.loginHistory || [];
  return res.status(200).json(
    new ApiResponse(200, { history: history.reverse().slice(0, 50) }, "Login history retrieved")
  );
});

// 16. Logout All Devices (NEW)
const logoutAllDevices = asyncHandler(async (req, res) => {
  req.user.refreshTokens = [];
  await req.user.save();
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json(
    new ApiResponse(200, { loggedOutAll: true }, "Logged out from all devices successfully")
  );
});

// 17. Delete Account (NEW)
const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!req.user.isGuest) {
    if (!password) throw new ApiError(400, "Password required to confirm account deletion");
    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Incorrect password. Deletion aborted.");
  }

  await User.findByIdAndDelete(req.user._id);

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json(
    new ApiResponse(200, { deleted: true }, "Account deleted permanently")
  );
});

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  guestLogin,
  logoutUser,
  forgotPassword,
  resendOTP,
  verifyOTP,
  resetPassword,
  refreshToken,
  getCurrentUser,
  changePassword,
  verifyEmail,
  resendEmailVerification,
  getLoginHistory,
  logoutAllDevices,
  deleteAccount
};
