import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/download_provider.dart';
import '../../providers/study_material_provider.dart';
import '../../widgets/cards/material_card.dart';
import '../../widgets/common/status_chip.dart';

class PreviousYearPapersScreen extends StatefulWidget {
  const PreviousYearPapersScreen({super.key});

  @override
  State<PreviousYearPapersScreen> createState() => _PreviousYearPapersScreenState();
}

class _PreviousYearPapersScreenState extends State<PreviousYearPapersScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<String> _filters = ['All', 'Mid Sem', 'End Sem', 'Backlog'];

  final List<Map<String, String>> _pyqVideos = [
    {
      'title': 'Operating System 2024 End-Sem Paper Solved Live',
      'duration': '1h 45m',
      'instructor': 'Prof. Ankit Sharma',
      'year': '2024 End Sem',
    },
    {
      'title': 'DBMS 2023 End-Sem Complete Paper Solution & Explanation',
      'duration': '2h 10m',
      'instructor': 'Dr. Meenakshi Sundaram',
      'year': '2023 End Sem',
    },
    {
      'title': 'Data Structures 2022 Mid-Sem Question Paper Discussion',
      'duration': '1h 15m',
      'instructor': 'Tech Academy',
      'year': '2022 Mid Sem',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<StudyMaterialProvider>(context, listen: false).loadPreviousPapers();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _playPyqVideo(Map<String, String> video) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.play_circle_fill_rounded, color: AppColors.error),
            SizedBox(width: 8),
            Text('PYQ Video Solution 🎥'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              height: 160,
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
                ],
              ),
            ),
            const SizedBox(height: 12),
            Text(video['title']!, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 4),
            Text('${video['instructor']} • ${video['duration']}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
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
    final materialProvider = Provider.of<StudyMaterialProvider>(context);
    final downloadProvider = Provider.of<DownloadProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Previous Year Papers',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppColors.primary,
          labelColor: AppColors.primary,
          unselectedLabelColor: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
          labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          tabs: const [
            Tab(
              icon: Icon(Icons.picture_as_pdf_rounded, size: 18),
              text: 'PDF Papers 📄',
            ),
            Tab(
              icon: Icon(Icons.video_library_rounded, size: 18),
              text: 'Video Solutions 🎥',
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 8),
            // Filter Tags Row
            SizedBox(
              height: 42,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                itemCount: _filters.length,
                itemBuilder: (context, index) {
                  final filter = _filters[index];
                  final isSelected = materialProvider.paperFilter == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: StatusChip(
                      label: filter,
                      isSelected: isSelected,
                      onTap: () {
                        materialProvider.loadPreviousPapers(filter: filter);
                      },
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),

            // Tab View Body (PDFs vs Videos)
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Tab 1: PDF Question Papers
                  materialProvider.isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    itemCount: materialProvider.previousPapers.length,
                    itemBuilder: (context, index) {
                      final paper = materialProvider.previousPapers[index];
                      return MaterialCard(
                        material: paper,
                        onTap: () => context.push('/pdf-viewer?title=${paper.title}'),
                        onDownload: () {
                          downloadProvider.startDownload(paper);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Downloading ${paper.title}...')),
                          );
                        },
                        onBookmarkToggle: () {
                          materialProvider.toggleBookmarkMaterial(paper.id);
                        },
                      );
                    },
                  ),

                  // Tab 2: PYQ Video Solutions
                  ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    itemCount: _pyqVideos.length,
                    itemBuilder: (context, index) {
                      final video = _pyqVideos[index];
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
                          contentPadding: const EdgeInsets.all(12),
                          leading: Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              color: const Color(0xFFEF4444).withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: const Icon(Icons.play_circle_fill_rounded, color: Color(0xFFEF4444), size: 30),
                          ),
                          title: Text(
                            video['title']!,
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13.5),
                          ),
                          subtitle: Text('${video['instructor']} • ${video['duration']}'),
                          trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14),
                          onTap: () => _playPyqVideo(video),
                        ),
                      );
                    },
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
