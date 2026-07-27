import React from 'react';
import {
  Users,
  Building2,
  GraduationCap,
  BookOpen,
  FileText,
  Download,
  Bookmark,
  Clock,
  HardDrive,
  UserPlus,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  FileCode,
  CheckCircle2,
  ExternalLink,
  PlayCircle
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { College, Material, ViewType } from '../types';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

import { adminApiService } from '../services/adminApiService';

interface DashboardViewProps {
  colleges: College[];
  materials: Material[];
  pendingUploads?: any[];
  onNavigateView: (view: ViewType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  colleges,
  materials,
  onNavigateView
}) => {
  const [liveStats, setLiveStats] = React.useState<any>(null);

  React.useEffect(() => {
    adminApiService.getStats().then(data => {
      if (data) setLiveStats(data);
    }).catch(() => {});
  }, []);

  const totalStudentsVal = liveStats?.totalStudents ? Number(liveStats.totalStudents).toLocaleString() : '15,480';
  const totalCollegesVal = liveStats?.totalColleges ? String(liveStats.totalColleges) : String(colleges.length || 25);
  const totalCoursesVal = liveStats?.totalCourses ? String(liveStats.totalCourses) : '120';
  const totalMaterialsVal = liveStats?.totalMaterials ? String(liveStats.totalMaterials) : String(materials.length || 3840);
  const totalDownloadsVal = liveStats?.totalDownloads ? Number(liveStats.totalDownloads).toLocaleString() : '128,400';

  const statCards: { title: string; value: string; change: string; icon: any; color: string; bg: string; viewTarget?: ViewType }[] = [
    { title: 'Total Students', value: totalStudentsVal, change: '1,420 Active Today', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', viewTarget: 'students' },
    { title: 'Total Colleges', value: totalCollegesVal, change: '10 Featured', icon: Building2, color: 'text-sky-600', bg: 'bg-sky-50', viewTarget: 'colleges' },
    { title: 'Total Courses', value: totalCoursesVal, change: 'Across All Degrees', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50', viewTarget: 'courses' },
    { title: 'Total Subjects', value: '480', change: 'Mapped Sem 1-8', icon: BookOpen, color: 'text-rose-600', bg: 'bg-rose-50', viewTarget: 'subjects' },
    { title: 'Total PDFs & Videos', value: totalMaterialsVal, change: '6 Cards System', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50', viewTarget: 'study-materials' },
    { title: 'Today Active Users', value: '1,420', change: '🟢 Live Sessions', icon: UserPlus, color: 'text-teal-600', bg: 'bg-teal-50', viewTarget: 'students' },
    { title: 'Storage Used', value: '256 GB', change: 'Cloudinary CDN', icon: HardDrive, color: 'text-cyan-600', bg: 'bg-cyan-50', viewTarget: 'downloads-manager' },
    { title: 'Total Downloads', value: totalDownloadsVal, change: '⚡ High Engagement', icon: Download, color: 'text-[#2563EB]', bg: 'bg-blue-50', viewTarget: 'downloads-manager' }
  ];

  // Chart 1: Daily Active Line
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Students',
        data: [1200, 1420, 1380, 1650, 1520, 1890, 1950],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#2563EB'
      }
    ]
  };

  // Chart 2: Monthly Downloads Bar
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'PDF & Video Downloads',
        data: [18000, 32000, 48000, 62000, 52000, 68000, 79000, 65000, 72000, 81000, 83000, 92000],
        backgroundColor: '#10B981',
        borderRadius: 6
      }
    ]
  };

  // Chart 3: Subject Distribution
  const donutData = {
    labels: ['Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks', 'Web Tech', 'Others'],
    datasets: [
      {
        data: [28, 22, 18, 14, 10, 8],
        backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#94A3B8'],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }
    ]
  };

  return (
    <div className="space-y-7 font-['Inter']">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0B132B] to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-300 backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            SaaS Production Master Control
          </div>
          <h2 className="text-2xl font-extrabold font-['Outfit'] tracking-tight">
            Welcome Back, Super Admin! 🚀
          </h2>
          <p className="text-slate-300 text-xs max-w-xl">
            Real-time control over 25 Indian Colleges, 120 Courses, and 15,480 Registered Students.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigateView('study-materials')}
            className="px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
          >
            <span>Upload Study Material (PDF & Video)</span>
          </button>
        </div>
      </div>

      {/* 8 Clean Clickable Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => card.viewTarget && onNavigateView(card.viewTarget)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#2563EB] hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500">{card.title}</span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] leading-none">
                  {card.value}
                </h3>
                <span className="text-[10px] font-bold text-emerald-600 inline-flex items-center gap-0.5 pt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.change}
                </span>
              </div>
              <div className={`w-11 h-11 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart 1: Daily Active Users */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs xl:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Daily Active Students</h3>
              <p className="text-[11px] text-slate-400 font-medium">Weekly Engagement Trend</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-50 text-[#2563EB] text-[11px] font-bold rounded-lg">+18.2%</span>
          </div>
          <div className="h-56 w-full">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 10 } } },
                  y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 10 } } }
                }
              }}
            />
          </div>
        </div>

        {/* Chart 2: Monthly Downloads */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs xl:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Monthly Material Downloads</h3>
              <p className="text-[11px] text-slate-400 font-medium">Year 2026 Volume</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg">92K Max</span>
          </div>
          <div className="h-56 w-full">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 9 } } },
                  y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 } } }
                }
              }}
            />
          </div>
        </div>

        {/* Chart 3: Subject Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs xl:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Top Downloaded Subjects</h3>
              <p className="text-[11px] text-slate-400 font-medium">Subject Volume Share</p>
            </div>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <Doughnut
              data={donutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 10 } } } },
                cutout: '70%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Activity Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Study Uploads Table (PDFs & Videos) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Latest Study Uploads (PDFs & Videos)</h3>
            <button
              onClick={() => onNavigateView('study-materials')}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              View All Materials
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200/80 bg-slate-50/50">
                  <th className="py-3 px-3 rounded-l-xl">Material Title</th>
                  <th className="py-3 px-3">Type / Category</th>
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3 rounded-r-xl text-right">Downloads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {materials.slice(0, 5).map((mat) => {
                  const isVideo = mat.uploadType === 'Video' || mat.category === 'Video Lecture';
                  return (
                    <tr key={mat.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-3 font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          {isVideo ? (
                            <PlayCircle className="w-4 h-4 text-purple-600 shrink-0" />
                          ) : (
                            <FileCode className="w-4 h-4 text-rose-500 shrink-0" />
                          )}
                          <span className="truncate max-w-[200px]" title={mat.title}>{mat.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {isVideo ? (
                          <span className="px-2.5 py-1 text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200/60 rounded-lg">
                            🎬 Video Lecture
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-[10px] font-extrabold bg-blue-50 text-[#2563EB] border border-blue-200/60 rounded-lg">
                            📄 {mat.category}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 font-semibold whitespace-nowrap">
                        {mat.subjectName}
                      </td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                        {mat.downloadsCount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Indian Colleges Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Featured Indian Colleges</h3>
            <button
              onClick={() => onNavigateView('colleges')}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Manage Colleges ({colleges.length})
            </button>
          </div>

          <div className="space-y-3">
            {colleges.slice(0, 4).map((col) => (
              <div
                key={col.id}
                onClick={() => onNavigateView('colleges')}
                className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/80 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={col.logo}
                    alt={col.name}
                    className="w-9 h-9 rounded-lg object-contain bg-white p-1 border border-slate-200 shrink-0 shadow-2xs"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/8074/8074788.png';
                    }}
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight truncate">{col.name}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold truncate">{col.university} • {col.city}, {col.state}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-blue-50 text-[#2563EB] text-[10px] font-extrabold rounded-lg shrink-0 whitespace-nowrap">
                  {col.coursesCount} Courses
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
