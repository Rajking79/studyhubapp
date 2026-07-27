import React from 'react';
import { Calendar, Layers, BookOpen, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface YearsViewProps {
  onNavigateView?: (view: ViewType) => void;
}

export const YearsView: React.FC<YearsViewProps> = ({ onNavigateView }) => {
  const years = [
    { year: 'First Year (1st Year)', desc: 'Fundamental Engineering, Mathematics & Physics Basics', sem: 'Semesters 1 & 2', subjects: 12, materials: 450, targetYear: '1st Year' },
    { year: 'Second Year (2nd Year)', desc: 'Core Data Structures, Discrete Maths & Logic Design', sem: 'Semesters 3 & 4', subjects: 14, materials: 680, targetYear: '2nd Year' },
    { year: 'Third Year (3rd Year)', desc: 'Advanced OS, DBMS, Networks & Web Technologies', sem: 'Semesters 5 & 6', subjects: 16, materials: 920, targetYear: '3rd Year' },
    { year: 'Fourth Year (4th Year)', desc: 'Cloud Computing, AI/ML Specializations & Projects', sem: 'Semesters 7 & 8', subjects: 10, materials: 540, targetYear: '4th Year' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Academic Year Management</h2>
        <p className="text-xs text-slate-500">Configure Academic Year Cards (1st to 4th Year) connected to Mobile App Home Feed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {years.map((y, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateView && onNavigateView('study-materials')}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#2563EB] hover:shadow-md transition duration-200"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">{y.year}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{y.desc}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Mapped Semesters</span>
                <span className="text-[#2563EB] font-bold">{y.sem}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Active Subjects</span>
                <span className="text-emerald-600 font-bold">{y.subjects} Subjects</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Available PDFs & Videos</span>
                <span className="text-purple-600 font-bold">{y.materials} Files</span>
              </div>
              <div className="pt-2 text-right">
                <span className="text-[11px] font-bold text-[#2563EB] inline-flex items-center gap-1 hover:underline">
                  Manage Materials <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
