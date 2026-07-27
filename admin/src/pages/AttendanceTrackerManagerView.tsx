import React from 'react';
import { AttendanceRule } from '../types';
import { UserCheck, AlertTriangle } from 'lucide-react';

interface AttendanceTrackerManagerViewProps {
  rules: AttendanceRule[];
}

export const AttendanceTrackerManagerView: React.FC<AttendanceTrackerManagerViewProps> = ({ rules }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Attendance Tracker Rules Manager</h2>
        <p className="text-xs text-slate-500">Configure attendance percentage thresholds (75% rule) and warning alerts</p>
      </div>

      <div className="saas-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">Subject Name</th>
                <th className="pb-3 px-3">Required Attendance %</th>
                <th className="pb-3 px-3">Warning Threshold %</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rules.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-bold text-slate-900">{r.subjectName}</td>
                  <td className="px-3 font-bold text-emerald-600">{r.requiredPercentage}% Minimum</td>
                  <td className="px-3 font-bold text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> {r.warningPercentage}% Alert
                  </td>
                  <td className="px-3 text-right">
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded">Enforced</span>
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
