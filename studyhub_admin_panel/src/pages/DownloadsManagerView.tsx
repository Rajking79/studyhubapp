import React from 'react';
import { Download, HardDrive, FileText, Video, Trash2 } from 'lucide-react';

export const DownloadsManagerView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Offline Downloads & Storage Manager</h2>
        <p className="text-xs text-slate-500">Monitor student offline cached PDFs, videos, and CDN storage consumption</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="saas-card p-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Total PDF Downloads</span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">85,230</h3>
          <span className="text-[10px] text-emerald-600 font-bold">+15.7% This Month</span>
        </div>

        <div className="saas-card p-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Video Downloads</span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit'] font-['Outfit']">24,150</h3>
          <span className="text-[10px] text-blue-600 font-bold">Offline Saved</span>
        </div>

        <div className="saas-card p-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">CDN Storage Consumed</span>
          <h3 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">256 GB</h3>
          <span className="text-[10px] text-purple-600 font-bold">Cloudinary Storage</span>
        </div>
      </div>
    </div>
  );
};
