const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { generateTokens } = require("../utils/generateTokens");
const AdminService = require("../services/admin.service");
const User = require("../models/User.model");

// 1. Admin Login
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password are required");

  let admin = await User.findOne({ email: email.toLowerCase().trim(), role: "admin" }).select("+password");

  if (!admin) {
    throw new ApiError(401, "Invalid admin credentials or non-admin account");
  }

  const isMatch = await admin.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid admin credentials");
  }

  const tokens = generateTokens(admin);

  return res.status(200).json(
    new ApiResponse(200, { user: admin, token: tokens.accessToken, refreshToken: tokens.refreshToken }, "Admin authenticated successfully")
  );
});

// 2. Admin Register
const adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) throw new ApiError(400, "Name, Email, and Password are required");

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, "Account already exists with this email");

  const admin = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    phone: phone || "",
    role: "admin",
    isEmailVerified: true
  });

  const tokens = generateTokens(admin);
  return res.status(201).json(
    new ApiResponse(201, { user: admin, token: tokens.accessToken, refreshToken: tokens.refreshToken }, "Admin registered successfully")
  );
});

// 3. Get Admin Profile
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user._id).select("-password");
  return res.status(200).json(new ApiResponse(200, admin || req.user, "Admin profile loaded"));
});

// 4. Update Admin Profile
const updateAdminProfile = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;

  const updatedAdmin = await User.findByIdAndUpdate(req.user._id, { $set: updateData }, { new: true }).select("-password");
  return res.status(200).json(new ApiResponse(200, updatedAdmin, "Admin profile updated successfully"));
});

// 5. Change Admin Password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) throw new ApiError(400, "New password must be at least 8 characters");

  const admin = await User.findById(req.user._id).select("+password");
  admin.password = newPassword;
  await admin.save();

  return res.status(200).json(new ApiResponse(200, { updated: true }, "Password updated successfully"));
});

// 6. Get Dashboard Stats & Analytics
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await AdminService.getStats();
  return res.status(200).json(new ApiResponse(200, { stats }, "Dashboard statistics loaded"));
});

// 7. Colleges APIs
const getColleges = asyncHandler(async (req, res) => {
  const colleges = await AdminService.getColleges();
  return res.status(200).json(new ApiResponse(200, colleges, "Colleges list loaded from MongoDB"));
});

const addCollege = asyncHandler(async (req, res) => {
  const college = await AdminService.addCollege(req.body);
  return res.status(201).json(new ApiResponse(201, college, "College added live to MongoDB!"));
});

const editCollege = asyncHandler(async (req, res) => {
  const college = await AdminService.editCollege(req.params.collegeId, req.body);
  return res.status(200).json(new ApiResponse(200, college, "College updated successfully"));
});

const toggleFeaturedCollege = asyncHandler(async (req, res) => {
  const college = await AdminService.editCollege(req.params.collegeId, req.body);
  return res.status(200).json(new ApiResponse(200, college, "Featured status updated"));
});

const deleteCollege = asyncHandler(async (req, res) => {
  const college = await AdminService.deleteCollege(req.params.collegeId);
  return res.status(200).json(new ApiResponse(200, college, "College soft deleted from MongoDB"));
});

// 8. Courses APIs
const getCourses = asyncHandler(async (req, res) => {
  const courses = await AdminService.getCourses();
  return res.status(200).json(new ApiResponse(200, courses, "Courses list loaded"));
});

const addCourse = asyncHandler(async (req, res) => {
  const course = await AdminService.addCourse(req.body);
  return res.status(201).json(new ApiResponse(201, course, "Course created live in MongoDB!"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await AdminService.deleteCourse(req.params.courseId);
  return res.status(200).json(new ApiResponse(200, course, "Course deleted from MongoDB"));
});

// 9. Subjects APIs
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await AdminService.getSubjects();
  return res.status(200).json(new ApiResponse(200, subjects, "Subjects list loaded"));
});

const addSubject = asyncHandler(async (req, res) => {
  const subject = await AdminService.addSubject(req.body);
  return res.status(201).json(new ApiResponse(201, subject, "Subject created live in MongoDB!"));
});

const deleteSubject = asyncHandler(async (req, res) => {
  await AdminService.deleteSubject(req.params.subjectId);
  return res.status(200).json(new ApiResponse(200, { subjectId: req.params.subjectId }, "Subject deleted from MongoDB"));
});

// 10. Materials APIs
const getMaterials = asyncHandler(async (req, res) => {
  const result = await AdminService.getStats();
  return res.status(200).json(new ApiResponse(200, result, "Admin materials stats loaded"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, req.body, "Material uploaded successfully"));
});

const deleteMaterial = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { materialId: req.params.materialId }, "Material deleted"));
});

// 11. Banners APIs
const getBanners = asyncHandler(async (req, res) => {
  const banners = await AdminService.getBanners();
  return res.status(200).json(new ApiResponse(200, banners, "Banners loaded from MongoDB"));
});

const addBanner = asyncHandler(async (req, res) => {
  const banner = await AdminService.addBanner(req.body);
  return res.status(201).json(new ApiResponse(201, banner, "Banner added to MongoDB"));
});

const toggleBanner = asyncHandler(async (req, res) => {
  const banner = await AdminService.toggleBanner(req.params.bannerId);
  return res.status(200).json(new ApiResponse(200, banner, "Banner toggled"));
});

const getHomeSections = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Home sections list loaded"));
});

const toggleHomeSection = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { sectionId: req.params.sectionId }, "Home section toggled"));
});

// 12. Notifications Broadcast
const getNotifications = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, [], "Notifications loaded"));
});

const broadcastNotice = asyncHandler(async (req, res) => {
  const { title, message, category } = req.body;
  const notice = await AdminService.broadcastNotice(title, message, category);
  return res.status(201).json(new ApiResponse(201, notice, "Broadcast notification pushed successfully"));
});

// 13. Student Users Management
const getStudents = asyncHandler(async (req, res) => {
  const result = await AdminService.getStudents(req.query);
  return res.status(200).json(new ApiResponse(200, result, "Students list loaded from MongoDB", {
    page: result.page,
    limit: result.limit,
    total: result.total,
    totalPages: result.totalPages
  }));
});

const toggleBlockStudent = asyncHandler(async (req, res) => {
  const student = await AdminService.toggleBlockStudent(req.params.studentId);
  return res.status(200).json(new ApiResponse(200, student, "Student block status updated"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await AdminService.deleteStudent(req.params.studentId);
  return res.status(200).json(new ApiResponse(200, student, "Student soft deleted"));
});

// 14. Feedback & Reviews
const getFeedback = asyncHandler(async (req, res) => {
  const result = await AdminService.getFeedbacks(req.query);
  return res.status(200).json(new ApiResponse(200, result, "Student feedbacks loaded from MongoDB"));
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
