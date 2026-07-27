import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/study_material_provider.dart';
import '../../widgets/cards/subject_card.dart';
import '../../widgets/common/custom_search_bar.dart';

class SubjectListScreen extends StatefulWidget {
  const SubjectListScreen({super.key});

  @override
  State<SubjectListScreen> createState() => _SubjectListScreenState();
}

class _SubjectListScreenState extends State<SubjectListScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<StudyMaterialProvider>(context, listen: false).loadSubjects();
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
    final materialProvider = Provider.of<StudyMaterialProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Subjects',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: AppResponsive.horizontalPadding, vertical: 10),
              child: CustomSearchBarWidget(
                controller: _searchController,
                hintText: 'Search subject...',
                onChanged: (val) {
                  materialProvider.loadSubjects(query: val);
                },
              ),
            ),
            Expanded(
              child: materialProvider.isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : ListView.builder(
                      padding: EdgeInsets.symmetric(
                          horizontal: AppResponsive.horizontalPadding, vertical: 10),
                      itemCount: materialProvider.subjects.length,
                      itemBuilder: (context, index) {
                        final subject = materialProvider.subjects[index];
                        return SubjectCard(
                          subject: subject,
                          onTap: () {
                            materialProvider.selectSubject(subject.id);
                            context.push('/subject-details?id=${subject.id}');
                          },
                          onBookmarkToggle: () {
                            materialProvider.loadSubjects();
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
