const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    college: { type: String, default: "Delhi University" },
    course: { type: String, default: "B.Tech Computer Science" },
    semester: { type: String, default: "Semester 4" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    downloadsCount: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    uploadsCount: { type: Number, default: 0 },
    refreshToken: { type: String, default: "" },
    resetOTP: { type: String, default: "" },
    resetOTPExpiry: { type: Date },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
