import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/utils/formatters.dart';
import '../../models/study_material_model.dart';

class MaterialCard extends StatelessWidget {
  final StudyMaterialModel material;
  final VoidCallback onTap;
  final VoidCallback onDownload;
  final VoidCallback onBookmarkToggle;

  const MaterialCard({
    super.key,
    required this.material,
    required this.onTap,
    required this.onDownload,
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
                // PDF Red Icon Badge
                Container(
                  width: AppResponsive.avatarSize * 0.9,
                  height: AppResponsive.avatarSize * 0.9,
                  decoration: BoxDecoration(
                    color: const Color(0xFFEF4444).withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(
                    Icons.picture_as_pdf_rounded,
                    color: const Color(0xFFEF4444),
                    size: AppResponsive.iconMedium,
                  ),
                ),
                SizedBox(width: AppResponsive.w(3)),
                // Title and Meta Data
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        material.title,
                        style: TextStyle(
                          fontSize: AppResponsive.titleFontSize,
                          fontWeight: FontWeight.w600,
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              material.collegeName,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: AppResponsive.captionFontSize,
                                color: isDark
                                    ? AppColors.textSecondaryDark
                                    : AppColors.textSecondaryLight,
                              ),
                            ),
                          ),
                          const SizedBox(width: 6),
                          const Text(
                            '•',
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            'PDF  ${Formatters.formatFileSize(material.fileSizeMB)}',
                            style: TextStyle(
                              fontSize: AppResponsive.captionFontSize,
                              fontWeight: FontWeight.w500,
                              color: isDark
                                  ? AppColors.textSecondaryDark
                                  : AppColors.textSecondaryLight,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                // Bookmark button
                IconButton(
                  onPressed: onBookmarkToggle,
                  icon: Icon(
                    material.isBookmarked
                        ? Icons.bookmark_rounded
                        : Icons.bookmark_border_rounded,
                    size: AppResponsive.iconMedium,
                    color: material.isBookmarked
                        ? AppColors.primary
                        : (isDark
                              ? AppColors.textMutedDark
                              : AppColors.textMutedLight),
                  ),
                ),
                // Download button
                IconButton(
                  onPressed: onDownload,
                  icon: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.file_download_outlined,
                      size: AppResponsive.iconMedium * 0.8,
                      color: AppColors.primary,
                    ),
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
