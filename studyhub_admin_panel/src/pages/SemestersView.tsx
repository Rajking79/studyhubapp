import React from 'react';
import { Layers, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface SemestersViewProps {
  onNavigateView?: (view: ViewType) => void;
}

export const SemestersView: React.FC<SemestersViewProps> = ({ onNavigateView }) => {
  const semesters = Array.from({ length: 8 }).map((_, i) => ({
    semNumber: i + 1,
    title: `Semester ${i + 1}`,
    subjectsCount: 5 + (i % 3),
    materialCount: 140 + i * 45,
    status: i + 1 === 4 ? 'Active (Current)' : 'Active'
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Semester Management</h2>
        <p className="text-xs text-slate-500">Configure Semester 1 to Semester 8 cards and study material mappings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {semesters.map((s) => (
          <div
            key={s.semNumber}
            onClick={() => onNavigateView && onNavigateView('study-materials')}
            className={`bg-white rounded-2xl p-5 border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
              s.semNumber === 4
                ? 'border-[#2563EB] bg-blue-50/30 ring-2 ring-blue-100 shadow-sm'
                : 'border-slate-200/80 hover:border-[#2563EB] hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-600/20">
                S{s.semNumber}
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                s.semNumber === 4 ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {s.status}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">{s.title}</h3>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-600" /> Subjects:</span>
                  <span className="font-bold text-slate-900">{s.subjectsCount} Subjects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-emerald-600" /> PDFs / Videos:</span>
                  <span className="font-bold text-emerald-600">{s.materialCount} Files</span>
                </div>
              </div>
              <div className="pt-3 text-right">
                <span className="text-[11px] font-bold text-[#2563EB] inline-flex items-center gap-1 hover:underline">
                  Open Semester Materials <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
