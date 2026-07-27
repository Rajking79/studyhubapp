const crypto = require("crypto");
const UserRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const { generateTokens } = require("../utils/generateTokens");

class AuthService {
  static async registerUser({ name, email, password, phone, college, course, semester }) {
    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) {
      throw new ApiError(409, "An account with this email address already exists.");
    }

    if (phone && phone.trim().length > 0) {
      const existingPhone = await UserRepository.findByPhone(phone);
      if (existingPhone) {
        throw new ApiError(409, "An account with this phone number already exists.");
      }
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await UserRepository.createUser({
      name,
      email: email.toLowerCase().trim(),
      password,
      phone: phone ? phone.trim() : "",
      college: college || "Delhi University",
      course: course || "B.Tech Computer Science",
      semester: semester || "Semester 4",
      role: "student",
      isGuest: false,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      loginMethod: "password"
    });

    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshTokens.push({ token: refreshToken });
    user.loginHistory.push({ loginMethod: "password", timestamp: new Date() });
    await UserRepository.saveUserInstance(user);

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

    return { user: responseUser, token: accessToken, refreshToken, verificationTokenSent: true };
  }

  static async loginUser({ email, password, deviceId = "", userAgent = "", ip = "127.0.0.1" }) {
    // 1. Search MongoDB by email
    const user = await UserRepository.findByEmailWithPassword(email);

    // If user not found -> 404 Account Not Found. STOP. Do not continue.
    if (!user) {
      throw new ApiError(404, "Account Not Found. Please check your email or register.");
    }

    // 2. Check Password using bcrypt -> 401 Unauthorized if wrong
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password credentials.");
    }

    // 3. Status checks: Deleted, Blocked, Inactive -> 403 Forbidden
    if (user.isDeleted) {
      throw new ApiError(403, "Account has been deleted. Access forbidden.");
    }

    if (user.isBlocked) {
      throw new ApiError(403, `Account suspended. Reason: ${user.blockedReason || 'Terms violation'}`);
    }

    if (user.isActive === false) {
      throw new ApiError(403, "Account is inactive. Access forbidden.");
    }

    // 4. Generate JWT & Refresh Token only after ALL checks pass
    const { accessToken, refreshToken } = generateTokens(user);

    // 5. Save Refresh Token and Login History
    user.refreshTokens.push({ token: refreshToken, deviceId, userAgent, ip });
    user.loginHistory.push({ ip, userAgent, deviceId, loginMethod: "password" });

    const existingDeviceIndex = user.devices.findIndex(d => d.deviceId === deviceId);
    if (existingDeviceIndex >= 0) {
      user.devices[existingDeviceIndex].lastActive = new Date();
      user.devices[existingDeviceIndex].ip = ip;
    } else if (deviceId) {
      user.devices.push({ deviceId, deviceName: userAgent, ip, lastActive: new Date() });
    }

    user.lastLogin = new Date();
    await UserRepository.saveUserInstance(user);

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

    return { user: responseUser, token: accessToken, refreshToken, expiresIn: "15m" };
  }

  static async guestLogin({ deviceId = "guest_dev" }) {
    const guestUser = await UserRepository.createUser({
      name: "Guest Student",
      email: `guest_${Date.now()}@studyhub.app`,
      role: "guest",
      isGuest: true,
      guestDeviceId: deviceId,
      loginMethod: "guest",
      isEmailVerified: true
    });

    const { accessToken, refreshToken } = generateTokens(guestUser);
    guestUser.refreshTokens.push({ token: refreshToken, deviceId });
    await UserRepository.saveUserInstance(guestUser);

    const responseUser = {
      id: guestUser._id,
      name: guestUser.name,
      email: guestUser.email,
      role: "guest",
      isGuest: true
    };

    return { user: responseUser, token: accessToken, refreshToken };
  }
}

module.exports = AuthService;
