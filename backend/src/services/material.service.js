const materialRepository = require("../repositories/material.repository");

class MaterialService {
  async getMaterials(filter) {
    return await materialRepository.find(filter);
  }

  async uploadMaterial(data) {
    return await materialRepository.create(data);
  }
}

module.exports = new MaterialService();
