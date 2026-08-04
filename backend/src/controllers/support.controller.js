const feedbackRepo = require("../repositories/feedback.repository");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const submitFeedback = asyncHandler(async (req, res) => {
  const userId = req.user?._id || "usr_mock_student_1";
  const { type, message } = req.body;
  const feedback = await feedbackRepo.createFeedback(userId, type, message);
  return res.status(201).json(new ApiResponse(201, feedback, "Support ticket submitted successfully"));
});

const getLegalTerms = asyncHandler(async (req, res) => {
  const terms = {
    termsVersion: "2026.1",
    privacyPolicyUrl: "https://studyhubai.com/privacy",
    termsOfServiceUrl: "https://studyhubai.com/terms"
  };
  return res.status(200).json(new ApiResponse(200, terms, "Legal terms & policies loaded"));
});

module.exports = {
  submitFeedback,
  getLegalTerms
};
