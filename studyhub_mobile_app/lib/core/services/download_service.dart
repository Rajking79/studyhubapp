import 'dart:async';
import '../../models/download_item_model.dart';
import '../../models/study_material_model.dart';
import '../utils/dummy_data.dart';

class DownloadService {
  final List<DownloadItemModel> _downloads = DummyData.getDownloads();

  List<DownloadItemModel> get downloads => List.unmodifiable(_downloads);

  double get totalStorageUsedMB {
    double total = 0;
    for (var item in _downloads) {
      total += item.fileSizeMB;
    }
    return total;
  }

  Future<void> downloadPdf({
    required StudyMaterialModel material,
    required Function(double progress) onProgress,
  }) async {
    // Simulate progressive download
    for (int i = 1; i <= 10; i++) {
      await Future.delayed(const Duration(milliseconds: 150));
      onProgress(i / 10.0);
    }

    final newItem = DownloadItemModel(
      id: 'd_${DateTime.now().millisecondsSinceEpoch}',
      fileName: '${material.title.replaceAll(" ", "_")}.pdf',
      title: material.title,
      fileSizeMB: material.fileSizeMB,
      downloadDate: 'Today',
      localPath: '/downloads/${material.title}.pdf',
    );

    _downloads.insert(0, newItem);
  }

  void removeDownload(String id) {
    _downloads.removeWhere((item) => item.id == id);
  }
}
