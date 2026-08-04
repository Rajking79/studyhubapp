const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");
const { authenticate, restrictGuest } = require("../middlewares/auth.middleware");

router.use(authenticate);

router.post("/chat", restrictGuest, aiController.aiChat);
router.post("/summarize", restrictGuest, aiController.aiSummarize);
router.post("/explain", restrictGuest, aiController.aiExplain);
router.post("/flashcards", restrictGuest, aiController.aiFlashcards);
router.post("/quiz", restrictGuest, aiController.aiQuiz);
router.post("/snap-solve", restrictGuest, aiController.snapSolve);
router.post("/snap-and-solve", restrictGuest, aiController.snapSolve);

router.get("/history", aiController.getAIHistory);
router.delete("/history/clear", restrictGuest, aiController.clearAIHistory);
router.delete("/history", restrictGuest, aiController.clearAIHistory);

module.exports = router;
