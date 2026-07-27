// Master Shared Real-time Data Store for StudyHub App & Admin Panel

class DataStore {
  constructor() {
    this.profile = {
      id: "admin_super_user_001",
      name: "Super Administrator",
      email: "admin@studyhub.com",
      phone: "+91 9876543210",
      role: "Master Super Admin",
      status: "Active & 2FA Protected"
    };

    this.stats = {
      totalStudents: 15480,
      onlineStudents: 1420,
      totalColleges: 3,
      featuredColleges: 2,
      totalCourses: 5,
      totalSubjects: 4,
      totalMaterials: 8,
      totalDownloads: 820450,
      storageUsedGB: 256,
      serverStatus: "Healthy (100%)"
    };

    this.colleges = [
      {
        id: "du_dtu",
        name: "Delhi Technological University (DTU)",
        university: "State University",
        location: "Bawana, New Delhi",
        city: "New Delhi",
        state: "Delhi",
        category: "State Univ",
        logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80",
        subjectCount: 48,
        coursesCount: 12,
        studentsCount: 1450,
        availableCourses: ["B.Tech", "BCA", "M.Tech"],
        isFeatured: true,
        status: "Active"
      },
      {
        id: "du_main",
        name: "Delhi University (DU)",
        university: "Central University",
        location: "North Campus, New Delhi",
        city: "New Delhi",
        state: "Delhi",
        category: "Central University",
        logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80",
        subjectCount: 65,
        coursesCount: 18,
        studentsCount: 3200,
        availableCourses: ["B.Tech", "BCA", "B.Com", "M.Tech"],
        isFeatured: true,
        status: "Active"
      },
      {
        id: "iit_d",
        name: "Indian Institute of Technology Delhi (IITD)",
        university: "Institute of National Importance",
        location: "Hauz Khas, New Delhi",
        city: "New Delhi",
        state: "Delhi",
        category: "Central University",
        logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&q=80",
        subjectCount: 82,
        coursesCount: 22,
        studentsCount: 2800,
        availableCourses: ["B.Tech", "M.Tech", "Ph.D"],
        isFeatured: true,
        status: "Active"
      }
    ];

    this.courses = [
      { id: "btech_cs", collegeId: "du_dtu", collegeName: "Delhi Technological University (DTU)", name: "B.Tech Computer Science", code: "BT-CS", durationYears: 4, totalSemesters: 8, department: "CSE", status: "Active" },
      { id: "bca", collegeId: "du_main", collegeName: "Delhi University (DU)", name: "Bachelor of Computer Applications (BCA)", code: "BCA-01", durationYears: 3, totalSemesters: 6, department: "IT", status: "Active" }
    ];

    this.subjects = [
      { id: "subj_dbms_101", code: "CS-401", title: "Database Management Systems (DBMS)", name: "Database Management Systems (DBMS)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 4, teacherName: "Dr. A.K. Sharma", instructorName: "Dr. A.K. Sharma", instructorRole: "Head of Department", department: "Computer Science", rating: 4.9, materialCount: 142, materialsCount: 142, description: "SQL, Relational Algebra, B-Trees & Normalization", status: "Active" },
      { id: "subj_os_101", code: "CS-402", title: "Operating Systems (OS)", name: "Operating Systems (OS)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 4, teacherName: "Prof. Rajesh Verma", instructorName: "Prof. Rajesh Verma", instructorRole: "Associate Professor", department: "Computer Science", rating: 4.8, materialCount: 118, materialsCount: 118, description: "Concurrency, Paging, Virtual Memory & Deadlocks", status: "Active" }
    ];

    this.materials = [
      {
        id: "mat_dbms_2024_endsem",
        title: "DBMS 2024 End Sem Solved PYQ Paper.pdf",
        category: "Previous Papers",
        uploadType: "PDF",
        subjectId: "subj_dbms_101",
        subjectName: "DBMS",
        subject: "DBMS",
        collegeName: "Delhi University (DU)",
        courseName: "B.Tech CS",
        academicYear: "2nd Year",
        semester: 4,
        examTag: "End Sem",
        year: 2024,
        fileSizeMb: 4.8,
        downloadsCount: 2450,
        uploadedBy: "Admin",
        uploadedDate: "24 Jul 2026",
        date: "24 Jul 2026",
        isPinned: true,
        isFeatured: true,
        isPremium: false,
        status: "Published",
        pdfUrl: "https://studyhub.com/pdf/dbms_2024.pdf"
      },
      {
        id: "mat_dbms_video_lecture",
        title: "DBMS B-Trees & Indexing Video Lecture 14",
        category: "Video Lecture",
        uploadType: "Video",
        subjectId: "subj_dbms_101",
        subjectName: "DBMS",
        subject: "DBMS",
        collegeName: "Delhi University (DU)",
        courseName: "B.Tech CS",
        academicYear: "2nd Year",
        semester: 4,
        examTag: "End Sem",
        year: 2026,
        fileSizeMb: 0,
        downloadsCount: 12450,
        uploadedBy: "Dr. A.K. Sharma",
        uploadedDate: "26 Jul 2026",
        date: "26 Jul 2026",
        isPinned: true,
        isFeatured: true,
        isPremium: false,
        status: "Published",
        pdfUrl: "https://youtube.com/watch?v=demo1"
      }
    ];

    this.banners = [
      {
        id: "bnr_01",
        title: "End-Sem Examination Datesheet Released",
        subtitle: "View complete May 2026 timetable now",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        buttonText: "View Datesheet",
        redirectRoute: "/notifications",
        priority: 1,
        isEnabled: true
      }
    ];

    this.homeSections = [
      { id: "sec-1", sectionName: "Banner Slider", description: "Promotional Banners at Top of Home Feed", isEnabled: true, displayOrder: 1 },
      { id: "sec-2", sectionName: "Search Bar with Voice & Camera", description: "Global Search with Microphone and OCR Scanner buttons", isEnabled: true, displayOrder: 2 },
      { id: "sec-3", sectionName: "Continue Reading Widget", description: "Resume Last Read PDF page & video position", isEnabled: true, displayOrder: 3 },
      { id: "sec-4", sectionName: "Quick Access Cards (6 Cards)", description: "Previous Papers, Notes, Books, Guides, Question Bank, Syllabus", isEnabled: true, displayOrder: 4 }
    ];

    this.students = [
      { id: "stud_101", name: "Rohit Sharma", email: "rohitsharma@gmail.com", phone: "+91 9876543210", avatar: "https://i.pravatar.cc/150?img=11", collegeName: "Delhi Technological University (DTU)", courseName: "B.Tech CS", semester: 4, isOnline: true, downloadsCount: 42, bookmarksCount: 18, uploadsCount: 3, lastLogin: "Just Now (Active)", isBlocked: false, status: "Active" },
      { id: "stud_102", name: "Priya Patel", email: "priyapatel@gmail.com", phone: "+91 9812345678", avatar: "https://i.pravatar.cc/150?img=47", collegeName: "Delhi University (DU)", courseName: "BCA", semester: 2, isOnline: true, downloadsCount: 28, bookmarksCount: 12, uploadsCount: 1, lastLogin: "2 mins ago (Active)", isBlocked: false, status: "Active" }
    ];

    this.notifications = [
      { id: "notif_001", title: "DU May 2026 End-Sem Examination Datesheet Released", description: "Complete timetable for B.Tech CS Sem 4 end sem exams is now available.", target: "All DU Students", category: "Exams", targetCollege: "Delhi University (DU)", count: 12450, sentAt: "10 mins ago", timeAgo: "10 mins ago" }
    ];

    this.feedback = [
      { id: "fb_01", studentName: "Rohit Sharma", studentEmail: "rohitsharma@gmail.com", subject: "DBMS PYQ Solution Query", message: "Unit 3 B-Tree question 4 answer is missing steps.", rating: 5, date: "24 Jul 2026", status: "Open" }
    ];
  }

  // Recalculate stats dynamically
  syncStats() {
    this.stats.totalColleges = this.colleges.length;
    this.stats.totalCourses = this.courses.length;
    this.stats.totalSubjects = this.subjects.length;
    this.stats.totalMaterials = this.materials.length;
    this.stats.totalStudents = this.students.length;
  }
}

const dataStore = new DataStore();
module.exports = dataStore;
