const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referrerUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referralCode: { type: String, required: true },
    rewardCoinsAwarded: { type: Number, default: 50 }
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);
module.exports = Referral;
