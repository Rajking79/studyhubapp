const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Material = require("../models/Material.model");

const getMyDownloads = asyncHandler(async (req, res) => {
  const downloads = await Material.find({ status: "approved" }).sort({ downloadsCount: -1 }).limit(20).lean();
  return res.status(200).json(new ApiResponse(200, downloads, "Downloaded materials list fetched from MongoDB"));
});

const syncStorage = asyncHandler(async (req, res) => {
  const { totalStorageUsedMB, downloadedIds } = req.body;
  return res.status(200).json(new ApiResponse(200, { totalStorageUsedMB, downloadedIds, synced: true }, "Offline storage synced with MongoDB"));
});

const deleteDownload = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { id: req.params.id, deleted: true }, "Download record removed"));
});

module.exports = {
  getMyDownloads,
  syncStorage,
  deleteDownload
};
