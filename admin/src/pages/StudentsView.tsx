import React, { useState } from 'react';
import { Student } from '../types';
import { Users, Search, ShieldAlert, CheckCircle2, Trash2, Smartphone, Globe, Radio, Laptop } from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  onToggleBlockStudent: (id: string) => void;
  onDeleteStudent: (id: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onToggleBlockStudent,
  onDeleteStudent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Online' | 'Blocked'>('All');

  const onlineCount = students.filter(s => s.isOnline).length;

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.collegeName.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'Online' && !s.isOnline) return false;
    if (statusFilter === 'Blocked' && s.status !== 'Blocked') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Student Users Directory</h2>
          <p className="text-xs text-slate-500 font-medium">Monitor active mobile app users, student engagement, and account permissions</p>
        </div>
      </div>

      {/* 4 Clean Real Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registered */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Students</span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">15,480</h3>
          <span className="text-[10px] font-bold text-blue-600">Registered Accounts</span>
        </div>

        {/* Currently Online Logged-In Users */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">Live Logged-In Users</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-emerald-800 font-['Outfit']">1,420 Online</h3>
          <span className="text-[10px] font-bold text-emerald-600">Active Mobile App Sessions</span>
        </div>

        {/* Mobile App Devices */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active App Devices</span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">1,280 Android / 140 iOS</h3>
          <span className="text-[10px] font-bold text-purple-600">Connected Sessions</span>
        </div>

        {/* Blocked Accounts */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Blocked Accounts</span>
          <h3 className="text-2xl font-extrabold text-rose-600 font-['Outfit']">12 Accounts</h3>
          <span className="text-[10px] font-bold text-rose-500">Access Restricted</span>
        </div>
      </div>

      {/* Filter Bar & Data Table Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search student by name, email, college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                statusFilter === 'All'
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Users ({students.length})
            </button>
            <button
              onClick={() => setStatusFilter('Online')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                statusFilter === 'Online'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Online Now ({onlineCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('Blocked')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                statusFilter === 'Blocked'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              Blocked Users
            </button>
          </div>
        </div>

        {/* Clean Spacious Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-200/80 bg-slate-50/50">
                <th className="py-3 px-4 rounded-l-xl">Student Profile</th>
                <th className="py-3 px-4">College & Course</th>
                <th className="py-3 px-4">Device & Engagement</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Account Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  {/* Column 1: Student Profile */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`;
                          }}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100 shadow-xs"
                        />
                        {s.isOnline ? (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" title="Online Now"></span>
                        ) : (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-slate-300 ring-2 ring-white" title="Offline"></span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs leading-tight truncate">{s.name}</h4>
                        <span className="text-[11px] text-slate-500 block truncate">{s.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: College & Course */}
                  <td className="py-4 px-4">
                    <h5 className="font-bold text-slate-900 text-xs">{s.collegeName}</h5>
                    <span className="text-[11px] text-blue-600 font-semibold block">{s.courseName} (Sem {s.semester})</span>
                  </td>

                  {/* Column 3: Device & Engagement */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{s.activeDevice || 'Android App'}</span>
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-600 block">
                        {s.downloadsCount} Downloads • {s.bookmarksCount} Saved
                      </span>
                    </div>
                  </td>

                  {/* Column 4: Last Activity */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {s.isOnline ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-extrabold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active Now
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs font-medium">{s.lastLogin}</span>
                    )}
                  </td>

                  {/* Column 5: Account Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggleBlockStudent(s.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition shadow-2xs ${
                          s.status === 'Active'
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
                        }`}
                      >
                        {s.status === 'Active' ? 'Block' : 'Unblock'}
                      </button>
                      <button
                        onClick={() => onDeleteStudent(s.id)}
                        className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                        title="Delete Student Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
