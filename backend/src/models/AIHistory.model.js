const mongoose = require("mongoose");

const aiHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    type: { type: String, enum: ["chat", "summarize", "explain", "flashcards", "quiz", "snap-solve"], default: "chat" }
  },
  { timestamps: true }
);

const AIHistory = mongoose.model("AIHistory", aiHistorySchema);
module.exports = AIHistory;
