import 'package:flutter/material.dart';

class AppColors {
  // Brand Colors
  static const Color primary = Color(0xFF2563EB); // Royal Blue #2563EB
  static const Color primaryDark = Color(0xFF1D4ED8);
  static const Color primaryLight = Color(0xFF60A5FA);
  
  static const Color secondary = Color(0xFF0D9488); // Teal
  static const Color secondaryLight = Color(0xFF2DD4BF);
  
  static const Color accent = Color(0xFFF97316); // Orange Accent
  static const Color accentLight = Color(0xFFFDBA74);

  // Background & Surfaces (Light)
  static const Color backgroundLight = Color(0xFFF1F5F9); // Crisp Slate 100
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color cardLight = Color(0xFFFFFFFF);
  static const Color borderLight = Color(0xFFE2E8F0);

  // Background & Surfaces (Dark)
  static const Color backgroundDark = Color(0xFF0F172A);
  static const Color surfaceDark = Color(0xFF1E293B);
  static const Color cardDark = Color(0xFF1E293B);
  static const Color borderDark = Color(0xFF334155);

  // Text Colors
  static const Color textPrimaryLight = Color(0xFF0F172A); // Slate 900 - Deep & clear
  static const Color textSecondaryLight = Color(0xFF334155); // Slate 700 - High legibility
  static const Color textMutedLight = Color(0xFF64748B); // Slate 500

  static const Color textPrimaryDark = Color(0xFFF8FAFC); // Slate 50 - Pure crisp
  static const Color textSecondaryDark = Color(0xFFCBD5E1); // Slate 300 - Bright & clear
  static const Color textMutedDark = Color(0xFF94A3B8); // Slate 400 - Readable muted

  // Status & Utility Colors
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color info = Color(0xFF3B82F6);

  // Category Badge Colors
  static const List<Color> categoryGradients = [
    Color(0xFF3B82F6),
    Color(0xFF8B5CF6),
    Color(0xFFEC4899),
    Color(0xFF10B981),
    Color(0xFFF59E0B),
    Color(0xFF06B6D4),
  ];

  // Shimmer / Loading
  static const Color shimmerBaseLight = Color(0xFFE2E8F0);
  static const Color shimmerHighlightLight = Color(0xFFF1F5F9);
  static const Color shimmerBaseDark = Color(0xFF1E293B);
  static const Color shimmerHighlightDark = Color(0xFF334155);
}
