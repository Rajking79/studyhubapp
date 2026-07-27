import 'package:flutter/foundation.dart';

class LanguageProvider extends ChangeNotifier {
  String _selectedLanguage = 'English';
  String get selectedLanguage => _selectedLanguage;

  final Map<String, Map<String, String>> _translations = {
    'English': {
      'app_title': 'College Study Hub',
      'search_hint': 'Search for colleges, subjects, notes...',
      'quick_access': 'Quick Access',
      'featured_colleges': 'Featured Colleges',
      'continue_reading': 'Continue Reading',
      'dark_mode': 'Dark Mode',
      'settings': 'App Settings',
      'language': 'App Language',
    },
    'Hindi (हिंदी)': {
      'app_title': 'कॉलेज स्टडी हब',
      'search_hint': 'कॉलेज, विषय, नोट्स खोजें...',
      'quick_access': 'त्वरित पहुँच',
      'featured_colleges': 'प्रमुख कॉलेज',
      'continue_reading': 'पढ़ना जारी रखें',
      'dark_mode': 'डार्क मोड',
      'settings': 'ऐप सेटिंग्स',
      'language': 'ऐप भाषा',
    },
    'Hinglish': {
      'app_title': 'College Study Hub',
      'search_hint': 'Colleges, Subjects, Notes search karein...',
      'quick_access': 'Quick Access',
      'featured_colleges': 'Featured Colleges',
      'continue_reading': 'Continue Reading',
      'dark_mode': 'Dark Mode',
      'settings': 'App Settings',
      'language': 'App Language',
    },
  };

  String getText(String key) {
    return _translations[_selectedLanguage]?[key] ?? _translations['English']![key] ?? key;
  }

  void setLanguage(String lang) {
    _selectedLanguage = lang;
    notifyListeners();
  }
}
