import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../models/college_model.dart';

class CollegeCard extends StatelessWidget {
  final CollegeModel college;
  final VoidCallback onTap;
  final VoidCallback onBookmarkToggle;

  const CollegeCard({
    super.key,
    required this.college,
    required this.onTap,
    required this.onBookmarkToggle,
  });

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: AppStyles.cardDecoration(context: context),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
        child: InkWell(
          borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
          onTap: onTap,
          child: Padding(
            padding: AppResponsive.cardInsets,
            child: Row(
              children: [
                // College Avatar Badge
                Container(
                  width: AppResponsive.avatarSize,
                  height: AppResponsive.avatarSize,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: AppColors.primary.withValues(alpha: 0.2),
                      width: 1.5,
                    ),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    college.logoUrl,
                    style: TextStyle(
                      color: AppColors.primary,
                      fontWeight: FontWeight.bold,
                      fontSize: AppResponsive.bodyFontSize,
                    ),
                  ),
                ),
                SizedBox(width: AppResponsive.w(3)),
                // Details
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        college.name,
                        style: TextStyle(
                          fontSize: AppResponsive.titleFontSize,
                          fontWeight: FontWeight.w600,
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        college.location,
                        style: TextStyle(
                          fontSize: AppResponsive.captionFontSize,
                          color: isDark
                              ? AppColors.textSecondaryDark
                              : AppColors.textSecondaryLight,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 3,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.secondary.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '${college.subjectCount}+ Subjects',
                          style: TextStyle(
                            fontSize: AppResponsive.chipFontSize,
                            fontWeight: FontWeight.w600,
                            color: AppColors.secondary,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                // Bookmark Heart Icon
                IconButton(
                  onPressed: onBookmarkToggle,
                  icon: Icon(
                    college.isBookmarked
                        ? Icons.favorite_rounded
                        : Icons.favorite_border_rounded,
                    color: college.isBookmarked
                        ? AppColors.accent
                        : (isDark
                              ? AppColors.textMutedDark
                              : AppColors.textMutedLight),
                    size: AppResponsive.iconMedium,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
