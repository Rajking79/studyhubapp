const mongoose = require("mongoose");
const CGPA = require("../models/CGPA.model");
const Attendance = require("../models/Attendance.model");

class ToolRepository {
  async getCGPA(userId) {
    if (mongoose.connection.readyState === 1) return await CGPA.find({ userId });
    return [{ calculatedCGPA: 8.51, totalCredits: 42 }];
  }

  async getAttendance(userId) {
    if (mongoose.connection.readyState === 1) return await Attendance.find({ userId });
    return [
      { subjectName: "DBMS", targetPercentage: 75, attendedClasses: 25, totalClasses: 30 }
    ];
  }
}

module.exports = new ToolRepository();
