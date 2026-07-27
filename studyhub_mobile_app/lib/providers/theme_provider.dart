import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../core/services/storage_preference_service.dart';

class ThemeProvider extends ChangeNotifier {
  final StoragePreferenceService _storage = StoragePreferenceService();
  ThemeMode _themeMode = ThemeMode.light;

  ThemeMode get themeMode => _themeMode;
  bool get isDarkMode => _themeMode == ThemeMode.dark;

  ThemeProvider() {
    _loadThemeMode();
  }

  Future<void> _loadThemeMode() async {
    final isDark = await _storage.getDarkMode();
    if (isDark != null) {
      _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
      _updateSystemOverlay();
      notifyListeners();
    }
  }

  Future<void> toggleTheme(bool isDark) async {
    _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
    await _storage.saveDarkMode(isDark);
    _updateSystemOverlay();
    notifyListeners();
  }

  void _updateSystemOverlay() {
    SystemChrome.setSystemUIOverlayStyle(
      _themeMode == ThemeMode.dark
          ? SystemUiOverlayStyle.light
          : SystemUiOverlayStyle.dark,
    );
  }
}
