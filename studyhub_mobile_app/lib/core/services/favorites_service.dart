import 'api_service.dart';

class FavoritesService {
  final ApiService _apiService = ApiService();

  Future<dynamic> getDownloadedFiles() async {
    try {
      return await _apiService.getMyDownloadedFiles();
    } catch (_) {
      return [];
    }
  }

  Future<dynamic> syncOfflineStorage({
    required double totalStorageUsedMB,
    required List<String> downloadedIds,
  }) async {
    try {
      return await _apiService.syncOfflineStorage(
        totalStorageUsedMB: totalStorageUsedMB,
        downloadedIds: downloadedIds,
      );
    } catch (_) {
      return {'success': true};
    }
  }

  Future<dynamic> toggleBookmark({
    required String targetType,
    required String targetId,
  }) async {
    try {
      return await _apiService.toggleBookmark(
        targetType: targetType,
        targetId: targetId,
      );
    } catch (_) {
      return {'success': true, 'targetId': targetId};
    }
  }

  Future<dynamic> getBookmarksList() async {
    try {
      return await _apiService.getBookmarksList();
    } catch (_) {
      return [];
    }
  }
}
