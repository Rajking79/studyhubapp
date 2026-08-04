const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.use(authenticate);

router.get("/profile", userController.getProfile);
router.put("/profile", restrictGuest, userController.updateProfile);
router.post("/avatar", restrictGuest, upload.single("avatar"), userController.uploadAvatar);
router.get("/uploads", userController.getUserUploads);
router.get("/me/export", userController.exportUserData);
router.delete("/me", restrictGuest, userController.deleteAccount);

module.exports = router;
