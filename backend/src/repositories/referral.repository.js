const mongoose = require("mongoose");
const Referral = require("../models/Referral.model");

const isDbConnected = () => mongoose.connection.readyState === 1;

const mockReferral = {
  _id: "ref_1",
  userId: "usr_mock_student_1",
  referralCode: "STUDY_6A685D",
  inviteUrl: "https://studyhubai.com/invite/STUDY_6A685D",
  referredUsers: [],
  earnedCoins: 250
};

const getReferralInfo = async (userId) => {
  if (isDbConnected()) {
    let ref = await Referral.findOne({ userId });
    if (!ref) {
      const code = "STUDY_" + Math.random().toString(36).substring(2, 8).toUpperCase();
      ref = await Referral.create({
        userId,
        referralCode: code,
        inviteUrl: `https://studyhubai.com/invite/${code}`
      });
    }
    return ref;
  }
  return mockReferral;
};

const applyReferralCode = async (userId, referralCode) => {
  if (isDbConnected()) {
    const ref = await Referral.findOne({ referralCode: referralCode.toUpperCase() });
    if (!ref) return null;
    ref.referredUsers.push(userId);
    ref.earnedCoins += 50;
    await ref.save();
    return ref;
  }
  mockReferral.earnedCoins += 50;
  return mockReferral;
};

module.exports = {
  getReferralInfo,
  applyReferralCode
};
