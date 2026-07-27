import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';

class VideoLecturesScreen extends StatefulWidget {
  const VideoLecturesScreen({super.key});

  @override
  State<VideoLecturesScreen> createState() => _VideoLecturesScreenState();
}

class _VideoLecturesScreenState extends State<VideoLecturesScreen> {
  int _selectedCategoryIndex = 0;
  final List<String> _categories = ['All Videos', 'Operating System', 'DBMS', 'Data Structures', 'Algorithms'];

  final List<Map<String, String>> _videos = [
    {
      'title': 'Operating System Complete One-Shot Video Lecture',
      'duration': '3h 45m',
      'instructor': 'Prof. Ankit Sharma',
      'views': '42K views',
      'subject': 'Operating System',
      'thumbnail': '💻',
    },
    {
      'title': 'DBMS SQL Queries & Normalization One Shot',
      'duration': '2h 30m',
      'instructor': 'Dr. Meenakshi Sundaram',
      'views': '38K views',
      'subject': 'DBMS',
      'thumbnail': '🗄️',
    },
    {
      'title': 'Data Structures & Algorithms Full Course (B.Tech)',
      'duration': '5h 15m',
      'instructor': 'Tech Academy',
      'views': '89K views',
      'subject': 'Data Structures',
      'thumbnail': '⚡',
    },
    {
      'title': 'Computer Networks Protocols & OSI Model Explained',
      'duration': '1h 50m',
      'instructor': 'Prof. Rajesh Verma',
      'views': '29K views',
      'subject': 'Computer Networks',
      'thumbnail': '🌐',
    },
  ];

  void _playVideo(Map<String, String> video) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Text(video['title']!),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              height: 180,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.black87,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Text(
                    video['thumbnail']!,
                    style: const TextStyle(fontSize: 48),
                  ),
                  const CircleAvatar(
                    radius: 28,
                    backgroundColor: AppColors.primary,
                    child: Icon(Icons.play_arrow_rounded, color: Colors.white, size: 36),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Instructor: ${video['instructor']}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                Text(video['duration']!, style: const TextStyle(fontSize: 12, color: Colors.grey)),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close Player'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final filteredVideos = _selectedCategoryIndex == 0
        ? _videos
        : _videos.where((v) => v['subject'] == _categories[_selectedCategoryIndex]).toList();

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: Row(
          children: const [
            Icon(Icons.play_circle_fill_rounded, color: AppColors.error),
            SizedBox(width: 8),
            Text('Video Lectures 🎥', style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Category Filter Bar
            SizedBox(
              height: 48,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _categories.length,
                itemBuilder: (context, index) {
                  final isSelected = _selectedCategoryIndex == index;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedCategoryIndex = index),
                    child: Container(
                      margin: const EdgeInsets.only(right: 8),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : (isDark ? AppColors.surfaceDark : Colors.white),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isSelected ? AppColors.primary : (isDark ? AppColors.borderDark : AppColors.borderLight),
                        ),
                      ),
                      child: Center(
                        child: Text(
                          _categories[index],
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w600,
                            color: isSelected
                                ? Colors.white
                                : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 10),

            // Video Cards List
            Expanded(
              child: ListView.builder(
                padding: AppResponsive.screenPadding,
                itemCount: filteredVideos.length,
                itemBuilder: (context, index) {
                  final video = filteredVideos[index];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.surfaceDark : Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isDark ? AppColors.borderDark : AppColors.borderLight,
                      ),
                      boxShadow: isDark
                          ? []
                          : [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.04),
                                blurRadius: 12,
                                offset: const Offset(0, 4),
                              ),
                            ],
                    ),
                    child: InkWell(
                      borderRadius: BorderRadius.circular(20),
                      onTap: () => _playVideo(video),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Thumbnail box with play button
                          Container(
                            height: 160,
                            width: double.infinity,
                            decoration: const BoxDecoration(
                              color: Color(0xFF1E293B),
                              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
                            ),
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                Text(video['thumbnail']!, style: const TextStyle(fontSize: 48)),
                                CircleAvatar(
                                  radius: 26,
                                  backgroundColor: AppColors.primary.withValues(alpha: 0.9),
                                  child: const Icon(Icons.play_arrow_rounded, color: Colors.white, size: 32),
                                ),
                                Positioned(
                                  bottom: 10,
                                  right: 12,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                    decoration: BoxDecoration(
                                      color: Colors.black87,
                                      borderRadius: BorderRadius.circular(6),
                                    ),
                                    child: Text(
                                      video['duration']!,
                                      style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(14),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  video['title']!,
                                  style: TextStyle(
                                    fontSize: AppResponsive.bodyFontSize,
                                    fontWeight: FontWeight.bold,
                                    color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Row(
                                  children: [
                                    Text(
                                      video['instructor']!,
                                      style: TextStyle(
                                        fontSize: AppResponsive.captionFontSize,
                                        color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
                                      ),
                                    ),
                                    const Spacer(),
                                    Text(
                                      video['views']!,
                                      style: const TextStyle(
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.primary,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
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
