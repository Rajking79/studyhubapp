const mongoose = require("mongoose");
const Material = require("../models/Material.model");
const { mockMaterials } = require("../services/dataStore");

const isDbConnected = () => mongoose.connection.readyState === 1;

const searchMaterials = async (filters = {}, search = "") => {
  if (isDbConnected()) {
    const query = { isApproved: true, ...filters };
    if (search) {
      query.$text = { $search: search };
    }
    return await Material.find(query).lean();
  }
  let results = [...mockMaterials];
  if (filters.category) {
    results = results.filter((m) => m.category.toLowerCase() === filters.category.toLowerCase());
  }
  if (search) {
    results = results.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
  }
  return results;
};

const createMaterial = async (materialData) => {
  if (isDbConnected()) {
    const material = new Material(materialData);
    return await material.save();
  }
  const newMat = { _id: "mat_" + Date.now(), ...materialData, isApproved: true, downloadCount: 0 };
  mockMaterials.push(newMat);
  return newMat;
};

module.exports = {
  searchMaterials,
  createMaterial
};
