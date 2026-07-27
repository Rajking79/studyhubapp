import React from 'react';
import { CgpaRule } from '../types';
import { Calculator, Plus, Edit3 } from 'lucide-react';

interface CgpaManagerViewProps {
  rules: CgpaRule[];
}

export const CgpaManagerView: React.FC<CgpaManagerViewProps> = ({ rules }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">CGPA Calculator Rule Manager</h2>
          <p className="text-xs text-slate-500">Manage Indian university grading formulas, grade points, and percentage converters</p>
        </div>
        <button className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition">
          <Plus className="w-4 h-4" />
          <span>Add University Formula</span>
        </button>
      </div>

      <div className="saas-card p-6 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-3">University Name</th>
                <th className="pb-3 px-3">Grading System</th>
                <th className="pb-3 px-3">Formula Description</th>
                <th className="pb-3 px-3">Percentage Multiplier</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-3 font-bold text-slate-900">{r.universityName}</td>
                  <td className="px-3 text-blue-600 font-semibold">{r.gradingSystem}</td>
                  <td className="px-3 text-slate-600"><code>{r.formulaDescription}</code></td>
                  <td className="px-3 font-bold text-emerald-600">{r.percentageMultiplier}x</td>
                  <td className="px-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
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
