const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseId: { type: String, required: true },
    department: { type: String, default: "Computer Science" },
    semester: { type: String, default: "Semester 4" },
    description: { type: String, default: "" },
    instructorName: { type: String, default: "Dr. Rajesh Kumar" },
    instructorRole: { type: String, default: "Associate Professor" },
    rating: { type: Number, default: 4.8 },
    materialCount: { type: Number, default: 12 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
