import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/utils/dummy_data.dart';
import '../../providers/auth_provider.dart';
import '../../providers/college_provider.dart';
import '../../widgets/cards/college_card.dart';
import '../../widgets/common/custom_search_bar.dart';
import '../ai/ai_study_assistant_modal.dart';

class HomeDashboardScreen extends StatefulWidget {
  const HomeDashboardScreen({super.key});

  @override
  State<HomeDashboardScreen> createState() => _HomeDashboardScreenState();
}

class _HomeDashboardScreenState extends State<HomeDashboardScreen> {
  final PageController _bannerController = PageController();
  int _currentBannerIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<CollegeProvider>(context, listen: false).loadColleges();
    });
  }

  String get _dynamicGreeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final collegeProvider = Provider.of<CollegeProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final userName = authProvider.user?.name ?? 'Student';

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.smart_toy_rounded, color: Colors.white),
        label: const Text(
          'Ask StudyHub AI 🤖',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        onPressed: () => AiStudyAssistantModal.show(context),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppResponsive.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Dynamic Time-Based Greeting Row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Image.asset(
                        'assets/images/app_logo.png',
                        width: AppResponsive.avatarSize * 0.8,
                        height: AppResponsive.avatarSize * 0.8,
                        fit: BoxFit.contain,
                      ),
                      SizedBox(width: AppResponsive.w(2.5)),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(
                                '$_dynamicGreeting, $userName',
                                style: TextStyle(
                                  fontSize: AppResponsive.titleFontSize,
                                  fontWeight: FontWeight.bold,
                                  color: isDark
                                      ? AppColors.textPrimaryDark
                                      : AppColors.textPrimaryLight,
                                ),
                              ),
                              SizedBox(width: AppResponsive.w(1.5)),
                              Text('👋', style: TextStyle(fontSize: AppResponsive.titleFontSize)),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'What do you want to learn today?',
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
                  Row(
                    children: [
                      // Notification Bell
                      GestureDetector(
                        onTap: () => context.push('/notifications'),
                        child: Container(
                          width: AppResponsive.avatarSize * 0.85,
                          height: AppResponsive.avatarSize * 0.85,
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.surfaceDark : Colors.white,
                            shape: BoxShape.circle,
                            boxShadow: isDark
                                ? []
                                : [
                                    BoxShadow(
                                      color: Colors.black.withValues(alpha: 0.05),
                                      blurRadius: 10,
                                    ),
                                  ],
                          ),
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              Icon(
                                Icons.notifications_none_rounded,
                                size: AppResponsive.iconMedium,
                                color: AppColors.primary,
                              ),
                              Positioned(
                                top: AppResponsive.h(1),
                                right: AppResponsive.w(2.5),
                                child: Container(
                                  width: AppResponsive.isTablet ? 12 : 8,
                                  height: AppResponsive.isTablet ? 12 : 8,
                                  decoration: const BoxDecoration(
                                    color: AppColors.accent,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(width: AppResponsive.w(3)),
                      // Profile Avatar
                      GestureDetector(
                        onTap: () => context.push('/profile'),
                        child: CircleAvatar(
                          radius: AppResponsive.avatarSize * 0.45,
                          backgroundColor: AppColors.primary.withValues(alpha: 0.15),
                          child: Icon(
                            Icons.person_rounded,
                            color: AppColors.primary,
                            size: AppResponsive.iconMedium,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: AppResponsive.h(2.5)),

              // Search Bar
              CustomSearchBarWidget(
                readOnly: true,
                onTap: () => context.push('/search'),
              ),
              SizedBox(height: AppResponsive.h(2.8)),

              // Banner Carousel
              SizedBox(
                height: AppResponsive.bannerHeight,
                child: PageView.builder(
                  controller: _bannerController,
                  onPageChanged: (idx) => setState(() => _currentBannerIndex = idx),
                  itemCount: DummyData.getBanners().length,
                  itemBuilder: (context, idx) {
                    final banner = DummyData.getBanners()[idx];
                    return Container(
                      margin: const EdgeInsets.only(right: 6),
                      padding: EdgeInsets.all(AppResponsive.cardPadding),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                        gradient: LinearGradient(
                          colors: banner.gradientColors
                              .map((c) => Color(c))
                              .toList(),
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        boxShadow: isDark
                            ? []
                            : [
                                BoxShadow(
                                  color: Color(banner.gradientColors.first).withValues(alpha: 0.35),
                                  blurRadius: 16,
                                  offset: const Offset(0, 6),
                                ),
                              ],
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  banner.title,
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontSize: AppResponsive.titleFontSize,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                SizedBox(height: AppResponsive.h(0.8)),
                                Text(
                                  banner.subtitle,
                                  style: TextStyle(
                                    color: Colors.white70,
                                    fontSize: AppResponsive.captionFontSize,
                                  ),
                                ),
                                SizedBox(height: AppResponsive.h(1.5)),
                                Container(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: AppResponsive.w(3.5), vertical: AppResponsive.h(0.8)),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withValues(alpha: 0.25),
                                    borderRadius: BorderRadius.circular(20),
                                  ),
                                  child: Text(
                                    banner.actionText,
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: AppResponsive.captionFontSize,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Icon(
                            Icons.school_rounded,
                            size: AppResponsive.isTablet ? 100 : 70,
                            color: Colors.white24,
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              SizedBox(height: AppResponsive.h(1.2)),

              // Banner Page Indicator Dots
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  DummyData.getBanners().length,
                  (index) => AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: _currentBannerIndex == index ? 20 : 7,
                    height: 7,
                    decoration: BoxDecoration(
                      color: _currentBannerIndex == index
                          ? AppColors.primary
                          : (isDark
                              ? AppColors.borderDark
                              : AppColors.borderLight),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),

              // 📖 Continue Reading Section
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(AppResponsive.cardPadding),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                  border: Border.all(
                    color: isDark ? AppColors.borderDark : const Color(0xFFEEF2F7),
                    width: 1.2,
                  ),
                  boxShadow: isDark
                      ? []
                      : [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.04),
                            blurRadius: 14,
                            offset: const Offset(0, 3),
                          ),
                        ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.menu_book_rounded,
                              color: AppColors.primary,
                              size: 20,
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Continue Reading',
                              style: TextStyle(
                                fontSize: AppResponsive.bodyFontSize,
                                fontWeight: FontWeight.bold,
                                color: isDark
                                    ? AppColors.textPrimaryDark
                                    : AppColors.textPrimaryLight,
                              ),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text(
                            '62% Completed',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Operating System - Unit 2 Notes.pdf',
                                style: TextStyle(
                                  fontSize: AppResponsive.captionFontSize * 1.05,
                                  fontWeight: FontWeight.w600,
                                  color: isDark
                                      ? AppColors.textPrimaryDark
                                      : AppColors.textPrimaryLight,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                'Page 42 of 68 • B.Tech CSE Year 2',
                                style: TextStyle(
                                  fontSize: AppResponsive.captionFontSize * 0.9,
                                  color: isDark
                                      ? AppColors.textMutedDark
                                      : AppColors.textMutedLight,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(width: 10),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          onPressed: () => context.push('/pdf-viewer?title=Operating System - Unit 2 Notes.pdf'),
                          child: const Text('Resume', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: 0.62,
                        backgroundColor: AppColors.primary.withValues(alpha: 0.12),
                        color: AppColors.primary,
                        minHeight: 5,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: AppResponsive.h(3)),

              // Quick Access Grid Header
              Text(
                'Quick Access',
                style: TextStyle(
                  fontSize: AppResponsive.titleFontSize,
                  fontWeight: FontWeight.bold,
                  color: isDark
                      ? AppColors.textPrimaryDark
                      : AppColors.textPrimaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(1.8)),

              // Quick Access Grid Items
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: AppResponsive.isTablet ? 4 : 3,
                mainAxisSpacing: AppResponsive.w(3),
                crossAxisSpacing: AppResponsive.w(3),
                childAspectRatio: AppResponsive.isTablet ? 1.2 : 1.05,
                children: [
                  _buildQuickAccessItem(
                    context,
                    'Snap & Solve 📷',
                    Icons.camera_enhance_rounded,
                    const Color(0xFF4F6BFF),
                    () => context.push('/snap-solve'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'Previous Papers 📄',
                    Icons.description_outlined,
                    const Color(0xFF0D9488),
                    () => context.push('/courses'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'Notes 📝',
                    Icons.sticky_note_2_outlined,
                    const Color(0xFFF97316),
                    () => context.push('/courses'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'Books 📚',
                    Icons.menu_book_rounded,
                    const Color(0xFFEC4899),
                    () => context.push('/courses'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'Study Analytics 📊',
                    Icons.insights_rounded,
                    const Color(0xFF2563EB),
                    () => context.push('/progress'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'CGPA & Tools 🧮',
                    Icons.calculate_rounded,
                    const Color(0xFF8B5CF6),
                    () => context.push('/tools'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'My Downloads ⬇️',
                    Icons.file_download_outlined,
                    const Color(0xFF10B981),
                    () => context.push('/downloads'),
                  ),
                  _buildQuickAccessItem(
                    context,
                    'Favorites ⭐',
                    Icons.bookmark_outline_rounded,
                    const Color(0xFFEAB308),
                    () => context.push('/favorites'),
                  ),
                ],
              ),
              SizedBox(height: AppResponsive.h(3.2)),

              // Featured Colleges Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Featured Colleges',
                    style: TextStyle(
                      fontSize: AppResponsive.titleFontSize,
                      fontWeight: FontWeight.bold,
                      color: isDark
                          ? AppColors.textPrimaryDark
                          : AppColors.textPrimaryLight,
                    ),
                  ),
                  TextButton(
                    onPressed: () => context.push('/colleges'),
                    child: Text(
                      'View All',
                      style: TextStyle(
                        fontSize: AppResponsive.bodyFontSize,
                        fontWeight: FontWeight.w600,
                        color: AppColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: AppResponsive.h(1.2)),

              // Colleges List
              ...collegeProvider.colleges.take(3).map(
                    (college) => CollegeCard(
                      college: college,
                      onTap: () => context.push('/courses'),
                      onBookmarkToggle: () {
                        collegeProvider.toggleBookmark(college.id);
                      },
                    ),
                  ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickAccessItem(
    BuildContext context,
    String label,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.surfaceDark : Colors.white,
          borderRadius: BorderRadius.circular(AppResponsive.cardRadius * 0.9),
          boxShadow: isDark
              ? []
              : [
                  BoxShadow(
                    color: color.withValues(alpha: 0.08),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
          border: isDark
              ? null
              : Border.all(
                  color: AppColors.borderLight,
                ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(AppResponsive.w(2.5)),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: AppResponsive.iconMedium),
            ),
            SizedBox(height: AppResponsive.h(1)),
            Text(
              label,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: AppResponsive.captionFontSize * 0.95,
                fontWeight: FontWeight.w600,
                color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
