const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["bug", "suggestion", "content_issue"], default: "suggestion" },
    message: { type: String, required: true },
    rating: { type: Number, default: 5 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
