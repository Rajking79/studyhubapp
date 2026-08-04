const mongoose = require("mongoose");
const Download = require("../models/Download.model");
const { mockMaterials } = require("../services/dataStore");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockDownloads = [
  { _id: "dn_1", userId: "usr_mock_student_1", materialId: "mat_1", materialTitle: "DBMS Notes", fileSizeMB: 2.5 }
];

const getDownloads = async (userId) => {
  if (isDbConnected()) {
    return await Download.find({ userId }).populate("materialId").lean();
  }
  return mockDownloads;
};

const syncDownloads = async (userId, downloadsList) => {
  if (isDbConnected()) {
    // Bulk operation or sync
    return { syncedCount: downloadsList.length };
  }
  return { syncedCount: downloadsList ? downloadsList.length : 1 };
};

module.exports = {
  getDownloads,
  syncDownloads
};
