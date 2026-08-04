const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, uppercase: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    semesterNumber: { type: Number, required: true },
    creditPoints: { type: Number, default: 4 },
    materialCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
