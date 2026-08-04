const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["bug", "feature", "feedback", "general"], default: "feedback" },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" },
    adminReply: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
