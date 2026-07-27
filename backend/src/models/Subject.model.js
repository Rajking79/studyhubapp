const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, default: "" },
    courseId: { type: String, required: true },
    courseName: { type: String, default: "" },
    department: { type: String, default: "Computer Science" },
    year: { type: Number, default: 2 },
    semester: { type: String, default: "Semester 4" },
    description: { type: String, default: "" },
    instructorName: { type: String, default: "Faculty Team" },
    instructorRole: { type: String, default: "Professor" },
    rating: { type: Number, default: 4.8 },
    materialCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
