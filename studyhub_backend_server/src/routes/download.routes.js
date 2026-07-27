const express = require("express");
const router = express.Router();
const {
  getMyDownloads,
  recordDownload,
  deleteDownload
} = require("../controllers/download.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");

router.get("/my-downloads", verifyJWT, getMyDownloads);
router.post("/:id", verifyJWT, restrictGuest, recordDownload);
router.delete("/:id", verifyJWT, deleteDownload);

module.exports = router;
