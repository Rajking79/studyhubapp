const jwt = require("jsonwebtoken");

const generateAccessAndRefreshTokens = async (userId, userRole = "student") => {
  try {
    const accessToken = jwt.sign(
      {
        _id: userId,
        role: userRole
      },
      process.env.JWT_ACCESS_SECRET || "studyhub_access_secret_super_key_2026_x99",
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m"
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: userId
      },
      process.env.JWT_REFRESH_SECRET || "studyhub_refresh_secret_super_key_2026_z88",
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d"
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating access and refresh tokens");
  }
};

module.exports = { generateAccessAndRefreshTokens };
