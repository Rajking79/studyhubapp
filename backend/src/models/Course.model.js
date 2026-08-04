const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, uppercase: true },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    durationYears: { type: Number, default: 4 },
    totalSemesters: { type: Number, default: 8 }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
