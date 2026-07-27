const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ReferralService = require("../services/referral.service");

const getReferralCode = asyncHandler(async (req, res) => {
  const referralData = await ReferralService.getReferralData(req.user._id);
  return res.status(200).json(new ApiResponse(200, referralData, "Referral code fetched successfully from MongoDB"));
});

const applyReferralCode = asyncHandler(async (req, res) => {
  const { referralCode } = req.body;
  const result = await ReferralService.applyReferralCode(req.user._id, referralCode);
  return res.status(200).json(new ApiResponse(200, result, "Referral code applied successfully"));
});

module.exports = {
  getReferralCode,
  applyReferralCode
};
