const materialRepo = require("../repositories/material.repository");

const getMaterials = async (filters, search) => {
  return await materialRepo.searchMaterials(filters, search);
};

const uploadMaterial = async (uploaderId, title, category, subjectId, fileUrl) => {
  return await materialRepo.createMaterial({
    uploaderId,
    title,
    category,
    subjectId,
    fileUrl
  });
};

module.exports = {
  getMaterials,
  uploadMaterial
};
