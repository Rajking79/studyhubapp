const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const submitFeedback = asyncHandler(async (req, res) => {
  const { type, message, rating } = req.body;
  return res.status(201).json(new ApiResponse(201, { type, message, rating }, "Feedback submitted. Thank you!"));
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
