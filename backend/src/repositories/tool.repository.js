const mongoose = require("mongoose");
const Tool = require("../models/Tool.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockTools = [
  {
    _id: "tl_cgpa_1",
    userId: "usr_mock_student_1",
    toolType: "cgpa",
    cgpaData: { currentCGPA: 8.5, targetCGPA: 9.0, totalCredits: 120 }
  },
  {
    _id: "tl_att_1",
    userId: "usr_mock_student_1",
    toolType: "attendance",
    attendanceData: {
      overallPercentage: 82.5,
      subjects: [
        { name: "DBMS", attended: 24, total: 30, percentage: 80.0 },
        { name: "OS", attended: 26, total: 30, percentage: 86.6 }
      ]
    }
  }
];

const getToolData = async (userId, toolType) => {
  if (isDbConnected()) {
    return await Tool.findOne({ userId, toolType });
  }
  return mockTools.find((t) => t.userId === userId && t.toolType === toolType) || mockTools[0];
};

const saveToolData = async (userId, toolType, data) => {
  if (isDbConnected()) {
    return await Tool.findOneAndUpdate(
      { userId, toolType },
      { [toolType === "cgpa" ? "cgpaData" : "attendanceData"]: data },
      { upsert: true, new: true }
    );
  }
  let tool = mockTools.find((t) => t.userId === userId && t.toolType === toolType);
  if (tool) {
    if (toolType === "cgpa") tool.cgpaData = data;
    else tool.attendanceData = data;
  } else {
    tool = { _id: "tl_" + Date.now(), userId, toolType, [toolType === "cgpa" ? "cgpaData" : "attendanceData"]: data };
    mockTools.push(tool);
  }
  return tool;
};

module.exports = {
  getToolData,
  saveToolData
};
