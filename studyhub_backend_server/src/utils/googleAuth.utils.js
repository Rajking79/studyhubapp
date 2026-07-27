const { googleClient, GOOGLE_CLIENT_ID } = require("../config/googleOAuth.config");
const ApiError = require("./ApiError");

class GoogleAuthUtils {
  static async verifyGoogleIdToken(idToken) {
    if (!idToken || typeof idToken !== "string") {
      throw new ApiError(400, "Google ID Token is missing or invalid format.");
    }

    try {
      // 1. Production Google ID Token Verification using Google OAuth2Client
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new ApiError(401, "Failed to extract payload from Google ID Token.");
      }

      if (!payload.email_verified) {
        throw new ApiError(403, "Google Account email is not verified by Google.");
      }

      return {
        googleId: payload.sub,
        email: payload.email.toLowerCase(),
        name: payload.name || "Google User",
        avatar: payload.picture || "https://i.pravatar.cc/150?img=15",
        emailVerified: payload.email_verified
      };
    } catch (err) {
      if (err instanceof ApiError) throw err;

      // 2. Dev/Mock Token Fallback Resilience (For testing environments)
      if (process.env.NODE_ENV !== "production" && (idToken.startsWith("sample_google_token") || idToken.startsWith("mock_"))) {
        return {
          googleId: "google_sub_64f1a2b3c4d5e6f7",
          email: "rahul.google@studyhub.com",
          name: "Rahul Sharma",
          avatar: "https://i.pravatar.cc/150?img=15",
          emailVerified: true
        };
      }

      throw new ApiError(401, `Invalid or expired Google Token: ${err.message}`);
    }
  }
}

module.exports = GoogleAuthUtils;
