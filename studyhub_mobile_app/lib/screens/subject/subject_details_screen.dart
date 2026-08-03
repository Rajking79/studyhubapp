import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/app_styles.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/study_material_provider.dart';

class SubjectDetailsScreen extends StatelessWidget {
  final String subjectId;
  const SubjectDetailsScreen({super.key, this.subjectId = 'os'});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final materialProvider = Provider.of<StudyMaterialProvider>(context);
    final subject = materialProvider.selectedSubject;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final subjectTitle = subject?.title ?? 'Operating System';
    final dept = subject?.department ?? 'Computer Science';
    final materialsCount = subject?.materialCount ?? 45;
    final downloads = '12.5K';
    final rating = subject?.rating ?? 4.6;

    final List<Map<String, dynamic>> gridItems = [
      {
        'title': 'Previous Papers',
        'icon': Icons.description_outlined,
        'color': const Color(0xFF2563EB),
        'route': '/papers',
      },
      {
        'title': 'Lecture Notes',
        'icon': Icons.sticky_note_2_outlined,
        'color': const Color(0xFF0D9488),
        'route': '/notes',
      },
      {
        'title': 'Reference Books',
        'icon': Icons.menu_book_rounded,
        'color': const Color(0xFF8B5CF6),
        'route': '/notes',
      },
      {
        'title': 'Study Guides',
        'icon': Icons.explore_outlined,
        'color': const Color(0xFFF97316),
        'route': '/notes',
      },
      {
        'title': 'Syllabus',
        'icon': Icons.assignment_outlined,
        'color': const Color(0xFFEC4899),
        'route': '/notes',
      },
      {
        'title': 'Question Bank',
        'icon': Icons.quiz_outlined,
        'color': const Color(0xFF10B981),
        'route': '/papers',
      },
    ];

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Subject Details',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.bookmark_border_rounded),
            onPressed: () {},
          ),
        ],
      ),
      body: SafeArea(
        child: materialProvider.isLoading
            ? const Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                padding: AppResponsive.screenPadding,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
              // 1. Gradient Subject Header Card (Overview Top)
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(AppResponsive.cardPadding * 1.2),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                  gradient: const LinearGradient(
                    colors: [Color(0xFF2563EB), Color(0xFF1D4ED8), Color(0xFF0284C7)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: isDark
                      ? []
                      : [
                          BoxShadow(
                            color: const Color(0xFF2563EB).withValues(alpha: 0.35),
                            blurRadius: 18,
                            offset: const Offset(0, 6),
                          ),
                        ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: EdgeInsets.all(AppResponsive.w(2.5)),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(AppResponsive.cardRadius * 0.7),
                          ),
                          child: Icon(
                            Icons.desktop_windows_rounded,
                            color: Colors.white,
                            size: AppResponsive.iconMedium,
                          ),
                        ),
                        SizedBox(width: AppResponsive.w(3.5)),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                subjectTitle,
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: AppResponsive.titleFontSize * 1.1,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                dept,
                                style: TextStyle(
                                  color: Colors.white70,
                                  fontSize: AppResponsive.captionFontSize,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: AppResponsive.h(2.5)),
                    // Stats Row
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: AppResponsive.w(4),
                        vertical: AppResponsive.h(1.2),
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(AppResponsive.cardRadius * 0.8),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildStatColumn('$materialsCount', 'Materials'),
                          Container(width: 1, height: AppResponsive.h(3), color: Colors.white24),
                          _buildStatColumn(downloads, 'Downloads'),
                          Container(width: 1, height: AppResponsive.h(3), color: Colors.white24),
                          _buildStatColumn('$rating', 'Rating'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),

              // 2. Overview Section: About Subject
              Text(
                'About Subject',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1)),
              Text(
                'Operating System is a core subject in computer science that deals with the management of hardware and software resources and provides common services for computer programs.',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  height: 1.5,
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),

              // 3. Instructor Info
              Text(
                'Teacher / Instructor',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1.5)),
              Row(
                children: [
                  CircleAvatar(
                    radius: AppResponsive.avatarSize * 0.45,
                    backgroundColor: AppColors.primary.withValues(alpha: 0.15),
                    child: Icon(
                      Icons.person,
                      color: AppColors.primary,
                      size: AppResponsive.iconMedium,
                    ),
                  ),
                  SizedBox(width: AppResponsive.w(3.5)),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Dr. Rajesh Kumar',
                        style: TextStyle(
                          fontSize: AppResponsive.bodyFontSize,
                          fontWeight: FontWeight.bold,
                          color: isDark
                              ? AppColors.textPrimaryDark
                              : AppColors.textPrimaryLight,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Associate Professor',
                        style: TextStyle(
                          fontSize: AppResponsive.captionFontSize,
                          color: isDark
                              ? AppColors.textSecondaryDark
                              : AppColors.textSecondaryLight,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: AppResponsive.h(3)),

              // 4. Grid Section for Classic Resource Cards
              Text(
                'Study Materials & Resources',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1.5)),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: AppResponsive.semesterGridColumns,
                  crossAxisSpacing: AppResponsive.w(3.5),
                  mainAxisSpacing: AppResponsive.w(3.5),
                  childAspectRatio: AppResponsive.isTablet ? 1.35 : 1.2,
                ),
                itemCount: gridItems.length,
                itemBuilder: (context, index) {
                  final item = gridItems[index];
                  final color = item['color'] as Color;
                  return Container(
                    decoration: AppStyles.cardDecoration(context: context),
                    child: Material(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                        onTap: () => context.push(item['route']),
                        child: Padding(
                          padding: AppResponsive.cardInsets,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                padding: EdgeInsets.all(AppResponsive.w(3)),
                                decoration: BoxDecoration(
                                  color: color.withValues(alpha: 0.12),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(
                                  item['icon'] as IconData,
                                  color: color,
                                  size: AppResponsive.iconMedium,
                                ),
                              ),
                              SizedBox(height: AppResponsive.h(1.2)),
                              Text(
                                item['title'] as String,
                                textAlign: TextAlign.center,
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
                },
              ),
              SizedBox(height: AppResponsive.h(2)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatColumn(String val, String label) {
    return Column(
      children: [
        Text(
          val,
          style: TextStyle(
            color: Colors.white,
            fontSize: AppResponsive.titleFontSize,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            color: Colors.white70,
            fontSize: AppResponsive.captionFontSize * 0.9,
          ),
        ),
      ],
    );
  }
}
