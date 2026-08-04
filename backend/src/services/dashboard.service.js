const dashboardRepo = require("../repositories/dashboard.repository");
const materialRepo = require("../repositories/material.repository");

const getHomeFeed = async () => {
  return await dashboardRepo.getHomeData();
};

const universalSearch = async (query) => {
  return await materialRepo.searchMaterials({}, query);
};

module.exports = {
  getHomeFeed,
  universalSearch
};
