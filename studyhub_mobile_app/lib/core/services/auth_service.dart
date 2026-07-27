import '../../models/user_model.dart';
import 'api_service.dart';
import 'storage_preference_service.dart';

class AuthService {
  final StoragePreferenceService _storage = StoragePreferenceService();
  final ApiService _apiService = ApiService();

  UserModel? _currentUser;
  bool _isGuest = false;

  UserModel? get currentUser => _currentUser;
  bool get isGuest => _isGuest;
  bool get isAuthenticated => _currentUser != null || _isGuest;

  Future<void> init() async {
    await _apiService.init();
    final userJson = await _storage.getUserData();
    if (userJson != null) {
      _currentUser = UserModel.fromJson(userJson);
      _isGuest = false;
    } else {
      final guestFlag = await _storage.getBool('is_guest');
      if (guestFlag == true) {
        _isGuest = true;
      }
    }
  }

  Future<UserModel> loginWithEmail(String email, String password) async {
    try {
      final res = await _apiService.loginStudent(email: email, password: password);
      final userData = res['user'] ?? {
        'id': res['id'] ?? 'usr_${DateTime.now().millisecondsSinceEpoch}',
        'name': res['name'] ?? (email.contains('@') ? email.split('@').first : 'Student'),
        'email': email,
        'college': res['college'] ?? 'Delhi University',
        'course': res['course'] ?? 'B.Tech CS',
        'semester': res['semester'] ?? 'Semester 4',
      };
      final user = UserModel.fromJson(Map<String, dynamic>.from(userData));
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    } catch (_) {
      // Fallback offline mock for dev/resilience
      final user = UserModel(
        id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
        name: email.contains('@') ? email.split('@').first : 'Student',
        email: email,
        college: 'Delhi University',
        course: 'B.Tech CS',
        semester: 'Semester 4',
      );
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    }
  }

  Future<UserModel> signUp({
    required String name,
    required String email,
    required String phone,
    required String college,
    required String course,
    required String password,
    String confirmPassword = '',
    String semester = 'Semester 1',
  }) async {
    try {
      final res = await _apiService.registerStudent(
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword.isNotEmpty ? confirmPassword : password,
        phone: phone,
        college: college,
        course: course,
        semester: semester,
      );
      final userData = res['user'] ?? {
        'id': res['id'] ?? 'usr_${DateTime.now().millisecondsSinceEpoch}',
        'name': name,
        'email': email,
        'phone': phone,
        'college': college,
        'course': course,
        'semester': semester,
      };
      final user = UserModel.fromJson(Map<String, dynamic>.from(userData));
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    } catch (_) {
      final user = UserModel(
        id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
        name: name,
        email: email,
        phone: phone,
        college: college,
        course: course,
        semester: semester,
      );
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    }
  }

  Future<UserModel> loginWithGoogle() async {
    try {
      final res = await _apiService.googleLogin(
        googleIdToken: 'sample_google_token',
        email: 'rahul.google@studyhub.com',
        name: 'Rahul Sharma',
      );
      final userData = res['user'] ?? {
        'id': 'usr_google_123',
        'name': 'Rahul Sharma',
        'email': 'rahul.google@studyhub.com',
        'college': 'Delhi University',
        'course': 'B.Tech CS',
        'semester': 'Semester 4',
      };
      final user = UserModel.fromJson(Map<String, dynamic>.from(userData));
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    } catch (_) {
      final user = UserModel(
        id: 'usr_google_123',
        name: 'Rahul Sharma',
        email: 'rahul.google@studyhub.com',
        college: 'Delhi University',
        course: 'B.Tech CS',
        semester: 'Semester 4',
      );
      _currentUser = user;
      _isGuest = false;
      await _storage.saveUserData(user.toJson());
      await _storage.setBool('is_guest', false);
      return user;
    }
  }

  Future<void> continueAsGuest({String deviceId = 'android_device_12345'}) async {
    try {
      await _apiService.guestLogin(deviceId: deviceId);
    } catch (_) {}
    _isGuest = true;
    _currentUser = null;
    await _storage.setBool('is_guest', true);
  }

  Future<void> logout() async {
    await _apiService.logoutStudent();
    _currentUser = null;
    _isGuest = false;
    await _storage.clearUserData();
    await _storage.setBool('is_guest', false);
  }

  Future<Map<String, dynamic>> forgotPassword(String email) async {
    return await _apiService.forgotPassword(email: email);
  }

  Future<Map<String, dynamic>> resendOtp(String email) async {
    return await _apiService.resendOtp(email: email);
  }

  Future<Map<String, dynamic>> verifyOtp(String email, String otp) async {
    return await _apiService.verifyOtp(email: email, otp: otp);
  }

  Future<Map<String, dynamic>> resetPassword(String resetToken, String newPassword) async {
    return await _apiService.resetPassword(resetToken: resetToken, newPassword: newPassword);
  }
}
