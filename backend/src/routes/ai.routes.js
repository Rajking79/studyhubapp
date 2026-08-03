const express = require("express");
const router = express.Router();
const { aiChat, snapSolve, getAIHistory, clearAIHistory } = require("../controllers/ai.controller");
const { verifyJWT, restrictGuest } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router.post("/chat", verifyJWT, restrictGuest, aiChat);
router.post("/summarize", verifyJWT, restrictGuest, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Summary generated", summary: "Summary of submitted study content." }));
router.post("/explain", verifyJWT, restrictGuest, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Topic explanation generated", explanation: "Detailed explanation of topic." }));
router.post("/flashcards", verifyJWT, restrictGuest, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Flashcards generated", cards: [{ question: "Sample Q", answer: "Sample A" }] }));
router.post("/quiz", verifyJWT, restrictGuest, (req, res) => res.status(200).json({ success: true, statusCode: 200, message: "Quiz generated", questions: [{ id: 1, question: "Sample Quiz Q?", options: ["A", "B", "C", "D"], answer: "A" }] }));
router.post("/snap-solve", verifyJWT, restrictGuest, upload.single("image"), snapSolve);
router.post("/snap-and-solve", verifyJWT, restrictGuest, upload.single("image"), snapSolve);
router.get("/history", verifyJWT, getAIHistory);
router.delete("/history/clear", verifyJWT, restrictGuest, clearAIHistory);
router.delete("/history", verifyJWT, restrictGuest, clearAIHistory);

module.exports = router;
