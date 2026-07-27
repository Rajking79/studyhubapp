const Material = require("../models/Material.model");

class MaterialRepository {
  static async getMaterials({ subjectId = "", category = "", tab = "pdf", examType = "", search = "", page = 1, limit = 20, sort = "createdAt", order = "desc" }) {
    const query = { status: "approved" };
    if (subjectId) query.subjectId = subjectId;
    if (category) query.category = category;
    if (tab) query.tabType = tab;
    if (examType && examType !== "All") query.examType = examType;
    if (search) query.title = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const [items, total] = await Promise.all([
      Material.find(query).sort({ [sort]: sortOrder }).skip(skip).limit(Number(limit)).lean(),
      Material.countDocuments(query)
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
  }

  static async getMaterialById(materialId) {
    return await Material.findById(materialId).lean();
  }

  static async createMaterial(materialData) {
    return await Material.create(materialData);
  }

  static async incrementDownloadCount(materialId) {
    return await Material.findByIdAndUpdate(materialId, { $inc: { downloadsCount: 1 } }, { new: true });
  }
}

module.exports = MaterialRepository;
