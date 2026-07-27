import React from 'react';
import { ViewType } from '../../types';
import logoImg from '../../assets/logo.png';
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Calendar,
  Layers,
  BookOpen,
  FolderOpen,
  Layout,
  Images,
  Search,
  Bot,
  Camera,
  Calculator,
  UserCheck,
  Download,
  Bookmark,
  Bell,
  Users,
  MessageSquare,
  FileSpreadsheet,
  User,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  onLogout: () => void;
  pendingApprovalsCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onLogout,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const academicNav: { id: ViewType; label: string; icon: any }[] = [
    { id: 'colleges', label: 'College Manager', icon: Building2 },
    { id: 'courses', label: 'Course Manager', icon: GraduationCap },
    { id: 'years', label: 'Year Manager', icon: Calendar },
    { id: 'semesters', label: 'Semester Manager', icon: Layers },
    { id: 'subjects', label: 'Subject Manager', icon: BookOpen }
  ];

  const contentNav: { id: ViewType; label: string; icon: any }[] = [
    { id: 'study-materials', label: 'Study Materials (PDFs & Videos)', icon: FolderOpen }
  ];

  const homeAndToolsNav: { id: ViewType; label: string; icon: any }[] = [
    { id: 'home-screen-manager', label: 'Home Screen Manager', icon: Layout },
    { id: 'banner-manager', label: 'Banner Manager', icon: Images },
    { id: 'search-manager', label: 'Voice & Cam Search', icon: Search },
    { id: 'studyhub-ai', label: 'StudyHub AI Tutor', icon: Bot },
    { id: 'snap-solve-ai', label: 'Snap & Solve AI', icon: Camera },
    { id: 'cgpa-manager', label: 'CGPA Calculator', icon: Calculator },
    { id: 'attendance-manager', label: 'Attendance Tracker', icon: UserCheck }
  ];

  const systemNav: { id: ViewType; label: string; icon: any }[] = [
    { id: 'downloads-manager', label: 'Downloads Manager', icon: Download },
    { id: 'favorites-manager', label: 'Favorites Manager', icon: Bookmark },
    { id: 'notifications', label: 'Notification Broadcast', icon: Bell },
    { id: 'students', label: 'Student Users Manager', icon: Users },
    { id: 'feedback', label: 'Feedback & Support', icon: MessageSquare },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
    { id: 'profile', label: 'Admin Profile', icon: User }
  ];

  const handleNavClick = (view: ViewType) => {
    onSelectView(view);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Dark Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-[#0B132B] text-[#94A3B8] flex flex-col fixed top-0 bottom-0 left-0 z-50 border-r border-white/5 font-['Inter'] transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Official 3D Brand Logo Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={logoImg}
              alt="StudyHub"
              className="w-12 h-12 object-contain shrink-0 filter drop-shadow-2xl"
            />
            <div className="min-w-0">
              <h2 className="font-extrabold text-white text-lg tracking-tight font-['Outfit'] truncate leading-none">StudyHub</h2>
              <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-wider block truncate mt-1">
                Admin Master Control
              </span>
            </div>
          </div>

          {/* Close X Button on Mobile Drawer */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {/* Main Dashboard */}
          <div>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'hover:bg-[#1C2541] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap truncate">Executive Dashboard</span>
            </button>
          </div>

          {/* Academic Hierarchy */}
          <div>
            <div className="px-3.5 mb-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Academic Hierarchy</div>
            <div className="space-y-1">
              {academicNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold shadow-md shadow-blue-600/30'
                        : 'hover:bg-[#1C2541] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Media & Study Materials */}
          <div>
            <div className="px-3.5 mb-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Media & Study Materials</div>
            <div className="space-y-1">
              {contentNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold shadow-md shadow-blue-600/30'
                        : 'hover:bg-[#1C2541] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Home & Study Tools */}
          <div>
            <div className="px-3.5 mb-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">Home & Study Tools</div>
            <div className="space-y-1">
              {homeAndToolsNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold shadow-md shadow-blue-600/30'
                        : 'hover:bg-[#1C2541] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System & Users */}
          <div>
            <div className="px-3.5 mb-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">System & Users</div>
            <div className="space-y-1">
              {systemNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold shadow-md shadow-blue-600/30'
                        : 'hover:bg-[#1C2541] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={() => {
              onLogout();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout System</span>
          </button>
        </div>
      </aside>
    </>
  );
};
