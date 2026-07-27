const Material = require("../models/Material.model");

class MaterialRepository {
  static async getMaterials({
    subjectId = "",
    category = "",
    tabType = "",
    examType = "",
    search = "",
    uploadedBy = "",
    page = 1,
    limit = 20,
    sort = "createdAt",
    order = "desc"
  }) {
    const query = { isDeleted: { $ne: true }, status: "approved" };
    if (subjectId) query.subjectId = subjectId;
    if (category && category !== "All") query.category = category;
    if (tabType) query.tabType = tabType;
    if (examType && examType !== "All") query.examType = examType;
    if (uploadedBy) query.uploadedBy = uploadedBy;
    if (search) query.title = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Material.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
      Material.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async getMaterialById(id) {
    return await Material.findOne({ _id: id, isDeleted: { $ne: true } }).lean();
  }

  static async createMaterial(data) {
    return await Material.create(data);
  }

  static async incrementDownloadCount(id) {
    return await Material.findByIdAndUpdate(id, { $inc: { downloadsCount: 1 } }, { new: true });
  }

  static async softDeleteMaterial(id) {
    return await Material.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
  }
}

module.exports = MaterialRepository;
