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

  factory StudyMaterialModel.fromJson(Map<String, dynamic> json) {
    StudyMaterialType parseType(String? cat, String? upType) {
      final category = (cat ?? '').toLowerCase();
      if (category.contains('pyq') || category.contains('paper')) return StudyMaterialType.paper;
      if (category.contains('book')) return StudyMaterialType.book;
      if (category.contains('guide')) return StudyMaterialType.guide;
      if (category.contains('syllabus')) return StudyMaterialType.syllabus;
      if (category.contains('assignment')) return StudyMaterialType.assignment;
      return StudyMaterialType.notes;
    }

    return StudyMaterialModel(
      id: json['id'] ?? json['_id'] ?? 'mat_1',
      title: json['title'] ?? 'Study Material.pdf',
      subjectId: json['subjectId'] ?? json['subjectName'] ?? 'subj_dbms_101',
      subjectName: json['subjectName'] ?? 'DBMS',
      collegeName: json['collegeName'] ?? 'Delhi University (DU)',
      type: parseType(json['category'], json['uploadType']),
      examType: json['examType'] ?? json['examTag'] ?? 'End Sem',
      year: json['year']?.toString() ?? '2024',
      fileSizeMB: (json['fileSizeMb'] is num) ? (json['fileSizeMb'] as num).toDouble() : (json['fileSizeMB'] is num ? (json['fileSizeMB'] as num).toDouble() : 3.5),
      fileUrl: json['pdfUrl'] ?? json['fileUrl'] ?? 'https://studyhub.com/pdf/sample.pdf',
      author: json['uploadedBy'] ?? json['author'] ?? 'Faculty',
      rating: (json['rating'] is num) ? (json['rating'] as num).toDouble() : 4.8,
      downloadsCount: json['downloadsCount'] ?? 100,
      isBookmarked: json['isBookmarked'] ?? false,
      isDownloaded: json['isDownloaded'] ?? false,
    );
  }

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
