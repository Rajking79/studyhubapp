const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    logoUrl: { type: String },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
