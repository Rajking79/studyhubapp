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
      totalColleges: 8,
      featuredColleges: 5,
      totalCourses: 12,
      totalSubjects: 24,
      totalMaterials: 48,
      totalDownloads: 820450,
      activeBanners: 4,
      activeSubscriptions: 2450,
      pendingStudentUploads: 18,
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
      },
      {
        id: "jamia",
        name: "Jamia Millia Islamia University",
        university: "Central University",
        location: "Jamia Nagar, New Delhi",
        city: "New Delhi",
        state: "Delhi",
        category: "Central University",
        logoUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&q=80",
        subjectCount: 54,
        coursesCount: 15,
        studentsCount: 2100,
        availableCourses: ["B.Tech", "BCA", "MBA"],
        isFeatured: true,
        status: "Active"
      },
      {
        id: "ip_univ",
        name: "Guru Gobind Singh Indraprastha University (GGSIPU)",
        university: "State University",
        location: "Sector 16C, Dwarka, New Delhi",
        city: "New Delhi",
        state: "Delhi",
        category: "State Univ",
        logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        subjectCount: 60,
        coursesCount: 16,
        studentsCount: 4200,
        availableCourses: ["B.Tech", "BCA", "MCA", "MBA"],
        isFeatured: true,
        status: "Active"
      },
      {
        id: "lpu",
        name: "Lovely Professional University (LPU)",
        university: "Private University",
        location: "Phagwara, Punjab",
        city: "Phagwara",
        state: "Punjab",
        category: "Private Univ",
        logoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80",
        subjectCount: 72,
        coursesCount: 24,
        studentsCount: 6800,
        availableCourses: ["B.Tech", "BCA", "MBA", "MCA"],
        isFeatured: false,
        status: "Active"
      },
      {
        id: "vit",
        name: "Vellore Institute of Technology (VIT)",
        university: "Deemed University",
        location: "Vellore, Tamil Nadu",
        city: "Vellore",
        state: "Tamil Nadu",
        category: "Deemed Univ",
        logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80",
        subjectCount: 78,
        coursesCount: 20,
        studentsCount: 5200,
        availableCourses: ["B.Tech", "M.Tech", "MCA"],
        isFeatured: false,
        status: "Active"
      },
      {
        id: "amity",
        name: "Amity University",
        university: "Private University",
        location: "Noida, Uttar Pradesh",
        city: "Noida",
        state: "Uttar Pradesh",
        category: "Private Univ",
        logoUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&q=80",
        logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&q=80",
        subjectCount: 68,
        coursesCount: 19,
        studentsCount: 4500,
        availableCourses: ["B.Tech", "BCA", "MBA"],
        isFeatured: false,
        status: "Active"
      }
    ];

    this.courses = [
      { id: "btech_cs", collegeId: "du_dtu", collegeName: "Delhi Technological University (DTU)", name: "B.Tech Computer Science", code: "BT-CS", durationYears: 4, totalSemesters: 8, department: "CSE", status: "Active" },
      { id: "btech_ec", collegeId: "du_dtu", collegeName: "Delhi Technological University (DTU)", name: "B.Tech Electronics & Communication", code: "BT-EC", durationYears: 4, totalSemesters: 8, department: "ECE", status: "Active" },
      { id: "bca", collegeId: "du_main", collegeName: "Delhi University (DU)", name: "Bachelor of Computer Applications (BCA)", code: "BCA-01", durationYears: 3, totalSemesters: 6, department: "IT", status: "Active" },
      { id: "bcom", collegeId: "du_main", collegeName: "Delhi University (DU)", name: "Bachelor of Commerce (B.Com)", code: "BCOM-01", durationYears: 3, totalSemesters: 6, department: "Commerce", status: "Active" },
      { id: "btech_iit", collegeId: "iit_d", collegeName: "IIT Delhi", name: "B.Tech Computer Science & Engineering", code: "IIT-CS", durationYears: 4, totalSemesters: 8, department: "CSE", status: "Active" },
      { id: "mca", collegeId: "ip_univ", collegeName: "GGSIPU", name: "Master of Computer Applications (MCA)", code: "MCA-01", durationYears: 3, totalSemesters: 6, department: "IT", status: "Active" },
      { id: "mba", collegeId: "lpu", collegeName: "Lovely Professional University", name: "Master of Business Administration (MBA)", code: "MBA-01", durationYears: 2, totalSemesters: 4, department: "Management", status: "Active" },
      { id: "btech_ai", collegeId: "vit", collegeName: "VIT Vellore", name: "B.Tech Artificial Intelligence & ML", code: "BT-AI", durationYears: 4, totalSemesters: 8, department: "AI/ML", status: "Active" }
    ];

    this.subjects = [
      { id: "subj_dbms_101", code: "CS-401", title: "Database Management Systems (DBMS)", name: "Database Management Systems (DBMS)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 4, teacherName: "Dr. A.K. Sharma", instructorName: "Dr. A.K. Sharma", instructorRole: "Head of Department", department: "Computer Science", rating: 4.9, materialCount: 142, materialsCount: 142, description: "SQL, Relational Algebra, B-Trees & Normalization", status: "Active" },
      { id: "subj_os_101", code: "CS-402", title: "Operating Systems (OS)", name: "Operating Systems (OS)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 4, teacherName: "Prof. Rajesh Verma", instructorName: "Prof. Rajesh Verma", instructorRole: "Associate Professor", department: "Computer Science", rating: 4.8, materialCount: 118, materialsCount: 118, description: "Concurrency, Paging, Virtual Memory & Deadlocks", status: "Active" },
      { id: "subj_cn_101", code: "CS-403", title: "Computer Networks (CN)", name: "Computer Networks (CN)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 5, teacherName: "Dr. Meena Gupta", instructorName: "Dr. Meena Gupta", instructorRole: "Professor", department: "Computer Science", rating: 4.7, materialCount: 98, materialsCount: 98, description: "TCP/IP, OSI Model, Routing Protocols", status: "Active" },
      { id: "subj_algo_101", code: "CS-301", title: "Design & Analysis of Algorithms (DAA)", name: "Design & Analysis of Algorithms (DAA)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 3, teacherName: "Prof. Suresh Kumar", instructorName: "Prof. Suresh Kumar", instructorRole: "Associate Professor", department: "Computer Science", rating: 4.6, materialCount: 86, materialsCount: 86, description: "Greedy, DP, Graph Algorithms, NP Hard Problems", status: "Active" },
      { id: "subj_se_101", code: "CS-501", title: "Software Engineering (SE)", name: "Software Engineering (SE)", courseId: "btech_cs", courseName: "B.Tech CS", semester: 5, teacherName: "Dr. Priya Singh", instructorName: "Dr. Priya Singh", instructorRole: "Assistant Professor", department: "Computer Science", rating: 4.5, materialCount: 72, materialsCount: 72, description: "SDLC, Agile, UML Diagrams, Testing", status: "Active" },
      { id: "subj_ml_101", code: "CS-601", title: "Machine Learning (ML)", name: "Machine Learning (ML)", courseId: "btech_ai", courseName: "B.Tech AI/ML", semester: 6, teacherName: "Dr. Ankit Patel", instructorName: "Dr. Ankit Patel", instructorRole: "Professor", department: "AI/ML", rating: 4.9, materialCount: 165, materialsCount: 165, description: "Supervised, Unsupervised Learning, Neural Networks", status: "Active" }
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
      },
      {
        id: "mat_os_notes_101",
        title: "Operating Systems Complete Chapter Notes - Sem 4.pdf",
        category: "Notes",
        uploadType: "PDF",
        subjectId: "subj_os_101",
        subjectName: "Operating Systems",
        subject: "OS",
        collegeName: "Delhi Technological University (DTU)",
        courseName: "B.Tech CS",
        academicYear: "2nd Year",
        semester: 4,
        examTag: "Mid Sem",
        year: 2026,
        fileSizeMb: 8.2,
        downloadsCount: 5680,
        uploadedBy: "Admin",
        uploadedDate: "20 Jul 2026",
        date: "20 Jul 2026",
        isPinned: false,
        isFeatured: true,
        isPremium: false,
        status: "Published",
        pdfUrl: "https://studyhub.com/pdf/os_notes_sem4.pdf"
      },
      {
        id: "mat_cn_pyq_2023",
        title: "Computer Networks 2023 End Sem PYQ Solved.pdf",
        category: "Previous Papers",
        uploadType: "PDF",
        subjectId: "subj_cn_101",
        subjectName: "Computer Networks",
        subject: "CN",
        collegeName: "Delhi Technological University (DTU)",
        courseName: "B.Tech CS",
        academicYear: "3rd Year",
        semester: 5,
        examTag: "End Sem",
        year: 2023,
        fileSizeMb: 5.6,
        downloadsCount: 3200,
        uploadedBy: "Admin",
        uploadedDate: "18 Jul 2026",
        date: "18 Jul 2026",
        isPinned: true,
        isFeatured: false,
        isPremium: false,
        status: "Published",
        pdfUrl: "https://studyhub.com/pdf/cn_pyq_2023.pdf"
      },
      {
        id: "mat_algo_book",
        title: "Introduction to Algorithms - CLRS 4th Edition.pdf",
        category: "Reference Books",
        uploadType: "PDF",
        subjectId: "subj_algo_101",
        subjectName: "DAA",
        subject: "DAA",
        collegeName: "IIT Delhi",
        courseName: "B.Tech CS",
        academicYear: "2nd Year",
        semester: 3,
        examTag: "Reference",
        year: 2026,
        fileSizeMb: 18.4,
        downloadsCount: 9100,
        uploadedBy: "Admin",
        uploadedDate: "15 Jul 2026",
        date: "15 Jul 2026",
        isPinned: false,
        isFeatured: true,
        isPremium: true,
        status: "Published",
        pdfUrl: "https://studyhub.com/pdf/clrs_4th.pdf"
      },
      {
        id: "mat_ml_notes",
        title: "Machine Learning Handwritten Notes - Unit 1-4.pdf",
        category: "Notes",
        uploadType: "PDF",
        subjectId: "subj_ml_101",
        subjectName: "Machine Learning",
        subject: "ML",
        collegeName: "VIT Vellore",
        courseName: "B.Tech AI/ML",
        academicYear: "3rd Year",
        semester: 6,
        examTag: "End Sem",
        year: 2026,
        fileSizeMb: 12.1,
        downloadsCount: 4320,
        uploadedBy: "Admin",
        uploadedDate: "22 Jul 2026",
        date: "22 Jul 2026",
        isPinned: false,
        isFeatured: true,
        isPremium: false,
        status: "Published",
        pdfUrl: "https://studyhub.com/pdf/ml_notes.pdf"
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
      },
      {
        id: "bnr_02",
        title: "3,840+ Study Materials Now Available!",
        subtitle: "Download PYQs, Notes & Video Lectures",
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
        buttonText: "Explore Materials",
        redirectRoute: "/materials",
        priority: 2,
        isEnabled: true
      },
      {
        id: "bnr_03",
        title: "StudyHub AI Assistant — Beta Launch!",
        subtitle: "Ask any doubt, get step-by-step solutions instantly",
        imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        buttonText: "Try AI Now",
        redirectRoute: "/ai",
        priority: 3,
        isEnabled: true
      },
      {
        id: "bnr_04",
        title: "New Colleges Added: LPU & VIT",
        subtitle: "Access course materials for 8 top colleges",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
        buttonText: "Browse Colleges",
        redirectRoute: "/colleges",
        priority: 4,
        isEnabled: true
      }
    ];

    this.homeSections = [
      { id: "sec-1", sectionName: "Banner Slider", description: "Promotional Banners at Top of Home Feed", isEnabled: true, displayOrder: 1 },
      { id: "sec-2", sectionName: "Search Bar with Voice & Camera", description: "Global Search with Microphone and OCR Scanner buttons", isEnabled: true, displayOrder: 2 },
      { id: "sec-3", sectionName: "Continue Reading Widget", description: "Resume Last Read PDF page & video position", isEnabled: true, displayOrder: 3 },
      { id: "sec-4", sectionName: "Quick Access Cards (6 Cards)", description: "Previous Papers, Notes, Books, Guides, Question Bank, Syllabus", isEnabled: true, displayOrder: 4 },
      { id: "sec-5", sectionName: "Featured Colleges Section", description: "Horizontally scrollable college cards on home screen", isEnabled: true, displayOrder: 5 },
      { id: "sec-6", sectionName: "StudyHub AI Widget", description: "Quick AI Chat shortcut widget on home feed", isEnabled: true, displayOrder: 6 }
    ];

    this.students = [
      { id: "stud_101", name: "Rohit Sharma", email: "rohitsharma@gmail.com", phone: "+91 9876543210", avatar: "https://i.pravatar.cc/150?img=11", collegeName: "Delhi Technological University (DTU)", courseName: "B.Tech CS", semester: 4, isOnline: true, downloadsCount: 42, bookmarksCount: 18, uploadsCount: 3, lastLogin: "Just Now (Active)", isBlocked: false, status: "Active" },
      { id: "stud_102", name: "Priya Patel", email: "priyapatel@gmail.com", phone: "+91 9812345678", avatar: "https://i.pravatar.cc/150?img=47", collegeName: "Delhi University (DU)", courseName: "BCA", semester: 2, isOnline: true, downloadsCount: 28, bookmarksCount: 12, uploadsCount: 1, lastLogin: "2 mins ago (Active)", isBlocked: false, status: "Active" },
      { id: "stud_103", name: "Aman Verma", email: "amanverma@gmail.com", phone: "+91 9898989898", avatar: "https://i.pravatar.cc/150?img=33", collegeName: "IIT Delhi (IITD)", courseName: "B.Tech CSE", semester: 6, isOnline: false, downloadsCount: 87, bookmarksCount: 45, uploadsCount: 12, lastLogin: "1 hour ago", isBlocked: false, status: "Active" },
      { id: "stud_104", name: "Sneha Reddy", email: "snehareddy@gmail.com", phone: "+91 9765432109", avatar: "https://i.pravatar.cc/150?img=56", collegeName: "VIT Vellore", courseName: "B.Tech AI/ML", semester: 5, isOnline: true, downloadsCount: 64, bookmarksCount: 31, uploadsCount: 5, lastLogin: "15 mins ago", isBlocked: false, status: "Active" },
      { id: "stud_105", name: "Karan Singh", email: "karansingh@gmail.com", phone: "+91 9654321098", avatar: "https://i.pravatar.cc/150?img=22", collegeName: "GGSIPU", courseName: "MCA", semester: 3, isOnline: false, downloadsCount: 35, bookmarksCount: 22, uploadsCount: 0, lastLogin: "Yesterday", isBlocked: true, status: "Blocked" }
    ];

    this.notifications = [
      { id: "notif_001", title: "DU May 2026 End-Sem Examination Datesheet Released", description: "Complete timetable for B.Tech CS Sem 4 end sem exams is now available.", target: "All DU Students", category: "Exams", targetCollege: "Delhi University (DU)", count: 12450, sentAt: "10 mins ago", timeAgo: "10 mins ago" },
      { id: "notif_002", title: "3,840 New Study Materials Published for Sem 4 & 5", description: "New PYQ solved papers, video lectures & notes are live on StudyHub.", target: "All Students", category: "Materials", targetCollege: "All Colleges", count: 15480, sentAt: "2 hours ago", timeAgo: "2 hours ago" },
      { id: "notif_003", title: "StudyHub AI Assistant Beta Launch — Try It Now!", description: "Ask any academic doubt and get step-by-step solutions powered by AI.", target: "All Students", category: "Feature Update", targetCollege: "All Colleges", count: 15480, sentAt: "1 day ago", timeAgo: "1 day ago" }
    ];

    this.feedback = [
      { id: "fb_01", studentName: "Rohit Sharma", email: "rohitsharma@gmail.com", type: "Bug Report", subject: "DBMS PYQ Solution Query", message: "Unit 3 B-Tree question 4 answer is missing steps. Please re-upload.", rating: 5, date: "24 Jul 2026", status: "Open" },
      { id: "fb_02", studentName: "Priya Patel", email: "priyapatel@gmail.com", type: "Suggestion", subject: "More PYQs Needed", message: "Please add more 2024 End Sem Solved Papers for Computer Networks Sem 5.", rating: 5, date: "25 Jul 2026", status: "Pending" },
      { id: "fb_03", studentName: "Aman Verma", email: "amanverma@gmail.com", type: "App Bug", subject: "PDF Reader Zoom Issue", message: "PDF reader page zoom button gets cut off on smaller Android screens (below 5.5 inch).", rating: 4, date: "26 Jul 2026", status: "In Progress" },
      { id: "fb_04", studentName: "Sneha Reddy", email: "snehareddy@gmail.com", type: "Feature Request", subject: "Dark Mode for PDF Reader", message: "Please add dark mode option in the PDF reader for night studying.", rating: 5, date: "27 Jul 2026", status: "Open" }
    ];
  }

  // Recalculate stats dynamically
  syncStats() {
    this.stats.totalColleges = this.colleges.length;
    this.stats.totalCourses = this.courses.length;
    this.stats.totalSubjects = this.subjects.length;
    this.stats.totalMaterials = this.materials.length;
    this.stats.activeBanners = this.banners.filter(b => b.isEnabled).length;
  }
}

const dataStore = new DataStore();
module.exports = dataStore;
