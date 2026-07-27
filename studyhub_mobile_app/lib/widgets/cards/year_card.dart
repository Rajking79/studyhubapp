import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';

class YearCard extends StatelessWidget {
  final int yearIndex;
  final String title;
  final VoidCallback onTap;

  const YearCard({
    super.key,
    required this.yearIndex,
    required this.title,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final badgeColors = [
      const Color(0xFF8B5CF6),
      const Color(0xFF10B981),
      const Color(0xFFF59E0B),
      const Color(0xFF06B6D4),
    ];
    final color = badgeColors[(yearIndex - 1) % badgeColors.length];

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: AppStyles.cardDecoration(context: context),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
        child: InkWell(
          borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
          onTap: onTap,
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: AppResponsive.horizontalPadding,
              vertical: AppResponsive.verticalPadding * 0.9,
            ),
            child: Row(
              children: [
                Container(
                  width: AppResponsive.avatarSize * 0.9,
                  height: AppResponsive.avatarSize * 0.9,
                  decoration: BoxDecoration(
                    color: color.withValues(alpha: 0.12),
                    shape: BoxShape.circle,
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    '$yearIndex',
                    style: TextStyle(
                      fontSize: AppResponsive.titleFontSize * 1.1,
                      fontWeight: FontWeight.bold,
                      color: color,
                    ),
                  ),
                ),
                SizedBox(width: AppResponsive.w(4)),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: AppResponsive.titleFontSize,
                    fontWeight: FontWeight.w600,
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
                  ),
                ),
                const Spacer(),
                Icon(
                  Icons.arrow_forward_ios_rounded,
                  size: AppResponsive.iconSmall,
                  color: isDark
                      ? AppColors.textMutedDark
                      : AppColors.textMutedLight,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
