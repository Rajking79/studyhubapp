import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../models/subject_model.dart';

class SubjectCard extends StatelessWidget {
  final SubjectModel subject;
  final VoidCallback onTap;
  final VoidCallback onBookmarkToggle;

  const SubjectCard({
    super.key,
    required this.subject,
    required this.onTap,
    required this.onBookmarkToggle,
  });

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
                Container(
                  width: AppResponsive.avatarSize * 0.9,
                  height: AppResponsive.avatarSize * 0.9,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.menu_book_rounded,
                    color: AppColors.primary,
                    size: AppResponsive.iconMedium,
                  ),
                ),
                SizedBox(width: AppResponsive.w(3)),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        subject.title,
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
                        '${subject.materialCount} Materials • ${subject.downloadCount} Downloads',
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
                IconButton(
                  onPressed: onBookmarkToggle,
                  icon: Icon(
                    subject.isBookmarked
                        ? Icons.bookmark_rounded
                        : Icons.bookmark_border_rounded,
                    color: subject.isBookmarked
                        ? AppColors.primary
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
