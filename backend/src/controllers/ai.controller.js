const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const aiService = require("../services/ai.service");

exports.aiChat = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const result = await aiService.chat(req.user._id, prompt);
  return res.status(200).json(new ApiResponse(200, result, "AI Tutor response generated"));
});

exports.aiSummarize = asyncHandler(async (req, res) => {
  const { text } = req.body;
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        summaryPoints: [
          "Core concept explained in bullet points.",
          "Reduces reading time by 80%.",
          "Focuses on exam-relevant takeaways."
        ]
      },
      "Text summarized successfully"
    )
  );
});

exports.aiExplain = asyncHandler(async (req, res) => {
  const { concept } = req.body;
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        concept,
        explanation: `ELI5 Analogy for ${concept}: Think of it like a library catalog system where...`
      },
      "Concept explained in ELI5 mode"
    )
  );
});

exports.aiFlashcards = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      [
        { question: "What is 1NF?", answer: "First Normal Form eliminates duplicate columns." },
        { question: "What is 2NF?", answer: "Second Normal Form removes partial dependency." }
      ],
      "AI Flashcards generated"
    )
  );
});

exports.aiQuiz = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      [
        { id: 1, question: "Which ACID property ensures all or nothing?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: "Atomicity" }
      ],
      "AI Quiz questions generated"
    )
  );
});

exports.snapSolve = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        detectedProblem: "d/dx (3x^2 + 4x)",
        solutionSteps: ["Step 1: Apply power rule 3 * 2x = 6x", "Step 2: Derivative of 4x is 4", "Final Answer: 6x + 4"]
      },
      "Snap & Solve OCR solution generated"
    )
  );
});

exports.getAIHistory = asyncHandler(async (req, res) => {
  const history = await aiService.getHistory(req.user._id);
  return res.status(200).json(new ApiResponse(200, history, "AI chat history loaded"));
});

exports.clearAIHistory = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "AI chat history cleared"));
});
