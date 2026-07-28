const ToolRepository = require("../repositories/tool.repository");

class ToolService {
  static async getCgpaRecords(userId) {
    return await ToolRepository.getCgpaRecords(userId);
  }

  static async calculateCgpa(userId, { semester, subjects }) {
    let totalGradePoints = 0;
    let totalCredits = 0;

    const gradeMap = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "P": 4, "F": 0 };

    const calculatedSubjects = subjects.map(s => {
      const gPoints = gradeMap[s.grade?.toUpperCase()] !== undefined ? gradeMap[s.grade.toUpperCase()] : 8;
      const credits = Number(s.credits || 4);
      totalGradePoints += gPoints * credits;
      totalCredits += credits;
      return { name: s.name, grade: s.grade, credits };
    });

    const cgpa = totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 0;

    return await ToolRepository.saveCgpaRecord(userId, {
      semester,
      subjects: calculatedSubjects,
      cgpa
    });
  }

  static async saveCgpaRecord(userId, { title, gpaResult, percentageEquivalent, classification, semestersData }) {
    return await ToolRepository.saveCgpaRecord(userId, {
      title: title || "Saved CGPA Calculation",
      gpaResult: Number(gpaResult || 8.5),
      percentageEquivalent: percentageEquivalent || `${((Number(gpaResult || 8.5) - 0.75) * 10).toFixed(2)}%`,
      classification: classification || "First Class",
      semestersData: semestersData || []
    });
  }

  static async getAttendanceRecords(userId) {
    return await ToolRepository.getAttendanceRecords(userId);
  }

  static async getAttendanceSummary(userId) {
    const rawRecords = await ToolRepository.getAttendanceRecords(userId);
    const subjects = rawRecords.map(r => {
      const data = r.attendanceData || {};
      const attended = Number(data.attended || 0);
      const total = Number(data.total || 0);
      const currentPct = total > 0 ? Number(((attended / total) * 100).toFixed(1)) : 100.0;
      const targetPct = Number(data.targetPercentage || 75);
      const isShortage = currentPct < targetPct;

      return {
        id: r._id,
        subjectName: data.subjectName || "Subject",
        targetPercentage: targetPct,
        currentPercentage: currentPct,
        totalClasses: total,
        attendedClasses: attended,
        status: isShortage ? "Shortage Alert! (Below Target)" : "On Track",
        minimum75Alert: currentPct < 75 ? "CRITICAL: Below 75% Mandatory Attendance" : "Safe"
      };
    });

    const overallAttended = subjects.reduce((sum, s) => sum + s.attendedClasses, 0);
    const overallTotal = subjects.reduce((sum, s) => sum + s.totalClasses, 0);
    const overallPercentage = overallTotal > 0 ? Number(((overallAttended / overallTotal) * 100).toFixed(1)) : 100.0;

    return {
      overallPercentage,
      totalSubjects: subjects.length,
      alertCount: subjects.filter(s => s.currentPercentage < 75).length,
      subjects
    };
  }

  static async addAttendanceSubject(userId, data) {
    return await ToolRepository.addAttendanceSubject(userId, data);
  }

  static async markAttendance(userId, subjectId, status) {
    return await ToolRepository.markAttendance(userId, subjectId, status);
  }

  static async updateAttendanceSubject(userId, subjectId, data) {
    return await ToolRepository.updateAttendanceSubject(userId, subjectId, data);
  }

  static async deleteAttendanceSubject(userId, subjectId) {
    return await ToolRepository.deleteAttendanceSubject(userId, subjectId);
  }
}

module.exports = ToolService;
