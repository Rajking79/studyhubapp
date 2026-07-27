class SubjectModel {
  final String id;
  final String title;
  final String courseId;
  final String department;
  final int materialCount;
  final int downloadCount;
  final double rating;
  final String description;
  final String instructorName;
  final String instructorRole;
  final String instructorAvatar;
  final bool isBookmarked;

  SubjectModel({
    required this.id,
    required this.title,
    required this.courseId,
    this.department = 'Computer Science',
    required this.materialCount,
    required this.downloadCount,
    this.rating = 4.6,
    this.description = 'Comprehensive core subject covering fundamental architectural concepts, system design, hardware abstraction, and hardware-software interaction.',
    this.instructorName = 'Dr. Rajesh Kumar',
    this.instructorRole = 'Associate Professor',
    this.instructorAvatar = '',
    this.isBookmarked = false,
  });

  factory SubjectModel.fromJson(Map<String, dynamic> json) {
    return SubjectModel(
      id: json['id'] ?? json['_id'] ?? 'subj_dbms_101',
      title: json['title'] ?? json['name'] ?? 'Subject',
      courseId: json['courseId'] ?? json['courseName'] ?? 'btech_cs',
      department: json['department'] ?? 'Computer Science',
      materialCount: json['materialCount'] ?? json['materialsCount'] ?? 10,
      downloadCount: json['downloadCount'] ?? json['downloadsCount'] ?? 250,
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 4.6,
      description: json['description'] ?? 'Comprehensive subject details.',
      instructorName: json['instructorName'] ?? json['teacherName'] ?? 'Dr. A.K. Sharma',
      instructorRole: json['instructorRole'] ?? 'Professor',
      instructorAvatar: json['instructorAvatar'] ?? '',
      isBookmarked: json['isBookmarked'] ?? false,
    );
  }

  SubjectModel copyWith({
    String? id,
    String? title,
    String? courseId,
    String? department,
    int? materialCount,
    int? downloadCount,
    double? rating,
    String? description,
    String? instructorName,
    String? instructorRole,
    String? instructorAvatar,
    bool? isBookmarked,
  }) {
    return SubjectModel(
      id: id ?? this.id,
      title: title ?? this.title,
      courseId: courseId ?? this.courseId,
      department: department ?? this.department,
      materialCount: materialCount ?? this.materialCount,
      downloadCount: downloadCount ?? this.downloadCount,
      rating: rating ?? this.rating,
      description: description ?? this.description,
      instructorName: instructorName ?? this.instructorName,
      instructorRole: instructorRole ?? this.instructorRole,
      instructorAvatar: instructorAvatar ?? this.instructorAvatar,
      isBookmarked: isBookmarked ?? this.isBookmarked,
    );
  }
}
