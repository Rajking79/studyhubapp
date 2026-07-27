import 'package:flutter/foundation.dart';
import '../core/services/storage_preference_service.dart';

class BookmarkProvider extends ChangeNotifier {
  final StoragePreferenceService _storage = StoragePreferenceService();

  final List<String> _bookmarkedIds = ['du', 'os', 'p1'];
  List<String> get bookmarkedIds => List.unmodifiable(_bookmarkedIds);

  BookmarkProvider() {
    _loadBookmarks();
  }

  Future<void> _loadBookmarks() async {
    final list = await _storage.getBookmarks();
    if (list.isNotEmpty) {
      _bookmarkedIds.clear();
      _bookmarkedIds.addAll(list);
      notifyListeners();
    }
  }

  bool isBookmarked(String id) => _bookmarkedIds.contains(id);

  Future<void> toggleBookmark(String id) async {
    if (_bookmarkedIds.contains(id)) {
      _bookmarkedIds.remove(id);
    } else {
      _bookmarkedIds.add(id);
    }
    await _storage.saveBookmarks(_bookmarkedIds);
    notifyListeners();
  }
}
