import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<Map<String, String>> _slides = [
    {
      'title': 'All Study Materials',
      'subtitle':
          'Notes, Books, Guides and Previous Papers – All In One Place for engineering, commerce, arts & science students.',
      'icon': 'school',
    },
    {
      'title': 'Verified Question Papers',
      'subtitle':
          'Access end-semester, mid-semester, and backlog papers from top universities across India with step-by-step solutions.',
      'icon': 'menu_book',
    },
    {
      'title': 'Offline Reading Anywhere',
      'subtitle':
          'Download PDF notes once and study offline seamlessly without worrying about network connectivity.',
      'icon': 'download_for_offline',
    },
  ];

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar with Skip
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: AppResponsive.horizontalPadding * 1.2,
                  vertical: AppResponsive.verticalPadding * 0.8),
              child: Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => context.go('/login'),
                  child: Text(
                    'Skip',
                    style: TextStyle(
                      fontSize: AppResponsive.bodyFontSize,
                      fontWeight: FontWeight.w600,
                      color: AppColors.primary,
                    ),
                  ),
                ),
              ),
            ),
            // Page View
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) {
                  setState(() => _currentPage = index);
                },
                itemCount: _slides.length,
                itemBuilder: (context, index) {
                  final slide = _slides[index];
                  return Padding(
                    padding: EdgeInsets.symmetric(horizontal: AppResponsive.w(8)),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Transparent 3D Logo Asset
                        Container(
                          width: AppResponsive.w(50),
                          height: AppResponsive.w(50),
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.surfaceDark : Colors.white,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: AppColors.primary.withValues(alpha: 0.15),
                                blurRadius: 24,
                                offset: const Offset(0, 8),
                              ),
                            ],
                          ),
                          child: Icon(
                            index == 0
                                ? Icons.school_rounded
                                : (index == 1
                                    ? Icons.menu_book_rounded
                                    : Icons.download_for_offline_rounded),
                            size: AppResponsive.w(22),
                            color: AppColors.primary,
                          ),
                        ),
                        SizedBox(height: AppResponsive.h(6)),
                        Text(
                          slide['title']!,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: AppResponsive.headingFontSize,
                            fontWeight: FontWeight.bold,
                            color: isDark
                                ? AppColors.textPrimaryDark
                                : AppColors.textPrimaryLight,
                          ),
                        ),
                        SizedBox(height: AppResponsive.h(2)),
                        Text(
                          slide['subtitle']!,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: AppResponsive.bodyFontSize,
                            height: 1.5,
                            color: isDark
                                ? AppColors.textSecondaryDark
                                : AppColors.textSecondaryLight,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            // Bottom Indicator & Next Button
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: AppResponsive.w(8), vertical: AppResponsive.h(4)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Page Indicators
                  Row(
                    children: List.generate(
                      _slides.length,
                      (i) => AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        margin: const EdgeInsets.only(right: 8),
                        width: _currentPage == i ? 24 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: _currentPage == i
                              ? AppColors.primary
                              : const Color(0xFFCBD5E1),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                    ),
                  ),
                  // Next / Get Started Floating Button
                  GestureDetector(
                    onTap: () {
                      if (_currentPage < _slides.length - 1) {
                        _pageController.nextPage(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeInOut,
                        );
                      } else {
                        context.go('/login');
                      }
                    },
                    child: Container(
                      width: AppResponsive.buttonHeight * 1.1,
                      height: AppResponsive.buttonHeight * 1.1,
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppColors.primary.withValues(alpha: 0.35),
                            blurRadius: 14,
                            offset: const Offset(0, 6),
                          ),
                        ],
                      ),
                      child: Icon(
                        Icons.arrow_forward_rounded,
                        color: Colors.white,
                        size: AppResponsive.iconMedium,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
