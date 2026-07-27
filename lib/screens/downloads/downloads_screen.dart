import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/download_provider.dart';
import '../../widgets/cards/download_card.dart';
import '../../widgets/common/custom_search_bar.dart';
import '../../widgets/common/empty_state_widget.dart';

class DownloadsScreen extends StatefulWidget {
  const DownloadsScreen({super.key});

  @override
  State<DownloadsScreen> createState() => _DownloadsScreenState();
}

class _DownloadsScreenState extends State<DownloadsScreen> {
  late PageController _pageController;
  final TextEditingController _searchController = TextEditingController();
  int _selectedTabIndex = 0;
  String _searchQuery = '';

  final List<Map<String, String>> _videoDownloads = [
    {
      'id': 'v1',
      'title': 'Operating System Complete One-Shot Lecture.mp4',
      'size': '450 MB',
      'duration': '3h 45m',
      'instructor': 'Prof. Ankit Sharma',
    },
    {
      'id': 'v2',
      'title': 'DBMS SQL Queries & Normalization.mp4',
      'size': '310 MB',
      'duration': '2h 30m',
      'instructor': 'Dr. Meenakshi Sundaram',
    },
    {
      'id': 'v3',
      'title': 'Data Structures Full Course.mp4',
      'size': '680 MB',
      'duration': '5h 15m',
      'instructor': 'Tech Academy',
    },
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: 0);
  }

  @override
  void dispose() {
    _pageController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  void _playOfflineVideo(Map<String, String> video) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.offline_pin_rounded, color: Color(0xFF10B981)),
            SizedBox(width: 8),
            Text('Offline Video Player 🎥'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              height: 170,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.black87,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Stack(
                alignment: Alignment.center,
                children: const [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: AppColors.primary,
                    child: Icon(Icons.play_arrow_rounded, color: Colors.white, size: 36),
                  ),
                  Positioned(
                    bottom: 10,
                    left: 12,
                    child: Text(
                      'Playing from Offline Local Cache (No Internet Required)',
                      style: TextStyle(color: Colors.white70, fontSize: 10),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Text(video['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 4),
            Text('${video['instructor']} • ${video['size']}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
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
    final downloadProvider = Provider.of<DownloadProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final totalUsed = downloadProvider.totalStorageUsedMB / 1024.0 + 1.44; // GB

    // Filter PDFs by search query
    final pdfs = downloadProvider.downloads.where((d) {
      if (_searchQuery.isEmpty) return true;
      return d.fileName.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();

    // Filter Videos by search query
    final videos = _videoDownloads.where((v) {
      if (_searchQuery.isEmpty) return true;
      return v['title']!.toLowerCase().contains(_searchQuery.toLowerCase());
    }).toList();

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'My Downloads',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Bar Top
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: CustomSearchBarWidget(
                hintText: 'Search downloaded files...',
                controller: _searchController,
                onChanged: (val) {
                  setState(() {
                    _searchQuery = val;
                  });
                },
              ),
            ),

            // Smooth Pill Segmented Controller (PDFs vs Videos)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceDark : const Color(0xFFF1F5F9),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(
                  color: isDark ? AppColors.borderDark : const Color(0xFFE2E8F0),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() => _selectedTabIndex = 0);
                        _pageController.animateToPage(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOutCubic);
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _selectedTabIndex == 0 ? AppColors.primary : Colors.transparent,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: _selectedTabIndex == 0
                              ? [
                                  BoxShadow(
                                    color: AppColors.primary.withValues(alpha: 0.3),
                                    blurRadius: 10,
                                    offset: const Offset(0, 3),
                                  ),
                                ]
                              : [],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.picture_as_pdf_rounded,
                              size: 18,
                              color: _selectedTabIndex == 0 ? Colors.white : (isDark ? AppColors.textMutedDark : AppColors.textMutedLight),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'PDF Notes (${pdfs.length})',
                              style: TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.bold,
                                color: _selectedTabIndex == 0 ? Colors.white : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() => _selectedTabIndex = 1);
                        _pageController.animateToPage(1, duration: const Duration(milliseconds: 300), curve: Curves.easeOutCubic);
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: _selectedTabIndex == 1 ? AppColors.primary : Colors.transparent,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: _selectedTabIndex == 1
                              ? [
                                  BoxShadow(
                                    color: AppColors.primary.withValues(alpha: 0.3),
                                    blurRadius: 10,
                                    offset: const Offset(0, 3),
                                  ),
                                ]
                              : [],
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.video_library_rounded,
                              size: 18,
                              color: _selectedTabIndex == 1 ? Colors.white : (isDark ? AppColors.textMutedDark : AppColors.textMutedLight),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Videos (${videos.length})',
                              style: TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.bold,
                                color: _selectedTabIndex == 1 ? Colors.white : (isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 6),

            // Ultra-Smooth PageView (Swipeable Tab Pages)
            Expanded(
              child: PageView(
                controller: _pageController,
                onPageChanged: (idx) {
                  setState(() {
                    _selectedTabIndex = idx;
                  });
                },
                children: [
                  // Tab 1: PDF Downloads List
                  pdfs.isEmpty
                      ? const EmptyStateWidget(
                          title: 'No Downloaded PDFs',
                          subtitle: 'Download PDF notes and previous year papers to read offline anytime.',
                          icon: Icons.cloud_download_outlined,
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          itemCount: pdfs.length,
                          itemBuilder: (context, index) {
                            final download = pdfs[index];
                            return DownloadCard(
                              download: download,
                              onTap: () => context.push('/pdf-viewer?title=${download.fileName}'),
                              onDelete: () {
                                downloadProvider.removeDownload(download.id);
                              },
                            );
                          },
                        ),

                  // Tab 2: Video Downloads List (Offline Playback)
                  videos.isEmpty
                      ? const EmptyStateWidget(
                          title: 'No Offline Videos',
                          subtitle: 'Download video lectures to watch them without an internet connection.',
                          icon: Icons.video_collection_outlined,
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          itemCount: videos.length,
                          itemBuilder: (context, index) {
                            final video = videos[index];
                            return Container(
                              margin: const EdgeInsets.only(bottom: 12),
                              decoration: BoxDecoration(
                                color: isDark ? AppColors.surfaceDark : Colors.white,
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: isDark ? AppColors.borderDark : AppColors.borderLight,
                                ),
                              ),
                              child: ListTile(
                                leading: Container(
                                  width: 44,
                                  height: 44,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFEF4444).withValues(alpha: 0.12),
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(Icons.play_circle_fill_rounded, color: Color(0xFFEF4444)),
                                ),
                                title: Text(
                                  video['title']!,
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                                ),
                                subtitle: Text('${video['size']} • ${video['duration']} • Offline Saved'),
                                trailing: IconButton(
                                  icon: const Icon(Icons.delete_outline_rounded, color: Colors.redAccent, size: 20),
                                  onPressed: () {
                                    setState(() {
                                      _videoDownloads.removeWhere((v) => v['id'] == video['id']);
                                    });
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(content: Text('Video download removed')),
                                    );
                                  },
                                ),
                                onTap: () => _playOfflineVideo(video),
                              ),
                            );
                          },
                        ),
                ],
              ),
            ),

            // Storage Used Card at bottom
            Container(
              margin: const EdgeInsets.all(16),
              padding: EdgeInsets.all(AppResponsive.cardPadding * 0.9),
              decoration: BoxDecoration(
                color: isDark ? AppColors.surfaceDark : Colors.white,
                borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                boxShadow: isDark
                    ? []
                    : [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.05),
                          blurRadius: 15,
                          offset: const Offset(0, 4),
                        ),
                      ],
                border: isDark
                    ? null
                    : Border.all(
                        color: AppColors.borderLight,
                      ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Offline Storage Used',
                              style: TextStyle(
                                fontSize: AppResponsive.captionFontSize * 1.1,
                                fontWeight: FontWeight.bold,
                                color: isDark
                                    ? AppColors.textPrimaryDark
                                    : AppColors.textPrimaryLight,
                              ),
                            ),
                            Text(
                              '${totalUsed.toStringAsFixed(2)} GB / 10 GB',
                              style: TextStyle(
                                fontSize: AppResponsive.captionFontSize,
                                color: AppColors.primary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: AppResponsive.h(1.2)),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(6),
                          child: LinearProgressIndicator(
                            value: (totalUsed / 10.0).clamp(0.05, 1.0),
                            backgroundColor: AppColors.primary.withValues(alpha: 0.12),
                            color: AppColors.primary,
                            minHeight: 6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(width: AppResponsive.w(4)),
                  Container(
                    padding: EdgeInsets.all(AppResponsive.w(2.5)),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      Icons.cloud_download_outlined,
                      color: AppColors.primary,
                      size: AppResponsive.iconMedium,
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
