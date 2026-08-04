const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Notes", "PYQ", "Book", "Video", "Question Bank"],
      required: true
    },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "pdf" },
    fileSizeMB: { type: Number, default: 2.5 },
    downloadCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

materialSchema.index({ title: "text" });

module.exports = mongoose.model("Material", materialSchema);
