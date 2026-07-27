const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Feedback = require("../models/Feedback.model");

const submitFeedback = asyncHandler(async (req, res) => {
  const { type, message, rating } = req.body;
  const record = await Feedback.create({
    userId: req.user?._id,
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
    contentMarkdown: "### StudyHub Privacy Policy\nWe respect your data privacy and study materials usage..."
  };
  return res.status(200).json(new ApiResponse(200, content, "Legal document fetched"));
});

module.exports = {
  submitFeedback,
  getLegalDocs
};
