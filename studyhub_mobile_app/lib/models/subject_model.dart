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
