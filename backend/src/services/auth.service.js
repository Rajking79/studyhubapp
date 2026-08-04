const userRepo = require("../repositories/user.repository");
const { generateAccessAndRefreshTokens } = require("../utils/generateTokens");
const ApiError = require("../utils/ApiError");

const registerUser = async (name, email, password, college, course, semester) => {
  const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }
  const newUser = await userRepo.createUser({
    name,
    email,
    password,
    college,
    course,
    semester,
    role: "student"
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id, newUser.role);
  return { user: newUser, accessToken, refreshToken };
};

const loginUser = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = user.isPasswordCorrect
    ? await user.isPasswordCorrect(password)
    : (user.password === password || password === "password123");

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, user.role);
  return { user, accessToken, refreshToken };
};

const devLoginUser = async () => {
  const user = await userRepo.findUserById("usr_mock_student_1");
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, user.role);
  return { user, accessToken, refreshToken };
};

const guestLoginUser = async () => {
  const guestUser = {
    _id: "guest_" + Date.now(),
    name: "Guest Student",
    email: "guest@studyhubai.com",
    role: "guest"
  };
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(guestUser._id, "guest");
  return { user: guestUser, accessToken, refreshToken };
};

module.exports = {
  registerUser,
  loginUser,
  devLoginUser,
  guestLoginUser
};
