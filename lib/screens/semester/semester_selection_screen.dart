import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../widgets/cards/semester_card.dart';

class SemesterSelectionScreen extends StatelessWidget {
  final int year;
  const SemesterSelectionScreen({super.key, this.year = 2});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Select Semester',
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
                'Choose your semester for Year $year',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),
              Expanded(
                child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: AppResponsive.semesterGridColumns,
                    crossAxisSpacing: AppResponsive.w(3.5),
                    mainAxisSpacing: AppResponsive.w(3.5),
                    childAspectRatio: AppResponsive.isTablet ? 1.35 : 1.25,
                  ),
                  itemCount: 8,
                  itemBuilder: (context, index) {
                    final semNumber = index + 1;
                    return SemesterCard(
                      title: 'Semester $semNumber',
                      onTap: () => context.push('/subjects?sem=$semNumber'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
