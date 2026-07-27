const express = require("express");
const router = express.Router();
const { submitFeedback, getLegalDocs } = require("../controllers/support.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.post("/feedback", verifyJWT, submitFeedback);
router.get("/legal", getLegalDocs);

module.exports = router;
