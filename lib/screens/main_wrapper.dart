import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'home/home_dashboard_screen.dart';
import 'search/search_screen.dart';
import 'downloads/downloads_screen.dart';
import 'favorites/favorites_screen.dart';
import 'profile/profile_screen.dart';
import '../widgets/navigation/custom_bottom_nav_bar.dart';

class MainWrapper extends StatefulWidget {
  final int initialIndex;
  const MainWrapper({super.key, this.initialIndex = 0});

  @override
  State<MainWrapper> createState() => _MainWrapperState();
}

class _MainWrapperState extends State<MainWrapper> {
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final screens = [
      const HomeDashboardScreen(),
      const SearchScreen(),
      const DownloadsScreen(),
      const FavoritesScreen(),
      const ProfileScreen(),
    ];

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: isDark ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark,
      child: Scaffold(
        body: IndexedStack(
          index: _currentIndex,
          children: screens,
        ),
        bottomNavigationBar: CustomBottomNavBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() => _currentIndex = index);
          },
        ),
      ),
    );
  }
}
