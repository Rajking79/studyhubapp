const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toolType: { type: String, enum: ["cgpa", "attendance", "resume"], required: true },
    cgpaData: { type: Object },
    attendanceData: { type: Object }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);
