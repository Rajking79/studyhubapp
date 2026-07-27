const AIRepository = require("../repositories/ai.repository");

class AIService {
  static async aiChat(userId, { prompt, subjectContext }) {
    const aiAnswer = `### StudyHub AI Assistant Solution\n\n**Topic**: ${subjectContext || "General Study"}\n\nHere is a step-by-step explanation for your query:\n\n1. **Core Concept**: ${prompt}\n2. **Detailed Analysis**: Verified academic answer generated for StudyHub AI.\n3. **Summary**: Use this key insight for exam preparation.`;

    const record = await AIRepository.createHistoryRecord({
      userId,
      prompt,
      response: aiAnswer,
      type: "chat",
      subjectContext
    });

    return {
      id: record._id,
      prompt,
      answer: aiAnswer,
      suggestedFollowups: ["Explain with example", "Provide key formulas and concepts"]
    };
  }

  static async snapSolve(userId, { note }) {
    const solution = {
      problemExtracted: note || "OCR Document Analysis",
      stepByStepSolution: [
        "Step 1: Identify problem formulation",
        "Step 2: Apply core theorem",
        "Final Answer: Concept verified successfully"
      ]
    };

    await AIRepository.createHistoryRecord({
      userId,
      prompt: `Snap & Solve: ${note || "OCR Image"}`,
      response: JSON.stringify(solution),
      type: "snap_solve"
    });

    return solution;
  }

  static async getUserHistory(userId) {
    return await AIRepository.getUserHistory(userId);
  }
}

module.exports = AIService;
