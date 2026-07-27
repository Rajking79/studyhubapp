import React, { useState } from 'react';
import { Settings, Save, ShieldAlert, Cpu, Lock } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [appName, setAppName] = useState('College Study Hub AI App');
  const [supportEmail, setSupportEmail] = useState('support@studyhub.app');
  const [minAppVersion, setMinAppVersion] = useState('v1.2.0');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [guestEnabled, setGuestEnabled] = useState(true);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ App Remote Config & Global Settings Saved Successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">App Remote Config & Settings</h2>
          <p className="text-xs text-slate-500">Dynamically toggle feature switches and force app version updates in real-time</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          <span>Save Global Settings</span>
        </button>
      </div>

      <div className="saas-card p-6 space-y-6">
        {/* Live Feature Switches */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-3">Live Mobile Feature Switches</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Enable StudyHub AI Assistant & Snap-Solve</h4>
                <p className="text-[11px] text-slate-500">Allows students to ask AI questions and upload photo questions</p>
              </div>
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Enable Guest Mode Browsing</h4>
                <p className="text-[11px] text-slate-500">Allows guest students to preview notes before registration</p>
              </div>
              <input
                type="checkbox"
                checked={guestEnabled}
                onChange={(e) => setGuestEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#2563EB] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <h4 className="text-xs font-bold text-rose-600">Enable App Maintenance Mode</h4>
                <p className="text-[11px] text-slate-500">Shows maintenance splash screen on student phones during server upgrades</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceEnabled}
                onChange={(e) => setMaintenanceEnabled(e.target.checked)}
                className="w-5 h-5 accent-rose-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Force Version Control */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] mb-3">Force Update Version Control</h3>
          <div className="flex items-center gap-3">
            <div className="w-48">
              <label className="text-xs font-bold text-slate-700">Minimum Required App Version</label>
              <input
                type="text"
                value={minAppVersion}
                onChange={(e) => setMinAppVersion(e.target.value)}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className="text-xs text-slate-400 self-end pb-2">
              Students running older versions will see Play Store force update prompt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
