const express = require("express");
const router = express.Router();
const settingController = require("../controllers/setting.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.get("/user/settings", settingController.getSettings);
router.patch("/user/settings", settingController.updateSettings);

module.exports = router;
