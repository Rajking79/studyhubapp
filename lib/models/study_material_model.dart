enum StudyMaterialType {
  paper,
  notes,
  book,
  guide,
  syllabus,
  assignment,
  practical,
}

class StudyMaterialModel {
  final String id;
  final String title;
  final String subjectId;
  final String subjectName;
  final String collegeName;
  final StudyMaterialType type; // paper, notes, book, etc.
  final String examType; // 'End Sem', 'Mid Sem', 'Backlog'
  final String year; // '2024', '2023', etc.
  final double fileSizeMB;
  final String fileUrl;
  final String author;
  final double rating;
  final int downloadsCount;
  final bool isBookmarked;
  final bool isDownloaded;

  StudyMaterialModel({
    required this.id,
    required this.title,
    required this.subjectId,
    required this.subjectName,
    required this.collegeName,
    required this.type,
    this.examType = 'End Sem',
    this.year = '2024',
    required this.fileSizeMB,
    required this.fileUrl,
    this.author = 'Delhi University Faculty',
    this.rating = 4.8,
    this.downloadsCount = 1250,
    this.isBookmarked = false,
    this.isDownloaded = false,
  });

  StudyMaterialModel copyWith({
    String? id,
    String? title,
    String? subjectId,
    String? subjectName,
    String? collegeName,
    StudyMaterialType? type,
    String? examType,
    String? year,
    double? fileSizeMB,
    String? fileUrl,
    String? author,
    double? rating,
    int? downloadsCount,
    bool? isBookmarked,
    bool? isDownloaded,
  }) {
    return StudyMaterialModel(
      id: id ?? this.id,
      title: title ?? this.title,
      subjectId: subjectId ?? this.subjectId,
      subjectName: subjectName ?? this.subjectName,
      collegeName: collegeName ?? this.collegeName,
      type: type ?? this.type,
      examType: examType ?? this.examType,
      year: year ?? this.year,
      fileSizeMB: fileSizeMB ?? this.fileSizeMB,
      fileUrl: fileUrl ?? this.fileUrl,
      author: author ?? this.author,
      rating: rating ?? this.rating,
      downloadsCount: downloadsCount ?? this.downloadsCount,
      isBookmarked: isBookmarked ?? this.isBookmarked,
      isDownloaded: isDownloaded ?? this.isDownloaded,
    );
  }
}
