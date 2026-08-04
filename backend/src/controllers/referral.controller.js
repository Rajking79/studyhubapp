const referralRepo = require("../repositories/referral.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getReferralCode = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const referral = await referralRepo.getReferralInfo(userId);
  return res.status(200).json(new ApiResponse(200, referral, "Referral code details loaded"));
});

const applyReferralCode = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { referralCode } = req.body;
  const result = await referralRepo.applyReferralCode(userId, referralCode);
  return res.status(200).json(new ApiResponse(200, result, "Referral code applied! +50 bonus coins awarded."));
});

module.exports = {
  getReferralCode,
  applyReferralCode
};
