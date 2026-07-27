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
}
