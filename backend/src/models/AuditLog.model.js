const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    adminName: { type: String, required: true },
    action: { type: String, required: true },
    targetResource: { type: String, required: true },
    ipAddress: { type: String, default: "127.0.0.1" }
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
module.exports = AuditLog;
