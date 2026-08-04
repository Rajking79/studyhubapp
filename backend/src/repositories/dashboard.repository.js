const { mockMaterials } = require("../services/dataStore");

const getHomeData = async () => {
  return {
    banners: [
      { id: "b1", title: "Mid-Term Exam Practice PYQs Available", imageUrl: "https://studyhubai.com/banner1.jpg" }
    ],
    trendingNotes: mockMaterials,
    dailyStreakDays: 5,
    coinsEarned: 250
  };
};

module.exports = {
  getHomeData
};
