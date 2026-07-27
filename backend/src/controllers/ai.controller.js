const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const aiChat = asyncHandler(async (req, res) => {
  const { prompt, subjectContext } = req.body;

  const aiAnswer = `### StudyHub AI Assistant Solution\n\n**Topic**: ${subjectContext || "General Study"}\n\nHere is a step-by-step clear explanation for your query:\n\n1. **Core Concept**: Virtual Memory allows execution of processes that may not be completely in physical memory.\n2. **Paging Mechanism**: Memory is divided into fixed-size blocks called **pages** (logical) and **frames** (physical).\n3. **Page Table**: Translates logical addresses to physical addresses.\n\n*Pro Tip*: Always draw address translation diagrams in university exams for extra credit!`;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        prompt,
        answer: aiAnswer,
        suggestedFollowups: ["What is page fault?", "Explain LRU page replacement algorithm"]
      },
      "AI answer generated"
    )
  );
});

const snapSolve = asyncHandler(async (req, res) => {
  const solution = {
    problemExtracted: "Evaluate integral of x^2 * e^x dx",
    stepByStepSolution: [
      "Step 1: Use integration by parts formula: ∫u dv = u v - ∫v du",
      "Step 2: Let u = x^2 and dv = e^x dx ➔ du = 2x dx and v = e^x",
      "Step 3: ∫x^2 e^x dx = x^2 e^x - 2 ∫x e^x dx",
      "Step 4: Repeat integration by parts for ∫x e^x dx ➔ (x - 1)e^x",
      "Final Answer: e^x (x^2 - 2x + 2) + C"
    ]
  };

  return res.status(200).json(new ApiResponse(200, solution, "Problem solved via Snap & Solve OCR"));
});

const getAIHistory = asyncHandler(async (req, res) => {
  const history = [
    { id: "ai_1", prompt: "Explain B-Trees in DBMS", createdAt: new Date() },
    { id: "ai_2", prompt: "Snap Solve Integral Math Problem", createdAt: new Date() }
  ];
  return res.status(200).json(new ApiResponse(200, history, "AI chat history fetched"));
});

module.exports = {
  aiChat,
  snapSolve,
  getAIHistory
};
