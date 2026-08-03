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

  Future<dynamic> delete(String path, {dynamic body, bool requireAuth = true}) async {
    try {
      final uri = _buildUri(path);
      final response = await http.delete(
        uri,
        headers: _getHeaders(requireAuth: requireAuth),
        body: body != null ? jsonEncode(body) : null,
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
  // MODULE 1: AUTHENTICATION & SECURITY (12 APIs)
  // ==========================================

  // 1. Dev Login
  Future<Map<String, dynamic>> devLogin(String email) async {
    final res = await post('auth/dev-login', body: {'email': email}, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 2. Register New Student Account
  Future<Map<String, dynamic>> registerStudent({
    required String name,
    required String email,
    required String password,
    String? confirmPassword,
    required String phone,
    required String college,
    required String course,
    required String semester,
  }) async {
    final res = await post('auth/register', body: {
      'name': name,
      'email': email,
      'password': password,
      'confirmPassword': confirmPassword ?? password,
      'phone': phone,
      'college': college,
      'course': course,
      'semester': semester,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 3. Login Student Account
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
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 4. Google One-Tap OAuth Login
  Future<Map<String, dynamic>> googleLogin({required String googleIdToken}) async {
    final res = await post('auth/google-login', body: {
      'googleIdToken': googleIdToken,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 5. Guest Mode Login
  Future<Map<String, dynamic>> guestLogin({required String deviceId}) async {
    final res = await post('auth/guest-login', body: {
      'deviceId': deviceId,
    }, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = res['token'] as String?;
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 6. Forgot Password (Send OTP)
  Future<Map<String, dynamic>> forgotPassword({required String email}) async {
    final res = await post('auth/forgot-password', body: {'email': email}, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  // 7. Reset Password (OTP & New Password)
  Future<Map<String, dynamic>> resetPassword({
    required String email,
    required String otp,
    required String newPassword,
    required String confirmPassword,
  }) async {
    final res = await post('auth/reset-password', body: {
      'email': email,
      'otp': otp,
      'newPassword': newPassword,
      'confirmPassword': confirmPassword,
    }, requireAuth: false);
    return res is Map<String, dynamic> ? res : {};
  }

  // 8. Get Current User Profile
  Future<dynamic> getCurrentUserProfile() async {
    return await get('auth/me');
  }

  // 9. Refresh Access Token
  Future<Map<String, dynamic>> refreshToken(String refreshTokenStr) async {
    final res = await post('auth/refresh-token', body: {'refreshToken': refreshTokenStr}, requireAuth: false);
    if (res is Map<String, dynamic>) {
      final token = (res['accessToken'] ?? res['token']) as String?;
      if (token != null && token.isNotEmpty) await setAuthToken(token);
      return Map<String, dynamic>.from(res);
    }
    return {};
  }

  // 10. Logout User Session
  Future<void> logoutStudent() async {
    try {
      await post('auth/logout', requireAuth: true);
    } catch (_) {}
    await clearAuthToken();
  }

  // 11. Logout All Devices
  Future<void> logoutAllDevices() async {
    try {
      await post('auth/logout-all-devices', requireAuth: true);
    } catch (_) {}
    await clearAuthToken();
  }

  // 12. Delete Account
  Future<dynamic> deleteAccount({required String password}) async {
    final res = await delete('auth/delete-account', body: {'password': password});
    await clearAuthToken();
    return res;
  }

  // ==========================================
  // MODULE 2: DASHBOARD & SEARCH (5 APIs)
  // ==========================================

  // 13. Get Home Feed Summary
  Future<dynamic> getHomeFeed() async {
    return await get('dashboard/home');
  }

  // 14. Get Banners Carousel
  Future<dynamic> getBannersCarousel() async {
    return await get('dashboard/banners', requireAuth: false);
  }

  // 15. Get Continue Reading Progress
  Future<dynamic> getContinueReadingProgress() async {
    return await get('dashboard/continue-reading');
  }

  // 16. Update Reading Progress
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

  // 17. Global Search (Text, Voice, Camera)
  Future<dynamic> globalSearch({required String query, String type = 'all'}) async {
    return await get('dashboard/search', queryParams: {
      'q': query,
      'type': type,
    }, requireAuth: false);
  }

  // ==========================================
  // MODULE 3: ACADEMIC HIERARCHY (7 APIs)
  // ==========================================

  // 18. Get Colleges List
  Future<dynamic> getCollegesList({String search = ''}) async {
    final queryParams = <String, String>{};
    if (search.isNotEmpty) queryParams['search'] = search;
    return await get('colleges', queryParams: queryParams, requireAuth: false);
  }

  // 19. Get College Details by ID
  Future<dynamic> getSingleCollegeDetails(String collegeId) async {
    return await get('colleges/$collegeId', requireAuth: false);
  }

  // 20. Step 1: Choose Course (by College ID)
  Future<dynamic> getCourses({required String collegeId}) async {
    return await get('courses', queryParams: {'collegeId': collegeId}, requireAuth: false);
  }

  // 21. Step 2: Choose Academic Year
  Future<dynamic> getYears({required String courseId}) async {
    return await get('courses/$courseId/years', requireAuth: false);
  }

  // 22. Step 3: Choose Semester
  Future<dynamic> getSemesters({required String courseId, required dynamic year}) async {
    return await get('courses/$courseId/semesters', queryParams: {'year': year.toString()}, requireAuth: false);
  }

  // 23. Step 4: Choose Subject (Course + Semester)
  Future<dynamic> getSubjects({required String courseId, required String semester, String search = ''}) async {
    final queryParams = {
      'courseId': courseId,
      'semester': semester,
    };
    if (search.isNotEmpty) queryParams['search'] = search;
    return await get('subjects', queryParams: queryParams, requireAuth: false);
  }

  // 24. Get Subject Details
  Future<dynamic> getSubjectDetails(String subjectId) async {
    return await get('subjects/$subjectId', requireAuth: false);
  }

  // ==========================================
  // MODULE 4: STUDY MATERIALS & MEDIA (9 APIs)
  // ==========================================

  // 25. Filter Materials by Category
  Future<dynamic> fetchMaterials({
    String category = '',
    String subjectId = '',
    String tab = 'pdf',
  }) async {
    final queryParams = <String, String>{};
    if (category.isNotEmpty) queryParams['category'] = category;
    if (subjectId.isNotEmpty) queryParams['subjectId'] = subjectId;
    if (tab.isNotEmpty) queryParams['tab'] = tab;
    return await get('materials', queryParams: queryParams, requireAuth: false);
  }

  // 26. Get Material Details by ID
  Future<dynamic> getSingleMaterialDetails(String materialId) async {
    return await get('materials/$materialId', requireAuth: false);
  }

  // 27. Get Previous 5 Years Question Papers (PYQs)
  Future<dynamic> getPyqs({required String subjectId, dynamic year}) async {
    final queryParams = {'subjectId': subjectId};
    if (year != null) queryParams['year'] = year.toString();
    return await get('pyqs', queryParams: queryParams, requireAuth: false);
  }

  // 28. Get Semester Notes
  Future<dynamic> getNotes({required String subjectId}) async {
    return await get('notes', queryParams: {'subjectId': subjectId}, requireAuth: false);
  }

  // 29. Get E-Books & Textbooks
  Future<dynamic> getBooks({required String subjectId}) async {
    return await get('books', queryParams: {'subjectId': subjectId}, requireAuth: false);
  }

  // 30. Get Video Lectures
  Future<dynamic> getVideos({required String subjectId}) async {
    return await get('videos', queryParams: {'subjectId': subjectId}, requireAuth: false);
  }

  // 31. Get Question Bank
  Future<dynamic> getQuestionBank({required String subjectId}) async {
    return await get('question-bank', queryParams: {'subjectId': subjectId}, requireAuth: false);
  }

  // 32. Stream Video Lecture URL
  Future<dynamic> streamVideo(String videoId) async {
    return await get('videos/$videoId/stream', requireAuth: false);
  }

  // 33. Download Material PDF
  Future<dynamic> downloadMaterial(String materialId) async {
    return await get('materials/$materialId/download');
  }

  // ==========================================
  // MODULE 5: AI ASSISTANT & SNAP-SOLVE (4 APIs)
  // ==========================================

  // 34. Ask AI Assistant (GPT-4o Mini Doubt Solver)
  Future<dynamic> askAiAssistant({
    required String prompt,
    String subjectContext = '',
  }) async {
    return await post('ai/chat', body: {
      'prompt': prompt,
      'subjectContext': subjectContext,
    });
  }

  // 35. Snap & Solve (Camera OCR Question Solver)
  Future<dynamic> snapAndSolve({
    String note = '',
    String subjectContext = '',
    String imageBase64 = '',
  }) async {
    return await post('ai/snap-and-solve', body: {
      'note': note,
      'subjectContext': subjectContext,
      if (imageBase64.isNotEmpty) 'imageBase64': imageBase64,
    });
  }

  // 36. Get AI Chat History
  Future<dynamic> getAiHistory() async {
    return await get('ai/history');
  }

  // 37. Clear AI Chat History
  Future<dynamic> clearAiHistory() async {
    return await delete('ai/history/clear');
  }

  // ==========================================
  // MODULE 6: TOOLS & CALCULATORS (8 APIs)
  // ==========================================

  // 38. Calculate CGPA & Percentage
  Future<dynamic> calculateCgpa({
    required String semester,
    required List<Map<String, dynamic>> subjects,
  }) async {
    return await post('tools/cgpa/calculate', body: {
      'semester': semester,
      'subjects': subjects,
    });
  }

  // 39. Get Saved CGPA Records
  Future<dynamic> getCgpaRecords() async {
    return await get('tools/cgpa/records');
  }

  // 40. Save CGPA Result Record
  Future<dynamic> saveCgpaRecord({
    required String title,
    required double gpaResult,
  }) async {
    return await post('tools/cgpa/save', body: {
      'title': title,
      'gpaResult': gpaResult,
    });
  }

  // 41. Get 75% Attendance Summary
  Future<dynamic> getAttendanceSummary() async {
    return await get('tools/attendance/summary');
  }

  // 42. Add Attendance Subject Tracker
  Future<dynamic> addAttendanceSubject({
    required String subjectName,
    required int targetPercentage,
  }) async {
    return await post('tools/attendance/subjects', body: {
      'subjectName': subjectName,
      'targetPercentage': targetPercentage,
    });
  }

  // 43. Mark Class Attendance (Present/Absent)
  Future<dynamic> markAttendance({
    required String subjectId,
    required String status,
  }) async {
    return await post('tools/attendance/mark', body: {
      'subjectId': subjectId,
      'status': status,
    });
  }

  // 44. Update Attendance Subject
  Future<dynamic> updateAttendanceSubject({
    required String subjectId,
    required String subjectName,
  }) async {
    return await put('tools/attendance/subjects/$subjectId', body: {
      'subjectName': subjectName,
    });
  }

  // 45. Delete Attendance Subject
  Future<dynamic> deleteAttendanceSubject(String subjectId) async {
    return await delete('tools/attendance/subjects/$subjectId');
  }

  // ==========================================
  // MODULE 7: USER PROFILE & ENGAGEMENT (9 APIs)
  // ==========================================

  // 46. Get Student Profile
  Future<dynamic> getStudentProfile() async {
    return await get('user/profile');
  }

  // 47. Update Student Profile
  Future<dynamic> updateStudentProfile({
    String? name,
    String? college,
    String? course,
    String? semester,
    String? phone,
  }) async {
    final body = <String, dynamic>{};
    if (name != null) body['name'] = name;
    if (college != null) body['college'] = college;
    if (course != null) body['course'] = course;
    if (semester != null) body['semester'] = semester;
    if (phone != null) body['phone'] = phone;
    return await put('user/profile', body: body);
  }

  // 48. Get User Bookmarks / Favorites List
  Future<dynamic> getFavorites() async {
    return await get('favorites');
  }

  // 49. Add Material to Favorites
  Future<dynamic> addFavorite(String materialId) async {
    return await post('favorites/add', body: {'materialId': materialId});
  }

  // 50. Remove Material from Favorites
  Future<dynamic> removeFavorite(String materialId) async {
    return await delete('favorites/remove/$materialId');
  }

  // 51. Get My Uploaded Materials
  Future<dynamic> getMyUploads() async {
    return await get('user/uploads');
  }

  // 52. Upload New Material PDF (Student Upload)
  Future<dynamic> uploadMaterial({
    required String title,
    required String category,
    required String subjectId,
  }) async {
    return await post('materials/upload', body: {
      'title': title,
      'category': category,
      'subjectId': subjectId,
    });
  }

  // 53. Get Student Referral Code & Link
  Future<dynamic> getReferralDetails() async {
    return await get('user/referral');
  }

  // 54. Submit App Feedback or Support Ticket
  Future<dynamic> createSupportTicket({
    required String subject,
    required String message,
  }) async {
    return await post('support/tickets', body: {
      'subject': subject,
      'message': message,
    });
  }

  // Extra Compatibility Methods
  Future<dynamic> recordMaterialDownload(String materialId) async {
    return await post('materials/$materialId/download');
  }

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

  Future<dynamic> getAllNotifications({String category = ''}) async {
    final queryParams = <String, String>{};
    if (category.isNotEmpty) queryParams['category'] = category;
    return await get('notifications', queryParams: queryParams);
  }
}


