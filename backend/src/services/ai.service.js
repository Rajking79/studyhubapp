const aiRepo = require("../repositories/ai.repository");

const processAiPrompt = async (userId, prompt, type = "chat") => {
  let responseText = "";
  if (type === "chat") {
    responseText = `[StudyHub AI Tutor Response]: Here is the explanation for "${prompt}". In Computer Science and Engineering, this concept is fundamental...`;
  } else if (type === "summarize") {
    responseText = `Summary of "${prompt}":\n- Key Point 1: Core definition and architectural scope.\n- Key Point 2: Implementation pipeline and data flow.\n- Key Point 3: Best practices and performance optimizations.`;
  } else if (type === "explain") {
    responseText = `ELI5 Explanation for "${prompt}": Think of this like a post office. When you send a letter (data request), the postman (router) delivers it safely to the house (server)...`;
  } else if (type === "flashcards") {
    responseText = JSON.stringify([
      { question: `What is ${prompt}?`, answer: `It is a core concept in computer systems design.` },
      { question: `Why use ${prompt}?`, answer: `It improves performance, reliability, and modularity.` }
    ]);
  } else if (type === "quiz") {
    responseText = JSON.stringify([
      {
        question: `Sample Question regarding ${prompt}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctIndex: 0
      }
    ]);
  } else if (type === "snap") {
    responseText = `[Snap & Solve OCR Result]: Detected equation/problem in photo. Step 1: Apply standard formula. Step 2: Simplify terms. Final Answer: Verified Correct Solution.`;
  }

  await aiRepo.saveAiHistory(userId, prompt, responseText, type);
  return { prompt, response: responseText, type };
};

const getAiHistory = async (userId) => {
  return await aiRepo.getAiHistory(userId);
};

const clearAiHistory = async (userId) => {
  return await aiRepo.clearAiHistory(userId);
};

module.exports = {
  processAiPrompt,
  getAiHistory,
  clearAiHistory
};
