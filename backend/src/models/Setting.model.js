const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    language: { type: String, default: "en" },
    darkMode: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    emailAnnouncements: { type: Boolean, default: false },
    dataSaver: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
