const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subjectId: { type: String, required: true },
    subjectName: { type: String, default: "" },
    category: {
      type: String,
      enum: ["pyq", "notes", "book", "guide", "syllabus", "question_bank"],
      required: true
    },
    tabType: { type: String, enum: ["pdf", "video"], default: "pdf" },
    examType: { type: String, enum: ["Mid Sem", "End Sem", "Backlog", "All"], default: "End Sem" },
    year: { type: String, default: "2024" },
    fileSizeMB: { type: Number, default: 3.5 },
    fileUrl: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    author: { type: String, default: "Faculty Team" },
    rating: { type: Number, default: 4.8 },
    downloadsCount: { type: Number, default: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "approved" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
