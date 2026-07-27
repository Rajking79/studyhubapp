import 'package:flutter/foundation.dart';
import '../core/services/database_service.dart';
import '../models/college_model.dart';

class CollegeProvider extends ChangeNotifier {
  final DatabaseService _databaseService = DatabaseService();

  List<CollegeModel> _colleges = [];
  List<CollegeModel> get colleges => _colleges;

  String _selectedCategory = 'All';
  String get selectedCategory => _selectedCategory;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Future<void> loadColleges({String category = 'All', String query = ''}) async {
    _isLoading = true;
    _selectedCategory = category;
    notifyListeners();

    _colleges = await _databaseService.fetchColleges(category: category, query: query);
    _isLoading = false;
    notifyListeners();
  }

  void toggleBookmark(String collegeId) {
    final index = _colleges.indexWhere((c) => c.id == collegeId);
    if (index != -1) {
      _colleges[index] = _colleges[index].copyWith(
        isBookmarked: !_colleges[index].isBookmarked,
      );
      notifyListeners();
    }
  }
}
