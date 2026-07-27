const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    collegeId: { type: String, required: true },
    yearsCount: { type: Number, default: 4 },
    semestersCount: { type: Number, default: 8 },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
