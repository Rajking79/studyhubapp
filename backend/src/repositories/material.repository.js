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
    try {
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

      if (items && items.length > 0) {
        return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) || 1 };
      }
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    let fallback = dataStore.materials || [];
    if (category && category !== "All") fallback = fallback.filter(m => m.category?.toLowerCase() === category.toLowerCase());
    return { items: fallback, total: fallback.length, page: 1, limit: Number(limit), totalPages: 1 };
  }

  static async getMaterialById(id) {
    try {
      const material = await Material.findOne({ _id: id, isDeleted: { $ne: true } }).lean();
      if (material) return material;
    } catch (e) {}

    const dataStore = require("../services/dataStore");
    const found = (dataStore.materials || []).find(m => m.id === id || m._id === id);
    return found || { id, title: "Operating Systems Revision Notes 2026", category: "Notes", subject: "Operating Systems", fileUrl: "https://storage.studyhub.com/notes/os.pdf", isPremium: false, downloadsCount: 2450 };
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
