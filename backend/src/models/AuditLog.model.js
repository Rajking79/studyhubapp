const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, default: "127.0.0.1" },
    userAgent: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
