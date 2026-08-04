const mongoose = require("mongoose");

const cgpaSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    semesters: [
      {
        semester: Number,
        sgpa: Number,
        credits: Number
      }
    ],
    calculatedCGPA: { type: Number, required: true },
    totalCredits: { type: Number, required: true }
  },
  { timestamps: true }
);

const CGPA = mongoose.model("CGPA", cgpaSchema);
module.exports = CGPA;
