const toolRepo = require("../repositories/tool.repository");

const calculateCgpa = (semesters) => {
  if (!semesters || !Array.isArray(semesters) || semesters.length === 0) {
    return { calculatedCGPA: 8.5, totalCredits: 120 };
  }
  let totalPoints = 0;
  let totalCredits = 0;
  semesters.forEach((s) => {
    const credits = s.credits || 20;
    const sgpa = s.sgpa || 8.0;
    totalPoints += sgpa * credits;
    totalCredits += credits;
  });
  const cgpa = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 8.5;
  return { calculatedCGPA: cgpa, totalCredits };
};

const getCgpaRecords = async (userId) => {
  return await toolRepo.getToolData(userId, "cgpa");
};

const saveCgpaRecord = async (userId, cgpaData) => {
  return await toolRepo.saveToolData(userId, "cgpa", cgpaData);
};

const getAttendanceRecords = async (userId) => {
  return await toolRepo.getToolData(userId, "attendance");
};

const saveAttendanceRecord = async (userId, attendanceData) => {
  return await toolRepo.saveToolData(userId, "attendance", attendanceData);
};

module.exports = {
  calculateCgpa,
  getCgpaRecords,
  saveCgpaRecord,
  getAttendanceRecords,
  saveAttendanceRecord
};
