import 'package:flutter/foundation.dart';
import '../core/services/database_service.dart';
import '../models/subject_model.dart';
import '../models/study_material_model.dart';

class StudyMaterialProvider extends ChangeNotifier {
  final DatabaseService _databaseService = DatabaseService();

  List<SubjectModel> _subjects = [];
  List<SubjectModel> get subjects => _subjects;

  SubjectModel? _selectedSubject;
  SubjectModel? get selectedSubject => _selectedSubject;

  List<StudyMaterialModel> _previousPapers = [];
  List<StudyMaterialModel> get previousPapers => _previousPapers;

  List<StudyMaterialModel> _notesAndBooks = [];
  List<StudyMaterialModel> get notesAndBooks => _notesAndBooks;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String _paperFilter = 'All';
  String get paperFilter => _paperFilter;

  Future<void> loadSubjects({String query = ''}) async {
    _isLoading = true;
    notifyListeners();

    _subjects = await _databaseService.fetchSubjects(query: query);
    if (_subjects.isNotEmpty && _selectedSubject == null) {
      _selectedSubject = _subjects.first;
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<void> selectSubject(String subjectId) async {
    _selectedSubject = await _databaseService.fetchSubjectById(subjectId);
    notifyListeners();
    loadPreviousPapers();
    loadNotesAndBooks();
  }

  Future<void> loadPreviousPapers({String filter = 'All'}) async {
    _paperFilter = filter;
    _previousPapers = await _databaseService.fetchPreviousYearPapers(filter: filter);
    notifyListeners();
  }

  Future<void> loadNotesAndBooks({StudyMaterialType? type}) async {
    _notesAndBooks = await _databaseService.fetchNotesAndBooks(type: type);
    notifyListeners();
  }

  void toggleBookmarkMaterial(String materialId) {
    int paperIndex = _previousPapers.indexWhere((m) => m.id == materialId);
    if (paperIndex != -1) {
      _previousPapers[paperIndex] = _previousPapers[paperIndex].copyWith(
        isBookmarked: !_previousPapers[paperIndex].isBookmarked,
      );
      notifyListeners();
      return;
    }

    int notesIndex = _notesAndBooks.indexWhere((m) => m.id == materialId);
    if (notesIndex != -1) {
      _notesAndBooks[notesIndex] = _notesAndBooks[notesIndex].copyWith(
        isBookmarked: !_notesAndBooks[notesIndex].isBookmarked,
      );
      notifyListeners();
    }
  }
}
