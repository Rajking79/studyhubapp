const Tool = require("../models/Tool.model");

class ToolRepository {
  static async getCgpaRecords(userId) {
    return await Tool.find({ userId, toolType: "cgpa" }).sort({ createdAt: -1 }).lean();
  }

  static async saveCgpaRecord(userId, data) {
    return await Tool.create({
      userId,
      toolType: "cgpa",
      cgpaData: data
    });
  }

  static async getAttendanceRecords(userId) {
    return await Tool.find({ userId, toolType: "attendance" }).lean();
  }

  static async addAttendanceSubject(userId, data) {
    return await Tool.create({
      userId,
      toolType: "attendance",
      attendanceData: data
    });
  }

  static async markAttendance(userId, subjectId, status) {
    const record = await Tool.findOne({ userId, _id: subjectId, toolType: "attendance" });
    if (!record) return null;

    if (status === "present") {
      record.attendanceData.attended += 1;
      record.attendanceData.total += 1;
    } else if (status === "absent") {
      record.attendanceData.total += 1;
    }
    await record.save();
    return record;
  }

  static async updateAttendanceSubject(userId, subjectId, data) {
    const record = await Tool.findOne({ userId, _id: subjectId, toolType: "attendance" });
    if (!record) return null;

    if (data.targetPercentage !== undefined) record.attendanceData.targetPercentage = Number(data.targetPercentage);
    if (data.subjectName) record.attendanceData.subjectName = data.subjectName;
    if (data.totalClasses !== undefined) record.attendanceData.total = Number(data.totalClasses);
    if (data.attendedClasses !== undefined) record.attendanceData.attended = Number(data.attendedClasses);

    await record.save();
    return record;
  }

  static async deleteAttendanceSubject(userId, subjectId) {
    return await Tool.findOneAndDelete({ userId, _id: subjectId, toolType: "attendance" });
  }
}

module.exports = ToolRepository;
