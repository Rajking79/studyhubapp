const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    referralCode: { type: String, required: true, unique: true, uppercase: true },
    inviteUrl: { type: String },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    earnedCoins: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);
