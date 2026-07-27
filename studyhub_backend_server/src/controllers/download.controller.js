const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const DownloadService = require("../services/download.service");

const getMyDownloads = asyncHandler(async (req, res) => {
  const downloads = await DownloadService.getMyDownloads(req.user._id);
  return res.status(200).json(new ApiResponse(200, downloads, "Downloaded materials list fetched from MongoDB"));
});

const recordDownload = asyncHandler(async (req, res) => {
  const download = await DownloadService.recordDownload(req.user._id, req.params.id);
  return res.status(200).json(new ApiResponse(200, download, "Material download recorded in MongoDB"));
});

const deleteDownload = asyncHandler(async (req, res) => {
  await DownloadService.deleteDownload(req.user._id, req.params.id);
  return res.status(200).json(new ApiResponse(200, { id: req.params.id, deleted: true }, "Download record removed"));
});

module.exports = {
  getMyDownloads,
  recordDownload,
  deleteDownload
};
