const GoogleAuthUtils = require("../utils/googleAuth.utils");
const GoogleAuthRepository = require("../repositories/googleAuth.repository");
const TokenService = require("../utils/token.service");

class GoogleAuthService {
  static async processGoogleLogin(idToken, clientMetadata = {}) {
    // 1. Verify Google ID Token server-side directly with Google
    const googleUser = await GoogleAuthUtils.verifyGoogleIdToken(idToken);

    // 2. Query MongoDB for existing account by Email
    let user = await GoogleAuthRepository.findUserByEmail(googleUser.email);

    if (!user) {
      // 3. User does not exist -> Create new account
      user = await GoogleAuthRepository.createGoogleUser(googleUser);
    } else {
      // 4. User exists -> Automatically link Google Account and update details
      user = await GoogleAuthRepository.updateGoogleUser(user._id, googleUser);
    }

    // 5. Generate Access Token (15 mins) & Refresh Token (30 days)
    const { accessToken, refreshToken, expiresIn } = TokenService.generateAuthTokens(user);

    // 6. Save Refresh Token in Database (`refresh_tokens` collection)
    await GoogleAuthRepository.saveRefreshToken(
      user._id,
      refreshToken,
      clientMetadata.deviceId,
      clientMetadata.ipAddress
    );

    // 7. Save Login History
    await GoogleAuthRepository.recordLoginHistory({
      userId: user._id,
      deviceName: clientMetadata.deviceName,
      androidVersion: clientMetadata.androidVersion,
      appVersion: clientMetadata.appVersion,
      ipAddress: clientMetadata.ipAddress,
      country: clientMetadata.country,
      city: clientMetadata.city
    });

    // 8. Record Security Activity Log
    await GoogleAuthRepository.recordActivity(
      user._id,
      "GOOGLE_LOGIN_SUCCESS",
      { provider: "google", email: user.email },
      clientMetadata.ipAddress
    );

    // 9. Format Production User Response Payload
    const responseUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatarUrl || googleUser.avatar,
      college: user.college || "",
      course: user.course || "",
      semester: user.semester || "",
      provider: "google"
    };

    return {
      user: responseUser,
      accessToken,
      refreshToken,
      expiresIn
    };
  }
}

module.exports = GoogleAuthService;
