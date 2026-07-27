const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/setting.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.get("/user/settings", verifyJWT, getSettings);
router.patch("/user/settings", verifyJWT, updateSettings);

module.exports = router;
