const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["PYQ", "Notes", "Book", "Guide", "Practical File", "Assignment", "Syllabus", "Video", "Question Bank"],
      required: true
    },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    year: { type: Number, default: 2024 },
    fileUrl: { type: String, required: true },
    fileSizeMB: { type: Number, default: 2.5 },
    totalPages: { type: Number, default: 20 },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isApproved: { type: Boolean, default: true },
    rejectionReason: { type: String, default: "" }
  },
  { timestamps: true }
);

materialSchema.index({ title: "text", description: "text" });

const Material = mongoose.model("Material", materialSchema);
module.exports = Material;
