import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../widgets/cards/year_card.dart';

class YearSelectionScreen extends StatelessWidget {
  final String courseName;
  const YearSelectionScreen({super.key, this.courseName = 'B.Tech'});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Select Year',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: AppResponsive.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Choose your studying year for $courseName',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),
              Expanded(
                child: ListView(
                  children: [
                    YearCard(
                      yearIndex: 1,
                      title: '1st Year',
                      onTap: () => context.push('/semesters?year=1'),
                    ),
                    YearCard(
                      yearIndex: 2,
                      title: '2nd Year',
                      onTap: () => context.push('/semesters?year=2'),
                    ),
                    YearCard(
                      yearIndex: 3,
                      title: '3rd Year',
                      onTap: () => context.push('/semesters?year=3'),
                    ),
                    YearCard(
                      yearIndex: 4,
                      title: '4th Year',
                      onTap: () => context.push('/semesters?year=4'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
