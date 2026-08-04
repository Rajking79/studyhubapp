const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    notificationsEnabled: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    emailAlerts: { type: Boolean, default: true },
    language: { type: String, default: "en" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
