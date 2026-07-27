class CollegeModel {
  final String id;
  final String name;
  final String location;
  final String logoUrl;
  final int subjectCount;
  final String category; // 'State Univ', 'Private', 'Govt.'
  final bool isBookmarked;
  final List<String> availableCourses;

  CollegeModel({
    required this.id,
    required this.name,
    required this.location,
    required this.logoUrl,
    required this.subjectCount,
    required this.category,
    this.isBookmarked = false,
    this.availableCourses = const ['B.Tech', 'BCA', 'B.Com', 'M.Tech', 'MCA'],
  });

  factory CollegeModel.fromJson(Map<String, dynamic> json) {
    return CollegeModel(
      id: json['id'] ?? json['_id'] ?? 'col_1',
      name: json['name'] ?? 'College',
      location: json['city'] != null ? '${json['city']}, ${json['state'] ?? ''}' : (json['location'] ?? 'Delhi'),
      logoUrl: json['logo'] ?? json['logoUrl'] ?? 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop',
      subjectCount: json['subjectCount'] ?? json['coursesCount'] ?? 15,
      category: json['category'] ?? json['university'] ?? 'State Univ',
      isBookmarked: json['isBookmarked'] ?? false,
      availableCourses: (json['availableCourses'] as List?)?.map((e) => e.toString()).toList() ??
          const ['B.Tech', 'BCA', 'B.Com', 'M.Tech', 'MCA'],
    );
  }

  CollegeModel copyWith({
    String? id,
    String? name,
    String? location,
    String? logoUrl,
    int? subjectCount,
    String? category,
    bool? isBookmarked,
    List<String>? availableCourses,
  }) {
    return CollegeModel(
      id: id ?? this.id,
      name: name ?? this.name,
      location: location ?? this.location,
      logoUrl: logoUrl ?? this.logoUrl,
      subjectCount: subjectCount ?? this.subjectCount,
      category: category ?? this.category,
      isBookmarked: isBookmarked ?? this.isBookmarked,
      availableCourses: availableCourses ?? this.availableCourses,
    );
  }
}
