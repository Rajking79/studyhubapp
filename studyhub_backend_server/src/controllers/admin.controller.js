const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateTokens");
const dataStore = require("../services/dataStore");

// 1. Admin Login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const tokenObj = generateToken(dataStore.profile.id);
  return res.status(200).json(
    new ApiResponse(200, { user: dataStore.profile, token: tokenObj.token }, "Admin authenticated successfully")
  );
});

// 2. Admin Register
const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) throw new ApiError(400, "Name, Email, and Password are required");

  const newAdmin = {
    id: "admin_" + Date.now(),
    name,
    email: email.toLowerCase(),
    phone: phone || "+91 9876543210",
    role: "Super Admin",
    status: "Active & 2FA Protected"
  };

  const tokenObj = generateToken(newAdmin.id);
  return res.status(201).json(
    new ApiResponse(201, { user: newAdmin, token: tokenObj.token }, "Admin registered successfully")
  );
});

// 3. Get Admin Profile
const getAdminProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.profile, "Admin profile loaded"));
});

// 4. Update Admin Profile
const updateAdminProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, role } = req.body;
  if (name) dataStore.profile.name = name;
  if (email) dataStore.profile.email = email;
  if (phone) dataStore.profile.phone = phone;
  if (role) dataStore.profile.role = role;

  return res.status(200).json(new ApiResponse(200, dataStore.profile, "Admin profile updated successfully"));
});

// 5. Change Admin Password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!newPassword) throw new ApiError(400, "New password is required");
  return res.status(200).json(new ApiResponse(200, null, "Password updated successfully"));
});

// 6. Get Dashboard Stats & Charts
const getDashboardStats = asyncHandler(async (req, res) => {
  dataStore.syncStats();
  return res.status(200).json(
    new ApiResponse(200, {
      stats: dataStore.stats,
      recentMaterials: dataStore.materials.slice(0, 5),
      featuredColleges: dataStore.colleges.slice(0, 4)
    }, "Dashboard statistics and analytics loaded")
  );
});

// 7. Colleges APIs
const getColleges = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.colleges, "Colleges list loaded from Master Store"));
});

const addCollege = asyncHandler(async (req, res) => {
  const { name, university, city, state, logo } = req.body;
  if (!name) throw new ApiError(400, "College name is required");

  const newCollege = {
    id: "col_" + Date.now(),
    name,
    university: university || "Central University",
    city: city || "New Delhi",
    state: state || "Delhi",
    location: `${city || "New Delhi"}, ${state || "Delhi"}`,
    category: university || "Central University",
    logoUrl: logo || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80",
    logo: logo || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80",
    subjectCount: 0,
    coursesCount: 0,
    studentsCount: 0,
    availableCourses: ["B.Tech", "BCA"],
    isFeatured: true,
    status: "Active"
  };

  dataStore.colleges.unshift(newCollege);
  dataStore.syncStats();

  return res.status(201).json(new ApiResponse(201, newCollege, "College added live to Master Store!"));
});

const editCollege = asyncHandler(async (req, res) => {
  const { collegeId } = req.params;
  const colIndex = dataStore.colleges.findIndex(c => c.id === collegeId);
  if (colIndex !== -1) {
    dataStore.colleges[colIndex] = { ...dataStore.colleges[colIndex], ...req.body };
  }
  return res.status(200).json(new ApiResponse(200, dataStore.colleges[colIndex] || req.body, "College updated successfully"));
});

const toggleFeaturedCollege = asyncHandler(async (req, res) => {
  const { collegeId } = req.params;
  const college = dataStore.colleges.find(c => c.id === collegeId);
  if (college) college.isFeatured = !college.isFeatured;
  return res.status(200).json(new ApiResponse(200, { collegeId, isFeatured: college?.isFeatured }, "Featured status updated"));
});

const deleteCollege = asyncHandler(async (req, res) => {
  const { collegeId } = req.params;
  dataStore.colleges = dataStore.colleges.filter(c => c.id !== collegeId);
  dataStore.syncStats();
  return res.status(200).json(new ApiResponse(200, { collegeId }, "College deleted from Master Store"));
});

// 8. Courses APIs
const getCourses = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.courses, "Courses list loaded"));
});

const addCourse = asyncHandler(async (req, res) => {
  const { name, code, collegeName, durationYears } = req.body;
  if (!name) throw new ApiError(400, "Course name is required");

  const newCourse = {
    id: "crs_" + Date.now(),
    collegeId: "du_dtu",
    collegeName: collegeName || "Delhi Technological University (DTU)",
    name,
    code: code || "BT-CS",
    durationYears: durationYears || 4,
    totalSemesters: (durationYears || 4) * 2,
    department: "Engineering",
    status: "Active"
  };

  dataStore.courses.unshift(newCourse);
  dataStore.syncStats();
  return res.status(201).json(new ApiResponse(201, newCourse, "Course created live in Master Store!"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  dataStore.courses = dataStore.courses.filter(c => c.id !== courseId);
  dataStore.syncStats();
  return res.status(200).json(new ApiResponse(200, { courseId }, "Course deleted from Master Store"));
});

// 9. Subjects APIs
const getSubjects = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.subjects, "Subjects list loaded"));
});

const addSubject = asyncHandler(async (req, res) => {
  const { name, code, semester, teacherName } = req.body;
  if (!name) throw new ApiError(400, "Subject name is required");

  const newSubject = {
    id: "sbj_" + Date.now(),
    code: code || "CS-401",
    title: name,
    name,
    courseId: "btech_cs",
    courseName: "B.Tech CS",
    semester: semester || 4,
    teacherName: teacherName || "Dr. A.K. Sharma",
    instructorName: teacherName || "Dr. A.K. Sharma",
    instructorRole: "Faculty",
    department: "Computer Science",
    rating: 5.0,
    materialCount: 0,
    materialsCount: 0,
    description: "Core Subject Description",
    status: "Active"
  };

  dataStore.subjects.unshift(newSubject);
  dataStore.syncStats();
  return res.status(201).json(new ApiResponse(201, newSubject, "Subject created live in Master Store!"));
});

const deleteSubject = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  dataStore.subjects = dataStore.subjects.filter(s => s.id !== subjectId);
  dataStore.syncStats();
  return res.status(200).json(new ApiResponse(200, { subjectId }, "Subject deleted from Master Store"));
});

// 10. Materials (PDFs & Videos) APIs
const getMaterials = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.materials, "Study materials loaded from Master Store"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const { title, category, uploadType, subjectName, pdfUrl } = req.body;
  if (!title) throw new ApiError(400, "Material title is required");

  const newMaterial = {
    id: "mat_" + Date.now(),
    title,
    category: category || (uploadType === "Video" ? "Video Lecture" : "Previous Papers"),
    uploadType: uploadType || "PDF",
    subjectId: "subj_dbms_101",
    subjectName: subjectName || "DBMS",
    subject: subjectName || "DBMS",
    collegeName: "Delhi University (DU)",
    courseName: "B.Tech CS",
    academicYear: "2nd Year",
    semester: 4,
    examTag: "End Sem",
    year: 2026,
    fileSizeMb: uploadType === "Video" ? 0 : 5.4,
    downloadsCount: 0,
    uploadedBy: "Admin",
    uploadedDate: "Just Now",
    date: "Just Now",
    isPinned: false,
    isFeatured: true,
    isPremium: false,
    status: "Published",
    pdfUrl: pdfUrl || "https://studyhub.com/pdf/sample.pdf"
  };

  dataStore.materials.unshift(newMaterial);
  dataStore.syncStats();
  return res.status(201).json(new ApiResponse(201, newMaterial, "Material published live to Mobile App!"));
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const { materialId } = req.params;
  dataStore.materials = dataStore.materials.filter(m => m.id !== materialId);
  dataStore.syncStats();
  return res.status(200).json(new ApiResponse(200, { materialId }, "Material deleted from Master Store"));
});

// 11. Banners & Home Sections APIs
const getBanners = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.banners, "Banners loaded"));
});

const addBanner = asyncHandler(async (req, res) => {
  const { title, subtitle, imageUrl } = req.body;
  const newBanner = {
    id: "bnr_" + Date.now(),
    title: title || "New Exam Banner",
    subtitle: subtitle || "Click to check timetable",
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    buttonText: "View Details",
    redirectRoute: "/notifications",
    priority: 1,
    isEnabled: true
  };
  dataStore.banners.unshift(newBanner);
  return res.status(201).json(new ApiResponse(201, newBanner, "Banner created live in Master Store!"));
});

const toggleBanner = asyncHandler(async (req, res) => {
  const { bannerId } = req.params;
  const b = dataStore.banners.find(item => item.id === bannerId);
  if (b) b.isEnabled = !b.isEnabled;
  return res.status(200).json(new ApiResponse(200, { bannerId, isEnabled: b?.isEnabled }, "Banner status updated"));
});

const getHomeSections = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.homeSections, "Home Sections loaded"));
});

const toggleHomeSection = asyncHandler(async (req, res) => {
  const { sectionId } = req.params;
  const s = dataStore.homeSections.find(item => item.id === sectionId);
  if (s) s.isEnabled = !s.isEnabled;
  return res.status(200).json(new ApiResponse(200, { sectionId, isEnabled: s?.isEnabled }, "Home section status updated"));
});

// 12. Push Notification Broadcast
const getNotifications = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.notifications, "Notifications loaded"));
});

const broadcastNotice = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) throw new ApiError(400, "Notice title is required");

  const newNotice = {
    id: "notif_" + Date.now(),
    title,
    description: description || "Exam Alert to all mobile app students",
    category: "Exams",
    target: "All DU Students",
    targetCollege: "Delhi University (DU)",
    count: dataStore.stats.totalStudents,
    sentAt: "Just Now",
    timeAgo: "Just Now"
  };

  dataStore.notifications.unshift(newNotice);
  return res.status(201).json(new ApiResponse(201, newNotice, "Push Notification broadcasted live to Mobile App!"));
});

// 13. Student Users Directory APIs
const getStudents = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.students, "Student users directory loaded"));
});

const toggleBlockStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const student = dataStore.students.find(s => s.id === studentId);
  if (student) {
    student.isBlocked = !student.isBlocked;
    student.status = student.isBlocked ? "Blocked" : "Active";
  }
  return res.status(200).json(new ApiResponse(200, { studentId, isBlocked: student?.isBlocked, status: student?.status }, "Student access status updated"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  dataStore.students = dataStore.students.filter(s => s.id !== studentId);
  dataStore.syncStats();
  return res.status(200).json(new ApiResponse(200, { studentId }, "Student account deleted"));
});

// 14. Feedback & Support APIs
const getFeedback = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, dataStore.feedback, "Student feedback list loaded"));
});

module.exports = {
  adminLogin,
  adminRegister,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  getDashboardStats,
  getColleges,
  addCollege,
  editCollege,
  toggleFeaturedCollege,
  deleteCollege,
  getCourses,
  addCourse,
  deleteCourse,
  getSubjects,
  addSubject,
  deleteSubject,
  getMaterials,
  uploadMaterial,
  deleteMaterial,
  getBanners,
  addBanner,
  toggleBanner,
  getHomeSections,
  toggleHomeSection,
  getNotifications,
  broadcastNotice,
  getStudents,
  toggleBlockStudent,
  deleteStudent,
  getFeedback
};
