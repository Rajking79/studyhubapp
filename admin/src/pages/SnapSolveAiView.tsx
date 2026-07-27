import React, { useState } from 'react';
import { SnapSolveConfig } from '../types';
import { Camera, CheckCircle2, ScanLine } from 'lucide-react';

interface SnapSolveAiViewProps {
  config: SnapSolveConfig;
  onToggleOcr: () => void;
}

export const SnapSolveAiView: React.FC<SnapSolveAiViewProps> = ({
  config,
  onToggleOcr
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Snap & Solve AI Camera OCR Manager</h2>
        <p className="text-xs text-slate-500">Camera OCR question scanner, step-by-step math & code solution engine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="saas-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Camera OCR Status</h3>
            <ScanLine className="w-5 h-5 text-[#2563EB]" />
          </div>
          <button
            onClick={onToggleOcr}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              config.ocrEnabled ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600'
            }`}
          >
            {config.ocrEnabled ? 'OCR Scanner Active ON' : 'OFF'}
          </button>
        </div>

        <div className="saas-card p-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Daily Camera Scans</span>
          <h4 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
            {config.dailyUsageCount.toLocaleString()}
          </h4>
          <span className="text-[10px] text-emerald-600 font-bold">+24.5% Today</span>
        </div>

        <div className="saas-card p-6 space-y-2">
          <span className="text-[11px] font-bold text-slate-400">Total Solved Question History</span>
          <h4 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">
            {config.questionHistoryCount.toLocaleString()}
          </h4>
          <span className="text-[10px] text-blue-600 font-bold">Indexed in Vector Database</span>
        </div>
      </div>
    </div>
  );
};
