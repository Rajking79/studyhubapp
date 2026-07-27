const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "studyhub-google-client-id-2026.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "studyhub-google-client-secret-key";

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

module.exports = {
  googleClient,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
};
