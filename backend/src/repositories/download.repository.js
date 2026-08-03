const mongoose = require("mongoose");
const Download = require("../models/Download.model");
const Material = require("../models/Material.model");

class DownloadRepository {
  static async recordDownload(userId, materialId) {
    if (mongoose.connection.readyState === 1) {
      try {
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
      } catch (e) {}
    }
    return { id: materialId, userId, downloadedAt: new Date().toISOString() };
  }

  static async getUserDownloads(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Download.find({ userId })
          .populate("materialId")
          .sort({ createdAt: -1 })
          .lean();
      } catch (e) {}
    }
    const dataStore = require("../services/dataStore");
    return dataStore.downloads || [];
  }

  static async deleteDownloadRecord(userId, downloadId) {
    if (mongoose.connection.readyState === 1) {
      try {
        return await Download.deleteOne({ _id: downloadId, userId });
      } catch (e) {}
    }
    return { deleted: true };
  }
}

module.exports = DownloadRepository;
