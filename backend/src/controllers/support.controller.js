const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const FeedbackRepository = require("../repositories/feedback.repository");

const submitFeedback = asyncHandler(async (req, res) => {
  const { type, message, rating } = req.body;
  const record = await FeedbackRepository.createFeedback({
    userId: req.user?._id,
    userName: req.user?.name || "Student",
    userEmail: req.user?.email || "",
    type: type || "feedback",
    message: message || "Student feedback",
    rating: Number(rating || 5)
  });
  return res.status(201).json(new ApiResponse(201, record, "Feedback submitted to MongoDB. Thank you!"));
});

const getLegalDocs = asyncHandler(async (req, res) => {
  const { doc } = req.query;
  const content = {
    document: doc || "privacy_policy",
    title: doc === "privacy_policy" ? "Privacy Policy" : "Terms of Service",
    contentMarkdown: "### StudyHub Privacy Policy & Terms of Service\nWe protect your privacy and ensure secure access to educational resources."
  };
  return res.status(200).json(new ApiResponse(200, content, "Legal document fetched"));
});

module.exports = {
  submitFeedback,
  getLegalDocs
};
