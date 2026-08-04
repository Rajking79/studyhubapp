const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    targetType: { type: String, default: "Material" }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, targetId: 1 }, { unique: true });

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
