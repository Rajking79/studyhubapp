import React, { useState, useEffect } from 'react';
import {
  ViewType,
  College,
  Course,
  Subject,
  Material,
  VideoMaterial,
  Student,
  StudentUpload,
  NotificationBroadcast,
  Banner,
  HomeScreenSectionConfig,
  AiConfig,
  SnapSolveConfig,
  CgpaRule,
  AttendanceRule
} from './types';

import {
  INITIAL_COLLEGES,
  INITIAL_COURSES,
  INITIAL_SUBJECTS,
  INITIAL_MATERIALS,
  INITIAL_VIDEOS,
  INITIAL_STUDENTS,
  INITIAL_UPLOADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_BANNERS,
  INITIAL_HOME_SECTIONS,
  INITIAL_AI_CONFIG,
  INITIAL_SNAP_SOLVE_CONFIG,
  INITIAL_CGPA_RULES,
  INITIAL_ATTENDANCE_RULES
} from './constants/dummyData';

import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';

import { DashboardView } from './pages/DashboardView';
import { CollegesView } from './pages/CollegesView';
import { CoursesView } from './pages/CoursesView';
import { YearsView } from './pages/YearsView';
import { SemestersView } from './pages/SemestersView';
import { SubjectsView } from './pages/SubjectsView';
import { StudyMaterialsView } from './pages/StudyMaterialsView';
import { VideoManagerView } from './pages/VideoManagerView';
import { HomeScreenManagerView } from './pages/HomeScreenManagerView';
import { StudyHubAiView } from './pages/StudyHubAiView';
import { SnapSolveAiView } from './pages/SnapSolveAiView';
import { SearchManagerView } from './pages/SearchManagerView';
import { CgpaManagerView } from './pages/CgpaManagerView';
import { AttendanceTrackerManagerView } from './pages/AttendanceTrackerManagerView';
import { DownloadsManagerView } from './pages/DownloadsManagerView';
import { FavoritesManagerView } from './pages/FavoritesManagerView';
import { FeedbackManagerView } from './pages/FeedbackManagerView';
import { StudentUploadsView } from './pages/StudentUploadsView';
import { NotificationsView } from './pages/NotificationsView';
import { BannerManagerView } from './pages/BannerManagerView';
import { StudentsView } from './pages/StudentsView';
import { AnalyticsView } from './pages/AnalyticsView';
import { ReportsView } from './pages/ReportsView';
import { SettingsView } from './pages/SettingsView';
import { ProfileView } from './pages/ProfileView';
import { LoginView } from './pages/LoginView';

import { Search, Sparkles, Building2, UploadCloud, Bell, LogOut } from 'lucide-react';

import { adminApiService } from './services/adminApiService';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Application Data States
  const [colleges, setColleges] = useState<College[]>(INITIAL_COLLEGES);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [videos, setVideos] = useState<VideoMaterial[]>(INITIAL_VIDEOS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [uploads, setUploads] = useState<StudentUpload[]>(INITIAL_UPLOADS);
  const [notifications, setNotifications] = useState<NotificationBroadcast[]>(INITIAL_NOTIFICATIONS);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [homeSections, setHomeSections] = useState<HomeScreenSectionConfig[]>(INITIAL_HOME_SECTIONS);
  const [aiConfig, setAiConfig] = useState<AiConfig>(INITIAL_AI_CONFIG);
  const [snapSolveConfig, setSnapSolveConfig] = useState<SnapSolveConfig>(INITIAL_SNAP_SOLVE_CONFIG);
  const [cgpaRules, setCgpaRules] = useState<CgpaRule[]>(INITIAL_CGPA_RULES);
  const [attendanceRules, setAttendanceRules] = useState<AttendanceRule[]>(INITIAL_ATTENDANCE_RULES);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchLiveAdminData();
    }
  }, []);

  const fetchLiveAdminData = async () => {
    try {
      const [colData, crsData, sbjData, matData, bnrData, secData, notData, stdData] = await Promise.allSettled([
        adminApiService.getColleges(),
        adminApiService.getCourses(),
        adminApiService.getSubjects(),
        adminApiService.getMaterials(),
        adminApiService.getBanners(),
        adminApiService.getHomeSections(),
        adminApiService.getNotificationsHistory(),
        adminApiService.getStudents(),
      ]);

      if (colData.status === 'fulfilled' && colData.value.length) setColleges(colData.value);
      if (crsData.status === 'fulfilled' && crsData.value.length) setCourses(crsData.value);
      if (sbjData.status === 'fulfilled' && sbjData.value.length) setSubjects(sbjData.value);
      if (matData.status === 'fulfilled' && matData.value.length) setMaterials(matData.value);
      if (bnrData.status === 'fulfilled' && bnrData.value.length) setBanners(bnrData.value);
      if (secData.status === 'fulfilled' && secData.value.length) setHomeSections(secData.value);
      if (notData.status === 'fulfilled' && notData.value.length) setNotifications(notData.value);
      if (stdData.status === 'fulfilled' && stdData.value.length) setStudents(stdData.value);
    } catch (_) {}
  };

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
    fetchLiveAdminData();
  };

  const handlePromptLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
  };

  // Handlers
  const handleAddCollege = async (c: Omit<College, 'id'>) => {
    const newCol = await adminApiService.addCollege(c);
    setColleges(prev => [newCol, ...prev]);
  };

  const handleToggleFeaturedCollege = async (id: string) => {
    await adminApiService.toggleFeaturedCollege(id);
    setColleges(prev => prev.map(c => c.id === id ? { ...c, isFeatured: !c.isFeatured } : c));
  };

  const handleEditCollege = async (id: string, updated: Partial<College>) => {
    const edited = await adminApiService.updateCollege(id, updated);
    setColleges(prev => prev.map(c => c.id === id ? { ...c, ...edited } : c));
  };

  const handleDeleteCollege = async (id: string) => {
    await adminApiService.deleteCollege(id);
    setColleges(prev => prev.filter(c => c.id !== id));
  };

  const handleAddCourse = async (crs: Omit<Course, 'id'>) => {
    const newCrs = await adminApiService.addCourse(crs);
    setCourses(prev => [newCrs, ...prev]);
  };

  const handleAddSubject = async (sbj: Omit<Subject, 'id'>) => {
    const newSbj = await adminApiService.addSubject(sbj);
    setSubjects(prev => [newSbj, ...prev]);
  };

  const handleDeleteSubject = async (id: string) => {
    await adminApiService.deleteSubject(id);
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleUploadMaterial = async (mat: Omit<Material, 'id'>) => {
    const newMat = await adminApiService.uploadMaterialPdf(mat);
    setMaterials(prev => [newMat, ...prev]);
  };

  const handleDeleteMaterial = async (id: string) => {
    await adminApiService.deleteMaterial(id);
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const handleAddVideo = async (vid: Omit<VideoMaterial, 'id'>) => {
    const newVid = await adminApiService.publishVideoLecture(vid as any);
    setVideos(prev => [{ ...vid, id: `vid-${Date.now()}` }, ...prev]);
  };

  const handleDeleteVideo = async (id: string) => {
    await adminApiService.deleteMaterial(id);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleToggleHomeSection = async (id: string) => {
    await adminApiService.toggleHomeSectionStatus(id);
    setHomeSections(prev => prev.map(s => s.id === id ? { ...s, isEnabled: !s.isEnabled } : s));
  };

  const handleApproveUpload = (id: string) => {
    setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'Approved' } : u));
    alert('✅ Student Note Approved & Published Live to Mobile App!');
  };

  const handleRejectUpload = (id: string, reason: string) => {
    setUploads(prev => prev.map(u => u.id === id ? { ...u, status: 'Rejected', rejectionReason: reason } : u));
    alert(`❌ Student Note Rejected. Reason sent to student: ${reason}`);
  };

  const handleSendBroadcast = async (notif: Omit<NotificationBroadcast, 'id' | 'sentAt' | 'deliveredCount'>) => {
    await adminApiService.sendPushBroadcast(notif);
    setNotifications(prev => [{ ...notif, id: `not-${Date.now()}`, sentAt: 'Just now', deliveredCount: 12450 }, ...prev]);
  };

  const handleToggleBanner = async (id: string) => {
    await adminApiService.toggleBannerStatus(id);
    setBanners(prev => prev.map(b => b.id === id ? { ...b, isEnabled: !b.isEnabled } : b));
  };

  const handleToggleBlockStudent = async (id: string) => {
    await adminApiService.toggleBlockStudent(id);
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Blocked' : 'Active' } : s));
  };

  const handleDeleteStudent = async (id: string) => {
    await adminApiService.deleteStudent(id);
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  const pendingApprovalsCount = uploads.filter(u => u.status === 'Pending').length;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onLogout={handlePromptLogout}
        pendingApprovalsCount={pendingApprovalsCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:ml-64 flex-1 flex flex-col min-w-0 w-full">
        <TopBar
          currentView={currentView}
          onOpenQuickCreate={() => setIsQuickCreateOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogout={handlePromptLogout}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="p-4 sm:p-7 flex-1">
          {currentView === 'dashboard' && (
            <DashboardView
              colleges={colleges}
              materials={materials}
              pendingUploads={uploads.filter(u => u.status === 'Pending')}
              onNavigateView={(v) => setCurrentView(v)}
            />
          )}

          {currentView === 'colleges' && (
            <CollegesView
              colleges={colleges}
              onAddCollege={handleAddCollege}
              onToggleFeatured={handleToggleFeaturedCollege}
              onDeleteCollege={handleDeleteCollege}
              onEditCollege={handleEditCollege}
            />
          )}

          {currentView === 'courses' && (
            <CoursesView
              courses={courses}
              colleges={colleges}
              onAddCourse={handleAddCourse}
            />
          )}

          {currentView === 'years' && <YearsView onNavigateView={(v) => setCurrentView(v)} />}
          {currentView === 'semesters' && <SemestersView onNavigateView={(v) => setCurrentView(v)} />}

          {currentView === 'subjects' && (
            <SubjectsView
              subjects={subjects}
              onAddSubject={handleAddSubject}
              onDeleteSubject={handleDeleteSubject}
            />
          )}

          {(currentView === 'study-materials' ||
            currentView === 'pyqs' ||
            currentView === 'notes' ||
            currentView === 'books' ||
            currentView === 'guides' ||
            currentView === 'assignments' ||
            currentView === 'question-bank' ||
            currentView === 'syllabus' ||
            currentView === 'pdf-manager') && (
            <StudyMaterialsView
              materials={materials}
              onUploadMaterial={handleUploadMaterial}
              onDeleteMaterial={handleDeleteMaterial}
            />
          )}

          {currentView === 'video-manager' && (
            <VideoManagerView
              videos={videos}
              onAddVideo={handleAddVideo}
              onDeleteVideo={handleDeleteVideo}
            />
          )}

          {currentView === 'home-screen-manager' && (
            <HomeScreenManagerView
              sections={homeSections}
              onToggleSection={handleToggleHomeSection}
            />
          )}

          {currentView === 'studyhub-ai' && (
            <StudyHubAiView
              config={aiConfig}
              onSaveConfig={(cfg) => setAiConfig(cfg)}
            />
          )}

          {currentView === 'snap-solve-ai' && (
            <SnapSolveAiView
              config={snapSolveConfig}
              onToggleOcr={() => setSnapSolveConfig(prev => ({ ...prev, ocrEnabled: !prev.ocrEnabled }))}
            />
          )}

          {currentView === 'search-manager' && <SearchManagerView />}

          {currentView === 'cgpa-manager' && <CgpaManagerView rules={cgpaRules} />}

          {currentView === 'attendance-manager' && <AttendanceTrackerManagerView rules={attendanceRules} />}

          {currentView === 'downloads-manager' && <DownloadsManagerView />}

          {currentView === 'favorites-manager' && <FavoritesManagerView />}



          {currentView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onSendBroadcast={handleSendBroadcast}
            />
          )}

          {currentView === 'banner-manager' && (
            <BannerManagerView
              banners={banners}
              onToggleBanner={handleToggleBanner}
            />
          )}

          {currentView === 'students' && (
            <StudentsView
              students={students}
              onToggleBlockStudent={handleToggleBlockStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          )}

          {currentView === 'feedback' && <FeedbackManagerView />}

          {currentView === 'analytics' && <AnalyticsView />}

          {currentView === 'reports' && <ReportsView />}

          {currentView === 'settings' && <SettingsView />}

          {currentView === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Confirm Session Logout</h3>
              <p className="text-xs text-slate-500 font-medium">Are you sure you want to end your Super Admin session? You will be redirected to the login screen.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 transition"
              >
                Yes, Logout Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Palette Modal (Ctrl + K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="saas-card w-full max-w-xl p-4 bg-white space-y-3">
            <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search colleges, PYQs, subjects, students..."
                className="w-full text-sm outline-none bg-transparent"
              />
              <kbd className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 border border-slate-200 rounded">
                ESC
              </kbd>
            </div>
          </div>
        </div>
      )}

      {/* Quick Create Modal */}
      {isQuickCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="saas-card w-full max-w-sm p-6 bg-white space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" /> Quick Action Menu
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => { setCurrentView('colleges'); setIsQuickCreateOpen(false); }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 font-bold text-xs flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Add New College
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => { setCurrentView('study-materials'); setIsQuickCreateOpen(false); }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 font-bold text-xs flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Upload Study Material PDF
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => { setCurrentView('notifications'); setIsQuickCreateOpen(false); }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-[#2563EB] text-slate-700 font-bold text-xs flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Send Instant Push Broadcast
                </span>
                <span>→</span>
              </button>
            </div>

            <button
              onClick={() => setIsQuickCreateOpen(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition mt-2"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
