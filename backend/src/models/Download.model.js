const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    downloadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Download = mongoose.model("Download", downloadSchema);
module.exports = Download;
