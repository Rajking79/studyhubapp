const GoogleAuthUtils = require("../utils/googleAuth.utils");
const GoogleAuthRepository = require("../repositories/googleAuth.repository");
const { generateTokens } = require("../utils/generateTokens");
const ApiError = require("../utils/ApiError");

class GoogleAuthService {
  static async processGoogleLogin(idToken, clientMetadata = {}) {
    // 1. Verify Google ID Token server-side directly with Google Client (or custom Postman email)
    const googleUser = await GoogleAuthUtils.verifyGoogleIdToken(idToken, clientMetadata);

    // 2. Search MongoDB by verified Email extracted from token
    let user = await GoogleAuthRepository.findUserByEmail(googleUser.email);

    let isNewUser = false;

    if (!user) {
      // 3. User does not exist -> Create account (ONLY Google login auto-creates)
      user = await GoogleAuthRepository.createGoogleUser(googleUser);
      isNewUser = true;
    } else {
      // 4. Status checks for existing user
      if (user.isDeleted) throw new ApiError(403, "Account has been deleted.");
      if (user.isBlocked) throw new ApiError(403, `Account suspended. ${user.blockedReason || ''}`);
      if (user.isActive === false) throw new ApiError(403, "Account is inactive.");

      // Link Google Account
      user = await GoogleAuthRepository.updateGoogleUser(user._id, googleUser);
    }

    // 5. Generate Access Token & Refresh Token
    const { accessToken, refreshToken } = generateTokens(user);

    // 6. Record refresh token & login history
    await GoogleAuthRepository.saveRefreshToken(
      user._id,
      refreshToken,
      clientMetadata.deviceId,
      clientMetadata.ipAddress
    );

    await GoogleAuthRepository.recordLoginHistory({
      userId: user._id,
      deviceName: clientMetadata.deviceName,
      androidVersion: clientMetadata.androidVersion,
      appVersion: clientMetadata.appVersion,
      ipAddress: clientMetadata.ipAddress,
      country: clientMetadata.country,
      city: clientMetadata.city
    });

    const responseUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl || googleUser.avatar,
      college: user.college || "",
      course: user.course || "",
      semester: user.semester || "",
      role: user.role || "student",
      isGuest: false,
      loginMethod: "google",
      isNewRegistration: isNewUser
    };

    return {
      user: responseUser,
      token: accessToken,
      refreshToken,
      expiresIn: "15m"
    };
  }
}

module.exports = GoogleAuthService;
