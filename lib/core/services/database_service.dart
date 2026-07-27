import '../../models/college_model.dart';
import '../../models/course_model.dart';
import '../../models/subject_model.dart';
import '../../models/study_material_model.dart';
import '../utils/dummy_data.dart';

class DatabaseService {
  final List<CollegeModel> _colleges = DummyData.getColleges();
  final List<CourseModel> _courses = DummyData.getCourses();
  final List<SubjectModel> _subjects = DummyData.getSubjects();
  final List<StudyMaterialModel> _papers = DummyData.getPreviousPapers();
  final List<StudyMaterialModel> _notesAndBooks = DummyData.getNotesAndBooks();

  Future<List<CollegeModel>> fetchColleges({String category = 'All', String query = ''}) async {
    await Future.delayed(const Duration(milliseconds: 300));
    var list = _colleges;
    if (category != 'All') {
      list = list.where((c) => c.category == category).toList();
    }
    if (query.isNotEmpty) {
      list = list
          .where((c) =>
              c.name.toLowerCase().contains(query.toLowerCase()) ||
              c.location.toLowerCase().contains(query.toLowerCase()))
          .toList();
    }
    return list;
  }

  Future<List<CourseModel>> fetchCourses() async {
    return _courses;
  }

  Future<List<SubjectModel>> fetchSubjects({String query = ''}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (query.isEmpty) return _subjects;
    return _subjects
        .where((s) => s.title.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }

  Future<SubjectModel?> fetchSubjectById(String id) async {
    try {
      return _subjects.firstWhere((s) => s.id == id);
    } catch (_) {
      return _subjects.isNotEmpty ? _subjects.first : null;
    }
  }

  Future<List<StudyMaterialModel>> fetchPreviousYearPapers({String filter = 'All'}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (filter == 'All') return _papers;
    return _papers.where((p) => p.examType == filter).toList();
  }

  Future<List<StudyMaterialModel>> fetchNotesAndBooks({StudyMaterialType? type}) async {
    await Future.delayed(const Duration(milliseconds: 250));
    if (type == null) return _notesAndBooks;
    return _notesAndBooks.where((item) => item.type == type).toList();
  }

  // Admin upload operations
  Future<void> addCollege(CollegeModel college) async {
    _colleges.insert(0, college);
  }

  Future<void> addStudyMaterial(StudyMaterialModel material) async {
    if (material.type == StudyMaterialType.paper) {
      _papers.insert(0, material);
    } else {
      _notesAndBooks.insert(0, material);
    }
  }
}
