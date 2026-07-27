const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET || "studyhub_jwt_super_secret_key_2026",
    { expiresIn: "30d" }
  );

  return { token };
};

module.exports = generateToken;
