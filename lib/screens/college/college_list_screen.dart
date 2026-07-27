import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/college_provider.dart';
import '../../widgets/cards/college_card.dart';
import '../../widgets/common/custom_search_bar.dart';
import '../../widgets/common/status_chip.dart';

class CollegeListScreen extends StatefulWidget {
  const CollegeListScreen({super.key});

  @override
  State<CollegeListScreen> createState() => _CollegeListScreenState();
}

class _CollegeListScreenState extends State<CollegeListScreen> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _filters = ['All', 'State Univ', 'Private', 'Govt.'];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<CollegeProvider>(context, listen: false).loadColleges();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final collegeProvider = Provider.of<CollegeProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Find Your College',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Input
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: AppResponsive.horizontalPadding, vertical: 8),
              child: CustomSearchBarWidget(
                controller: _searchController,
                hintText: 'Search college name...',
                onChanged: (val) {
                  collegeProvider.loadColleges(
                    category: collegeProvider.selectedCategory,
                    query: val,
                  );
                },
              ),
            ),

            // Category Filters
            SizedBox(
              height: AppResponsive.buttonHeight,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(
                    horizontal: AppResponsive.horizontalPadding, vertical: 6),
                itemCount: _filters.length,
                itemBuilder: (context, index) {
                  final filter = _filters[index];
                  final isSelected = collegeProvider.selectedCategory == filter;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: StatusChip(
                      label: filter,
                      isSelected: isSelected,
                      onTap: () {
                        collegeProvider.loadColleges(
                          category: filter,
                          query: _searchController.text,
                        );
                      },
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),

            // College Cards List
            Expanded(
              child: collegeProvider.isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      padding: EdgeInsets.symmetric(
                          horizontal: AppResponsive.horizontalPadding, vertical: 8),
                      itemCount: collegeProvider.colleges.length,
                      itemBuilder: (context, index) {
                        final college = collegeProvider.colleges[index];
                        return CollegeCard(
                          college: college,
                          onTap: () => context.push('/courses'),
                          onBookmarkToggle: () {
                            collegeProvider.toggleBookmark(college.id);
                          },
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
