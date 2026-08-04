const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["guest", "student", "contributor", "moderator", "admin", "super_admin"],
      default: "student"
    },
    college: { type: String, default: "Delhi Technological University" },
    course: { type: String, default: "B.Tech Computer Science" },
    semester: { type: String, default: "Semester 6" },
    avatarUrl: { type: String, default: "" },
    rewardCoins: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    isBlocked: { type: Boolean, default: false },
    blockReason: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    refreshToken: { type: String, default: "" }
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

const User = mongoose.model("User", userSchema);
module.exports = User;
