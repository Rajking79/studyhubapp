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
