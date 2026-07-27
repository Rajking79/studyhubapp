import React from 'react';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const exportAlert = (format: string) => {
    alert(`📥 Exporting StudyHub Analytics Report to ${format} File...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Reports & Export Center</h2>
          <p className="text-xs text-slate-500">Generate and export Daily, Weekly, Monthly usage reports in Excel, CSV, or PDF format</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportAlert('Excel')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => exportAlert('CSV')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportAlert('PDF')}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="saas-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Daily Summary Report</h3>
          <p className="text-xs text-slate-500">Total Downloads: 15,400 | New Active Students: 145</p>
          <button onClick={() => exportAlert('Daily Summary')} className="text-xs font-bold text-[#2563EB]">Download Daily Report →</button>
        </div>

        <div className="saas-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Weekly Popular Subjects</h3>
          <p className="text-xs text-slate-500">Most Downloaded: Data Structures & DBMS</p>
          <button onClick={() => exportAlert('Weekly Subjects')} className="text-xs font-bold text-[#2563EB]">Download Weekly Report →</button>
        </div>

        <div className="saas-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Monthly College Ranking</h3>
          <p className="text-xs text-slate-500">Top College: Delhi University (DU) - 1,450 Students</p>
          <button onClick={() => exportAlert('Monthly Colleges')} className="text-xs font-bold text-[#2563EB]">Download Monthly Report →</button>
        </div>
      </div>
    </div>
  );
};
