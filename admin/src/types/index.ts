export type ViewType =
  | 'dashboard'
  | 'colleges'
  | 'courses'
  | 'years'
  | 'semesters'
  | 'subjects'
  | 'subject-details'
  | 'study-materials'
  | 'pyqs'
  | 'notes'
  | 'books'
  | 'guides'
  | 'assignments'
  | 'question-bank'
  | 'syllabus'
  | 'video-manager'
  | 'pdf-manager'
  | 'home-screen-manager'
  | 'banner-manager'
  | 'quick-access-manager'
  | 'continue-reading-manager'
  | 'featured-college-manager'
  | 'studyhub-ai'
  | 'snap-solve-ai'
  | 'search-manager'
  | 'cgpa-manager'
  | 'attendance-manager'
  | 'downloads-manager'
  | 'favorites-manager'
  | 'student-uploads'
  | 'notifications'
  | 'students'
  | 'feedback'
  | 'analytics'
  | 'reports'
  | 'remote-config'
  | 'settings'
  | 'profile';

export interface College {
  id: string;
  name: string;
  university: string;
  city: string;
  state: string;
  logo: string;
  coursesCount: number;
  studentsCount: number;
  isFeatured: boolean;
  status: 'Active' | 'Inactive';
}

export interface Course {
  id: string;
  collegeId: string;
  collegeName: string;
  name: string;
  code: string;
  durationYears: number;
  totalSemesters: number;
  description: string;
  iconName: string;
  colorTheme: string;
  status: 'Active' | 'Archived';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  courseName: string;
  semester: number;
  teacherName: string;
  credits: number;
  description: string;
  materialsCount: number;
  status: 'Active' | 'Draft';
}

export interface Material {
  id: string;
  title: string;
  category: 'Previous Papers' | 'Notes' | 'Books' | 'Guides' | 'Assignments' | 'Question Bank' | 'Syllabus' | 'Video Lecture';
  uploadType: 'PDF' | 'Video' | 'External Link' | 'ZIP';
  subjectName: string;
  collegeName?: string;
  courseName?: string;
  academicYear?: string;
  semester?: number;
  examTag: 'Mid Sem' | 'End Sem' | 'Backlog' | 'All';
  year: number;
  fileSizeMb: number;
  downloadsCount: number;
  uploadedBy: string;
  uploadedDate: string;
  isPinned: boolean;
  isFeatured: boolean;
  isPremium: boolean;
  status: 'Published' | 'Draft' | 'Pending Review';
  pdfUrl?: string;
  thumbnailUrl?: string;
}

export interface VideoMaterial {
  id: string;
  title: string;
  youtubeUrl: string;
  duration: string;
  teacherName: string;
  subjectName: string;
  collegeName?: string;
  courseName?: string;
  semester: number;
  examTag: 'Mid Sem' | 'End Sem' | 'Backlog' | 'All';
  viewsCount: number;
  isFeatured: boolean;
  thumbnailUrl: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  collegeName: string;
  courseName: string;
  semester: number;
  isOnline: boolean;
  activeDevice?: string;
  ipAddress?: string;
  downloadsCount: number;
  bookmarksCount: number;
  uploadsCount: number;
  lastLogin: string;
  status: 'Active' | 'Blocked';
}

export interface StudentUpload {
  id: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  title: string;
  subjectName: string;
  fileSizeMb: number;
  submittedTime: string;
  pdfUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
}

export interface NotificationBroadcast {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'Exams' | 'Notices' | 'New Uploads' | 'System';
  targetAudience: 'All Users' | 'Specific College' | 'Specific Course' | 'Specific Semester';
  targetCollege?: string;
  sentAt: string;
  deliveredCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  redirectRoute: string;
  priority: number;
  isEnabled: boolean;
}

export interface HomeScreenSectionConfig {
  id: string;
  sectionName: string;
  description: string;
  isEnabled: boolean;
  displayOrder: number;
}

export interface AiConfig {
  dailyFreeLimit: number;
  premiumLimit: number;
  isEnabled: boolean;
  modelPromptConfig: string;
  totalQuestionsAnswered: number;
}

export interface SnapSolveConfig {
  ocrEnabled: boolean;
  dailyUsageCount: number;
  questionHistoryCount: number;
}

export interface CgpaRule {
  id: string;
  universityName: string;
  gradingSystem: string;
  formulaDescription: string;
  percentageMultiplier: number;
}

export interface AttendanceRule {
  subjectName: string;
  requiredPercentage: number;
  warningPercentage: number;
}
