const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: String, default: "Anonymous Student" },
    userEmail: { type: String, default: "" },
    type: { type: String, enum: ["feedback", "bug", "feature", "general"], default: "feedback" },
    message: { type: String, required: true },
    rating: { type: Number, default: 5 },
    status: { type: String, enum: ["Pending", "Reviewed", "Resolved"], default: "Pending" },
    adminReply: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
