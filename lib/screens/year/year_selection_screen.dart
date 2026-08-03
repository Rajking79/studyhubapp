import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../core/services/api_service.dart';
import '../../widgets/cards/year_card.dart';

class YearSelectionScreen extends StatefulWidget {
  final String courseName;
  final String courseId;
  const YearSelectionScreen({super.key, this.courseName = 'B.Tech', this.courseId = 'btech_cs'});

  @override
  State<YearSelectionScreen> createState() => _YearSelectionScreenState();
}

class _YearSelectionScreenState extends State<YearSelectionScreen> {
  final ApiService _apiService = ApiService();
  bool _isLoading = true;
  List<Map<String, dynamic>> _years = [];

  @override
  void initState() {
    super.initState();
    _fetchYears();
  }

  Future<void> _fetchYears() async {
    setState(() => _isLoading = true);
    try {
      final res = await _apiService.getYears(courseId: widget.courseId);
      if (res is List && res.isNotEmpty) {
        _years = res.map((e) => Map<String, dynamic>.from(e)).toList();
      } else {
        _years = [
          {'yearNumber': 1, 'label': '1st Year'},
          {'yearNumber': 2, 'label': '2nd Year'},
          {'yearNumber': 3, 'label': '3rd Year'},
          {'yearNumber': 4, 'label': '4th Year'},
        ];
      }
    } catch (_) {
      _years = [
        {'yearNumber': 1, 'label': '1st Year'},
        {'yearNumber': 2, 'label': '2nd Year'},
        {'yearNumber': 3, 'label': '3rd Year'},
        {'yearNumber': 4, 'label': '4th Year'},
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
                'Choose your studying year for ${widget.courseName}',
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
                    : ListView.builder(
                        itemCount: _years.length,
                        itemBuilder: (context, index) {
                          final y = _years[index];
                          final num = y['yearNumber'] ?? (index + 1);
                          final label = y['label'] ?? '$num Year';
                          return YearCard(
                            yearIndex: num is int ? num : int.tryParse(num.toString()) ?? (index + 1),
                            title: label.toString(),
                            onTap: () => context.push('/semesters?year=$num&courseId=${widget.courseId}'),
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

