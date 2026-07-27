import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

// ============================================================================
// SCREEN 1: ONBOARDING HERO MOTION (250x250)
// ============================================================================
class OnboardingHeroMotion extends StatefulWidget {
  final int slideIndex;
  const OnboardingHeroMotion({super.key, this.slideIndex = 0});

  @override
  State<OnboardingHeroMotion> createState() => _OnboardingHeroMotionState();
}

class _OnboardingHeroMotionState extends State<OnboardingHeroMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final val = _controller.value;
        final floatOffset = math.sin(val * math.pi) * 6.0;

        return SizedBox(
          width: 250,
          height: 250,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Subtle Glow Circle
              Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary.withValues(alpha: 0.08 + (val * 0.05)),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withValues(alpha: 0.15),
                      blurRadius: 30,
                      spreadRadius: 5,
                    ),
                  ],
                ),
              ),

              // Breathing Student / Logo Illustration
              Transform.translate(
                offset: Offset(0, -floatOffset),
                child: widget.slideIndex == 0
                    ? Image.asset(
                        'assets/images/app_logo.png',
                        width: 210,
                        height: 210,
                        fit: BoxFit.contain,
                      )
                    : Icon(
                        widget.slideIndex == 1
                            ? Icons.menu_book_rounded
                            : Icons.download_for_offline_rounded,
                        size: 110,
                        color: AppColors.primary,
                      ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 2: HOME DASHBOARD BANNER MOTION (160x160)
// ============================================================================
class HomeBannerMotion extends StatefulWidget {
  const HomeBannerMotion({super.key});

  @override
  State<HomeBannerMotion> createState() => _HomeBannerMotionState();
}

class _HomeBannerMotionState extends State<HomeBannerMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2600),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final val = _controller.value;
        final floatY = math.sin(val * math.pi) * 4.0;

        return Transform.translate(
          offset: Offset(0, -floatY),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Icon(
                Icons.school_rounded,
                size: 75,
                color: Colors.white.withValues(alpha: 0.22),
              ),
              Positioned(
                top: 15,
                right: 10,
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: Colors.amber,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.amber.withValues(alpha: 0.6),
                        blurRadius: 8,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 3: COLLEGE LIST HEADER MOTION (100x100)
// ============================================================================
class CollegeHeaderMotion extends StatefulWidget {
  const CollegeHeaderMotion({super.key});

  @override
  State<CollegeHeaderMotion> createState() => _CollegeHeaderMotionState();
}

class _CollegeHeaderMotionState extends State<CollegeHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 3.0;

        return SizedBox(
          width: 90,
          height: 90,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Transform.translate(
                offset: Offset(0, -floatY),
                child: const Icon(
                  Icons.account_balance_rounded,
                  size: 50,
                  color: AppColors.primary,
                ),
              ),
              Positioned(
                top: 10,
                right: 15,
                child: Transform.translate(
                  offset: Offset(0, floatY),
                  child: const Icon(
                    Icons.location_on_rounded,
                    size: 20,
                    color: Color(0xFFEF4444),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 4: COURSE SELECTION HEADER MOTION (100x100)
// ============================================================================
class CourseHeaderMotion extends StatefulWidget {
  const CourseHeaderMotion({super.key});

  @override
  State<CourseHeaderMotion> createState() => _CourseHeaderMotionState();
}

class _CourseHeaderMotionState extends State<CourseHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3200),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * math.pi * 2,
          child: Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.primary.withValues(alpha: 0.3),
                width: 2,
              ),
            ),
            child: const Center(
              child: Icon(
                Icons.auto_awesome_mosaic_rounded,
                size: 40,
                color: AppColors.primary,
              ),
            ),
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 5: YEAR SELECTION HEADER MOTION (100x100)
// ============================================================================
class YearHeaderMotion extends StatefulWidget {
  const YearHeaderMotion({super.key});

  @override
  State<YearHeaderMotion> createState() => _YearHeaderMotionState();
}

class _YearHeaderMotionState extends State<YearHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2400),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 5.0;

        return Transform.translate(
          offset: Offset(0, -floatY),
          child: const Icon(
            Icons.military_tech_rounded,
            size: 55,
            color: Color(0xFFF59E0B),
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 6: SEMESTER SELECTION HEADER MOTION (100x100)
// ============================================================================
class SemesterHeaderMotion extends StatefulWidget {
  const SemesterHeaderMotion({super.key});

  @override
  State<SemesterHeaderMotion> createState() => _SemesterHeaderMotionState();
}

class _SemesterHeaderMotionState extends State<SemesterHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2800),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final val = _controller.value;
        return Transform.scale(
          scale: 0.95 + (val * 0.1),
          child: const Icon(
            Icons.alt_route_rounded,
            size: 50,
            color: AppColors.primary,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 7: SUBJECT LIST HEADER MOTION (100x100)
// ============================================================================
class SubjectHeaderMotion extends StatefulWidget {
  const SubjectHeaderMotion({super.key});

  @override
  State<SubjectHeaderMotion> createState() => _SubjectHeaderMotionState();
}

class _SubjectHeaderMotionState extends State<SubjectHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 4.0;
        return Transform.translate(
          offset: Offset(0, -floatY),
          child: const Icon(
            Icons.code_rounded,
            size: 48,
            color: AppColors.primary,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 8: SUBJECT DETAILS HEADER MOTION (120x120)
// ============================================================================
class SubjectDetailsHeaderMotion extends StatefulWidget {
  const SubjectDetailsHeaderMotion({super.key});

  @override
  State<SubjectDetailsHeaderMotion> createState() =>
      _SubjectDetailsHeaderMotionState();
}

class _SubjectDetailsHeaderMotionState
    extends State<SubjectDetailsHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 4.0;
        return Transform.translate(
          offset: Offset(0, -floatY),
          child: const Icon(
            Icons.developer_board_rounded,
            size: 60,
            color: Colors.white70,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 9: PREVIOUS YEAR PAPERS HEADER MOTION (100x100)
// ============================================================================
class PapersHeaderMotion extends StatefulWidget {
  const PapersHeaderMotion({super.key});

  @override
  State<PapersHeaderMotion> createState() => _PapersHeaderMotionState();
}

class _PapersHeaderMotionState extends State<PapersHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2200),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 4.0;
        return Transform.translate(
          offset: Offset(0, -floatY),
          child: const Icon(
            Icons.assignment_turned_in_rounded,
            size: 50,
            color: AppColors.primary,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 10: NOTES & BOOKS HEADER MOTION (100x100)
// ============================================================================
class NotesHeaderMotion extends StatefulWidget {
  const NotesHeaderMotion({super.key});

  @override
  State<NotesHeaderMotion> createState() => _NotesHeaderMotionState();
}

class _NotesHeaderMotionState extends State<NotesHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2700),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 4.0;
        return Transform.translate(
          offset: Offset(0, -floatY),
          child: const Icon(
            Icons.library_books_rounded,
            size: 50,
            color: AppColors.primary,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 11: PDF VIEWER LOADING MOTION (ONLY WHILE LOADING)
// ============================================================================
class PdfLoadingMotion extends StatefulWidget {
  const PdfLoadingMotion({super.key});

  @override
  State<PdfLoadingMotion> createState() => _PdfLoadingMotionState();
}

class _PdfLoadingMotionState extends State<PdfLoadingMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                width: 50,
                height: 50,
                child: CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
                  strokeWidth: 3.5,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Opening PDF Document...',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 12: DOWNLOADS HEADER MOTION (100x100)
// ============================================================================
class DownloadsHeaderMotion extends StatefulWidget {
  const DownloadsHeaderMotion({super.key});

  @override
  State<DownloadsHeaderMotion> createState() => _DownloadsHeaderMotionState();
}

class _DownloadsHeaderMotionState extends State<DownloadsHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 3.5;
        return Transform.translate(
          offset: Offset(0, floatY),
          child: const Icon(
            Icons.cloud_download_rounded,
            size: 45,
            color: AppColors.primary,
          ),
        );
      },
    );
  }
}

// ============================================================================
// SCREEN 13: PROFILE HEADER MOTION (100x100)
// ============================================================================
class ProfileHeaderMotion extends StatefulWidget {
  const ProfileHeaderMotion({super.key});

  @override
  State<ProfileHeaderMotion> createState() => _ProfileHeaderMotionState();
}

class _ProfileHeaderMotionState extends State<ProfileHeaderMotion>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final floatY = math.sin(_controller.value * math.pi) * 4.0;
        return Transform.translate(
          offset: Offset(0, -floatY),
          child: Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: Colors.amber.withValues(alpha: 0.5 + (_controller.value * 0.5)),
                width: 2,
              ),
            ),
            child: const Icon(
              Icons.emoji_events_rounded,
              size: 24,
              color: Colors.amber,
            ),
          ),
        );
      },
    );
  }
}
