const DownloadRepository = require("../repositories/download.repository");
const ApiError = require("../utils/ApiError");

class DownloadService {
  static async recordDownload(userId, materialId) {
    const download = await DownloadRepository.recordDownload(userId, materialId);
    if (!download) throw new ApiError(404, "Material not found");
    return download;
  }

  static async getMyDownloads(userId) {
    return await DownloadRepository.getUserDownloads(userId);
  }

  static async deleteDownload(userId, downloadId) {
    return await DownloadRepository.deleteDownloadRecord(userId, downloadId);
  }
}

module.exports = DownloadService;
