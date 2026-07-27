const ReferralRepository = require("../repositories/referral.repository");

class ReferralService {
  static async getReferralData(userId) {
    return await ReferralRepository.getReferralByUserId(userId);
  }

  static async applyReferralCode(userId, referralCode) {
    return await ReferralRepository.applyReferralCode(userId, referralCode);
  }
}

module.exports = ReferralService;
