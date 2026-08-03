import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/auth_provider.dart';
import '../../providers/bookmark_provider.dart';
import '../../providers/download_provider.dart';
import '../../providers/language_provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  void _showEditProfileModal(BuildContext context, AuthProvider authProvider) {
    final user = authProvider.user;
    final nameController = TextEditingController(text: user?.name ?? 'Rahul Verma');
    final emailController = TextEditingController(text: user?.email ?? 'rahul.verma21@gmail.com');
    final phoneController = TextEditingController(text: user?.phone.isNotEmpty == true ? user!.phone : '+91 98765 43210');
    final collegeController = TextEditingController(text: user?.college.isNotEmpty == true ? user!.college : 'Delhi University (DU)');
    final courseController = TextEditingController(text: user?.course.isNotEmpty == true ? user!.course : 'B.Tech Computer Science');
    final semController = TextEditingController(text: user?.semester.isNotEmpty == true ? user!.semester : 'Semester 4 (Year 2)');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom + 20,
          top: 20,
          left: 20,
          right: 20,
        ),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Edit Student Profile Details',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Full Name',
                  prefixIcon: Icon(Icons.person_outline_rounded),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Email Address',
                  prefixIcon: Icon(Icons.email_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: phoneController,
                decoration: const InputDecoration(
                  labelText: 'Mobile Number',
                  prefixIcon: Icon(Icons.phone_android_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: collegeController,
                decoration: const InputDecoration(
                  labelText: 'College Name',
                  prefixIcon: Icon(Icons.account_balance_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: courseController,
                decoration: const InputDecoration(
                  labelText: 'Course Name',
                  prefixIcon: Icon(Icons.school_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: semController,
                decoration: const InputDecoration(
                  labelText: 'Year & Semester',
                  prefixIcon: Icon(Icons.event_seat_outlined),
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Student profile details updated in real-time! ⭐')),
                    );
                  },
                  child: const Text('Save Profile Changes', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showLanguageSelector(BuildContext context, LanguageProvider langProvider) {
    final languages = ['English', 'Hindi (हिंदी)', 'Hinglish'];

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select App Language',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            ...languages.map(
              (lang) {
                final isSelected = langProvider.selectedLanguage == lang;
                return ListTile(
                  title: Text(lang, style: TextStyle(fontWeight: isSelected ? FontWeight.bold : FontWeight.w500)),
                  trailing: isSelected
                      ? const Icon(Icons.check_circle_rounded, color: AppColors.primary)
                      : const Icon(Icons.radio_button_unchecked_rounded, color: Colors.grey),
                  onTap: () {
                    langProvider.setLanguage(lang);
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('App language changed to $lang! 🌐')),
                    );
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showFeedbackDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Feedback & Support 💬'),
        content: const TextField(
          maxLines: 4,
          decoration: InputDecoration(
            hintText: 'Tell us how we can improve StudyHub...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Thank you for your feedback! ⭐')),
              );
            },
            child: const Text('Submit', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  void _showPrivacyPolicyDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Privacy Policy 🔒'),
        content: const SingleChildScrollView(
          child: Text(
            'StudyHub is committed to protecting your academic privacy. We do not sell your personal details to third parties. All downloaded study materials and reading statistics are cached locally on your device for offline access.',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  void _showAboutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: Row(
          children: const [
            Icon(Icons.school_rounded, color: AppColors.primary),
            SizedBox(width: 8),
            Text('College Study Hub'),
          ],
        ),
        content: const Text(
          'College Study Hub is your all-in-one academic ecosystem providing Previous Year Papers, Notes, Books, Syllabus, CGPA Tools & Analytics for university students.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final langProvider = Provider.of<LanguageProvider>(context);
    final downloadProvider = Provider.of<DownloadProvider>(context);
    final bookmarkProvider = Provider.of<BookmarkProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final user = authProvider.user;
    final name = user?.name.isNotEmpty == true ? user!.name : 'Rahul Verma';
    final email = user?.email.isNotEmpty == true ? user!.email : 'rahul.verma21@gmail.com';
    final phone = user?.phone.isNotEmpty == true ? user!.phone : '+91 98765 43210';
    final college = user?.college.isNotEmpty == true ? user!.college : 'Delhi University (DU)';
    final course = user?.course.isNotEmpty == true ? user!.course : 'B.Tech Computer Science';
    final semester = user?.semester.isNotEmpty == true ? user!.semester : 'Semester 4 (Year 2)';

    final downloadsCount = downloadProvider.downloads.length;
    final bookmarksCount = bookmarkProvider.bookmarkedIds.length;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'Student Profile',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: authProvider.isLoading
            ? const Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                padding: AppResponsive.screenPadding,
                child: Column(
            children: [
              // Profile Header Avatar
              Center(
                child: Column(
                  children: [
                    Stack(
                      children: [
                        Container(
                          width: AppResponsive.avatarSize * 1.5,
                          height: AppResponsive.avatarSize * 1.5,
                          decoration: BoxDecoration(
                            color: AppColors.primary.withValues(alpha: 0.15),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            Icons.person_rounded,
                            size: AppResponsive.iconLarge * 1.5,
                            color: AppColors.primary,
                          ),
                        ),
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: GestureDetector(
                            onTap: () => _showEditProfileModal(context, authProvider),
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: const BoxDecoration(
                                color: AppColors.primary,
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(
                                Icons.edit_rounded,
                                size: 14,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          name,
                          style: TextStyle(
                            fontSize: AppResponsive.titleFontSize * 1.1,
                            fontWeight: FontWeight.bold,
                            color: isDark
                                ? AppColors.textPrimaryDark
                                : AppColors.textPrimaryLight,
                          ),
                        ),
                        const SizedBox(width: 6),
                        const Icon(
                          Icons.verified_rounded,
                          color: Color(0xFF2563EB),
                          size: 18,
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      email,
                      style: TextStyle(
                        fontSize: AppResponsive.captionFontSize,
                        color: isDark
                            ? AppColors.textSecondaryDark
                            : AppColors.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Academic Details Card
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(AppResponsive.cardPadding),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(AppResponsive.cardRadius),
                  border: Border.all(
                    color: isDark ? AppColors.borderDark : const Color(0xFFEEF2F7),
                    width: 1.2,
                  ),
                  boxShadow: isDark
                      ? []
                      : [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.04),
                            blurRadius: 14,
                            offset: const Offset(0, 4),
                          ),
                        ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Academic Details',
                          style: TextStyle(
                            fontSize: AppResponsive.bodyFontSize,
                            fontWeight: FontWeight.bold,
                            color: AppColors.primary,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => _showEditProfileModal(context, authProvider),
                          child: Text(
                            'Edit',
                            style: TextStyle(
                              fontSize: AppResponsive.captionFontSize,
                              fontWeight: FontWeight.bold,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _buildInfoRow(Icons.account_balance_outlined, 'College', college, isDark),
                    _buildInfoRow(Icons.school_outlined, 'Course', course, isDark),
                    _buildInfoRow(Icons.event_seat_outlined, 'Semester', semester, isDark),
                    _buildInfoRow(Icons.phone_android_outlined, 'Mobile Number', phone, isDark),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Real-time Stats Row (Downloads | Favorites | Uploads)
              Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: isDark
                      ? []
                      : [
                          BoxShadow(
                            color: Colors.black.withValues(alpha: 0.04),
                            blurRadius: 15,
                          ),
                        ],
                  border: isDark
                      ? null
                      : Border.all(
                          color: AppColors.borderLight,
                        ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    GestureDetector(
                      onTap: () => context.push('/downloads'),
                      child: _buildStatItem('$downloadsCount', 'Downloads', isDark),
                    ),
                    Container(width: 1, height: 30, color: isDark ? AppColors.borderDark : AppColors.borderLight),
                    GestureDetector(
                      onTap: () => context.push('/favorites'),
                      child: _buildStatItem('$bookmarksCount', 'Favorites', isDark),
                    ),
                    Container(width: 1, height: 30, color: isDark ? AppColors.borderDark : AppColors.borderLight),
                    _buildStatItem('7', 'Uploads', isDark),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Menu Items List (Cleaned)
              _buildMenuItem(
                context,
                Icons.card_giftcard_rounded,
                'Invite Friends & Get Pro Notes 🎁',
                () => context.push('/invite'),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.g_translate_rounded,
                'App Language: ${langProvider.selectedLanguage}',
                () => _showLanguageSelector(context, langProvider),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.person_outline_rounded,
                'Edit Profile Details',
                () => _showEditProfileModal(context, authProvider),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.settings_outlined,
                'App Settings',
                () => context.push('/settings'),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.insights_rounded,
                'Study Analytics & Progress',
                () => context.push('/progress'),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.calculate_outlined,
                'CGPA & Student Tools',
                () => context.push('/tools'),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.feedback_outlined,
                'Feedback & Support',
                () => _showFeedbackDialog(context),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.privacy_tip_outlined,
                'Privacy Policy',
                () => _showPrivacyPolicyDialog(context),
                isDark,
              ),
              _buildMenuItem(
                context,
                Icons.info_outline_rounded,
                'About App',
                () => _showAboutDialog(context),
                isDark,
              ),

              const SizedBox(height: 10),

              // Logout Button
              Container(
                decoration: BoxDecoration(
                  color: isDark ? AppColors.surfaceDark : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isDark ? AppColors.borderDark : AppColors.borderLight,
                  ),
                ),
                child: ListTile(
                  leading: Icon(
                    Icons.logout_rounded,
                    color: AppColors.error,
                    size: AppResponsive.iconMedium,
                  ),
                  title: Text(
                    'Logout',
                    style: TextStyle(
                      fontSize: AppResponsive.bodyFontSize,
                      fontWeight: FontWeight.w600,
                      color: AppColors.error,
                    ),
                  ),
                  onTap: () async {
                    await authProvider.logout();
                    if (context.mounted) {
                      context.go('/login');
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppColors.primary),
          const SizedBox(width: 10),
          Text(
            '$label: ',
            style: TextStyle(
              fontSize: AppResponsive.captionFontSize,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: AppResponsive.captionFontSize * 1.05,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String count, String label, bool isDark) {
    return Column(
      children: [
        Text(
          count,
          style: TextStyle(
            fontSize: AppResponsive.titleFontSize,
            fontWeight: FontWeight.bold,
            color: AppColors.primary,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: AppResponsive.captionFontSize,
            color: isDark ? AppColors.textSecondaryDark : AppColors.textSecondaryLight,
          ),
        ),
      ],
    );
  }

  Widget _buildMenuItem(
    BuildContext context,
    IconData icon,
    String title,
    VoidCallback onTap,
    bool isDark,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: isDark ? AppColors.surfaceDark : Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColors.borderDark : AppColors.borderLight,
        ),
      ),
      child: ListTile(
        leading: Icon(icon, color: AppColors.primary, size: AppResponsive.iconMedium),
        title: Text(
          title,
          style: TextStyle(fontSize: AppResponsive.bodyFontSize, fontWeight: FontWeight.w500),
        ),
        trailing: Icon(
          Icons.arrow_forward_ios_rounded,
          size: AppResponsive.iconSmall,
          color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
        ),
        onTap: onTap,
      ),
    );
  }
}
