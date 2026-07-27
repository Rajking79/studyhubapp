import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';

class CustomBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const CustomBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        boxShadow: isDark
            ? []
            : [
                BoxShadow(
                  color: const Color(0xFF0F172A).withValues(alpha: 0.08),
                  blurRadius: 24,
                  offset: const Offset(0, -4),
                ),
              ],
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(AppResponsive.cardRadius),
          topRight: Radius.circular(AppResponsive.cardRadius),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: AppResponsive.horizontalPadding * 0.6,
            vertical: AppResponsive.verticalPadding * 0.5,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(0, Icons.home_rounded, 'Home', isDark),
              _buildNavItem(1, Icons.search_rounded, 'Search', isDark),
              _buildNavItem(2, Icons.file_download_outlined, 'Downloads', isDark),
              _buildNavItem(3, Icons.favorite_border_rounded, 'Favorites', isDark),
              _buildNavItem(4, Icons.person_outline_rounded, 'Profile', isDark),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label, bool isDark) {
    final isSelected = currentIndex == index;
    final color = isSelected
        ? AppColors.primary
        : (isDark ? AppColors.textMutedDark : AppColors.textMutedLight);

    return InkWell(
      onTap: () => onTap(index),
      borderRadius: BorderRadius.circular(AppResponsive.buttonRadius),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(
          horizontal: AppResponsive.horizontalPadding * 0.6,
          vertical: AppResponsive.verticalPadding * 0.5,
        ),
        decoration: isSelected
            ? BoxDecoration(
                color: AppColors.primary.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(AppResponsive.buttonRadius),
              )
            : null,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: color,
              size: AppResponsive.iconMedium,
            ),
            SizedBox(height: AppResponsive.isSmallPhone ? 2 : 3),
            Text(
              label,
              style: TextStyle(
                fontSize: AppResponsive.chipFontSize,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
