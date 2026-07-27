const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    logoUrl: { type: String, default: "" },
    category: { type: String, enum: ["State Univ", "Private", "Govt."], default: "State Univ" },
    availableCourses: { type: [String], default: ["B.Tech", "BCA", "B.Com", "M.Tech", "MCA"] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
