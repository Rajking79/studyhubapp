const { signAccessToken, signRefreshToken } = require("./jwt.service");

class TokenService {
  static generateAuthTokens(user) {
    const payload = {
      _id: user._id || user.id,
      email: user.email,
      role: user.role || "student",
      provider: user.provider || "google",
      isGuest: false
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ _id: user._id || user.id });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900 // 15 mins in seconds
    };
  }
}

module.exports = TokenService;
