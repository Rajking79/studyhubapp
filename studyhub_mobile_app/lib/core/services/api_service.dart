import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../constants/app_constants.dart';
import 'storage_preference_service.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  final StoragePreferenceService _storage = StoragePreferenceService();
  String? _authToken;

  String? get authToken => _authToken;

  Future<void> init() async {
    _authToken = await _storage.getString('auth_token');
  }

  Future<void> setAuthToken(String token) async {
    _authToken = token;
    await _storage.setString('auth_token', token);
  }

  Future<void> clearAuthToken() async {
    _authToken = null;
    await _storage.remove('auth_token');
  }

  Map<String, String> _getHeaders({bool requireAuth = true}) {
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (requireAuth && _authToken != null && _authToken!.isNotEmpty) {
      headers['Authorization'] = 'Bearer $_authToken';
    }
    return headers;
  }

  Uri _buildUri(String path, [Map<String, String>? queryParams]) {
    final cleanPath = path.startsWith('/') ? path.substring(1) : path;
    final urlStr = '${AppConstants.apiBaseUrl}/$cleanPath';
    return Uri.parse(urlStr).replace(queryParameters: queryParams);
  }

  Future<dynamic> get(String path, {Map<String, String>? queryParams, bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path, queryParams);
      final response = await http.get(uri, headers: _getHeaders(requireAuth: requireAuth)).timeout(const Duration(seconds: 15));
      return _processResponse(response);
    } catch (e) {
      if (kDebugMode) print('API GET Error [$path]: $e');
      rethrow;
    }
  }

  Future<dynamic> post(String path, {dynamic body, bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path);
      final response = await http.post(
        uri,
        headers: _getHeaders(requireAuth: requireAuth),
        body: body != null ? jsonEncode(body) : null,
      ).timeout(const Duration(seconds: 15));
      return _processResponse(response);
    } catch (e) {
      if (kDebugMode) print('API POST Error [$path]: $e');
      rethrow;
    }
  }

  Future<dynamic> put(String path, {dynamic body, bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path);
      final response = await http.put(
        uri,
        headers: _getHeaders(requireAuth: requireAuth),
        body: body != null ? jsonEncode(body) : null,
      ).timeout(const Duration(seconds: 15));
      return _processResponse(response);
    } catch (e) {
      if (kDebugMode) print('API PUT Error [$path]: $e');
      rethrow;
    }
  }

  Future<dynamic> patch(String path, {dynamic body, bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path);
      final response = await http.patch(
        uri,
        headers: _getHeaders(requireAuth: requireAuth),
        body: body != null ? jsonEncode(body) : null,
      ).timeout(const Duration(seconds: 15));
      return _processResponse(response);
    } catch (e) {
      if (kDebugMode) print('API PATCH Error [$path]: $e');
      rethrow;
    }
  }

  Future<dynamic> delete(String path, {bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path);
      final response = await http.delete(
        uri,
        headers: _getHeaders(requireAuth: requireAuth),
      ).timeout(const Duration(seconds: 15));
      return _processResponse(response);
    } catch (e) {
      if (kDebugMode) print('API DELETE Error [$path]: $e');
      rethrow;
    }
  }

  dynamic _processResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return {'success': true};
      final decoded = jsonDecode(response.body);
      // Auto-unwrap standard ApiResponse wrapper: { success, statusCode, message, data }
      if (decoded is Map<String, dynamic> &&
          decoded.containsKey('data') &&
          decoded['data'] != null) {
        return decoded['data'];
      }
      return decoded;
    } else {
      String message = 'HTTP Error ${response.statusCode}';
      try {
        final errJson = jsonDecode(response.body);
        if (errJson is Map && errJson.containsKey('message')) {
          message = errJson['message'];
        }
      } catch (_) {}
      throw Exception(message);
    }
  }

  // ==========================================
  // 1. AUTHENTICATION & LOGIN APIs
  // ==========================================

  Future<Map<String, dynamic>> registerStudent({
    required String name,
    required String email,
    required String password,
    required String confirmPassword,
    required String phone,
    required String college,
    required String course,
    required String semester,
  }) async {
    final res = await post('auth/register', body: {
      'name': name,
      'email': email,
      'password': password,
      'confirmPassword': confirmPassword,
      'phone': phone,
      'college': college,
      'course': course,
      'semester': semester,
    }, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  Future<Map<String, dynamic>> loginStudent({
    required String email,
    required String password,
  }) async {
    final res = await post('auth/login', body: {
      'email': email,
      'password': password,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) {
        await setAuthToken(token);
      }
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  Future<Map<String, dynamic>> googleLogin({
    required String googleIdToken,
    required String email,
    required String name,
  }) async {
    final res = await post('auth/google-login', body: {
      'googleIdToken': googleIdToken,
      'email': email,
      'name': name,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) {
        await setAuthToken(token);
      }
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  Future<Map<String, dynamic>> guestLogin({required String deviceId}) async {
    final res = await post('auth/guest-login', body: {
      'deviceId': deviceId,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) {
        await setAuthToken(token);
      }
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  Future<void> logoutStudent() async {
    try {
      await post('auth/logout', requireAuth: true);
    } catch (_) {}
    await clearAuthToken();
  }

  Future<Map<String, dynamic>> forgotPassword({required String email}) async {
    final res = await post('auth/forgot-password', body: {'email': email}, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  Future<Map<String, dynamic>> resendOtp({required String email}) async {
    final res = await post('auth/resend-otp', body: {'email': email}, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  Future<Map<String, dynamic>> verifyOtp({required String email, required String otp}) async {
    final res = await post('auth/verify-otp', body: {'email': email, 'otp': otp}, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  Future<Map<String, dynamic>> resetPassword({required String resetToken, required String newPassword}) async {
    final res = await post('auth/reset-password', body: {
      'resetToken': resetToken,
      'newPassword': newPassword,
    }, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  // ==========================================
  // 2. DASHBOARD & HOME FEED APIs
  // ==========================================

  Future<dynamic> getHomeFeed() async {
    return await get('dashboard/home');
  }

  Future<dynamic> getBannersCarousel() async {
    return await get('dashboard/banners');
  }

  Future<dynamic> getContinueReadingProgress() async {
    return await get('dashboard/continue-reading');
  }

  Future<dynamic> updateReadingProgress({
    required String materialId,
    required int lastPage,
    required int lastTimeSeconds,
  }) async {
    return await post('dashboard/update-progress', body: {
      'materialId': materialId,
      'lastPage': lastPage,
      'lastTimeSeconds': lastTimeSeconds,
    });
  }

  Future<dynamic> globalSearch({required String query, String type = 'all'}) async {
    return await get('dashboard/search', queryParams: {
      'q': query,
      'type': type,
    });
  }

  // ==========================================
  // 3. ACADEMIC CATALOG & HIERARCHY APIs
  // ==========================================

  Future<dynamic> getCollegesList({String search = '', String category = ''}) async {
    final queryParams = <String, String>{};
    if (search.isNotEmpty) queryParams['search'] = search;
    if (category.isNotEmpty && category != 'All') queryParams['category'] = category;
    return await get('colleges', queryParams: queryParams);
  }

  Future<dynamic> getSingleCollegeDetails(String collegeId) async {
    return await get('colleges/$collegeId');
  }

  Future<dynamic> getCourses({required String collegeId}) async {
    return await get('courses', queryParams: {'collegeId': collegeId});
  }

  Future<dynamic> getYears({required String courseId}) async {
    return await get('courses/$courseId/years');
  }

  Future<dynamic> getSemesters({required String courseId, required int year}) async {
    return await get('courses/$courseId/semesters', queryParams: {'year': year.toString()});
  }

  Future<dynamic> getSubjects({required String courseId, required String semester, String search = ''}) async {
    final queryParams = {
      'courseId': courseId,
      'semester': semester,
    };
    if (search.isNotEmpty) queryParams['search'] = search;
    return await get('subjects', queryParams: queryParams);
  }

  Future<dynamic> getSubjectDetails(String subjectId) async {
    return await get('subjects/$subjectId');
  }

  // ==========================================
  // 4. STUDY CONTENT & 6 CARDS SYSTEM APIs
  // ==========================================

  Future<dynamic> fetchMaterials({
    required String subjectId,
    String category = '',
    String tab = 'pdf',
    String examType = '',
  }) async {
    final queryParams = {'subjectId': subjectId, 'tab': tab};
    if (category.isNotEmpty) queryParams['category'] = category;
    if (examType.isNotEmpty) queryParams['examType'] = examType;
    return await get('materials', queryParams: queryParams);
  }

  Future<dynamic> getSingleMaterialDetails(String materialId) async {
    return await get('materials/$materialId');
  }

  Future<dynamic> recordMaterialDownload(String materialId) async {
    return await post('materials/$materialId/download');
  }

  // ==========================================
  // 5. CGPA TOOLS & ATTENDANCE TRACKER APIs
  // ==========================================

  Future<dynamic> getCgpaHistory() async {
    return await get('tools/cgpa');
  }

  Future<dynamic> calculateAndSaveCgpa({
    required String semester,
    required List<Map<String, dynamic>> subjects,
  }) async {
    return await post('tools/cgpa/calculate', body: {
      'semester': semester,
      'subjects': subjects,
    });
  }

  Future<dynamic> getAttendanceSummary() async {
    return await get('tools/attendance');
  }

  Future<dynamic> addAttendanceSubject({
    required String subjectName,
    required int attended,
    required int total,
    required int targetPercentage,
  }) async {
    return await post('tools/attendance/subject', body: {
      'subjectName': subjectName,
      'attended': attended,
      'total': total,
      'targetPercentage': targetPercentage,
    });
  }

  Future<dynamic> markDailyAttendance({
    required String subjectId,
    required String status,
  }) async {
    return await patch('tools/attendance/mark', body: {
      'subjectId': subjectId,
      'status': status,
    });
  }

  // ==========================================
  // 6. STUDYHUB AI ASSISTANT & SNAP & SOLVE APIs
  // ==========================================

  Future<dynamic> askAiAssistant({
    required String prompt,
    String subjectContext = '',
  }) async {
    return await post('ai/chat', body: {
      'prompt': prompt,
      'subjectContext': subjectContext,
    });
  }

  Future<dynamic> snapAndSolve({
    required String imageBase64,
    String note = '',
  }) async {
    return await post('ai/snap-solve', body: {
      'imageBase64': imageBase64,
      'note': note,
    });
  }

  // ==========================================
  // 7. OFFLINE DOWNLOADS & BOOKMARKS APIs
  // ==========================================

  Future<dynamic> getMyDownloadedFiles() async {
    return await get('downloads/my-downloads');
  }

  Future<dynamic> syncOfflineStorage({
    required double totalStorageUsedMB,
    required List<String> downloadedIds,
  }) async {
    return await post('downloads/sync-storage', body: {
      'totalStorageUsedMB': totalStorageUsedMB,
      'downloadedIds': downloadedIds,
    });
  }

  Future<dynamic> toggleBookmark({
    required String targetType,
    required String targetId,
  }) async {
    return await post('favorites/toggle', body: {
      'targetType': targetType,
      'targetId': targetId,
    });
  }

  Future<dynamic> getBookmarksList() async {
    return await get('favorites');
  }

  // ==========================================
  // 8. STUDENT PROFILE & SUPPORT APIs
  // ==========================================

  Future<dynamic> getStudentProfile() async {
    return await get('user/profile');
  }

  Future<dynamic> editStudentProfile({
    required String name,
    required String phone,
    required String college,
    required String course,
    required String semester,
  }) async {
    return await put('user/profile', body: {
      'name': name,
      'phone': phone,
      'college': college,
      'course': course,
      'semester': semester,
    });
  }

  Future<dynamic> submitStudentFeedback({
    required String type,
    required String message,
    required int rating,
  }) async {
    return await post('support/feedback', body: {
      'type': type,
      'message': message,
      'rating': rating,
    });
  }

  Future<dynamic> getAllNotifications({String category = ''}) async {
    final queryParams = <String, String>{};
    if (category.isNotEmpty) queryParams['category'] = category;
    return await get('notifications', queryParams: queryParams);
  }
}
