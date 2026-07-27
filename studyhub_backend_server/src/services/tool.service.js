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

  static async getAttendanceRecords(userId) {
    return await ToolRepository.getAttendanceRecords(userId);
  }

  static async addAttendanceSubject(userId, data) {
    return await ToolRepository.addAttendanceSubject(userId, data);
  }

  static async markAttendance(userId, subjectId, status) {
    return await ToolRepository.markAttendance(userId, subjectId, status);
  }
}

module.exports = ToolService;
