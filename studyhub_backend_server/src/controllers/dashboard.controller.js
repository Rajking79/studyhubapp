const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const getHomeFeed = asyncHandler(async (req, res) => {
  const homeData = {
    banners: [
      { id: "b1", title: "End-Sem Datesheet Out", imageUrl: "https://example.com/banner1.png", targetRoute: "/notifications" },
      { id: "b2", title: "DBMS 2024 Solved PYQs Available", imageUrl: "https://example.com/banner2.png", targetRoute: "/materials/dbms" }
    ],
    continueReading: {
      materialId: "mat_os_notes_101",
      title: "Operating Systems Unit 3 Paging Notes",
      subject: "Operating Systems",
      lastPage: 14,
      totalPages: 45,
      lastTimeSeconds: 480
    },
    quickAccess: [
      { id: "snap", name: "Snap & Solve AI", icon: "camera" },
      { id: "pyq", name: "Previous Papers", icon: "file_present" },
      { id: "notes", name: "Notes", icon: "book" },
      { id: "books", name: "Reference Books", icon: "menu_book" }
    ],
    unreadNotificationsCount: 3
  };

  return res.status(200).json(new ApiResponse(200, homeData, "Home feed loaded successfully"));
});

const getBanners = asyncHandler(async (req, res) => {
  const banners = [
    { id: "b1", title: "DU End-Sem Exam Datesheet 2026", imageUrl: "https://example.com/banner1.png" },
    { id: "b2", title: "Scholarship Portal Applications Open", imageUrl: "https://example.com/banner2.png" }
  ];
  return res.status(200).json(new ApiResponse(200, banners, "Banners fetched"));
});

const getContinueReading = asyncHandler(async (req, res) => {
  const continueReading = {
    materialId: "mat_os_notes_101",
    title: "Operating Systems Unit 3 Paging Notes",
    lastPage: 14,
    totalPages: 45
  };
  return res.status(200).json(new ApiResponse(200, continueReading, "Continue reading progress fetched"));
});

const updateProgress = asyncHandler(async (req, res) => {
  const { materialId, lastPage, lastTimeSeconds } = req.body;
  return res.status(200).json(new ApiResponse(200, { materialId, lastPage, lastTimeSeconds }, "Progress saved"));
});

const globalSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const searchResults = {
    query: q || "",
    subjects: [
      { id: "subj_os_101", title: "Operating Systems", department: "Computer Science" },
      { id: "subj_dbms_101", title: "Database Management Systems", department: "Computer Science" }
    ],
    materials: [
      { id: "mat_os_notes", title: "OS Lecture Notes 2024", type: "notes", fileSizeMB: 4.2 }
    ]
  };
  return res.status(200).json(new ApiResponse(200, searchResults, "Search results fetched"));
});

module.exports = {
  getHomeFeed,
  getBanners,
  getContinueReading,
  updateProgress,
  globalSearch
};
