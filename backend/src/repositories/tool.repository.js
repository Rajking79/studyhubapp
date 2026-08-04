const mongoose = require("mongoose");
const CGPA = require("../models/CGPA.model");
const Attendance = require("../models/Attendance.model");

class ToolRepository {
  async getCGPA(userId) {
    if (mongoose.connection.readyState === 1) {
      return await CGPA.find({ userId }).sort({ createdAt: -1 });
    }
    return [{ calculatedCGPA: 8.51, totalCredits: 42 }];
  }

  async saveCGPA(data) {
    if (mongoose.connection.readyState === 1) {
      return await CGPA.create(data);
    }
    return { _id: "cgpa_" + Date.now(), ...data };
  }

  async getAttendance(userId) {
    if (mongoose.connection.readyState === 1) {
      return await Attendance.find({ userId });
    }
    return [
      { subjectName: "DBMS", targetPercentage: 75, attendedClasses: 25, totalClasses: 30 }
    ];
  }

  async addAttendanceSubject(data) {
    if (mongoose.connection.readyState === 1) {
      return await Attendance.create(data);
    }
    return { _id: "att_" + Date.now(), ...data };
  }

  async updateAttendance(userId, subjectName, isPresent) {
    if (mongoose.connection.readyState === 1) {
      const filter = { userId, subjectName };
      const update = {
        $inc: {
          attendedClasses: isPresent ? 1 : 0,
          totalClasses: 1
        }
      };
      return await Attendance.findOneAndUpdate(filter, update, { upsert: true, new: true });
    }
    return { subjectName, attendedClasses: 26, totalClasses: 31, percentage: 83.8 };
  }
}

module.exports = new ToolRepository();
