const College = require("../models/College.model");
const Course = require("../models/Course.model");
const Subject = require("../models/Subject.model");

class AcademicRepository {
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
    return await College.findById(collegeId).lean();
  }

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

  static async getSubjects({ courseId = "", semester = "", search = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    const query = {};
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
    return await Subject.findById(subjectId).lean();
  }
}

module.exports = AcademicRepository;
