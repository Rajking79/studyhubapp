const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const { generateAccessAndRefreshTokens } = require("../utils/generateTokens");

class AuthService {
  async register(userData) {
    const existing = await userRepository.findByEmail(userData.email);
    if (existing) throw new ApiError(400, "User with this email already exists");

    const user = await userRepository.create(userData);
    const tokens = await generateAccessAndRefreshTokens(user._id, user.role);

    return { user, ...tokens };
  }

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const isMatch = user.isPasswordCorrect ? await user.isPasswordCorrect(password) : true;
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const tokens = await generateAccessAndRefreshTokens(user._id, user.role);
    return { user, ...tokens };
  }
}

module.exports = new AuthService();
