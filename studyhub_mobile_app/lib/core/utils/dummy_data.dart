import 'package:flutter/material.dart';
import '../../models/college_model.dart';
import '../../models/course_model.dart';
import '../../models/subject_model.dart';
import '../../models/study_material_model.dart';
import '../../models/download_item_model.dart';
import '../../models/banner_model.dart';

class DummyData {
  // Colleges
  static List<CollegeModel> getColleges() {
    return [
      CollegeModel(
        id: 'du',
        name: 'Delhi University',
        location: 'New Delhi, Delhi',
        logoUrl: 'DU',
        subjectCount: 120,
        category: 'State Univ',
        isBookmarked: true,
      ),
      CollegeModel(
        id: 'anna',
        name: 'Anna University',
        location: 'Chennai, Tamil Nadu',
        logoUrl: 'AU',
        subjectCount: 95,
        category: 'Govt.',
      ),
      CollegeModel(
        id: 'jntu',
        name: 'JNTU Hyderabad',
        location: 'Hyderabad, Telangana',
        logoUrl: 'JNTU',
        subjectCount: 110,
        category: 'Govt.',
      ),
      CollegeModel(
        id: 'mu',
        name: 'Mumbai University',
        location: 'Mumbai, Maharashtra',
        logoUrl: 'MU',
        subjectCount: 100,
        category: 'State Univ',
      ),
      CollegeModel(
        id: 'bits',
        name: 'BITS Pilani',
        location: 'Pilani, Rajasthan',
        logoUrl: 'BITS',
        subjectCount: 85,
        category: 'Private',
      ),
    ];
  }

  // Courses
  static List<CourseModel> getCourses() {
    return [
      CourseModel(
        id: 'btech',
        title: 'B.Tech',
        subtitle: 'Bachelor of Technology',
        iconName: 'laptop',
        badgeColor: const Color(0xFF2563EB),
      ),
      CourseModel(
        id: 'bca',
        title: 'BCA',
        subtitle: 'Bachelor of Computer Applications',
        iconName: 'code',
        badgeColor: const Color(0xFF0D9488),
      ),
      CourseModel(
        id: 'bcom',
        title: 'B.Com',
        subtitle: 'Bachelor of Commerce',
        iconName: 'chart-bar',
        badgeColor: const Color(0xFF8B5CF6),
      ),
      CourseModel(
        id: 'ba',
        title: 'BA',
        subtitle: 'Bachelor of Arts',
        iconName: 'book-open',
        badgeColor: const Color(0xFFEC4899),
      ),
      CourseModel(
        id: 'bsc',
        title: 'BSc',
        subtitle: 'Bachelor of Science',
        iconName: 'atom',
        badgeColor: const Color(0xFFF59E0B),
      ),
      CourseModel(
        id: 'mca',
        title: 'MCA',
        subtitle: 'Master of Computer Applications',
        iconName: 'terminal',
        badgeColor: const Color(0xFF06B6D4),
      ),
      CourseModel(
        id: 'mba',
        title: 'MBA',
        subtitle: 'Master of Business Administration',
        iconName: 'briefcase',
        badgeColor: const Color(0xFF10B981),
      ),
      CourseModel(
        id: 'others',
        title: 'Others',
        subtitle: 'More Courses',
        iconName: 'grid',
        badgeColor: const Color(0xFF64748B),
      ),
    ];
  }

  // Subjects
  static List<SubjectModel> getSubjects() {
    return [
      SubjectModel(
        id: 'os',
        title: 'Operating System',
        courseId: 'btech',
        materialCount: 45,
        downloadCount: 12500,
        rating: 4.6,
        isBookmarked: true,
      ),
      SubjectModel(
        id: 'dsa',
        title: 'Data Structures',
        courseId: 'btech',
        materialCount: 38,
        downloadCount: 9200,
        rating: 4.8,
      ),
      SubjectModel(
        id: 'dbms',
        title: 'Database Management',
        courseId: 'btech',
        materialCount: 52,
        downloadCount: 15100,
        rating: 4.7,
      ),
      SubjectModel(
        id: 'cn',
        title: 'Computer Networks',
        courseId: 'btech',
        materialCount: 32,
        downloadCount: 7300,
        rating: 4.5,
      ),
      SubjectModel(
        id: 'java',
        title: 'Java Programming',
        courseId: 'btech',
        materialCount: 50,
        downloadCount: 18300,
        rating: 4.9,
      ),
      SubjectModel(
        id: 'python',
        title: 'Python Programming',
        courseId: 'btech',
        materialCount: 46,
        downloadCount: 14200,
        rating: 4.8,
      ),
    ];
  }

  // Papers
  static List<StudyMaterialModel> getPreviousPapers() {
    return [
      StudyMaterialModel(
        id: 'p1',
        title: '2024 (End Sem)',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.paper,
        examType: 'End Sem',
        year: '2024',
        fileSizeMB: 2.4,
        fileUrl: 'sample.pdf',
        isBookmarked: true,
      ),
      StudyMaterialModel(
        id: 'p2',
        title: '2023 (End Sem)',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.paper,
        examType: 'End Sem',
        year: '2023',
        fileSizeMB: 1.8,
        fileUrl: 'sample.pdf',
      ),
      StudyMaterialModel(
        id: 'p3',
        title: '2022 (Mid Sem)',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.paper,
        examType: 'Mid Sem',
        year: '2022',
        fileSizeMB: 1.4,
        fileUrl: 'sample.pdf',
      ),
      StudyMaterialModel(
        id: 'p4',
        title: '2021 (End Sem)',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.paper,
        examType: 'End Sem',
        year: '2021',
        fileSizeMB: 2.1,
        fileUrl: 'sample.pdf',
      ),
      StudyMaterialModel(
        id: 'p5',
        title: '2020 (Mid Sem)',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.paper,
        examType: 'Mid Sem',
        year: '2020',
        fileSizeMB: 1.6,
        fileUrl: 'sample.pdf',
      ),
    ];
  }

  // Notes & Books
  static List<StudyMaterialModel> getNotesAndBooks() {
    return [
      StudyMaterialModel(
        id: 'nb1',
        title: 'Operating System Complete Notes',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.notes,
        fileSizeMB: 1.8,
        fileUrl: 'sample.pdf',
        author: 'Prof. S. Sharma',
        rating: 4.7,
      ),
      StudyMaterialModel(
        id: 'nb2',
        title: 'OS Handwritten Notes by Topper',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.notes,
        fileSizeMB: 2.3,
        fileUrl: 'sample.pdf',
        author: 'Aman Verma',
        rating: 4.9,
      ),
      StudyMaterialModel(
        id: 'nb3',
        title: 'Important OS Questions & Answers',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.guide,
        fileSizeMB: 0.9,
        fileUrl: 'sample.pdf',
        author: 'Department Faculty',
        rating: 4.6,
      ),
      StudyMaterialModel(
        id: 'nb4',
        title: 'Unit Wise Notes - All Units',
        subjectId: 'os',
        subjectName: 'Operating System',
        collegeName: 'Delhi University',
        type: StudyMaterialType.notes,
        fileSizeMB: 3.1,
        fileUrl: 'sample.pdf',
        author: 'StudyHub Editorial',
        rating: 4.7,
      ),
    ];
  }

  // Downloaded items
  static List<DownloadItemModel> getDownloads() {
    return [
      DownloadItemModel(
        id: 'd1',
        fileName: 'OS_2024_EndSem.pdf',
        title: 'Operating System 2024 EndSem Paper',
        fileSizeMB: 2.4,
        downloadDate: '21 Jul 2026',
        localPath: '/downloads/OS_2024_EndSem.pdf',
      ),
      DownloadItemModel(
        id: 'd2',
        fileName: 'DBMS_Notes.pdf',
        title: 'Database Management Complete Notes',
        fileSizeMB: 1.8,
        downloadDate: '20 Jul 2026',
        localPath: '/downloads/DBMS_Notes.pdf',
      ),
      DownloadItemModel(
        id: 'd3',
        fileName: 'CN_Important_Questions.pdf',
        title: 'Computer Networks Short Notes',
        fileSizeMB: 1.2,
        downloadDate: '18 Jul 2026',
        localPath: '/downloads/CN_Important_Questions.pdf',
      ),
      DownloadItemModel(
        id: 'd4',
        fileName: 'Java_Handwritten_Notes.pdf',
        title: 'Java OOPs & Multithreading Notes',
        fileSizeMB: 3.5,
        downloadDate: '15 Jul 2026',
        localPath: '/downloads/Java_Handwritten_Notes.pdf',
      ),
      DownloadItemModel(
        id: 'd5',
        fileName: 'Python_Unit_1_Notes.pdf',
        title: 'Python Basics & Functions Guide',
        fileSizeMB: 1.7,
        downloadDate: '12 Jul 2026',
        localPath: '/downloads/Python_Unit_1_Notes.pdf',
      ),
    ];
  }

  // Home Banners
  static List<BannerModel> getBanners() {
    return [
      BannerModel(
        id: 'b1',
        title: 'Your Learning Our Priority',
        subtitle: 'Explore, Learn & Excel with verified materials',
        actionText: 'Explore Now',
        gradientColors: [0xFF2563EB, 0xFF1D4ED8],
      ),
      BannerModel(
        id: 'b2',
        title: 'Exam Season Essentials',
        subtitle: 'Get top 100 solved previous year question papers',
        actionText: 'Get Papers',
        gradientColors: [0xFF0D9488, 0xFF0F766E],
      ),
      BannerModel(
        id: 'b3',
        title: 'Toppers Handwritten Notes',
        subtitle: 'High yield summary notes for mid-sem prep',
        actionText: 'View Notes',
        gradientColors: [0xFFF97316, 0xFFC2410C],
      ),
    ];
  }
}
