const mongoose = require("mongoose");
const Material = require("../models/Material.model");
const mockData = require("../services/dataStore");

class MaterialRepository {
  async find(filter = {}) {
    if (mongoose.connection.readyState === 1) {
      const query = { isApproved: true, ...filter };
      if (filter.search) {
        query.$text = { $search: filter.search };
        delete query.search;
      }
      return await Material.find(query)
        .populate("subjectId", "name code")
        .populate("collegeId", "name shortCode")
        .sort({ createdAt: -1 });
    }
    return mockData.materials;
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await Material.findById(id)
        .populate("subjectId", "name code")
        .populate("collegeId", "name shortCode");
    }
    return mockData.materials.find((m) => m._id === id) || mockData.materials[0];
  }

  async create(data) {
    if (mongoose.connection.readyState === 1) {
      return await Material.create(data);
    }
    const newMat = { _id: "mat_" + Date.now(), ...data };
    mockData.materials.push(newMat);
    return newMat;
  }

  async updateById(id, updateData) {
    if (mongoose.connection.readyState === 1) {
      return await Material.findByIdAndUpdate(id, updateData, { new: true });
    }
    const mat = mockData.materials.find((m) => m._id === id);
    if (mat) Object.assign(mat, updateData);
    return mat;
  }

  async deleteById(id) {
    if (mongoose.connection.readyState === 1) {
      return await Material.findByIdAndDelete(id);
    }
    const index = mockData.materials.findIndex((m) => m._id === id);
    if (index !== -1) mockData.materials.splice(index, 1);
    return true;
  }

  async incrementDownloadCount(id) {
    if (mongoose.connection.readyState === 1) {
      return await Material.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } }, { new: true });
    }
    const mat = mockData.materials.find((m) => m._id === id);
    if (mat) mat.downloadCount = (mat.downloadCount || 0) + 1;
    return mat;
  }
}

module.exports = new MaterialRepository();
