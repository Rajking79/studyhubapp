import 'package:flutter/foundation.dart';
import '../core/services/api_service.dart';
import '../core/services/storage_preference_service.dart';

class BookmarkProvider extends ChangeNotifier {
  final StoragePreferenceService _storage = StoragePreferenceService();
  final ApiService _apiService = ApiService();

  final List<String> _bookmarkedIds = ['du', 'os', 'p1'];
  List<String> get bookmarkedIds => List.unmodifiable(_bookmarkedIds);

  List<dynamic> _favoritesList = [];
  List<dynamic> get favoritesList => _favoritesList;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  BookmarkProvider() {
    loadBookmarks();
  }

  Future<void> loadBookmarks() async {
    _isLoading = true;
    notifyListeners();

    try {
      final res = await _apiService.getFavorites();
      if (res is List) {
        _favoritesList = res;
        _bookmarkedIds.clear();
        for (var item in res) {
          if (item is Map && item.containsKey('materialId')) {
            _bookmarkedIds.add(item['materialId'].toString());
          } else if (item is Map && item.containsKey('_id')) {
            _bookmarkedIds.add(item['_id'].toString());
          }
        }
      }
    } catch (_) {
      final list = await _storage.getBookmarks();
      if (list.isNotEmpty) {
        _bookmarkedIds.clear();
        _bookmarkedIds.addAll(list);
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  bool isBookmarked(String id) => _bookmarkedIds.contains(id);

  Future<void> toggleBookmark(String id) async {
    if (_bookmarkedIds.contains(id)) {
      _bookmarkedIds.remove(id);
      try {
        await _apiService.removeFavorite(id);
      } catch (_) {}
    } else {
      _bookmarkedIds.add(id);
      try {
        await _apiService.addFavorite(id);
      } catch (_) {}
    }
    await _storage.saveBookmarks(_bookmarkedIds);
    notifyListeners();
  }
}

