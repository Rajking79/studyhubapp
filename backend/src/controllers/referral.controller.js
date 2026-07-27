const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getReferralCode = asyncHandler(async (req, res) => {
  const referralData = {
    referralCode: "STUDY50",
    inviteUrl: "https://studyhub.app/invite/STUDY50",
    totalInvited: 12,
    earnedCoins: 600
  };
  return res.status(200).json(new ApiResponse(200, referralData, "Referral code fetched"));
});

const applyReferralCode = asyncHandler(async (req, res) => {
  const { referralCode } = req.body;
  return res.status(200).json(new ApiResponse(200, { referralCode, rewardApplied: "50 Bonus Coins Credited" }, "Referral code applied"));
});

module.exports = {
  getReferralCode,
  applyReferralCode
};
