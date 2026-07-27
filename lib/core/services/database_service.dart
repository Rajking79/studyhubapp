import '../../models/college_model.dart';
import '../../models/course_model.dart';
import '../../models/subject_model.dart';
import '../../models/study_material_model.dart';
import '../utils/dummy_data.dart';
import 'api_service.dart';

class DatabaseService {
  final ApiService _apiService = ApiService();

  final List<CollegeModel> _localColleges = DummyData.getColleges();
  final List<CourseModel> _localCourses = DummyData.getCourses();
  final List<SubjectModel> _localSubjects = DummyData.getSubjects();
  final List<StudyMaterialModel> _localPapers = DummyData.getPreviousPapers();
  final List<StudyMaterialModel> _localNotesAndBooks = DummyData.getNotesAndBooks();

  Future<List<CollegeModel>> fetchColleges({String category = 'All', String query = ''}) async {
    try {
      final res = await _apiService.getCollegesList(search: query, category: category);
      if (res is List && res.isNotEmpty) {
        return res.map((item) => CollegeModel.fromJson(Map<String, dynamic>.from(item))).toList();
      }
    } catch (_) {}

    // Fallback to local data
    var list = _localColleges;
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

  Future<List<CourseModel>> fetchCourses({String collegeId = 'du_dtu'}) async {
    try {
      final res = await _apiService.getCourses(collegeId: collegeId);
      if (res is List && res.isNotEmpty) {
        return res.map((item) => CourseModel.fromJson(Map<String, dynamic>.from(item))).toList();
      }
    } catch (_) {}
    return _localCourses;
  }

  Future<List<SubjectModel>> fetchSubjects({String courseId = 'btech_cs', String semester = 'Sem 4', String query = ''}) async {
    try {
      final res = await _apiService.getSubjects(courseId: courseId, semester: semester, search: query);
      if (res is List && res.isNotEmpty) {
        return res.map((item) => SubjectModel.fromJson(Map<String, dynamic>.from(item))).toList();
      }
    } catch (_) {}

    if (query.isEmpty) return _localSubjects;
    return _localSubjects
        .where((s) => s.title.toLowerCase().contains(query.toLowerCase()))
        .toList();
  }

  Future<SubjectModel?> fetchSubjectById(String id) async {
    try {
      final res = await _apiService.getSubjectDetails(id);
      if (res is Map<String, dynamic>) {
        return SubjectModel.fromJson(res);
      }
    } catch (_) {}

    try {
      return _localSubjects.firstWhere((s) => s.id == id);
    } catch (_) {
      return _localSubjects.isNotEmpty ? _localSubjects.first : null;
    }
  }

  Future<List<StudyMaterialModel>> fetchPreviousYearPapers({String subjectId = 'subj_dbms_101', String filter = 'All'}) async {
    try {
      final res = await _apiService.fetchMaterials(
        subjectId: subjectId,
        category: 'pyq',
        tab: 'pdf',
        examType: filter != 'All' ? filter : '',
      );
      if (res is List && res.isNotEmpty) {
        return res.map((item) => StudyMaterialModel.fromJson(Map<String, dynamic>.from(item))).toList();
      }
    } catch (_) {}

    if (filter == 'All') return _localPapers;
    return _localPapers.where((p) => p.examType == filter).toList();
  }

  Future<List<StudyMaterialModel>> fetchNotesAndBooks({String subjectId = 'subj_dbms_101', StudyMaterialType? type}) async {
    try {
      final category = type == StudyMaterialType.book ? 'book' : 'notes';
      final res = await _apiService.fetchMaterials(
        subjectId: subjectId,
        category: category,
        tab: 'pdf',
      );
      if (res is List && res.isNotEmpty) {
        return res.map((item) => StudyMaterialModel.fromJson(Map<String, dynamic>.from(item))).toList();
      }
    } catch (_) {}

    if (type == null) return _localNotesAndBooks;
    return _localNotesAndBooks.where((item) => item.type == type).toList();
  }

  Future<void> recordMaterialDownload(String materialId) async {
    try {
      await _apiService.recordMaterialDownload(materialId);
    } catch (_) {}
  }

  // Admin upload operations
  Future<void> addCollege(CollegeModel college) async {
    _localColleges.insert(0, college);
  }

  Future<void> addStudyMaterial(StudyMaterialModel material) async {
    if (material.type == StudyMaterialType.paper) {
      _localPapers.insert(0, material);
    } else {
      _localNotesAndBooks.insert(0, material);
    }
  }
}
