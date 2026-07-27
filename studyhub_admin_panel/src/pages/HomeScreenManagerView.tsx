import React from 'react';
import { HomeScreenSectionConfig } from '../types';
import { Layout, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomeScreenManagerViewProps {
  sections: HomeScreenSectionConfig[];
  onToggleSection: (id: string) => void;
}

export const HomeScreenManagerView: React.FC<HomeScreenManagerViewProps> = ({
  sections,
  onToggleSection
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Mobile Home Screen Layout Manager</h2>
        <p className="text-xs text-slate-500">Enable, disable, and re-order sections displayed on the student mobile app home feed</p>
      </div>

      <div className="saas-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
          <Layout className="w-4 h-4 text-[#2563EB]" />
          <span>Home Feed Section Order & Visibility Controls</span>
        </h3>

        <div className="space-y-3">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 transition hover:border-[#2563EB]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-extrabold text-xs">
                  #{sec.displayOrder}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{sec.sectionName}</h4>
                  <p className="text-[11px] text-slate-500">{sec.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleSection(sec.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                    sec.isEnabled
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-rose-50 text-rose-600 border border-rose-200'
                  }`}
                >
                  {sec.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.isEnabled ? 'Visible ON' : 'Hidden OFF'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
