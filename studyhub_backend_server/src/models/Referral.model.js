const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    referralCode: { type: String, required: true, unique: true },
    inviteUrl: { type: String, required: true },
    totalInvited: { type: Number, default: 0 },
    earnedCoins: { type: Number, default: 0 },
    referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);
