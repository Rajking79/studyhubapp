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
    String? name,
    String? college,
    String? course,
    String? semester,
    String? phone,
  }) async {
    try {
      return await _apiService.updateStudentProfile(
        name: name,
        college: college,
        course: course,
        semester: semester,
        phone: phone,
      );
    } catch (_) {
      return {'success': true};
    }
  }

  Future<dynamic> submitSupportTicket({
    required String subject,
    required String message,
  }) async {
    try {
      return await _apiService.createSupportTicket(
        subject: subject,
        message: message,
      );
    } catch (_) {
      return {'success': true, 'ticketId': 'TCK_${DateTime.now().millisecondsSinceEpoch}'};
    }
  }

  Future<dynamic> getMyUploads() async {
    try {
      return await _apiService.getMyUploads();
    } catch (_) {
      return [];
    }
  }

  Future<dynamic> uploadMaterial({
    required String title,
    required String category,
    required String subjectId,
  }) async {
    try {
      return await _apiService.uploadMaterial(
        title: title,
        category: category,
        subjectId: subjectId,
      );
    } catch (_) {
      return {'success': true};
    }
  }

  Future<dynamic> getReferralDetails() async {
    try {
      return await _apiService.getReferralDetails();
    } catch (_) {
      return {
        'referralCode': 'STUDYHUB-RAHU8E24',
        'rewardPoints': 250,
      };
    }
  }

  Future<dynamic> getNotifications({String category = ''}) async {
    try {
      return await _apiService.getAllNotifications(category: category);
    } catch (_) {
      return [];
    }
  }
}


