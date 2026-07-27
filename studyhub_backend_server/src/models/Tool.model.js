const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    toolType: { type: String, enum: ["cgpa", "attendance"], required: true },
    cgpaData: {
      semester: { type: String, default: "" },
      subjects: [
        {
          name: { type: String, default: "" },
          grade: { type: String, default: "A" },
          credits: { type: Number, default: 4 }
        }
      ],
      cgpa: { type: Number, default: 0 }
    },
    attendanceData: {
      subjectName: { type: String, default: "" },
      attended: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      targetPercentage: { type: Number, default: 75 }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);
