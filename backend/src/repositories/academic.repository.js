const mongoose = require("mongoose");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const mockData = require("../services/dataStore");

class AcademicRepository {
  async getColleges(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      return await College.find(filter);
    }
    return mockData.colleges;
  }

  async createCollege(data) {
    if (mongoose.connection.readyState === 1) {
      return await College.create(data);
    }
    const newCollege = { _id: "clg_" + Date.now(), ...data };
    mockData.colleges.push(newCollege);
    return newCollege;
  }

  async getCourses(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      return await Course.find(filter).populate("collegeId", "name shortCode");
    }
    return mockData.courses;
  }

  async createCourse(data) {
    if (mongoose.connection.readyState === 1) {
      return await Course.create(data);
    }
    const newCourse = { _id: "crs_" + Date.now(), ...data };
    mockData.courses.push(newCourse);
    return newCourse;
  }

  async getSubjects(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      return await Subject.find(filter).populate("courseId", "name code");
    }
    return mockData.subjects;
  }

  async createSubject(data) {
    if (mongoose.connection.readyState === 1) {
      return await Subject.create(data);
    }
    const newSubject = { _id: "sbj_" + Date.now(), ...data };
    mockData.subjects.push(newSubject);
    return newSubject;
  }
}

module.exports = new AcademicRepository();
