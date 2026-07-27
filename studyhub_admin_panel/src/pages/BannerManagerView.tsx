import React from 'react';
import { Banner } from '../types';
import { Images, Plus, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

interface BannerManagerViewProps {
  banners: Banner[];
  onToggleBanner: (id: string) => void;
}

export const BannerManagerView: React.FC<BannerManagerViewProps> = ({
  banners,
  onToggleBanner
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Home Carousel Banner Manager</h2>
          <p className="text-xs text-slate-500">Upload and sequence promotional banners displayed on mobile app home screen</p>
        </div>
        <button className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-2 transition">
          <Plus className="w-4 h-4" />
          <span>Upload New Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="saas-card overflow-hidden group">
            <div className="relative h-44 overflow-hidden">
              <img src={b.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-extrabold bg-[#2563EB] px-2 py-0.5 rounded w-max mb-1">
                  Priority #{b.priority}
                </span>
                <h3 className="text-base font-extrabold font-['Outfit']">{b.title}</h3>
                <p className="text-xs text-slate-300">{b.subtitle}</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between bg-white border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-600">
                Route: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">{b.redirectRoute}</code>
              </div>
              <button
                onClick={() => onToggleBanner(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  b.isEnabled ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span>{b.isEnabled ? 'Active ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
