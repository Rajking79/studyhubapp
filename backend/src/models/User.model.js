const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["guest", "student", "contributor", "moderator", "admin", "super_admin"],
      default: "student"
    },
    college: { type: String, trim: true },
    course: { type: String, trim: true },
    semester: { type: String, trim: true },
    avatarUrl: { type: String },
    rewardCoins: { type: Number, default: 0 },
    resetOTP: { type: String, select: false },
    resetOTPExpire: { type: Date, select: false },
    resetToken: { type: String, select: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
