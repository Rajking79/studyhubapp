import 'package:flutter/foundation.dart';

class SearchProvider extends ChangeNotifier {
  String _query = '';
  String get query => _query;

  final List<String> _recentSearches = [
    'Operating System Notes',
    'Delhi University PYQ',
    'Data Structures B.Tech',
    'Java Programming Handbook',
  ];
  List<String> get recentSearches => List.unmodifiable(_recentSearches);

  final List<String> _trendingSearches = [
    'Operating System PYQ 2024',
    'DBMS Unit Wise Notes',
    'Computer Networks Solved Papers',
    'Python Cheat Sheet',
  ];
  List<String> get trendingSearches => List.unmodifiable(_trendingSearches);

  void updateQuery(String text) {
    _query = text;
    notifyListeners();
  }

  void addRecentSearch(String search) {
    if (!_recentSearches.contains(search)) {
      _recentSearches.insert(0, search);
      if (_recentSearches.length > 8) {
        _recentSearches.removeLast();
      }
      notifyListeners();
    }
  }

  void clearRecentSearches() {
    _recentSearches.clear();
    notifyListeners();
  }
}
