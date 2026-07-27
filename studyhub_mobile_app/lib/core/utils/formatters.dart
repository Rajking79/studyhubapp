class Formatters {
  static String formatFileSize(double sizeInMB) {
    if (sizeInMB < 1.0) {
      final kb = (sizeInMB * 1024).round();
      return '$kb KB';
    }
    return '${sizeInMB.toStringAsFixed(1)} MB';
  }

  static String formatNumber(int count) {
    if (count >= 1000000) {
      return '${(count / 1000000).toStringAsFixed(1)}M';
    } else if (count >= 1000) {
      return '${(count / 1000).toStringAsFixed(1)}K';
    }
    return count.toString();
  }

  static String capitalize(String text) {
    if (text.isEmpty) return text;
    return text[0].toUpperCase() + text.substring(1);
  }
}
