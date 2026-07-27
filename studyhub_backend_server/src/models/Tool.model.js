const mongoose = require("mongoose");

const cgpaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semester: { type: String, required: true },
  subjects: [
    {
      name: String,
      credits: Number,
      grade: String
    }
  ],
  sgpa: { type: Number, required: true },
  overallCgpa: { type: Number, default: 0.0 }
}, { timestamps: true });

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectName: { type: String, required: true },
  attended: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  targetPercentage: { type: Number, default: 75 }
}, { timestamps: true });

const CGPA = mongoose.model("CGPA", cgpaSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = { CGPA, Attendance };
