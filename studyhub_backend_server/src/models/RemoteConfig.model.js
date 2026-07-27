const mongoose = require("mongoose");

const remoteConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, default: "" },
    isPublic: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RemoteConfig", remoteConfigSchema);
