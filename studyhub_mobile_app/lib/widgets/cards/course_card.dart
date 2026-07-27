import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../models/course_model.dart';

class CourseCard extends StatelessWidget {
  final CourseModel course;
  final VoidCallback onTap;

  const CourseCard({super.key, required this.course, required this.onTap});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      decoration: AppStyles.cardDecoration(context: context),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
        child: InkWell(
          borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
          onTap: onTap,
          child: Padding(
            padding: AppResponsive.cardInsets,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: AppResponsive.avatarSize * 0.8,
                  height: AppResponsive.avatarSize * 0.8,
                  decoration: BoxDecoration(
                    color: course.badgeColor.withValues(alpha: 0.12),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    _getCourseIcon(course.iconName),
                    color: course.badgeColor,
                    size: AppResponsive.iconMedium,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  course.title,
                  style: TextStyle(
                    fontSize: AppResponsive.titleFontSize,
                    fontWeight: FontWeight.bold,
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  course.subtitle,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: AppResponsive.captionFontSize,
                    color: isDark
                        ? AppColors.textSecondaryDark
                        : AppColors.textSecondaryLight,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  IconData _getCourseIcon(String name) {
    switch (name) {
      case 'laptop':
        return Icons.laptop_mac_rounded;
      case 'code':
        return Icons.code_rounded;
      case 'chart-bar':
        return Icons.bar_chart_rounded;
      case 'book-open':
        return Icons.menu_book_rounded;
      case 'atom':
        return Icons.science_rounded;
      case 'terminal':
        return Icons.terminal_rounded;
      case 'briefcase':
        return Icons.business_center_rounded;
      default:
        return Icons.grid_view_rounded;
    }
  }
}
