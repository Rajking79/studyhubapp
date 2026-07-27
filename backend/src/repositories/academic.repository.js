const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");
const Year = require("../models/Year.model");
const Semester = require("../models/Semester.model");

class AcademicRepository {
  // Colleges
  static async getColleges({ search = "", category = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    const query = { isDeleted: { $ne: true } };
    if (search) query.name = { $regex: search, $options: "i" };
    if (category && category !== "All") query.category = category;

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      College.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
      College.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async getCollegeById(collegeId) {
    return await College.findOne({ _id: collegeId, isDeleted: { $ne: true } }).lean();
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
    const query = { isDeleted: { $ne: true } };
    if (collegeId) query.collegeId = collegeId;
    if (search) query.name = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Course.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
      Course.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async createCourse(data) {
    return await Course.create(data);
  }

  static async softDeleteCourse(id) {
    return await Course.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }

  // Years & Semesters
  static async getYears({ courseId = "" }) {
    const query = { isDeleted: { $ne: true } };
    if (courseId) query.courseId = courseId;
    let items = await Year.find(query).sort({ yearNumber: 1 }).lean();
    if (!items || items.length === 0) {
      items = [
        { year: 1, name: "1st Year", label: "Freshman Year" },
        { year: 2, name: "2nd Year", label: "Sophomore Year" },
        { year: 3, name: "3rd Year", label: "Junior Year" },
        { year: 4, name: "4th Year", label: "Senior Year" }
      ];
    }
    return items;
  }

  static async getSemesters({ year = 2, courseId = "" }) {
    const yearNum = Number(year);
    const query = { isDeleted: { $ne: true }, yearNumber: yearNum };
    if (courseId) query.courseId = courseId;
    let items = await Semester.find(query).sort({ semesterNumber: 1 }).lean();
    if (!items || items.length === 0) {
      const sem1 = yearNum * 2 - 1;
      const sem2 = yearNum * 2;
      items = [
        { semester: sem1, name: `Semester ${sem1}`, label: `Sem ${sem1}` },
        { semester: sem2, name: `Semester ${sem2}`, label: `Sem ${sem2}` }
      ];
    }
    return items;
  }

  // Subjects
  static async getSubjects({ courseId = "", semester = "", search = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
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

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async getSubjectById(subjectId) {
    return await Subject.findOne({ _id: subjectId, isDeleted: { $ne: true } }).lean();
  }

  static async createSubject(data) {
    return await Subject.create(data);
  }

  static async softDeleteSubject(id) {
    return await Subject.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }
}

module.exports = AcademicRepository;
