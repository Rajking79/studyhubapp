const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AIService = require("../services/ai.service");

const aiChat = asyncHandler(async (req, res) => {
  const { prompt, subjectContext } = req.body;
  const result = await AIService.aiChat(req.user._id, { prompt, subjectContext });
  return res.status(200).json(new ApiResponse(200, result, "AI answer generated and saved to MongoDB"));
});

const snapSolve = asyncHandler(async (req, res) => {
  const { note } = req.body;
  const solution = await AIService.snapSolve(req.user._id, { note });
  return res.status(200).json(new ApiResponse(200, solution, "Problem solved via Snap & Solve OCR"));
});

const getAIHistory = asyncHandler(async (req, res) => {
  const history = await AIService.getUserHistory(req.user._id);
  return res.status(200).json(new ApiResponse(200, history, "AI chat history fetched from MongoDB"));
});

module.exports = {
  aiChat,
  snapSolve,
  getAIHistory
};
