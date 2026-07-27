import 'package:go_router/go_router.dart';
import '../screens/ai/snap_and_solve_screen.dart';
import '../screens/analytics/study_progress_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/college/college_list_screen.dart';
import '../screens/course/course_selection_screen.dart';
import '../screens/main_wrapper.dart';
import '../screens/notes/notes_and_books_screen.dart';
import '../screens/notifications/notifications_screen.dart';
import '../screens/onboarding/onboarding_screen.dart';
import '../screens/papers/previous_year_papers_screen.dart';
import '../screens/pdf/pdf_viewer_screen.dart';
import '../screens/referral/invite_friends_screen.dart';
import '../screens/search/search_screen.dart';
import '../screens/semester/semester_selection_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/splash/splash_screen.dart';
import '../screens/subject/subject_details_screen.dart';
import '../screens/subject/subject_list_screen.dart';
import '../screens/tools/student_tools_screen.dart';
import '../screens/video/video_lectures_screen.dart';
import '../screens/year/year_selection_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const MainWrapper(initialIndex: 0),
      ),
      GoRoute(
        path: '/search',
        builder: (context, state) => const SearchScreen(),
      ),
      GoRoute(
        path: '/downloads',
        builder: (context, state) => const MainWrapper(initialIndex: 2),
      ),
      GoRoute(
        path: '/favorites',
        builder: (context, state) => const MainWrapper(initialIndex: 3),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => const MainWrapper(initialIndex: 4),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
      GoRoute(
        path: '/notifications',
        builder: (context, state) => const NotificationsScreen(),
      ),
      GoRoute(
        path: '/tools',
        builder: (context, state) => const StudentToolsScreen(),
      ),
      GoRoute(
        path: '/progress',
        builder: (context, state) => const StudyProgressScreen(),
      ),
      GoRoute(
        path: '/snap-solve',
        builder: (context, state) => const SnapAndSolveScreen(),
      ),
      GoRoute(
        path: '/invite',
        builder: (context, state) => const InviteFriendsScreen(),
      ),
      GoRoute(
        path: '/videos',
        builder: (context, state) => const VideoLecturesScreen(),
      ),
      GoRoute(
        path: '/colleges',
        builder: (context, state) => const CollegeListScreen(),
      ),
      GoRoute(
        path: '/courses',
        builder: (context, state) => const CourseSelectionScreen(),
      ),
      GoRoute(
        path: '/years',
        builder: (context, state) {
          final course = state.uri.queryParameters['course'] ?? 'B.Tech';
          return YearSelectionScreen(courseName: course);
        },
      ),
      GoRoute(
        path: '/semesters',
        builder: (context, state) {
          final yearStr = state.uri.queryParameters['year'] ?? '2';
          return SemesterSelectionScreen(year: int.tryParse(yearStr) ?? 2);
        },
      ),
      GoRoute(
        path: '/subjects',
        builder: (context, state) => const SubjectListScreen(),
      ),
      GoRoute(
        path: '/subject-details',
        builder: (context, state) {
          final id = state.uri.queryParameters['id'] ?? 'os';
          return SubjectDetailsScreen(subjectId: id);
        },
      ),
      GoRoute(
        path: '/papers',
        builder: (context, state) => const PreviousYearPapersScreen(),
      ),
      GoRoute(
        path: '/notes',
        builder: (context, state) => const NotesAndBooksScreen(),
      ),
      GoRoute(
        path: '/pdf-viewer',
        builder: (context, state) {
          final title = state.uri.queryParameters['title'] ?? 'OS_2024_EndSem.pdf';
          return PdfViewerScreen(title: title);
        },
      ),
    ],
  );
}
