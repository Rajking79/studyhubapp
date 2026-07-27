import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';

class StudyProgressScreen extends StatelessWidget {
  const StudyProgressScreen({super.key});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Study Analytics & Progress',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppResponsive.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Overall Study Time Card
              Container(
                padding: EdgeInsets.all(AppResponsive.cardPadding * 1.2),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF2563EB), Color(0xFF1D4ED8), Color(0xFF0284C7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildHeaderStat('18.5 hrs', 'Total Study Time'),
                        Container(width: 1, height: 40, color: Colors.white24),
                        _buildHeaderStat('24 PDFs', 'Completed'),
                        Container(width: 1, height: 40, color: Colors.white24),
                        _buildHeaderStat('8.4 CGPA', 'Avg Performance'),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(height: AppResponsive.h(2.8)),

              // Weekly Progress Graph (Bar Visualization)
              Text(
                'Weekly Study Hours',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1.2)),
              Container(
                padding: EdgeInsets.all(AppResponsive.cardPadding),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                  border: Border.all(
                    color: isDark ? AppColors.borderDark : const Color(0xFFEEF2F7),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    _buildBar('Mon', 0.5, '2.5h', isDark),
                    _buildBar('Tue', 0.8, '4.0h', isDark),
                    _buildBar('Wed', 0.6, '3.0h', isDark),
                    _buildBar('Thu', 0.9, '4.5h', isDark),
                    _buildBar('Fri', 0.7, '3.5h', isDark),
                    _buildBar('Sat', 0.4, '2.0h', isDark),
                    _buildBar('Sun', 0.3, '1.5h', isDark),
                  ],
                ),
              ),
              SizedBox(height: AppResponsive.h(2.8)),

              // Most Read Subjects
              Text(
                'Most Studied Subjects',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1.2)),

              _buildSubjectProgress('Operating System', '8.2 hrs', 0.85, const Color(0xFF2563EB), isDark),
              _buildSubjectProgress('DBMS', '5.4 hrs', 0.65, const Color(0xFF0D9488), isDark),
              _buildSubjectProgress('Java Programming', '3.1 hrs', 0.40, const Color(0xFF8B5CF6), isDark),
              _buildSubjectProgress('Computer Networks', '1.8 hrs', 0.25, const Color(0xFFF97316), isDark),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeaderStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: const TextStyle(color: Colors.white70, fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildBar(String day, double heightFactor, String label, bool isDark) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 10,
            color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
          ),
        ),
        const SizedBox(height: 4),
        Container(
          width: 22,
          height: 100 * heightFactor,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(6),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          day,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
        ),
      ],
    );
  }

  Widget _buildSubjectProgress(
      String title, String time, double pct, Color color, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
              Text(
                time,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: pct,
              minHeight: 6,
              backgroundColor: color.withValues(alpha: 0.12),
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
