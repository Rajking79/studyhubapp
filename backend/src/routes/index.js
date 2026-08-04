const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const dashboardRoutes = require("./dashboard.routes");
const academicRoutes = require("./academic.routes");
const materialRoutes = require("./material.routes");
const toolRoutes = require("./tool.routes");
const aiRoutes = require("./ai.routes");
const downloadRoutes = require("./download.routes");
const favoriteRoutes = require("./favorite.routes");
const userRoutes = require("./user.routes");
const referralRoutes = require("./referral.routes");
const supportRoutes = require("./support.routes");
const notificationRoutes = require("./notification.routes");
const adminRoutes = require("./admin.routes");

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", academicRoutes);
router.use("/", materialRoutes);
router.use("/tools", toolRoutes);
router.use("/ai", aiRoutes);
router.use("/downloads", downloadRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/user", userRoutes);
router.use("/referrals", referralRoutes);
router.use("/support", supportRoutes);
router.use("/notifications", notificationRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
