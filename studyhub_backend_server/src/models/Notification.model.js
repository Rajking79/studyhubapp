const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["All", "Notices", "Exams", "New Uploads"],
      default: "Notices"
    },
    description: { type: String, required: true },
    colorHex: { type: String, default: "#2563EB" },
    isUnread: { type: Boolean, default: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    targetCollege: { type: String, default: "all" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // null if broadcast to all
    isGlobal: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
