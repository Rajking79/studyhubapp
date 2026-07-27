const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema(
  {
    yearNumber: { type: Number, required: true },
    name: { type: String, required: true }, // e.g. "1st Year"
    label: { type: String, default: "" },   // e.g. "Freshman Year"
    courseId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Year", yearSchema);
