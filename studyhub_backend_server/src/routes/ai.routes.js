const express = require("express");
const router = express.Router();
const { aiChat, snapSolve, getAIHistory, clearAIHistory } = require("../controllers/ai.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.post("/chat", verifyJWT, restrictGuest, aiChat);
router.post("/snap-solve", verifyJWT, restrictGuest, upload.single("image"), snapSolve);
router.post("/snap-and-solve", verifyJWT, restrictGuest, upload.single("image"), snapSolve);
router.get("/history", verifyJWT, getAIHistory);
router.delete("/history/clear", verifyJWT, restrictGuest, clearAIHistory);
router.delete("/history", verifyJWT, restrictGuest, clearAIHistory);

module.exports = router;
