const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    durationYears: { type: Number, default: 4 },
    totalSemesters: { type: Number, default: 8 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
