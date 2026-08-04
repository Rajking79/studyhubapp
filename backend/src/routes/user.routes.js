const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");
const { updateProfileValidator } = require("../validators/user.validator");
const validate = require("../middlewares/validate.middleware");

router.use(authenticate);

router.get("/profile", userController.getProfile);
router.put("/profile", restrictGuest, updateProfileValidator, validate, userController.updateProfile);
router.get("/uploads", userController.getMyUploads);
router.get("/me/export", userController.exportUserData);
router.delete("/me", restrictGuest, userController.deleteMyAccount);

module.exports = router;
