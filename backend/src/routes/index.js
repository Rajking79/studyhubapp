const express = require("express");
const router = express.Router();

// Root API Status Endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "StudyHub AI API Gateway - Clean Reset State",
    activeApis: 0
  });
});

module.exports = router;
