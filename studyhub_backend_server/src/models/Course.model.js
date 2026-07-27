const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true },
    collegeId: { type: String, required: true },
    collegeName: { type: String, default: "" },
    yearsCount: { type: Number, default: 4 },
    semestersCount: { type: Number, default: 8 },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
