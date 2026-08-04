const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/feedback", authenticate, supportController.submitFeedback);
router.get("/legal", supportController.getLegalTerms);

module.exports = router;
