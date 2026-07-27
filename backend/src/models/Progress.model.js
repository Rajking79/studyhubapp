const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    lastPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
    lastTimeSeconds: { type: Number, default: 0 },
    percentageCompleted: { type: Number, default: 0 }
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, materialId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);
