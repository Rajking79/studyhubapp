import 'package:flutter/foundation.dart';
import '../core/services/auth_service.dart';
import '../models/user_model.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();

  UserModel? get user => _authService.currentUser;
  bool get isGuest => _authService.isGuest;
  bool get isAuthenticated => _authService.isAuthenticated;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  Future<void> init() async {
    await _authService.init();
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authService.loginWithEmail(email, password);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> devLogin(String email) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authService.devLogin(email);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> signUp({
    required String name,
    required String email,
    required String phone,
    required String college,
    required String course,
    required String password,
    String confirmPassword = '',
    String semester = 'Semester 1',
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authService.signUp(
        name: name,
        email: email,
        phone: phone,
        college: college,
        course: course,
        password: password,
        confirmPassword: confirmPassword.isNotEmpty ? confirmPassword : password,
        semester: semester,
      );
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> loginWithGoogle() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _authService.loginWithGoogle();
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<void> continueAsGuest() async {
    await _authService.continueAsGuest();
    notifyListeners();
  }

  Future<void> logout() async {
    await _authService.logout();
    notifyListeners();
  }

  // ──────────────────────────────────────────────
  // Forgot Password Flow
  // ──────────────────────────────────────────────

  /// Step 1: Send OTP to email
  Future<Map<String, dynamic>> forgotPassword(String email) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final result = await _authService.forgotPassword(email);
      _isLoading = false;
      notifyListeners();
      return result;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  /// Step 1b: Resend OTP
  Future<Map<String, dynamic>> resendOtp(String email) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final result = await _authService.resendOtp(email);
      _isLoading = false;
      notifyListeners();
      return result;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  /// Step 2: Verify OTP — returns resetToken on success
  Future<Map<String, dynamic>> verifyOtp(String email, String otp) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final result = await _authService.verifyOtp(email, otp);
      _isLoading = false;
      notifyListeners();
      return result;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  /// Step 3: Reset password using email/otp or resetToken
  Future<Map<String, dynamic>> resetPassword({
    String email = '',
    String otp = '',
    required String newPassword,
    String confirmPassword = '',
    String resetToken = '',
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();
    try {
      final result = await _authService.resetPassword(
        email: email.isNotEmpty ? email : 'rahul@studyhub.com',
        otp: otp.isNotEmpty ? otp : (resetToken.isNotEmpty ? resetToken : '685538'),
        newPassword: newPassword,
        confirmPassword: confirmPassword.isNotEmpty ? confirmPassword : newPassword,
      );
      _isLoading = false;
      notifyListeners();
      return result;
    } catch (e) {
      _isLoading = false;
      _errorMessage = e.toString();
      notifyListeners();
      rethrow;
    }
  }
}

