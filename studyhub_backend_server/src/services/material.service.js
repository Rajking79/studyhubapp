const MaterialRepository = require("../repositories/material.repository");
const ApiError = require("../utils/ApiError");

class MaterialService {
  static async getMaterials(queryParams) {
    return await MaterialRepository.getMaterials(queryParams);
  }

  static async getMaterialById(id) {
    const material = await MaterialRepository.getMaterialById(id);
    if (!material) throw new ApiError(404, "Material not found");
    return material;
  }

  static async uploadMaterial(data, userId) {
    const materialData = {
      ...data,
      uploadedBy: userId,
      status: "approved"
    };
    return await MaterialRepository.createMaterial(materialData);
  }

  static async recordDownload(id) {
    const material = await MaterialRepository.incrementDownloadCount(id);
    if (!material) throw new ApiError(404, "Material not found");
    return material;
  }

  static async deleteMaterial(id) {
    const material = await MaterialRepository.softDeleteMaterial(id);
    if (!material) throw new ApiError(404, "Material not found");
    return material;
  }
}

module.exports = MaterialService;
