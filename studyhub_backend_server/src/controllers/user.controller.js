const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getProfile = asyncHandler(async (req, res) => {
  const profile = {
    id: req.user?._id || "64f1a2b3c4d5e6f7a8b9c0d1",
    name: req.user?.name || "Rahul Sharma",
    email: req.user?.email || "rahul@studyhub.com",
    phone: "9876543210",
    college: "Delhi Technological University (DTU)",
    course: "B.Tech Computer Science",
    semester: "Semester 4",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    downloadsCount: 25,
    favoritesCount: 18,
    uploadsCount: 7
  };
  return res.status(200).json(new ApiResponse(200, profile, "Student profile fetched"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, college, course, semester, avatarUrl } = req.body;
  const updatedProfile = {
    name: name || "Rahul Sharma",
    phone: phone || "9876543210",
    college: college || "DTU",
    course: course || "B.Tech CS",
    semester: semester || "Semester 4",
    avatarUrl: avatarUrl || ""
  };
  return res.status(200).json(new ApiResponse(200, updatedProfile, "Profile updated successfully"));
});

const getMyUploads = asyncHandler(async (req, res) => {
  const uploads = [
    { id: "up_1", title: "CN Unit 2 Notes PDF", category: "notes", status: "approved", createdAt: new Date() },
    { id: "up_2", title: "Software Engg PYQ 2023", category: "pyq", status: "pending", createdAt: new Date() }
  ];
  return res.status(200).json(new ApiResponse(200, uploads, "My uploaded materials fetched"));
});

module.exports = {
  getProfile,
  updateProfile,
  getMyUploads
};
