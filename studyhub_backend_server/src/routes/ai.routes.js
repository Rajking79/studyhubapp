const express = require("express");
const router = express.Router();
const { aiChat, snapSolve, getAIHistory } = require("../controllers/ai.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.post("/chat", verifyJWT, aiChat);
router.post("/snap-solve", verifyJWT, upload.single("image"), snapSolve);
router.get("/history", verifyJWT, getAIHistory);

module.exports = router;
