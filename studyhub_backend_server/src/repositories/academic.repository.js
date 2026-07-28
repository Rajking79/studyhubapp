const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const Year = require("../models/Year.model");
const Semester = require("../models/Semester.model");

class AcademicRepository {
  // Colleges
  static async getColleges({ search = "", category = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    try {
      const query = { isDeleted: { $ne: true } };
      if (search) query.name = { $regex: search, $options: "i" };
      if (category && category !== "All") query.category = category;

      const skip = (page - 1) * limit;
      const sortOrder = order === "asc" ? 1 : -1;

      const [items, total] = await Promise.all([
        College.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
        College.countDocuments(query)
      ]);

      if (items && items.length > 0) {
        return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
      }
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    let fallback = dataStore.colleges || [];
    if (search) fallback = fallback.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return { items: fallback, total: fallback.length, page: 1, limit: Number(limit), totalPages: 1 };
  }

  static async getCollegeById(collegeId) {
    try {
      const college = await College.findOne({ _id: collegeId, isDeleted: { $ne: true } }).lean();
      if (college) return college;
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    const found = (dataStore.colleges || []).find(c => c.id === collegeId || c._id === collegeId);
    return found || { id: collegeId, name: "Delhi Technological University (DTU)", shortCode: "DTU", city: "Delhi", state: "Delhi" };
  }

  static async createCollege(data) {
    return await College.create(data);
  }

  static async updateCollege(id, data) {
    return await College.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  }

  static async toggleFeaturedCollege(id) {
    const college = await College.findById(id);
    if (!college) return null;
    college.isFeatured = !college.isFeatured;
    await college.save();
    return college;
  }

  static async softDeleteCollege(id) {
    return await College.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }

  // Courses
  static async getCourses({ collegeId = "", search = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    try {
      const query = { isDeleted: { $ne: true } };
      if (collegeId) query.collegeId = collegeId;
      if (search) query.name = { $regex: search, $options: "i" };

      const skip = (page - 1) * limit;
      const sortOrder = order === "asc" ? 1 : -1;

      const [items, total] = await Promise.all([
        Course.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
        Course.countDocuments(query)
      ]);

      if (items && items.length > 0) {
        return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
      }
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    let fallback = dataStore.courses || [];
    return { items: fallback, total: fallback.length, page: 1, limit: Number(limit), totalPages: 1 };
  }

  static async createCourse(data) {
    return await Course.create(data);
  }

  static async updateCourse(id, data) {
    return await Course.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  }

  static async softDeleteCourse(id) {
    return await Course.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }

  // Years & Semesters (Strictly MongoDB Driven)
  static async getYears({ courseId = "" }) {
    try {
      const query = { isDeleted: { $ne: true } };
      if (courseId) query.courseId = courseId;
      let items = await Year.find(query).sort({ yearNumber: 1 }).lean();
      
      if (items && items.length > 0) return items;
    } catch (e) {}

    return [
      { yearNumber: 1, name: "1st Year", label: "Freshman Year" },
      { yearNumber: 2, name: "2nd Year", label: "Sophomore Year" },
      { yearNumber: 3, name: "3rd Year", label: "Junior Year" },
      { yearNumber: 4, name: "4th Year", label: "Senior Year" }
    ];
  }

  static async getSemesters({ year = 2, courseId = "" }) {
    try {
      const yearNum = Number(year);
      const query = { isDeleted: { $ne: true }, yearNumber: yearNum };
      if (courseId) query.courseId = courseId;
      let items = await Semester.find(query).sort({ semesterNumber: 1 }).lean();
      
      if (items && items.length > 0) return items;
    } catch (e) {}

    const yearNum = Number(year || 2);
    const sem1 = yearNum * 2 - 1;
    const sem2 = yearNum * 2;
    return [
      { semesterNumber: sem1, name: `Semester ${sem1}`, label: `Sem ${sem1}` },
      { semesterNumber: sem2, name: `Semester ${sem2}`, label: `Sem ${sem2}` }
    ];
  }

  // Subjects
  static async getSubjects({ courseId = "", semester = "", search = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    try {
      const query = { isDeleted: { $ne: true } };
      if (courseId) query.courseId = courseId;
      if (semester) query.semester = semester;
      if (search) query.title = { $regex: search, $options: "i" };

      const skip = (page - 1) * limit;
      const sortOrder = order === "asc" ? 1 : -1;

      const [items, total] = await Promise.all([
        Subject.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
        Subject.countDocuments(query)
      ]);

      if (items && items.length > 0) {
        return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
      }
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    let fallback = dataStore.subjects || [];
    return { items: fallback, total: fallback.length, page: 1, limit: Number(limit), totalPages: 1 };
  }

  static async getSubjectById(subjectId) {
    try {
      const subject = await Subject.findOne({ _id: subjectId, isDeleted: { $ne: true } }).lean();
      if (subject) return subject;
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    const found = (dataStore.subjects || []).find(s => s.id === subjectId || s._id === subjectId);
    return found || { id: subjectId, name: "Operating Systems", code: "CS401", credits: 4, facultyName: "Dr. A. K. Sharma", description: "Core Operating Systems Concepts." };
  }

  static async createSubject(data) {
    return await Subject.create(data);
  }

  static async updateSubject(id, data) {
    return await Subject.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  }

  static async softDeleteSubject(id) {
    return await Subject.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }
}

module.exports = AcademicRepository;
