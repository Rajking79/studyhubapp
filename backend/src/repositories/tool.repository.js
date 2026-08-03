const mongoose = require("mongoose");
const Tool = require("../models/Tool.model");

class ToolRepository {
  static async getCgpaRecords(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Tool.find({ userId, toolType: "cgpa" }).sort({ createdAt: -1 }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.tools?.cgpa || [
      { id: "cgpa_1", currentCgpa: 8.5, targetCgpa: 9.0, creditsCompleted: 60 }
    ];
  }

  static async saveCgpaRecord(userId, data) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Tool.create({
          userId,
          toolType: "cgpa",
          cgpaData: data
        });
      } catch (e) {}
    }
    return { id: "cgpa_new", userId, toolType: "cgpa", cgpaData: data };
  }

  static async getAttendanceRecords(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Tool.find({ userId, toolType: "attendance" }).lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.tools?.attendance || [
      { id: "att_1", subjectName: "Operating Systems", attended: 28, total: 32, percentage: 87.5 }
    ];
  }

  static async addAttendanceSubject(userId, data) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Tool.create({
          userId,
          toolType: "attendance",
          attendanceData: data
        });
      } catch (e) {}
    }
    return { id: "att_new", userId, toolType: "attendance", attendanceData: data };
  }

  static async markAttendance(userId, subjectId, status) {
    if (mongoose.connection.readyState === 1) {
      try {
        const record = await Tool.findOne({ userId, _id: subjectId, toolType: "attendance" });
        if (record) {
          if (status === "present") {
            record.attendanceData.attended += 1;
            record.attendanceData.total += 1;
          } else if (status === "absent") {
            record.attendanceData.total += 1;
          }
          await record.save();
          return record;
        }
      } catch (e) {}
    }
    return { id: subjectId, status, updated: true };
  }

  static async updateAttendanceSubject(userId, subjectId, data) {
    if (mongoose.connection.readyState === 1) {
      try {
        const record = await Tool.findOne({ userId, _id: subjectId, toolType: "attendance" });
        if (record) {
          if (data.targetPercentage !== undefined) record.attendanceData.targetPercentage = Number(data.targetPercentage);
          if (data.subjectName) record.attendanceData.subjectName = data.subjectName;
          if (data.totalClasses !== undefined) record.attendanceData.total = Number(data.totalClasses);
          if (data.attendedClasses !== undefined) record.attendanceData.attended = Number(data.attendedClasses);
          await record.save();
          return record;
        }
      } catch (e) {}
    }
    return { id: subjectId, ...data };
  }

  static async deleteAttendanceSubject(userId, subjectId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Tool.findOneAndDelete({ userId, _id: subjectId, toolType: "attendance" });
      } catch (e) {}
    }
    return { deleted: true };
  }
}

module.exports = ToolRepository;
