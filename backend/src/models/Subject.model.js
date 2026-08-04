const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    semesterNumber: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    credits: { type: Number, default: 4 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
