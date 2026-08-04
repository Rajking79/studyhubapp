const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    feedbackType: { type: String, enum: ["Bug", "Feature Request", "Content Issue", "General"], default: "General" },
    message: { type: String, required: true },
    adminReply: { type: String, default: "" },
    status: { type: String, enum: ["open", "in_progress", "resolved"], default: "open" }
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
