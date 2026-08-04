const aiRepository = require("../repositories/ai.repository");

class AIService {
  async chat(userId, prompt) {
    return {
      prompt,
      response: `AI Tutor Explanation for: ${prompt}. Key points: 1. Core architecture overview, 2. Practical code examples.`,
      type: "chat"
    };
  }

  async getHistory(userId) {
    return await aiRepository.getHistory(userId);
  }
}

module.exports = new AIService();
