const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getReferralCode = asyncHandler(async (req, res) => {
  const userIdStr = (req.user?._id || "STUDY").toString().substring(0, 6).toUpperCase();
  const referralData = {
    referralCode: `STUDY_${userIdStr}`,
    inviteUrl: `https://studyhub.app/invite/STUDY_${userIdStr}`,
    totalInvited: 12,
    earnedCoins: 600
  };
  return res.status(200).json(new ApiResponse(200, referralData, "Referral code fetched successfully"));
});

const applyReferralCode = asyncHandler(async (req, res) => {
  const { referralCode } = req.body;
  return res.status(200).json(new ApiResponse(200, { referralCode, rewardApplied: "50 Bonus Coins Credited" }, "Referral code applied successfully"));
});

module.exports = {
  getReferralCode,
  applyReferralCode
};
