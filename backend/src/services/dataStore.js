const mockData = {
  users: [
    {
      _id: "usr_mock_1",
      name: "Raj Rana",
      email: "raj.student@studyhubai.com",
      phone: "+919876543210",
      password: "$2a$10$e8KzGkL.a2o6hM2M.Q.L/.rK5u5E8j1d7k3L9m0N1P2Q3R4S5T6U7V8W9X",
      role: "student",
      college: "Delhi Technological University",
      course: "B.Tech Computer Science",
      semester: "Semester 6",
      rewardCoins: 250,
      referralCode: "STUDY_6A685D",
      isBlocked: false,
      isDeleted: false
    }
  ],
  colleges: [
    { _id: "clg_1", name: "Delhi Technological University", shortCode: "DTU", city: "Delhi", isFeatured: true },
    { _id: "clg_2", name: "Indian Institute of Technology Delhi", shortCode: "IITD", city: "New Delhi", isFeatured: true }
  ],
  courses: [
    { _id: "crs_1", name: "B.Tech Computer Science", code: "CS", collegeId: "clg_1", durationYears: 4, totalSemesters: 8 },
    { _id: "crs_2", name: "BCA", code: "BCA", collegeId: "clg_1", durationYears: 3, totalSemesters: 6 }
  ],
  subjects: [
    { _id: "sbj_1", name: "Database Management Systems", code: "CS601", courseId: "crs_1", semesterNumber: 6, creditPoints: 4, materialCount: 15 },
    { _id: "sbj_2", name: "Operating Systems", code: "CS602", courseId: "crs_1", semesterNumber: 6, creditPoints: 4, materialCount: 12 }
  ],
  materials: [
    {
      _id: "mat_1",
      title: "DBMS Unit 1 to 5 Comprehensive Notes",
      description: "Complete handwritten lecture revision notes for DBMS.",
      category: "Notes",
      subjectId: "sbj_1",
      collegeId: "clg_1",
      year: 2024,
      fileUrl: "https://studyhubai.com/uploads/dbms-notes.pdf",
      fileSizeMB: 4.2,
      totalPages: 45,
      downloadCount: 1420,
      viewCount: 3200,
      isApproved: true
    },
    {
      _id: "mat_2",
      title: "DBMS 2023 End-Term Exam PYQ Paper",
      description: "Solved previous year question paper with answer keys.",
      category: "PYQ",
      subjectId: "sbj_1",
      collegeId: "clg_1",
      year: 2023,
      fileUrl: "https://studyhubai.com/uploads/dbms-2023-pyq.pdf",
      fileSizeMB: 2.1,
      totalPages: 12,
      downloadCount: 980,
      viewCount: 2100,
      isApproved: true
    }
  ],
  banners: [
    { _id: "bnr_1", title: "Mid-Term PYQ Papers Released", imageUrl: "https://studyhubai.com/banners/b1.jpg", isActive: true }
  ],
  favorites: [],
  downloads: [],
  notifications: [
    { _id: "not_1", userId: "usr_mock_1", title: "Welcome to StudyHub AI", description: "Start exploring PYQs and Notes for your semester.", isRead: false }
  ],
  feedbacks: []
};

module.exports = mockData;
