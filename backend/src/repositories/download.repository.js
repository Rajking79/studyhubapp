const Download = require("../models/Download.model");

class DownloadRepository {
  async getDownloads(userId) {
    return await Download.find({ userId }).populate("materialId");
  }

  async recordDownload(userId, materialId) {
    return await Download.create({ userId, materialId });
  }
}

module.exports = new DownloadRepository();
