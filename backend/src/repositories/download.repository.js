const Download = require("../models/Download.model");
const Material = require("../models/Material.model");

class DownloadRepository {
  static async recordDownload(userId, materialId) {
    const material = await Material.findById(materialId);
    if (!material) return null;

    const download = await Download.create({
      userId,
      materialId,
      materialTitle: material.title,
      fileSizeMB: material.fileSizeMB || 0
    });

    await Material.findByIdAndUpdate(materialId, { $inc: { downloadsCount: 1 } });
    return download;
  }

  static async getUserDownloads(userId) {
    return await Download.find({ userId })
      .populate("materialId")
      .sort({ createdAt: -1 })
      .lean();
  }

  static async deleteDownloadRecord(userId, downloadId) {
    return await Download.deleteOne({ _id: downloadId, userId });
  }
}

module.exports = DownloadRepository;
