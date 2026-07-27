const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["All", "Notices", "Exams", "New Uploads"],
      default: "Notices"
    },
    description: { type: String, required: true },
    colorHex: { type: String, default: "#2563EB" },
    isUnread: { type: Boolean, default: true },
    targetCollege: { type: String, default: "all" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
