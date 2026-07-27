import 'package:flutter/material.dart';

class CourseModel {
  final String id;
  final String title;
  final String subtitle;
  final String iconName;
  final Color badgeColor;

  CourseModel({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.iconName,
    required this.badgeColor,
  });

  factory CourseModel.fromJson(Map<String, dynamic> json) {
    return CourseModel(
      id: json['id'] ?? json['_id'] ?? 'btech_cs',
      title: json['title'] ?? json['name'] ?? 'B.Tech CS',
      subtitle: json['subtitle'] ?? json['code'] ?? 'Computer Science',
      iconName: json['iconName'] ?? 'code',
      badgeColor: Colors.blue,
    );
  }
}
