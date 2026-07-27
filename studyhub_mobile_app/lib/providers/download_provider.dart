import 'package:flutter/foundation.dart';
import '../core/services/download_service.dart';
import '../models/download_item_model.dart';
import '../models/study_material_model.dart';

class DownloadProvider extends ChangeNotifier {
  final DownloadService _downloadService = DownloadService();

  List<DownloadItemModel> get downloads => _downloadService.downloads;
  double get totalStorageUsedMB => _downloadService.totalStorageUsedMB;

  final Map<String, double> _downloadProgress = {};
  Map<String, double> get downloadProgress => _downloadProgress;

  Future<void> startDownload(StudyMaterialModel material) async {
    _downloadProgress[material.id] = 0.0;
    notifyListeners();

    await _downloadService.downloadPdf(
      material: material,
      onProgress: (progress) {
        _downloadProgress[material.id] = progress;
        notifyListeners();
      },
    );

    _downloadProgress.remove(material.id);
    notifyListeners();
  }

  void removeDownload(String id) {
    _downloadService.removeDownload(id);
    notifyListeners();
  }
}
