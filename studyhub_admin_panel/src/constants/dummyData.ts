import {
  College,
  Course,
  Subject,
  Material,
  VideoMaterial,
  Student,
  StudentUpload,
  NotificationBroadcast,
  Banner,
  HomeScreenSectionConfig,
  AiConfig,
  SnapSolveConfig,
  CgpaRule,
  AttendanceRule
} from '../types';

export const INITIAL_COLLEGES: College[] = [
  { id: 'col-1', name: 'Delhi University (DU)', university: 'Central University', city: 'New Delhi', state: 'Delhi', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80', coursesCount: 14, studentsCount: 1450, isFeatured: true, status: 'Active' },
  { id: 'col-2', name: 'Delhi Technological University (DTU)', university: 'State University', city: 'Delhi', state: 'Delhi', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80', coursesCount: 12, studentsCount: 980, isFeatured: true, status: 'Active' },
  { id: 'col-3', name: 'Indian Institute of Technology Delhi (IITD)', university: 'Institute of National Importance', city: 'New Delhi', state: 'Delhi', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&q=80', coursesCount: 18, studentsCount: 850, isFeatured: true, status: 'Active' },
  { id: 'col-4', name: 'Indian Institute of Technology Bombay (IITB)', university: 'Institute of National Importance', city: 'Mumbai', state: 'Maharashtra', logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&q=80', coursesCount: 16, studentsCount: 790, isFeatured: true, status: 'Active' },
  { id: 'col-5', name: 'Anna University', university: 'State University', city: 'Chennai', state: 'Tamil Nadu', logo: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=100&q=80', coursesCount: 15, studentsCount: 1120, isFeatured: false, status: 'Active' },
  { id: 'col-6', name: 'Visvesvaraya Technological University (VTU)', university: 'State Technical University', city: 'Belagavi', state: 'Karnataka', logo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=100&q=80', coursesCount: 22, studentsCount: 1650, isFeatured: false, status: 'Active' },
  { id: 'col-7', name: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)', university: 'State Technical University', city: 'Lucknow', state: 'Uttar Pradesh', logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&q=80', coursesCount: 24, studentsCount: 1890, isFeatured: true, status: 'Active' },
  { id: 'col-8', name: 'Savitribai Phule Pune University (SPPU)', university: 'State University', city: 'Pune', state: 'Maharashtra', logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&q=80', coursesCount: 11, studentsCount: 920, isFeatured: false, status: 'Active' },
  { id: 'col-9', name: 'Banaras Hindu University (BHU)', university: 'Central University', city: 'Varanasi', state: 'Uttar Pradesh', logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&q=80', coursesCount: 13, studentsCount: 780, isFeatured: false, status: 'Active' },
  { id: 'col-10', name: 'Jamia Millia Islamia (JMI)', university: 'Central University', city: 'New Delhi', state: 'Delhi', logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&q=80', coursesCount: 10, studentsCount: 640, isFeatured: false, status: 'Active' }
];

export const INITIAL_COURSES: Course[] = [
  { id: 'crs-1', collegeId: 'col-1', collegeName: 'Delhi University (DU)', name: 'B.Tech Computer Science (CS)', code: 'BT-CS', durationYears: 4, totalSemesters: 8, description: 'Core Engineering Program in Software & Systems Engineering', iconName: 'Code', colorTheme: '#2563EB', status: 'Active' },
  { id: 'crs-2', collegeId: 'col-1', collegeName: 'Delhi University (DU)', name: 'Bachelor of Computer Applications (BCA)', code: 'BCA-01', durationYears: 3, totalSemesters: 6, description: 'Undergraduate Computer Applications & Web Architecture', iconName: 'Laptop', colorTheme: '#10B981', status: 'Active' },
  { id: 'crs-3', collegeId: 'col-2', collegeName: 'Delhi Technological University (DTU)', name: 'B.Tech Information Technology (IT)', code: 'BT-IT', durationYears: 4, totalSemesters: 8, description: 'Software Engineering, Networks, and Distributed Computing', iconName: 'Cpu', colorTheme: '#8B5CF6', status: 'Active' },
  { id: 'crs-4', collegeId: 'col-3', collegeName: 'IIT Delhi (IITD)', name: 'B.Tech Artificial Intelligence & Data Science', code: 'BT-AI', durationYears: 4, totalSemesters: 8, description: 'Machine Learning, Deep Learning, and Neural Networks', iconName: 'Brain', colorTheme: '#EC4899', status: 'Active' }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sbj-1', code: 'CS-401', name: 'Database Management Systems (DBMS)', courseName: 'B.Tech CS', semester: 4, teacherName: 'Dr. A.K. Sharma', credits: 4, description: 'Relational algebra, SQL query optimization, B-Trees & Normalization', materialsCount: 142, status: 'Active' },
  { id: 'sbj-2', code: 'CS-402', name: 'Operating Systems (OS)', courseName: 'B.Tech CS', semester: 4, teacherName: 'Prof. Rajesh Verma', credits: 4, description: 'Process management, concurrency, virtual memory paging & deadlocks', materialsCount: 118, status: 'Active' },
  { id: 'sbj-3', code: 'CS-403', name: 'Computer Networks (CN)', courseName: 'B.Tech CS', semester: 4, teacherName: 'Dr. Meenakshi Sundaram', credits: 4, description: 'TCP/IP stack, routing protocols, socket programming, cryptography', materialsCount: 96, status: 'Active' },
  { id: 'sbj-4', code: 'CS-301', name: 'Data Structures & Algorithms (DSA)', courseName: 'B.Tech CS', semester: 3, teacherName: 'Prof. Vikramaditya Dev', credits: 5, description: 'Arrays, Trees, Graphs, Dynamic Programming, Complexity Analysis', materialsCount: 185, status: 'Active' }
];

export const INITIAL_MATERIALS: Material[] = [
  { id: 'mat-1', title: 'DBMS 2024 End Sem Solved PYQ Paper.pdf', category: 'Previous Papers', uploadType: 'PDF', subjectName: 'DBMS', collegeName: 'Delhi University (DU)', courseName: 'B.Tech CS', academicYear: '2nd Year', semester: 4, examTag: 'End Sem', year: 2024, fileSizeMb: 4.8, downloadsCount: 2450, uploadedBy: 'Admin Team', uploadedDate: '24 Jul 2026', isPinned: true, isFeatured: true, isPremium: false, status: 'Published', pdfUrl: '#' },
  { id: 'mat-2', title: 'DBMS B-Trees & Indexing Video Lecture 14', category: 'Video Lecture', uploadType: 'Video', subjectName: 'DBMS', collegeName: 'Delhi University (DU)', courseName: 'B.Tech CS', academicYear: '2nd Year', semester: 4, examTag: 'End Sem', year: 2026, fileSizeMb: 0, downloadsCount: 12450, uploadedBy: 'Dr. A.K. Sharma', uploadedDate: '26 Jul 2026', isPinned: true, isFeatured: true, isPremium: false, status: 'Published', pdfUrl: 'https://youtube.com/watch?v=demo1' },
  { id: 'mat-3', title: 'Operating Systems Unit 3 Paging Handwritten Notes.pdf', category: 'Notes', uploadType: 'PDF', subjectName: 'Operating Systems', collegeName: 'Delhi Technological University (DTU)', courseName: 'B.Tech IT', academicYear: '2nd Year', semester: 4, examTag: 'Mid Sem', year: 2025, fileSizeMb: 12.4, downloadsCount: 1890, uploadedBy: 'Rohit Sharma (Topper)', uploadedDate: '22 Jul 2026', isPinned: false, isFeatured: true, isPremium: false, status: 'Published', pdfUrl: '#' },
  { id: 'mat-4', title: 'Computer Networks 6th Edition - Tanenbaum Complete Book.pdf', category: 'Books', uploadType: 'PDF', subjectName: 'Computer Networks', collegeName: 'IIT Delhi (IITD)', courseName: 'B.Tech CS', academicYear: '3rd Year', semester: 5, examTag: 'All', year: 2023, fileSizeMb: 45.2, downloadsCount: 3820, uploadedBy: 'Admin Team', uploadedDate: '15 May 2026', isPinned: true, isFeatured: false, isPremium: true, status: 'Published', pdfUrl: '#' },
  { id: 'mat-5', title: 'Data Structures Unit 1 Arrays & Linked List Solved Guide.pdf', category: 'Guides', uploadType: 'PDF', subjectName: 'Data Structures & Algorithms', collegeName: 'AKTU Lucknow', courseName: 'B.Tech CS', academicYear: '1st Year', semester: 2, examTag: 'Mid Sem', year: 2026, fileSizeMb: 6.2, downloadsCount: 1420, uploadedBy: 'Admin Team', uploadedDate: '10 Jun 2026', isPinned: false, isFeatured: true, isPremium: false, status: 'Published', pdfUrl: '#' }
];

export const INITIAL_VIDEOS: VideoMaterial[] = [
  { id: 'vid-1', title: 'DBMS B-Trees & B+ Trees Indexing Lecture 14', youtubeUrl: 'https://youtube.com/watch?v=demo1', duration: '45 mins', teacherName: 'Dr. A.K. Sharma', subjectName: 'DBMS', collegeName: 'Delhi University (DU)', courseName: 'B.Tech CS', semester: 4, examTag: 'End Sem', viewsCount: 12450, isFeatured: true, thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80' },
  { id: 'vid-2', title: 'Operating Systems Virtual Memory & Paging Solved Problems', youtubeUrl: 'https://youtube.com/watch?v=demo2', duration: '52 mins', teacherName: 'Prof. Rajesh Verma', subjectName: 'Operating Systems', collegeName: 'DTU', courseName: 'B.Tech IT', semester: 4, examTag: 'Mid Sem', viewsCount: 9800, isFeatured: true, thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80' }
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 'std-1', name: 'Rohit Sharma', email: 'rohitsharma@gmail.com', phone: '+91 9876543210', avatar: 'https://i.pravatar.cc/150?img=11', collegeName: 'Delhi University (DU)', courseName: 'B.Tech CS', semester: 4, isOnline: true, activeDevice: 'Android (Pixel 8 Pro)', ipAddress: '183.82.160.45', downloadsCount: 42, bookmarksCount: 18, uploadsCount: 3, lastLogin: 'Just Now (Active)', status: 'Active' },
  { id: 'std-2', name: 'Priya Patel', email: 'priyapatel@gmail.com', phone: '+91 9812345678', avatar: 'https://i.pravatar.cc/150?img=47', collegeName: 'Delhi Technological University (DTU)', courseName: 'BCA', semester: 2, isOnline: true, activeDevice: 'iOS (iPhone 15)', ipAddress: '122.170.82.12', downloadsCount: 28, bookmarksCount: 12, uploadsCount: 1, lastLogin: '2 mins ago (Active)', status: 'Active' },
  { id: 'std-3', name: 'Aman Verma', email: 'amanverma@gmail.com', phone: '+91 9765432109', avatar: 'https://i.pravatar.cc/150?img=33', collegeName: 'IIT Delhi (IITD)', courseName: 'B.Tech CS', semester: 4, isOnline: false, activeDevice: 'Android (Samsung S24)', ipAddress: '49.36.190.22', downloadsCount: 65, bookmarksCount: 29, uploadsCount: 5, lastLogin: 'Yesterday, 8:45 PM', status: 'Active' },
  { id: 'std-4', name: 'Ananya Roy', email: 'ananyaroy@gmail.com', phone: '+91 9898989898', avatar: 'https://i.pravatar.cc/150?img=32', collegeName: 'AKTU Lucknow', courseName: 'B.Tech CS', semester: 2, isOnline: true, activeDevice: 'Web Browser (Chrome)', ipAddress: '103.21.124.9', downloadsCount: 19, bookmarksCount: 8, uploadsCount: 0, lastLogin: '5 mins ago (Active)', status: 'Active' }
];

export const INITIAL_UPLOADS: StudentUpload[] = [
  { id: 'upl-1', studentName: 'Aman Verma', studentEmail: 'amanverma@gmail.com', studentAvatar: 'https://i.pravatar.cc/150?img=33', title: 'CN Unit 2 Socket Programming Notes.pdf', subjectName: 'Computer Networks', fileSizeMb: 8.4, submittedTime: '10 mins ago', pdfUrl: '#', status: 'Pending' }
];

export const INITIAL_NOTIFICATIONS: NotificationBroadcast[] = [
  { id: 'not-1', title: 'DU May 2026 End-Sem Examination Datesheet Released', description: 'Complete timetable for B.Tech CS Sem 4 end sem exams is now available.', category: 'Exams', targetAudience: 'Specific College', targetCollege: 'Delhi University (DU)', sentAt: '10 mins ago', deliveredCount: 12450 }
];

export const INITIAL_BANNERS: Banner[] = [
  { id: 'bnr-1', title: 'End-Sem Examination Datesheet Released', subtitle: 'View complete May 2026 timetable now', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', buttonText: 'View Datesheet', redirectRoute: '/notifications', priority: 1, isEnabled: true }
];

export const INITIAL_HOME_SECTIONS: HomeScreenSectionConfig[] = [
  { id: 'sec-1', sectionName: 'Banner Slider', description: 'Promotional Banners at Top of Home Feed', isEnabled: true, displayOrder: 1 },
  { id: 'sec-2', sectionName: 'Search Bar with Voice & Camera', description: 'Global Search with Microphone and OCR Scanner buttons', isEnabled: true, displayOrder: 2 },
  { id: 'sec-3', sectionName: 'Continue Reading Widget', description: 'Resume Last Read PDF page & video position', isEnabled: true, displayOrder: 3 },
  { id: 'sec-4', sectionName: 'Quick Access Cards (6 Cards)', description: 'Previous Papers, Notes, Books, Guides, Question Bank, Syllabus', isEnabled: true, displayOrder: 4 },
  { id: 'sec-5', sectionName: 'Featured Colleges Carousel', description: 'Starred Colleges grid on mobile home feed', isEnabled: true, displayOrder: 5 },
  { id: 'sec-6', sectionName: 'Recommended Subjects', description: 'Subjects tailored for enrolled course & semester', isEnabled: true, displayOrder: 6 }
];

export const INITIAL_AI_CONFIG: AiConfig = {
  dailyFreeLimit: 10,
  premiumLimit: 100,
  isEnabled: true,
  modelPromptConfig: 'You are StudyHub AI, an expert academic tutor for Indian engineering & university students. Explain concepts with clear step-by-step solutions.',
  totalQuestionsAnswered: 45280
};

export const INITIAL_SNAP_SOLVE_CONFIG: SnapSolveConfig = {
  ocrEnabled: true,
  dailyUsageCount: 3840,
  questionHistoryCount: 124500
};

export const INITIAL_CGPA_RULES: CgpaRule[] = [
  { id: 'cgp-1', universityName: 'Delhi University (DU)', gradingSystem: '10 Point CGPA', formulaDescription: 'Percentage = CGPA * 9.5', percentageMultiplier: 9.5 },
  { id: 'cgp-2', universityName: 'AKTU Lucknow', gradingSystem: '10 Point Absolute Grading', formulaDescription: 'Percentage = (CGPA - 0.75) * 10', percentageMultiplier: 10 }
];

export const INITIAL_ATTENDANCE_RULES: AttendanceRule[] = [
  { subjectName: 'DBMS', requiredPercentage: 75, warningPercentage: 80 },
  { subjectName: 'Operating Systems', requiredPercentage: 75, warningPercentage: 80 }
];
