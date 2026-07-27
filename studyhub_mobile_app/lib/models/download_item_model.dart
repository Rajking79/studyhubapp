class DownloadItemModel {
  final String id;
  final String fileName;
  final String title;
  final double fileSizeMB;
  final String downloadDate;
  final String localPath;
  final bool isCompleted;

  DownloadItemModel({
    required this.id,
    required this.fileName,
    required this.title,
    required this.fileSizeMB,
    required this.downloadDate,
    required this.localPath,
    this.isCompleted = true,
  });
}
