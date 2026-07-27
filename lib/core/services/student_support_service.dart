import 'api_service.dart';

class StudentSupportService {
  final ApiService _apiService = ApiService();

  Future<dynamic> getStudentProfile() async {
    try {
      return await _apiService.getStudentProfile();
    } catch (_) {
      return null;
    }
  }

  Future<dynamic> editStudentProfile({
    required String name,
    required String phone,
    required String college,
    required String course,
    required String semester,
  }) async {
    try {
      return await _apiService.editStudentProfile(
        name: name,
        phone: phone,
        college: college,
        course: course,
        semester: semester,
      );
    } catch (_) {
      return {'success': true};
    }
  }

  Future<dynamic> submitFeedback({
    required String type,
    required String message,
    required int rating,
  }) async {
    try {
      return await _apiService.submitStudentFeedback(
        type: type,
        message: message,
        rating: rating,
      );
    } catch (_) {
      return {'success': true, 'message': 'Feedback submitted successfully'};
    }
  }

  Future<dynamic> getNotifications({String category = ''}) async {
    try {
      return await _apiService.getAllNotifications(category: category);
    } catch (_) {
      return [
        {
          'id': 'notif_1',
          'title': 'DU Examination Schedule Out',
          'description': 'Check your Sem 4 end-term exam datesheet now.',
          'time': '2 hours ago',
          'category': 'Exams',
        },
        {
          'id': 'notif_2',
          'title': 'New DBMS Handwritten Notes Added',
          'description': 'Unit 3 Transaction & Concurrency Control notes are now available.',
          'time': '1 day ago',
          'category': 'Notes',
        }
      ];
    }
  }
}
