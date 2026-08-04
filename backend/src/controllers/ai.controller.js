const aiService = require("../services/ai.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const aiChat = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { prompt } = req.body;
  const result = await aiService.processAiPrompt(userId, prompt, "chat");
  return res.status(200).json(new ApiResponse(200, result, "AI Tutor response generated"));
});

const aiSummarize = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { text } = req.body;
  const result = await aiService.processAiPrompt(userId, text, "summarize");
  return res.status(200).json(new ApiResponse(200, result, "AI text summary generated"));
});

const aiExplain = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { concept } = req.body;
  const result = await aiService.processAiPrompt(userId, concept, "explain");
  return res.status(200).json(new ApiResponse(200, result, "AI ELI5 concept explanation generated"));
});

const aiFlashcards = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { topic } = req.body;
  const result = await aiService.processAiPrompt(userId, topic, "flashcards");
  return res.status(200).json(new ApiResponse(200, result, "AI revision flashcards generated"));
});

const aiQuiz = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { topic } = req.body;
  const result = await aiService.processAiPrompt(userId, topic, "quiz");
  return res.status(200).json(new ApiResponse(200, result, "AI practice quiz generated"));
});

const snapSolve = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const prompt = req.body?.prompt || "Solve calculus problem in uploaded image";
  const result = await aiService.processAiPrompt(userId, prompt, "snap");
  return res.status(200).json(new ApiResponse(200, result, "Snap & Solve OCR solution generated"));
});

const getAIHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const history = await aiService.getAiHistory(userId);
  return res.status(200).json(new ApiResponse(200, history, "AI chat history loaded"));
});

const clearAIHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const result = await aiService.clearAiHistory(userId);
  return res.status(200).json(new ApiResponse(200, result, "AI chat history cleared"));
});

module.exports = {
  aiChat,
  aiSummarize,
  aiExplain,
  aiFlashcards,
  aiQuiz,
  snapSolve,
  getAIHistory,
  clearAIHistory
};
