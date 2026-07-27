import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/search_provider.dart';
import '../../providers/study_material_provider.dart';
import '../../widgets/cards/subject_card.dart';
import '../../widgets/common/custom_search_bar.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final searchProvider = Provider.of<SearchProvider>(context);
    final materialProvider = Provider.of<StudyMaterialProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text('Search StudyHub'),
      ),
      body: SafeArea(
        child: Padding(
          padding: AppResponsive.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CustomSearchBarWidget(
                controller: _controller,
                onChanged: (val) {
                  searchProvider.updateQuery(val);
                  materialProvider.loadSubjects(query: val);
                },
                onSubmitted: (val) {
                  searchProvider.addRecentSearch(val);
                },
              ),
              SizedBox(height: AppResponsive.h(2.5)),

              if (_controller.text.isEmpty) ...[
                // Recent Searches
                if (searchProvider.recentSearches.isNotEmpty) ...[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Recent Searches',
                        style: TextStyle(
                          fontSize: AppResponsive.titleFontSize,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      TextButton(
                        onPressed: () => searchProvider.clearRecentSearches(),
                        child: Text(
                          'Clear All',
                          style: TextStyle(fontSize: AppResponsive.bodyFontSize),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: AppResponsive.h(1)),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: searchProvider.recentSearches
                        .map(
                          (item) => ActionChip(
                            label: Text(
                              item,
                              style: TextStyle(fontSize: AppResponsive.captionFontSize),
                            ),
                            avatar: Icon(Icons.history_rounded, size: AppResponsive.iconSmall),
                            onPressed: () {
                              _controller.text = item;
                              searchProvider.updateQuery(item);
                              materialProvider.loadSubjects(query: item);
                            },
                          ),
                        )
                        .toList(),
                  ),
                  SizedBox(height: AppResponsive.h(3)),
                ],

                // Trending Searches
                Text(
                  'Trending Searches 🔥',
                  style: TextStyle(
                    fontSize: AppResponsive.titleFontSize,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: AppResponsive.h(1.5)),
                Column(
                  children: searchProvider.trendingSearches
                      .map(
                        (item) => ListTile(
                          contentPadding: EdgeInsets.zero,
                          leading: Icon(
                            Icons.trending_up_rounded,
                            color: AppColors.primary,
                            size: AppResponsive.iconMedium,
                          ),
                          title: Text(
                            item,
                            style: TextStyle(fontSize: AppResponsive.bodyFontSize),
                          ),
                          trailing: Icon(Icons.north_west_rounded, size: AppResponsive.iconSmall),
                          onTap: () {
                            _controller.text = item;
                            searchProvider.updateQuery(item);
                            materialProvider.loadSubjects(query: item);
                          },
                        ),
                      )
                      .toList(),
                ),
              ] else ...[
                // Search Results
                Text(
                  'Search Results',
                  style: TextStyle(
                    fontSize: AppResponsive.titleFontSize,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: AppResponsive.h(1.5)),
                Expanded(
                  child: ListView.builder(
                    itemCount: materialProvider.subjects.length,
                    itemBuilder: (context, index) {
                      final subject = materialProvider.subjects[index];
                      return SubjectCard(
                        subject: subject,
                        onTap: () {
                          materialProvider.selectSubject(subject.id);
                          context.push('/subject-details?id=${subject.id}');
                        },
                        onBookmarkToggle: () {},
                      );
                    },
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
