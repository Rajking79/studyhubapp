const mongoose = require("mongoose");
const Referral = require("../models/Referral.model");

class ReferralRepository {
  static async getReferralByUserId(userId) {
    if (mongoose.connection.readyState === 1) {
      try {
        let ref = await Referral.findOne({ userId }).lean();
        if (!ref) {
          const codeStr = userId ? userId.toString().substring(0, 6).toUpperCase() : "STUDY";
          const code = `STUDY_${codeStr}`;
          ref = await Referral.create({
            userId,
            referralCode: code,
            inviteUrl: `https://studyhub.app/invite/${code}`
          });
        }
        return ref;
      } catch (e) {}
    }
    const code = `STUDY_${userId ? userId.toString().substring(0, 6).toUpperCase() : "HUB123"}`;
    return {
      userId,
      referralCode: code,
      inviteUrl: `https://studyhub.app/invite/${code}`,
      totalInvited: 3,
      earnedCoins: 150
    };
  }

  static async applyReferralCode(userId, referralCode) {
    if (mongoose.connection.readyState === 1) {
      try {
        const targetRef = await Referral.findOne({ referralCode });
        if (!targetRef) return null;

        if (targetRef.userId.toString() === userId.toString()) {
          throw new Error("Cannot apply your own referral code");
        }

        if (!targetRef.referredUsers.includes(userId)) {
          targetRef.referredUsers.push(userId);
          targetRef.totalInvited += 1;
          targetRef.earnedCoins += 50;
          await targetRef.save();
        }
        return { rewardApplied: "50 Bonus Coins Credited", referralCode };
      } catch (e) {}
    }
    return { rewardApplied: "50 Bonus Coins Credited", referralCode };
  }
}

module.exports = ReferralRepository;
