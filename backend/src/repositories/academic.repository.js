const mongoose = require("mongoose");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const mockData = require("../services/dataStore");

class AcademicRepository {
  async getColleges(filter = {}) {
    if (mongoose.connection.readyState === 1) return await College.find(filter);
    return mockData.colleges;
  }

  async getCourses(filter = {}) {
    if (mongoose.connection.readyState === 1) return await Course.find(filter);
    return mockData.courses;
  }

  async getSubjects(filter = {}) {
    if (mongoose.connection.readyState === 1) return await Subject.find(filter);
    return mockData.subjects;
  }
}

module.exports = new AcademicRepository();
