const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.submitFeedback = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Support ticket submitted successfully"));
});

exports.getLegalTerms = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      { privacyPolicyUrl: "https://studyhubai.com/privacy", termsUrl: "https://studyhubai.com/terms" },
      "Legal terms loaded"
    )
  );
});
