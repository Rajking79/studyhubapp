const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    university: { type: String, default: "State University", trim: true },
    location: { type: String, required: true, trim: true },
    city: { type: String, default: "New Delhi", trim: true },
    state: { type: String, default: "Delhi", trim: true },
    logoUrl: { type: String, default: "" },
    category: { type: String, enum: ["State Univ", "Central University", "Private", "Govt."], default: "State Univ" },
    availableCourses: { type: [String], default: ["B.Tech", "BCA", "B.Com", "M.Tech", "MCA"] },
    subjectCount: { type: Number, default: 0 },
    coursesCount: { type: Number, default: 0 },
    studentsCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
