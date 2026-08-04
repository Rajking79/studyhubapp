const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subjectName: { type: String, required: true },
    targetPercentage: { type: Number, default: 75 },
    attendedClasses: { type: Number, default: 0 },
    totalClasses: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
