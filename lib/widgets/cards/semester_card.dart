import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';

class SemesterCard extends StatelessWidget {
  final String title;
  final VoidCallback onTap;

  const SemesterCard({super.key, required this.title, required this.onTap});

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
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: EdgeInsets.all(AppResponsive.w(3)),
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.import_contacts_rounded,
                    color: AppColors.primary,
                    size: AppResponsive.iconMedium,
                  ),
                ),
                SizedBox(height: AppResponsive.h(1.2)),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: AppResponsive.bodyFontSize,
                    fontWeight: FontWeight.w600,
                    color: isDark
                        ? AppColors.textPrimaryDark
                        : AppColors.textPrimaryLight,
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
