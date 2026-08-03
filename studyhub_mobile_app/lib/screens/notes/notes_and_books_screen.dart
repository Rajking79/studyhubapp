import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../models/study_material_model.dart';
import '../../providers/download_provider.dart';
import '../../providers/study_material_provider.dart';
import '../../widgets/cards/material_card.dart';
import '../../widgets/common/status_chip.dart';

class NotesAndBooksScreen extends StatefulWidget {
  const NotesAndBooksScreen({super.key});

  @override
  State<NotesAndBooksScreen> createState() => _NotesAndBooksScreenState();
}

class _NotesAndBooksScreenState extends State<NotesAndBooksScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _selectedCategoryIndex = 0;
  final List<String> _categories = ['Notes', 'Books', 'Guide', 'Syllabus'];

  final List<Map<String, String>> _videoLectures = [
    {
      'title': 'Operating System Complete One-Shot Video Lecture',
      'duration': '3h 45m',
      'instructor': 'Prof. Ankit Sharma',
      'category': 'Notes',
    },
    {
      'title': 'DBMS SQL Queries & Normalization One Shot',
      'duration': '2h 30m',
      'instructor': 'Dr. Meenakshi Sundaram',
      'category': 'Books',
    },
    {
      'title': 'Data Structures & Algorithms Full Course (B.Tech)',
      'duration': '5h 15m',
      'instructor': 'Tech Academy',
      'category': 'Guide',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<StudyMaterialProvider>(context, listen: false).loadNotesAndBooks();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _playVideo(Map<String, String> video) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.play_circle_fill_rounded, color: AppColors.error),
            SizedBox(width: 8),
            Text('Video Lecture 🎥'),
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
    final materialProvider = Provider.of<StudyMaterialProvider>(context);
    final downloadProvider = Provider.of<DownloadProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Notes & Study Materials',
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
              text: 'PDFs & Books 📄',
            ),
            Tab(
              icon: Icon(Icons.video_library_rounded, size: 18),
              text: 'Video Lectures 🎥',
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 8),
            // Category Chips Row
            SizedBox(
              height: 42,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
                itemCount: _categories.length,
                itemBuilder: (context, index) {
                  final cat = _categories[index];
                  final isSelected = _selectedCategoryIndex == index;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: StatusChip(
                      label: cat,
                      isSelected: isSelected,
                      onTap: () {
                        setState(() => _selectedCategoryIndex = index);
                        StudyMaterialType? type;
                        if (index == 0) type = StudyMaterialType.notes;
                        if (index == 1) type = StudyMaterialType.book;
                        if (index == 2) type = StudyMaterialType.guide;
                        if (index == 3) type = StudyMaterialType.syllabus;
                        materialProvider.loadNotesAndBooks(type: type);
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
                  // Tab 1: PDF Materials & Books
                  materialProvider.isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
                    itemCount: materialProvider.notesAndBooks.length,
                    itemBuilder: (context, index) {
                      final item = materialProvider.notesAndBooks[index];
                      return MaterialCard(
                        material: item,
                        onTap: () => context.push('/pdf-viewer?title=${item.title}'),
                        onDownload: () {
                          downloadProvider.startDownload(item);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Downloading ${item.title}...')),
                          );
                        },
                        onBookmarkToggle: () {
                          materialProvider.toggleBookmarkMaterial(item.id);
                        },
                      );
                    },
                  ),

                  // Tab 2: Category Video Lectures
                  ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
                    itemCount: _videoLectures.length,
                    itemBuilder: (context, index) {
                      final video = _videoLectures[index];
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
                          onTap: () => _playVideo(video),
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
