const MaterialRepository = require("../repositories/material.repository");
const ApiError = require("../utils/ApiError");

class MaterialService {
  static async getMaterials(queryParams) {
    return await MaterialRepository.getMaterials(queryParams);
  }

  static async getMaterialById(materialId) {
    const material = await MaterialRepository.getMaterialById(materialId);
    if (!material) throw new ApiError(404, "Study material not found");
    return material;
  }

  static async uploadMaterial(materialData, userId) {
    return await MaterialRepository.createMaterial({
      ...materialData,
      uploadedBy: userId,
      status: "approved"
    });
  }

  static async recordDownload(materialId) {
    const updated = await MaterialRepository.incrementDownloadCount(materialId);
    if (!updated) throw new ApiError(404, "Material not found to record download");
    return updated;
  }
}

module.exports = MaterialService;
