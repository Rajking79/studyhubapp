const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const loginHistorySchema = new mongoose.Schema({
  ip: { type: String, default: "127.0.0.1" },
  userAgent: { type: String, default: "Unknown Device" },
  deviceId: { type: String, default: "" },
  loginMethod: { type: String, enum: ["password", "email", "google", "guest", "dev", "otp"], default: "password" },
  timestamp: { type: Date, default: Date.now }
});

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  deviceName: { type: String, default: "Mobile/Web" },
  ip: { type: String, default: "127.0.0.1" },
  lastActive: { type: Date, default: Date.now }
});

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  deviceId: { type: String, default: "" },
  userAgent: { type: String, default: "" },
  ip: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    phone: { type: String, default: "", trim: true },
    avatarUrl: { type: String, default: "https://i.pravatar.cc/150?img=12" },
    college: { type: String, default: "Delhi University", trim: true },
    course: { type: String, default: "B.Tech Computer Science", trim: true },
    semester: { type: String, default: "Semester 4", trim: true },
    role: {
      type: String,
      enum: ["student", "user", "guest", "admin", "super_admin"],
      default: "student"
    },
    isGuest: { type: Boolean, default: false },
    guestDeviceId: { type: String, default: "" },
    loginMethod: { type: String, enum: ["password", "email", "google", "guest", "dev", "otp"], default: "password" },
    googleId: { type: String, default: "" },

    // Verification & Security
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, default: null },
    emailVerificationTokenExpiry: { type: Date, default: null },

    resetOTP: { type: String, default: null, select: false },
    resetOTPExpiry: { type: Date, default: null },
    resetToken: { type: String, default: null, select: false },
    resetTokenExpiry: { type: Date, default: null },

    // Refresh Tokens & Multi-device Management
    refreshTokens: [refreshTokenSchema],
    devices: [deviceSchema],
    loginHistory: [loginHistorySchema],

    // App Counts & Preferences
    downloadsCount: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    uploadsCount: { type: Number, default: 0 },

    // Account Control & Status
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    blockedReason: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    lastLogin: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
