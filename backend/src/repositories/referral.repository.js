const Referral = require("../models/Referral.model");

class ReferralRepository {
  async create(data) {
    return await Referral.create(data);
  }

  async getLeaderboard() {
    return await Referral.aggregate([
      { $group: { _id: "$referrerUserId", totalInvites: { $sum: 1 }, totalCoins: { $sum: "$rewardCoinsAwarded" } } },
      { $sort: { totalInvites: -1 } },
      { $limit: 20 }
    ]);
  }
}

module.exports = new ReferralRepository();
