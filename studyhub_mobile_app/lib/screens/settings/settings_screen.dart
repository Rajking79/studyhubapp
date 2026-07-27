import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/app_responsive.dart';
import '../../providers/theme_provider.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _pushNotifications = true;
  bool _emailAlerts = true;
  bool _dataSaver = false;

  void _clearCache() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Clear App Cache?'),
        content: const Text(
          'This will clear 14.2 MB of temporary PDF cache. Your downloaded offline files will remain safe.',
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
                const SnackBar(content: Text('App cache cleared successfully!')),
              );
            },
            child: const Text('Clear Now', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    AppResponsive.init(context);
    final themeProvider = Provider.of<ThemeProvider>(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.backgroundDark : AppColors.backgroundLight,
      appBar: AppBar(
        title: const Text(
          'App Settings',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: AppResponsive.screenPadding,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildSectionHeader('Appearance & Theme', isDark),
              _buildSettingTile(
                icon: isDark ? Icons.dark_mode_rounded : Icons.light_mode_rounded,
                title: 'Dark Theme Mode',
                subtitle: 'Switch between light and dark theme',
                trailing: Switch(
                  value: themeProvider.isDarkMode,
                  activeTrackColor: AppColors.primary,
                  onChanged: (val) => themeProvider.toggleTheme(val),
                ),
                isDark: isDark,
              ),

              SizedBox(height: AppResponsive.h(2.5)),
              _buildSectionHeader('Notifications', isDark),
              _buildSettingTile(
                icon: Icons.notifications_active_outlined,
                title: 'Push Notifications',
                subtitle: 'Get alerts for new notes and exam dates',
                trailing: Switch(
                  value: _pushNotifications,
                  activeTrackColor: AppColors.primary,
                  onChanged: (val) => setState(() => _pushNotifications = val),
                ),
                isDark: isDark,
              ),
              _buildSettingTile(
                icon: Icons.mail_outline_rounded,
                title: 'Email Announcements',
                subtitle: 'Receive scholarship & result notices via email',
                trailing: Switch(
                  value: _emailAlerts,
                  activeTrackColor: AppColors.primary,
                  onChanged: (val) => setState(() => _emailAlerts = val),
                ),
                isDark: isDark,
              ),

              SizedBox(height: AppResponsive.h(2.5)),
              _buildSectionHeader('Storage & Data Saver', isDark),
              _buildSettingTile(
                icon: Icons.data_saver_on_rounded,
                title: 'Data Saver',
                subtitle: 'Optimize PDF preview images on cellular data',
                trailing: Switch(
                  value: _dataSaver,
                  activeTrackColor: AppColors.primary,
                  onChanged: (val) => setState(() => _dataSaver = val),
                ),
                isDark: isDark,
              ),
              _buildSettingTile(
                icon: Icons.cleaning_services_rounded,
                title: 'Clear Cache',
                subtitle: 'Current cache size: 14.2 MB',
                trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                onTap: _clearCache,
                isDark: isDark,
              ),

              SizedBox(height: AppResponsive.h(2.5)),
              _buildSectionHeader('About App', isDark),
              _buildSettingTile(
                icon: Icons.info_outline_rounded,
                title: 'College Study Hub',
                subtitle: 'Version 1.0.4 (Build 2026)',
                isDark: isDark,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, left: 4),
      child: Text(
        title,
        style: TextStyle(
          fontSize: AppResponsive.captionFontSize * 1.1,
          fontWeight: FontWeight.bold,
          color: AppColors.primary,
        ),
      ),
    );
  }

  Widget _buildSettingTile({
    required IconData icon,
    required String title,
    required String subtitle,
    Widget? trailing,
    VoidCallback? onTap,
    required bool isDark,
  }) {
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
        onTap: onTap,
        leading: Icon(icon, color: AppColors.primary),
        title: Text(
          title,
          style: TextStyle(
            fontSize: AppResponsive.bodyFontSize,
            fontWeight: FontWeight.w600,
            color: isDark ? AppColors.textPrimaryDark : AppColors.textPrimaryLight,
          ),
        ),
        subtitle: Text(
          subtitle,
          style: TextStyle(
            fontSize: AppResponsive.captionFontSize,
            color: isDark ? AppColors.textMutedDark : AppColors.textMutedLight,
          ),
        ),
        trailing: trailing,
      ),
    );
  }
}
