const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const GoogleAuthService = require("../services/googleAuth.service");

class GoogleAuthController {
  static googleLogin = asyncHandler(async (req, res) => {
    const { idToken } = req.body;
    const clientMetadata = req.clientMetadata || {};

    const authResult = await GoogleAuthService.processGoogleLogin(idToken, clientMetadata);

    return res.status(200).json(
      new ApiResponse(
        200,
        authResult,
        "Google Login Successful"
      )
    );
  });
}

module.exports = GoogleAuthController;
