import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/bookmark_provider.dart';
import '../../providers/college_provider.dart';
import '../../widgets/cards/college_card.dart';
import '../../widgets/common/empty_state_widget.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final collegeProvider = Provider.of<CollegeProvider>(context);
    final bookmarkProvider = Provider.of<BookmarkProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final bookmarkedColleges = collegeProvider.colleges
        .where((c) => bookmarkProvider.isBookmarked(c.id))
        .toList();

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'My Favorites',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search_rounded),
            onPressed: () => context.push('/search'),
          ),
        ],
      ),
      body: SafeArea(
        child: bookmarkedColleges.isEmpty
            ? const EmptyStateWidget(
                title: 'No Favorites Yet',
                subtitle: 'Tap the heart icon on any college or subject to add it to your favorites.',
                icon: Icons.favorite_border_rounded,
              )
            : ListView.builder(
                padding: AppResponsive.screenPadding,
                itemCount: bookmarkedColleges.length,
                itemBuilder: (context, index) {
                  final college = bookmarkedColleges[index];
                  return CollegeCard(
                    college: college,
                    onTap: () => context.push('/courses?college=${college.name}'),
                    onBookmarkToggle: () {
                      bookmarkProvider.toggleBookmark(college.id);
                    },
                  );
                },
              ),
      ),
    );
  }
}
