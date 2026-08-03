import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/services/tools_service.dart';
import '../../widgets/common/custom_button.dart';

class StudentToolsScreen extends StatefulWidget {
  const StudentToolsScreen({super.key});

  @override
  State<StudentToolsScreen> createState() => _StudentToolsScreenState();
}

class _StudentToolsScreenState extends State<StudentToolsScreen>
    with SingleTickerProviderStateMixin {
  final ToolsService _toolsService = ToolsService();
  late TabController _tabController;
  bool _isLoadingTools = true;

  // CGPA Calculator State
  final List<Map<String, dynamic>> _subjectGrades = [
    {'name': 'Operating System', 'credit': 4, 'gradePoint': 9.0},
    {'name': 'DBMS', 'credit': 4, 'gradePoint': 8.0},
    {'name': 'Java Programming', 'credit': 4, 'gradePoint': 9.0},
    {'name': 'Computer Networks', 'credit': 3, 'gradePoint': 8.0},
    {'name': 'Software Engineering', 'credit': 3, 'gradePoint': 8.5},
  ];

  // Attendance Tracker State
  int _attendedClasses = 42;
  int _totalClasses = 52;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadToolsData();
  }

  Future<void> _loadToolsData() async {
    setState(() => _isLoadingTools = true);
    try {
      final attRes = await _toolsService.getAttendanceSummary();
      if (attRes is Map && attRes.containsKey('overallPercentage')) {
        final pct = (attRes['overallPercentage'] as num).toDouble();
        _attendedClasses = (pct * 0.6).round();
        _totalClasses = 60;
      }
    } catch (_) {
    } finally {
      if (mounted) setState(() => _isLoadingTools = false);
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  double get _calculatedCgpa {
    double totalPoints = 0;
    int totalCredits = 0;
    for (var s in _subjectGrades) {
      final c = s['credit'] as int;
      final g = s['gradePoint'] as double;
      totalPoints += (c * g);
      totalCredits += c;
    }
    return totalCredits == 0 ? 0.0 : totalPoints / totalCredits;
  }

  double get _attendancePercentage {
    return _totalClasses == 0 ? 0.0 : (_attendedClasses / _totalClasses) * 100;
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Student Utility Tools',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppColors.primary,
          unselectedLabelColor: isDark
              ? AppColors.textSecondaryDark
              : AppColors.textSecondaryLight,
          indicatorColor: AppColors.primary,
          indicatorWeight: 3,
          tabs: const [
            Tab(text: 'CGPA Calculator', icon: Icon(Icons.calculate_outlined)),
            Tab(text: 'Attendance Tracker', icon: Icon(Icons.assessment_outlined)),
          ],
        ),
      ),
      body: SafeArea(
        child: _isLoadingTools
            ? const Center(child: CircularProgressIndicator())
            : TabBarView(
                controller: _tabController,
                children: [
                  // Tab 1: CGPA / SGPA Calculator
                  _buildCgpaCalculator(isDark),

                  // Tab 2: Attendance Tracker
                  _buildAttendanceTracker(isDark),
                ],
              ),
      ),
    );
  }

  Widget _buildCgpaCalculator(bool isDark) {
    final cgpa = _calculatedCgpa;
    final percentage = (cgpa * 9.5).toStringAsFixed(1);

    return SingleChildScrollView(
      padding: AppResponsive.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // CGPA Result Card
          Container(
            padding: EdgeInsets.all(AppResponsive.cardPadding * 1.2),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2563EB), Color(0xFF1D4ED8)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    Text(
                      cgpa.toStringAsFixed(2),
                      style: TextStyle(
                        fontSize: AppResponsive.titleFontSize * 1.8,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      'Estimated CGPA',
                      style: TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  ],
                ),
                Container(width: 1, height: 45, color: Colors.white30),
                Column(
                  children: [
                    Text(
                      '$percentage%',
                      style: TextStyle(
                        fontSize: AppResponsive.titleFontSize * 1.8,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 2),
                    const Text(
                      'Equivalent %',
                      style: TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  ],
                ),
              ],
            ),
          ),
          SizedBox(height: AppResponsive.h(2.5)),

          Text(
            'Subject Grades & Credits',
            style: TextStyle(
              fontSize: AppResponsive.titleFontSize,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          SizedBox(height: AppResponsive.h(1.2)),

          // Subjects List
          ..._subjectGrades.map((sub) {
            return Container(
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceDark : Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: isDark ? AppColors.borderDark : AppColors.borderLight,
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      sub['name'] as String,
                      style: TextStyle(
                        fontSize: AppResponsive.bodyFontSize,
                        fontWeight: FontWeight.w600,
                        color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                      ),
                    ),
                  ),
                  Text(
                    '${sub['credit']} Credits',
                    style: TextStyle(
                      fontSize: AppResponsive.captionFontSize,
                      color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'GP: ${sub['gradePoint']}',
                      style: TextStyle(
                        fontSize: AppResponsive.captionFontSize,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),

          SizedBox(height: AppResponsive.h(2)),
          CustomButton(
            text: 'Add Subject / Recalculate',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('CGPA calculation updated!')),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildAttendanceTracker(bool isDark) {
    final pct = _attendancePercentage;
    final isSafe = pct >= 75.0;

    return SingleChildScrollView(
      padding: AppResponsive.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Attendance Percentage Card
          Container(
            padding: EdgeInsets.all(AppResponsive.cardPadding * 1.2),
            decoration: BoxDecoration(
              color: isDark ? AppColors.surfaceDark : Colors.white,
              borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
              border: Border.all(
                color: isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                width: 1.5,
              ),
              boxShadow: isDark
                  ? []
                  : [
                      BoxShadow(
                        color: (isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444))
                            .withValues(alpha: 0.08),
                        blurRadius: 12,
                      ),
                    ],
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Overall Attendance',
                          style: TextStyle(
                            fontSize: AppResponsive.captionFontSize,
                            color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${pct.toStringAsFixed(1)}%',
                          style: TextStyle(
                            fontSize: AppResponsive.titleFontSize * 1.6,
                            fontWeight: FontWeight.bold,
                            color: isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: (isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444))
                            .withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        isSafe ? '✅ Safe (>75%)' : '⚠️ Danger (<75%)',
                        style: TextStyle(
                          fontSize: AppResponsive.captionFontSize,
                          fontWeight: FontWeight.bold,
                          color: isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: AppResponsive.h(1.5)),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(
                    value: (pct / 100).clamp(0.0, 1.0),
                    minHeight: 8,
                    backgroundColor: isDark ? AppColors.borderDark : AppColors.borderLight,
                    color: isSafe ? const Color(0xFF10B981) : const Color(0xFFEF4444),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: AppResponsive.h(3)),

          Text(
            'Update Class Log',
            style: TextStyle(
              fontSize: AppResponsive.titleFontSize,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
            ),
          ),
          SizedBox(height: AppResponsive.h(1.5)),

          // Attended Classes Counter Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Attended Classes: $_attendedClasses',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  fontWeight: FontWeight.w600,
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.remove_circle_outline_rounded),
                    onPressed: () {
                      if (_attendedClasses > 0) {
                        setState(() => _attendedClasses--);
                      }
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.add_circle_outline_rounded, color: AppColors.primary),
                    onPressed: () {
                      if (_attendedClasses < _totalClasses) {
                        setState(() => _attendedClasses++);
                      }
                    },
                  ),
                ],
              ),
            ],
          ),
          const Divider(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total Classes Held: $_totalClasses',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  fontWeight: FontWeight.w600,
                  color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                ),
              ),
              Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.remove_circle_outline_rounded),
                    onPressed: () {
                      if (_totalClasses > _attendedClasses) {
                        setState(() => _totalClasses--);
                      }
                    },
                  ),
                  IconButton(
                    icon: const Icon(Icons.add_circle_outline_rounded, color: AppColors.primary),
                    onPressed: () {
                      setState(() => _totalClasses++);
                    },
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
