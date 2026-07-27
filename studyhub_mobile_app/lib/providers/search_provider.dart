import 'package:flutter/foundation.dart';
import '../core/services/api_service.dart';

class SearchProvider extends ChangeNotifier {
  final ApiService _apiService = ApiService();

  String _query = '';
  String get query => _query;

  bool _isSearching = false;
  bool get isSearching => _isSearching;

  List<dynamic> _searchResults = [];
  List<dynamic> get searchResults => _searchResults;

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
    if (text.trim().isNotEmpty) {
      performSearch(text);
    } else {
      _searchResults = [];
      _isSearching = false;
      notifyListeners();
    }
  }

  Future<void> performSearch(String text) async {
    _isSearching = true;
    notifyListeners();
    try {
      final res = await _apiService.globalSearch(query: text);
      if (res is List) {
        _searchResults = res;
      } else if (res is Map<String, dynamic> && res.containsKey('results')) {
        _searchResults = res['results'] as List;
      }
    } catch (_) {
      _searchResults = [];
    } finally {
      _isSearching = false;
      notifyListeners();
    }
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
