const mockUsers = [
  {
    _id: "usr_mock_student_1",
    name: "Raj Rana",
    email: "raj.rana@studyhubai.com",
    role: "student",
    college: "Delhi Technological University",
    course: "B.Tech Computer Science",
    semester: "Semester 6",
    rewardCoins: 250,
    isDeleted: false,
    isBlocked: false
  },
  {
    _id: "usr_mock_admin_1",
    name: "Super Admin",
    email: "admin@studyhubai.com",
    role: "admin",
    isDeleted: false,
    isBlocked: false
  }
];

const mockColleges = [
  { _id: "clg_1", name: "Delhi Technological University", shortCode: "DTU", city: "Delhi", state: "Delhi", isFeatured: true },
  { _id: "clg_2", name: "Indian Institute of Technology Delhi", shortCode: "IITD", city: "Delhi", state: "Delhi", isFeatured: true }
];

const mockCourses = [
  { _id: "crs_1", collegeId: "clg_1", name: "B.Tech Computer Science", code: "CSE", durationYears: 4, totalSemesters: 8 },
  { _id: "crs_2", collegeId: "clg_1", name: "Master of Business Administration", code: "MBA", durationYears: 2, totalSemesters: 4 }
];

const mockSubjects = [
  { _id: "sbj_1", courseId: "crs_1", semesterNumber: 6, name: "Database Management Systems", code: "CS601", credits: 4 },
  { _id: "sbj_2", courseId: "crs_1", semesterNumber: 6, name: "Operating Systems", code: "CS602", credits: 4 }
];

const mockMaterials = [
  {
    _id: "mat_1",
    title: "DBMS Unit 1 to 5 Comprehensive Notes",
    category: "Notes",
    subjectId: "sbj_1",
    fileUrl: "https://studyhubai.com/pdf/dbms-notes.pdf",
    downloadCount: 1420,
    isApproved: true
  },
  {
    _id: "mat_2",
    title: "Operating Systems 2025 Mid-Term PYQ Paper with Solutions",
    category: "PYQ",
    subjectId: "sbj_2",
    fileUrl: "https://studyhubai.com/pdf/os-pyq-2025.pdf",
    downloadCount: 980,
    isApproved: true
  }
];

module.exports = {
  mockUsers,
  mockColleges,
  mockCourses,
  mockSubjects,
  mockMaterials
};
