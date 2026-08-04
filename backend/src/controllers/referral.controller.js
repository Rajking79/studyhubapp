const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getReferralCode = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      { referralCode: "STUDY_6A685D", totalInvites: 5, bonusCoinsEarned: 250 },
      "Referral details loaded"
    )
  );
});

exports.applyReferralCode = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { rewardCoinsAwarded: 50 }, "Referral code applied! +50 Coins awarded"));
});
