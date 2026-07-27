import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/utils/formatters.dart';
import '../../models/download_item_model.dart';

class DownloadCard extends StatelessWidget {
  final DownloadItemModel download;
  final VoidCallback onTap;
  final VoidCallback onDelete;

  const DownloadCard({
    super.key,
    required this.download,
    required this.onTap,
    required this.onDelete,
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
                // Red PDF Icon Badge
                Container(
                  width: AppResponsive.avatarSize * 0.85,
                  height: AppResponsive.avatarSize * 0.85,
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
                // File Details
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        download.fileName,
                        style: TextStyle(
                          fontSize: AppResponsive.bodyFontSize,
                          fontWeight: FontWeight.w600,
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${Formatters.formatFileSize(download.fileSizeMB)} • PDF',
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
                // Downloaded Status Checkmark
                Container(
                  padding: const EdgeInsets.all(4),
                  decoration: const BoxDecoration(
                    color: AppColors.success,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check_rounded,
                    size: 16,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: onDelete,
                  icon: Icon(
                    Icons.delete_outline_rounded,
                    size: AppResponsive.iconMedium,
                    color: AppColors.error,
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
