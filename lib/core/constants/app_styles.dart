import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../utils/app_responsive.dart';
import 'app_colors.dart';
import 'app_constants.dart';

class AppStyles {
  // Soft Shadows
  static List<BoxShadow> softShadow({bool isDark = false}) => [
        BoxShadow(
          color: isDark
              ? Colors.black.withValues(alpha: 0.35)
              : const Color(0xFF0F172A).withValues(alpha: 0.05),
          blurRadius: 16,
          offset: const Offset(0, 4),
          spreadRadius: 0,
        ),
        if (!isDark)
          BoxShadow(
            color: const Color(0xFF2563EB).withValues(alpha: 0.03),
            blurRadius: 30,
            offset: const Offset(0, 8),
            spreadRadius: 0,
          ),
      ];

  static List<BoxShadow> cardShadow({bool isDark = false}) => isDark
      ? []
      : [
          BoxShadow(
            color: const Color(0xFF2563EB).withValues(alpha: 0.08),
            blurRadius: 24,
            offset: const Offset(0, 8),
            spreadRadius: 0,
          ),
        ];

  // Card Decoration
  static BoxDecoration cardDecoration({
    required BuildContext context,
    Color? color,
    BorderRadiusGeometry? borderRadius,
    Border? border,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return BoxDecoration(
      color: color ?? (isDark ? AppColors.surfaceDark : Colors.white),
      borderRadius: borderRadius ?? BorderRadius.circular(AppResponsive.cardRadius),
      boxShadow: isDark ? [] : softShadow(isDark: false),
      border: border ??
          (isDark
              ? null
              : Border.all(
                  color: AppColors.borderLight,
                  width: 1,
                )),
    );
  }

  // Gradient Decorations
  static BoxDecoration primaryGradientDecoration({double radius = AppConstants.cardRadius}) {
    return BoxDecoration(
      borderRadius: BorderRadius.circular(radius),
      gradient: const LinearGradient(
        colors: [Color(0xFF2563EB), Color(0xFF1D4ED8), Color(0xFF0284C7)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      boxShadow: [
        BoxShadow(
          color: const Color(0xFF2563EB).withValues(alpha: 0.35),
          blurRadius: 16,
          offset: const Offset(0, 6),
        ),
      ],
    );
  }

  // Typography Shortcuts using Poppins
  static TextStyle headingLarge({Color? color, FontWeight weight = FontWeight.bold}) {
    return GoogleFonts.poppins(
      fontSize: 26,
      fontWeight: weight,
      color: color,
    );
  }

  static TextStyle headingMedium({Color? color, FontWeight weight = FontWeight.w600}) {
    return GoogleFonts.poppins(
      fontSize: 20,
      fontWeight: weight,
      color: color,
    );
  }

  static TextStyle titleStyle({Color? color, FontWeight weight = FontWeight.w600}) {
    return GoogleFonts.poppins(
      fontSize: 16,
      fontWeight: weight,
      color: color,
    );
  }

  static TextStyle bodyStyle({Color? color, FontWeight weight = FontWeight.normal}) {
    return GoogleFonts.poppins(
      fontSize: 14,
      fontWeight: weight,
      color: color,
    );
  }

  static TextStyle captionStyle({Color? color, FontWeight weight = FontWeight.w400}) {
    return GoogleFonts.poppins(
      fontSize: 12,
      fontWeight: weight,
      color: color,
    );
  }
}
