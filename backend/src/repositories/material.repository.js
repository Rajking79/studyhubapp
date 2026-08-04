const mongoose = require("mongoose");
const Material = require("../models/Material.model");
const mockData = require("../services/dataStore");

class MaterialRepository {
  async find(filter = {}) {
    if (mongoose.connection.readyState === 1) return await Material.find(filter);
    return mockData.materials;
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) return await Material.findById(id);
    return mockData.materials.find((m) => m._id === id) || mockData.materials[0];
  }

  async create(data) {
    if (mongoose.connection.readyState === 1) return await Material.create(data);
    const newMat = { _id: "mat_" + Date.now(), ...data };
    mockData.materials.push(newMat);
    return newMat;
  }
}

module.exports = new MaterialRepository();
