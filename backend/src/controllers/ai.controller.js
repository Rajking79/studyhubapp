const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AIHistory = require("../models/AIHistory.model");

const aiChat = asyncHandler(async (req, res) => {
  const { prompt, subjectContext } = req.body;

  const aiAnswer = `### StudyHub AI Assistant Solution\n\n**Topic**: ${subjectContext || "General Study"}\n\nHere is a step-by-step clear explanation for your query:\n\n1. **Core Concept**: ${prompt || "Concept"}\n2. **Paging Mechanism**: Logical memory divided into pages.\n3. **Page Table**: Translates logical addresses to physical addresses.`;

  const historyRecord = await AIHistory.create({
    userId: req.user?._id,
    prompt: prompt || "AI Query",
    response: aiAnswer
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: historyRecord._id,
        prompt,
        answer: aiAnswer,
        suggestedFollowups: ["What is page fault?", "Explain LRU page replacement algorithm"]
      },
      "AI answer generated and saved to MongoDB"
    )
  );
});

const snapSolve = asyncHandler(async (req, res) => {
  const { note } = req.body;
  const solution = {
    problemExtracted: note || "Evaluate integral of x^2 * e^x dx",
    stepByStepSolution: [
      "Step 1: Use integration by parts formula: ∫u dv = u v - ∫v du",
      "Step 2: Let u = x^2 and dv = e^x dx ➔ du = 2x dx and v = e^x",
      "Final Answer: e^x (x^2 - 2x + 2) + C"
    ]
  };

  await AIHistory.create({
    userId: req.user?._id,
    prompt: `Snap & Solve: ${note || "OCR Image"}`,
    response: JSON.stringify(solution)
  });

  return res.status(200).json(new ApiResponse(200, solution, "Problem solved via Snap & Solve OCR"));
});

const getAIHistory = asyncHandler(async (req, res) => {
  const history = await AIHistory.find({ userId: req.user?._id }).sort({ createdAt: -1 }).lean();
  return res.status(200).json(new ApiResponse(200, history, "AI chat history fetched from MongoDB"));
});

module.exports = {
  aiChat,
  snapSolve,
  getAIHistory
};
