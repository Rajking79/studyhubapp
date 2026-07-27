import 'package:flutter/material.dart';

/// AppResponsive - Universal responsive utility for StudyHub
/// Works across all screen sizes: small (360px) to large tablets (1024px+)
class AppResponsive {
  static late MediaQueryData _mediaQueryData;
  static late double screenWidth;
  static late double screenHeight;
  static late double _blockH;
  static late double _blockW;
  static late double textScaleFactor;
  static late bool isSmallPhone;   // < 360px width
  static late bool isPhone;        // 360–600px
  static late bool isLargePhone;   // 600–840px
  static late bool isTablet;       // > 840px

  /// Call this once at the top of every build() method:
  /// AppResponsive.init(context);
  static void init(BuildContext context) {
    _mediaQueryData = MediaQuery.of(context);
    screenWidth  = _mediaQueryData.size.width;
    screenHeight = _mediaQueryData.size.height;
    _blockW      = screenWidth  / 100;
    _blockH      = screenHeight / 100;

    isSmallPhone  = screenWidth < 360;
    isPhone       = screenWidth >= 360 && screenWidth < 600;
    isLargePhone  = screenWidth >= 600 && screenWidth < 840;
    isTablet      = screenWidth >= 840;

    // Text scale: never let system font size break layout
    textScaleFactor = _mediaQueryData.textScaler.scale(1.0).clamp(0.85, 1.15);
  }

  // ── Percentage-based sizing ──────────────────────────────────────────────
  /// Returns [percent]% of screen width
  static double w(double percent) => _blockW * percent;

  /// Returns [percent]% of screen height
  static double h(double percent) => _blockH * percent;

  // ── Adaptive spacing ─────────────────────────────────────────────────────
  /// Horizontal padding that scales with screen width
  static double get horizontalPadding {
    if (isSmallPhone) return 12;
    if (isTablet)     return 32;
    return 20;
  }

  static double get verticalPadding {
    if (isSmallPhone) return 10;
    if (isTablet)     return 28;
    return 16;
  }

  // ── Adaptive font sizes ──────────────────────────────────────────────────
  static double get displayFontSize   => isTablet ? 32 : isSmallPhone ? 20 : 24;
  static double get headingFontSize   => isTablet ? 26 : isSmallPhone ? 17 : 20;
  static double get titleFontSize     => isTablet ? 20 : isSmallPhone ? 14 : 16;
  static double get bodyFontSize      => isTablet ? 16 : isSmallPhone ? 12 : 14;
  static double get captionFontSize   => isTablet ? 14 : isSmallPhone ? 10 : 12;
  static double get chipFontSize      => isTablet ? 13 : isSmallPhone ? 10 : 11;

  // ── Adaptive icon sizes ──────────────────────────────────────────────────
  static double get iconLarge   => isTablet ? 32 : isSmallPhone ? 22 : 26;
  static double get iconMedium  => isTablet ? 26 : isSmallPhone ? 18 : 22;
  static double get iconSmall   => isTablet ? 20 : isSmallPhone ? 14 : 16;

  // ── Adaptive card sizes ──────────────────────────────────────────────────
  static double get cardRadius      => isTablet ? 20 : isSmallPhone ? 14 : 16;
  static double get cardPadding     => isTablet ? 20 : isSmallPhone ? 12 : 16;
  static double get avatarSize      => isTablet ? 72 : isSmallPhone ? 44 : 54;
  static double get avatarIconSize  => isTablet ? 40 : isSmallPhone ? 22 : 28;

  // ── Adaptive button ──────────────────────────────────────────────────────
  static double get buttonHeight  => isTablet ? 60 : isSmallPhone ? 48 : 54;
  static double get buttonRadius  => isTablet ? 18 : isSmallPhone ? 12 : 16;
  static double get buttonFont    => isTablet ? 18 : isSmallPhone ? 14 : 16;

  // ── Banner ───────────────────────────────────────────────────────────────
  static double get bannerHeight  => isTablet ? 200 : isSmallPhone ? 120 : 150;

  // ── Bottom Nav ───────────────────────────────────────────────────────────
  static double get bottomNavHeight => isTablet ? 80 : isSmallPhone ? 60 : 70;

  // ── Grid columns ─────────────────────────────────────────────────────────
  static int get courseGridColumns   => isTablet ? 3 : 2;
  static int get semesterGridColumns => isTablet ? 4 : 2;

  // ── Responsive EdgeInsets ────────────────────────────────────────────────
  static EdgeInsets get screenPadding =>
      EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: verticalPadding);

  static EdgeInsets get cardInsets =>
      EdgeInsets.all(cardPadding);
}
