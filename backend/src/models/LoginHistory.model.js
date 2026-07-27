const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deviceName: { type: String, default: "Android Mobile" },
    androidVersion: { type: String, default: "Android 14" },
    appVersion: { type: String, default: "1.0.0" },
    ipAddress: { type: String, default: "127.0.0.1" },
    country: { type: String, default: "India" },
    city: { type: String, default: "New Delhi" },
    loginMethod: { type: String, enum: ["google", "password", "guest"], default: "google" },
    loginTime: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoginHistory", loginHistorySchema);
