import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../widgets/common/status_chip.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  String _selectedFilter = 'All';
  final List<String> _filters = ['All', 'Notices', 'Exams', 'New Uploads'];

  final List<Map<String, dynamic>> _notifications = [
    {
      'title': 'End-Sem Examination Datesheet Released',
      'category': 'Exams',
      'time': '10 mins ago',
      'description': 'Delhi University has released the official datesheet for May 2026 End-Sem exams.',
      'isUnread': true,
      'icon': Icons.event_note_rounded,
      'color': Color(0xFF2563EB),
    },
    {
      'title': 'New OS Unit-3 Handwritten Notes Uploaded',
      'category': 'New Uploads',
      'time': '2 hours ago',
      'description': 'Operating System Unit 3 Process Synchronization notes are now available.',
      'isUnread': true,
      'icon': Icons.file_present_rounded,
      'color': Color(0xFF0D9488),
    },
    {
      'title': 'Scholarship Portal Registration Open',
      'category': 'Notices',
      'time': '1 day ago',
      'description': 'Merit scholarship applications for 2026 session are now open for B.Tech & BCA students.',
      'isUnread': false,
      'icon': Icons.campaign_rounded,
      'color': Color(0xFFF97316),
    },
    {
      'title': 'DBMS Previous Year Papers (2024) Solved PDF',
      'category': 'New Uploads',
      'time': '2 days ago',
      'description': 'Solved model paper with 2024 university exam solutions has been added.',
      'isUnread': false,
      'icon': Icons.description_outlined,
      'color': Color(0xFF8B5CF6),
    },
  ];

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final filteredList = _selectedFilter == 'All'
        ? _notifications
        : _notifications.where((n) => n['category'] == _selectedFilter).toList();

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Notifications & Notices',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          TextButton(
            onPressed: () {
              setState(() {
                for (var n in _notifications) {
                  n['isUnread'] = false;
                }
              });
            },
            child: const Text('Mark All Read'),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Filter Bar
            SizedBox(
              height: AppResponsive.buttonHeight,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(
                    horizontal: AppResponsive.horizontalPadding, vertical: 6),
                itemCount: _filters.length,
                itemBuilder: (context, index) {
                  final filter = _filters[index];
                  final isSelected = _selectedFilter == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: StatusChip(
                      label: filter,
                      isSelected: isSelected,
                      onTap: () {
                        setState(() => _selectedFilter = filter);
                      },
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: AppResponsive.h(1)),

            // Notifications List
            Expanded(
              child: filteredList.isEmpty
                  ? Center(
                      child: Text(
                        'No notifications in this category',
                        style: TextStyle(
                          fontSize: AppResponsive.bodyFontSize,
                          color: isDark
                              ? AppColors.textMutedDark
                              : AppColors.textMutedLight,
                        ),
                      ),
                    )
                  : ListView.builder(
                      padding: AppResponsive.screenPadding,
                      itemCount: filteredList.length,
                      itemBuilder: (context, index) {
                        final item = filteredList[index];
                        final isUnread = item['isUnread'] as bool;
                        final color = item['color'] as Color;

                        return Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          padding: EdgeInsets.all(AppResponsive.cardPadding),
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.surfaceDark : Colors.white,
                            borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                            border: Border.all(
                              color: isUnread
                                  ? color.withValues(alpha: 0.5)
                                  : (isDark ? AppColors.borderDark : AppColors.borderLight),
                              width: isUnread ? 1.5 : 1.0,
                            ),
                            boxShadow: isDark
                                ? []
                                : [
                                    BoxShadow(
                                      color: Colors.black.withValues(alpha: 0.04),
                                      blurRadius: 10,
                                      offset: const Offset(0, 3),
                                    ),
                                  ],
                          ),
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: EdgeInsets.all(AppResponsive.w(2.5)),
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
                              SizedBox(width: AppResponsive.w(3.5)),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Expanded(
                                          child: Text(
                                            item['title'] as String,
                                            style: TextStyle(
                                              fontSize: AppResponsive.bodyFontSize,
                                              fontWeight: isUnread
                                                  ? FontWeight.bold
                                                  : FontWeight.w600,
                                              color: isDark
                                                  ? AppColors.textPrimaryDark
                                                  : AppColors.textPrimaryLight,
                                            ),
                                          ),
                                        ),
                                        if (isUnread)
                                          Container(
                                            margin: const EdgeInsets.only(left: 6),
                                            width: 8,
                                            height: 8,
                                            decoration: BoxDecoration(
                                              color: color,
                                              shape: BoxShape.circle,
                                            ),
                                          ),
                                      ],
                                    ),
                                    const SizedBox(height: 4),
                                    Text(
                                      item['description'] as String,
                                      style: TextStyle(
                                        fontSize: AppResponsive.captionFontSize,
                                        color: isDark
                                            ? AppColors.textSecondaryDark
                                            : AppColors.textSecondaryLight,
                                        height: 1.3,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      item['time'] as String,
                                      style: TextStyle(
                                        fontSize: AppResponsive.captionFontSize * 0.85,
                                        color: isDark
                                            ? AppColors.textMutedDark
                                            : AppColors.textMutedLight,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
