import React from 'react';
import { Search, Mic, Camera, TrendingUp } from 'lucide-react';

export const SearchManagerView: React.FC = () => {
  const popularKeywords = [
    { term: 'DBMS 2024 End Sem Solved Paper', count: 14500 },
    { term: 'Operating Systems Paging Handwritten Notes', count: 12800 },
    { term: 'Data Structures Trees & Graphs Cheat Sheet', count: 9600 },
    { term: 'Computer Networks Tanenbaum PDF', count: 8400 },
    { term: 'DU May 2026 End Sem Datesheet', count: 7200 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Search Manager & Keyword Analytics</h2>
        <p className="text-xs text-slate-500">Monitor Global Search, Voice Search, Camera Search, and Trending Keywords</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="saas-card p-6 lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            <span>Top Trending Search Keywords</span>
          </h3>

          <div className="space-y-3">
            {popularKeywords.map((kw, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-[#2563EB] font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{kw.term}</span>
                </div>
                <span className="text-xs font-bold text-emerald-600">{kw.count.toLocaleString()} Searches</span>
              </div>
            ))}
          </div>
        </div>

        <div className="saas-card p-6 lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Search Modes Status</h3>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Text Search</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">Active</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-900">Voice Search</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">Active</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold text-slate-900">Camera OCR Search</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
