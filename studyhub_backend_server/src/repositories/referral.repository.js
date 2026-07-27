const Referral = require("../models/Referral.model");

class ReferralRepository {
  static async getReferralByUserId(userId) {
    let ref = await Referral.findOne({ userId }).lean();
    if (!ref) {
      const codeStr = userId.toString().substring(0, 6).toUpperCase();
      const code = `STUDY_${codeStr}`;
      ref = await Referral.create({
        userId,
        referralCode: code,
        inviteUrl: `https://studyhub.app/invite/${code}`
      });
    }
    return ref;
  }

  static async applyReferralCode(userId, referralCode) {
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
  }
}

module.exports = ReferralRepository;
