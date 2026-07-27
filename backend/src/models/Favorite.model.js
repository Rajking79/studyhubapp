const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetType: { type: String, enum: ["material", "subject", "college", "course"], required: true },
    targetId: { type: String, required: true },
    materialDetails: { type: mongoose.Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
