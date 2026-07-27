import '../../models/user_model.dart';
import 'storage_preference_service.dart';

class AuthService {
  final StoragePreferenceService _storage = StoragePreferenceService();

  UserModel? _currentUser;
  bool _isGuest = false;

  UserModel? get currentUser => _currentUser;
  bool get isGuest => _isGuest;
  bool get isAuthenticated => _currentUser != null || _isGuest;

  Future<void> init() async {
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
    await Future.delayed(const Duration(milliseconds: 900)); // Simulate API delay
    final user = UserModel(
      id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
      name: email.contains('@') ? email.split('@').first : 'Student',
      email: email,
      college: 'Delhi University',
      course: 'B.Tech Computer Science',
      semester: 'Semester 4',
    );
    _currentUser = user;
    _isGuest = false;
    await _storage.saveUserData(user.toJson());
    await _storage.setBool('is_guest', false);
    return user;
  }

  Future<UserModel> signUp({
    required String name,
    required String email,
    required String phone,
    required String college,
    required String course,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 1000));
    final user = UserModel(
      id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      email: email,
      phone: phone,
      college: college,
      course: course,
      semester: 'Semester 1',
    );
    _currentUser = user;
    _isGuest = false;
    await _storage.saveUserData(user.toJson());
    await _storage.setBool('is_guest', false);
    return user;
  }

  Future<UserModel> loginWithGoogle() async {
    await Future.delayed(const Duration(milliseconds: 1000));
    final user = UserModel(
      id: 'usr_google_123',
      name: 'Rahul Verma',
      email: 'rahul.verma21@gmail.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      college: 'Delhi University',
      course: 'B.Tech Computer Science',
      semester: 'Semester 4',
    );
    _currentUser = user;
    _isGuest = false;
    await _storage.saveUserData(user.toJson());
    await _storage.setBool('is_guest', false);
    return user;
  }

  Future<void> continueAsGuest() async {
    _isGuest = true;
    _currentUser = null;
    await _storage.setBool('is_guest', true);
  }

  Future<void> logout() async {
    _currentUser = null;
    _isGuest = false;
    await _storage.clearUserData();
    await _storage.setBool('is_guest', false);
  }
}
