const mongoose = require("mongoose");

const aiHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    type: { type: String, enum: ["chat", "snap_solve"], default: "chat" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIHistory", aiHistorySchema);
