const express = require("express");
const router = express.Router();
const { getMyDownloads, syncStorage, deleteDownload } = require("../controllers/download.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/my-downloads", verifyJWT, getMyDownloads);
router.post("/sync-storage", verifyJWT, syncStorage);
router.delete("/:id", verifyJWT, deleteDownload);

module.exports = router;
