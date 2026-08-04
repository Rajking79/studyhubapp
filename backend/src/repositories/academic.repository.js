const mongoose = require("mongoose");
const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const { mockColleges, mockCourses, mockSubjects } = require("../services/dataStore");

const isDbConnected = () => mongoose.connection.readyState === 1;

const getColleges = async (query = {}) => {
  if (isDbConnected()) {
    return await College.find(query).lean();
  }
  return mockColleges;
};

const getCourses = async (collegeId) => {
  if (isDbConnected()) {
    const filter = collegeId ? { collegeId } : {};
    return await Course.find(filter).lean();
  }
  return mockCourses;
};

const getSemesters = async (courseId) => {
  if (isDbConnected()) {
    const course = await Course.findById(courseId);
    const total = course ? course.totalSemesters : 8;
    return Array.from({ length: total }, (_, i) => ({ semesterNumber: i + 1, name: `Semester ${i + 1}` }));
  }
  return Array.from({ length: 8 }, (_, i) => ({ semesterNumber: i + 1, name: `Semester ${i + 1}` }));
};

const getSubjects = async (courseId, semesterNumber) => {
  if (isDbConnected()) {
    const filter = {};
    if (courseId) filter.courseId = courseId;
    if (semesterNumber) filter.semesterNumber = semesterNumber;
    return await Subject.find(filter).lean();
  }
  return mockSubjects;
};

module.exports = {
  getColleges,
  getCourses,
  getSemesters,
  getSubjects
};
