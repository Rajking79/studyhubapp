import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/services/api_service.dart';
import '../../widgets/cards/semester_card.dart';

class SemesterSelectionScreen extends StatefulWidget {
  final int year;
  final String courseId;
  const SemesterSelectionScreen({super.key, this.year = 2, this.courseId = 'btech_cs'});

  @override
  State<SemesterSelectionScreen> createState() => _SemesterSelectionScreenState();
}

class _SemesterSelectionScreenState extends State<SemesterSelectionScreen> {
  final ApiService _apiService = ApiService();
  bool _isLoading = true;
  List<Map<String, dynamic>> _semesters = [];

  @override
  void initState() {
    super.initState();
    _fetchSemesters();
  }

  Future<void> _fetchSemesters() async {
    setState(() => _isLoading = true);
    try {
      final res = await _apiService.getSemesters(courseId: widget.courseId, year: widget.year);
      if (res is List && res.isNotEmpty) {
        _semesters = res.map((e) => Map<String, dynamic>.from(e)).toList();
      } else {
        final startSem = (widget.year - 1) * 2 + 1;
        _semesters = [
          {'semesterNumber': startSem, 'label': 'Semester $startSem'},
          {'semesterNumber': startSem + 1, 'label': 'Semester ${startSem + 1}'},
        ];
      }
    } catch (_) {
      final startSem = (widget.year - 1) * 2 + 1;
      _semesters = [
        {'semesterNumber': startSem, 'label': 'Semester $startSem'},
        {'semesterNumber': startSem + 1, 'label': 'Semester ${startSem + 1}'},
      ];
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

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
                'Choose your semester for Year ${widget.year}',
                style: TextStyle(
                  fontSize: AppResponsive.bodyFontSize,
                  color: isDark
                      ? AppColors.textSecondaryDark
                      : AppColors.textSecondaryLight,
                ),
              ),
              SizedBox(height: AppResponsive.h(2.5)),
              Expanded(
                child: _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : GridView.builder(
                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: AppResponsive.semesterGridColumns,
                          crossAxisSpacing: AppResponsive.w(3.5),
                          mainAxisSpacing: AppResponsive.w(3.5),
                          childAspectRatio: AppResponsive.isTablet ? 1.35 : 1.25,
                        ),
                        itemCount: _semesters.length,
                        itemBuilder: (context, index) {
                          final sem = _semesters[index];
                          final num = sem['semesterNumber'] ?? (index + 1);
                          final label = sem['label'] ?? 'Semester $num';
                          return SemesterCard(
                            title: label.toString(),
                            onTap: () => context.push('/subjects?sem=$num&courseId=${widget.courseId}'),
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

