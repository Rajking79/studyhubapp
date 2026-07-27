const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    materialTitle: { type: String, default: "" },
    fileSizeMB: { type: Number, default: 0 },
    downloadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Download", downloadSchema);
