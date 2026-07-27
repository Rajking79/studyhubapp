const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role || "user",
      isGuest: user.isGuest || false
    },
    process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_secure_key_2026",
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_REFRESH_SECRET || "studyhub_refresh_secret_super_secure_key_2026",
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );
};

const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user._id);
  return { accessToken, refreshToken };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};
