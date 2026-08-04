const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, uppercase: true },
    city: { type: String, default: "Delhi" },
    state: { type: String, default: "Delhi" },
    logoUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
module.exports = College;
