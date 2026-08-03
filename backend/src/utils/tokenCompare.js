const crypto = require("crypto");

/**
 * Timing-safe string comparison to protect against timing attacks when verifying token hashes.
 */
function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

module.exports = { safeCompare };
