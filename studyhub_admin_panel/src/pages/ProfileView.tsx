import React, { useState } from 'react';
import { User, Key, ShieldCheck, History, Save, CheckCircle2, Lock, Mail, Phone, Shield, Award, Clock } from 'lucide-react';

export const ProfileView: React.FC = () => {
  // Form states
  const [name, setName] = useState('Super Administrator');
  const [email, setEmail] = useState('admin@studyhub.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [role, setRole] = useState('Master Super Admin');

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('✅ Profile details updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('New Password and Confirm Password must match!');
      return;
    }
    setMessage('🔒 Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  const auditLogs = [
    { action: 'Published New Study Material', details: 'DBMS 2024 End Sem Solved PYQ Paper.pdf', time: '10 mins ago', type: 'Upload' },
    { action: 'Updated College Status', details: 'Set Delhi University (DU) as Featured', time: '1 hour ago', type: 'Config' },
    { action: 'Broadcasted Notification', details: 'May 2026 Examination Datesheet Alert to 12,450 students', time: '3 hours ago', type: 'Push' },
    { action: 'Approved Student Contribution', details: 'CN Unit 2 Socket Programming Notes by Aman Verma', time: '5 hours ago', type: 'Moderation' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Admin Profile & System Privileges</h2>
          <p className="text-xs text-slate-500 font-medium">Manage Super Administrator details, security credentials, and active system permissions</p>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Top Main Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Admin Avatar & Quick Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#2563EB]/20 shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-slate-900 font-['Outfit']">{name}</h3>
            <p className="text-xs font-semibold text-slate-400">{role}</p>
            <span className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-[11px] font-extrabold">
              ● Online & 2FA Protected
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-left text-xs font-semibold">
            <div className="flex items-center justify-between text-slate-600">
              <span>Account Type:</span>
              <span className="font-extrabold text-blue-600">Super Administrator</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Security Token:</span>
              <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">JWT Encrypted</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Active Session:</span>
              <span className="text-emerald-600 font-bold">Local PC (Active)</span>
            </div>
          </div>
        </div>

        {/* Center & Right Card: Edit Profile Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <User className="w-4 h-4 text-[#2563EB]" />
            <span>Edit Admin Account Details</span>
          </h3>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">System Role Title</label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 inline-flex items-center gap-2 transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Password Update & Permissions Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security & Password Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Key className="w-4 h-4 text-rose-500" />
            <span>Change Security Password</span>
          </h3>

          <form onSubmit={handlePasswordUpdate} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Audit Log Activity History */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <History className="w-4 h-4 text-purple-600" />
            <span>Recent Admin Audit Log</span>
          </h3>

          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{log.action}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{log.details}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
