class UserModel {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String avatarUrl;
  final String college;
  final String course;
  final String semester;
  final int downloadsCount;
  final int favoritesCount;
  final int uploadsCount;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.phone = '',
    this.avatarUrl = '',
    this.college = 'Delhi University',
    this.course = 'B.Tech Computer Science',
    this.semester = 'Semester 4',
    this.downloadsCount = 25,
    this.favoritesCount = 18,
    this.uploadsCount = 7,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      avatarUrl: json['avatarUrl'] ?? '',
      college: json['college'] ?? 'Delhi University',
      course: json['course'] ?? 'B.Tech',
      semester: json['semester'] ?? 'Semester 4',
      downloadsCount: json['downloadsCount'] ?? 0,
      favoritesCount: json['favoritesCount'] ?? 0,
      uploadsCount: json['uploadsCount'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'phone': phone,
      'avatarUrl': avatarUrl,
      'college': college,
      'course': course,
      'semester': semester,
      'downloadsCount': downloadsCount,
      'favoritesCount': favoritesCount,
      'uploadsCount': uploadsCount,
    };
  }

  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? phone,
    String? avatarUrl,
    String? college,
    String? course,
    String? semester,
    int? downloadsCount,
    int? favoritesCount,
    int? uploadsCount,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      college: college ?? this.college,
      course: course ?? this.course,
      semester: semester ?? this.semester,
      downloadsCount: downloadsCount ?? this.downloadsCount,
      favoritesCount: favoritesCount ?? this.favoritesCount,
      uploadsCount: uploadsCount ?? this.uploadsCount,
    );
  }
}
