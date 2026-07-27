const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    semesterNumber: { type: Number, required: true },
    name: { type: String, required: true }, // e.g. "Semester 1"
    label: { type: String, default: "" },   // e.g. "Sem 1"
    yearNumber: { type: Number, default: 1 },
    courseId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Semester", semesterSchema);
