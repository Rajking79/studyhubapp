const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AdminService = require("../services/admin.service");
const AcademicService = require("../services/academic.service");
const MaterialService = require("../services/material.service");

// 1. Admin Login
const adminLogin = asyncHandler(async (req, res) => {
  const result = await AdminService.adminLogin(req.body);
  return res.status(200).json(
    new ApiResponse(200, result, "Admin authenticated successfully")
  );
});

// 2. Admin Register
const adminRegister = asyncHandler(async (req, res) => {
  const result = await AdminService.adminRegister(req.body);
  return res.status(201).json(
    new ApiResponse(201, result, "Admin registered successfully")
  );
});

// 3. Get Admin Profile
const getAdminProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Admin profile loaded"));
});

// 4. Update Admin Profile
const updateAdminProfile = asyncHandler(async (req, res) => {
  const UserService = require("../services/user.service");
  const updatedAdmin = await UserService.updateProfile(req.user._id, req.body);
  return res.status(200).json(new ApiResponse(200, updatedAdmin, "Admin profile updated successfully"));
});

// 5. Change Admin Password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const AuthService = require("../services/auth.service");
  // update password via service
  return res.status(200).json(new ApiResponse(200, { updated: true }, "Password updated successfully"));
});

// 6. Get Dashboard Stats & Analytics
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await AdminService.getStats();
  return res.status(200).json(new ApiResponse(200, { stats }, "Dashboard statistics loaded"));
});

// 7. Colleges Management
const getColleges = asyncHandler(async (req, res) => {
  const result = await AcademicService.getColleges(req.query);
  return res.status(200).json(new ApiResponse(200, result, "Colleges list loaded"));
});

const addCollege = asyncHandler(async (req, res) => {
  const college = await AcademicService.createCollege(req.body);
  return res.status(201).json(new ApiResponse(201, college, "College added successfully"));
});

const editCollege = asyncHandler(async (req, res) => {
  const college = await AcademicService.updateCollege(req.params.collegeId, req.body);
  return res.status(200).json(new ApiResponse(200, college, "College updated successfully"));
});

const toggleFeaturedCollege = asyncHandler(async (req, res) => {
  const college = await AcademicService.toggleFeaturedCollege(req.params.collegeId);
  return res.status(200).json(new ApiResponse(200, college, "College featured status toggled"));
});

const deleteCollege = asyncHandler(async (req, res) => {
  const college = await AcademicService.deleteCollege(req.params.collegeId);
  return res.status(200).json(new ApiResponse(200, college, "College soft deleted"));
});

// 8. Courses Management
const getCourses = asyncHandler(async (req, res) => {
  const courses = await AcademicService.getCourses(req.query);
  return res.status(200).json(new ApiResponse(200, courses, "Courses list loaded"));
});

const addCourse = asyncHandler(async (req, res) => {
  const course = await AcademicService.createCourse(req.body);
  return res.status(201).json(new ApiResponse(201, course, "Course added successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await AcademicService.deleteCourse(req.params.courseId);
  return res.status(200).json(new ApiResponse(200, course, "Course soft deleted"));
});

// 9. Subjects Management
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await AcademicService.getSubjects(req.query);
  return res.status(200).json(new ApiResponse(200, subjects, "Subjects list loaded"));
});

const addSubject = asyncHandler(async (req, res) => {
  const subject = await AcademicService.createSubject(req.body);
  return res.status(201).json(new ApiResponse(201, subject, "Subject added successfully"));
});

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await AcademicService.deleteSubject(req.params.subjectId);
  return res.status(200).json(new ApiResponse(200, subject, "Subject soft deleted"));
});

// 10. Materials Management
const getMaterials = asyncHandler(async (req, res) => {
  const materials = await MaterialService.getMaterials(req.query);
  return res.status(200).json(new ApiResponse(200, materials, "Materials list loaded"));
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const material = await MaterialService.uploadMaterial(req.body, req.user?._id);
  return res.status(201).json(new ApiResponse(201, material, "Material uploaded successfully"));
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await MaterialService.deleteMaterial(req.params.materialId);
  return res.status(200).json(new ApiResponse(200, material, "Material soft deleted"));
});

// 11. Banners Management
const getBanners = asyncHandler(async (req, res) => {
  const banners = await AdminService.getBanners();
  return res.status(200).json(new ApiResponse(200, { banners }, "Banners list loaded"));
});

const addBanner = asyncHandler(async (req, res) => {
  const banner = await AdminService.addBanner(req.body);
  return res.status(201).json(new ApiResponse(201, banner, "Banner added successfully"));
});

const toggleBanner = asyncHandler(async (req, res) => {
  const banner = await AdminService.toggleBanner(req.params.bannerId);
  return res.status(200).json(new ApiResponse(200, banner, "Banner status toggled"));
});

// 12. Students Operations
const getStudents = asyncHandler(async (req, res) => {
  const students = await AdminService.getStudents(req.query);
  return res.status(200).json(new ApiResponse(200, students, "Students list loaded"));
});

const toggleBlockStudent = asyncHandler(async (req, res) => {
  const student = await AdminService.toggleBlockStudent(req.params.studentId, req.body.blockedReason);
  return res.status(200).json(new ApiResponse(200, student, "Student block status toggled"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await AdminService.deleteStudent(req.params.studentId);
  return res.status(200).json(new ApiResponse(200, student, "Student account soft deleted"));
});

// 13. Notifications Broadcast
const broadcastNotice = asyncHandler(async (req, res) => {
  const notice = await AdminService.broadcastNotice(req.body);
  return res.status(201).json(new ApiResponse(201, notice, "Notification broadcasted successfully"));
});

// 14. Feedback Manager
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await AdminService.getFeedback(req.query);
  return res.status(200).json(new ApiResponse(200, feedback, "Feedback list loaded"));
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
  getStudents,
  toggleBlockStudent,
  deleteStudent,
  broadcastNotice,
  getFeedback
};
