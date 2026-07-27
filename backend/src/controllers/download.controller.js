const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getMyDownloads = asyncHandler(async (req, res) => {
  const downloads = [
    { id: "mat_os_notes_101", title: "OS Unit 3 Notes", fileSizeMB: 4.2, downloadedAt: new Date() },
    { id: "mat_dbms_pyq_2024", title: "DBMS 2024 PYQ", fileSizeMB: 3.4, downloadedAt: new Date() }
  ];
  return res.status(200).json(new ApiResponse(200, downloads, "Downloaded materials list fetched"));
});

const syncStorage = asyncHandler(async (req, res) => {
  const { totalStorageUsedMB, downloadedIds } = req.body;
  return res.status(200).json(new ApiResponse(200, { totalStorageUsedMB, downloadedIds }, "Offline storage synced"));
});

const deleteDownload = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { id: req.params.id }, "Download record removed"));
});

module.exports = {
  getMyDownloads,
  syncStorage,
  deleteDownload
};
