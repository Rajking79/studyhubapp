import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading data from StudyHub Live Server..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] w-full p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm transition-all duration-300">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
        <Sparkles className="w-6 h-6 text-blue-600 absolute animate-pulse" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-700 tracking-wide flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        {message}
      </p>
      <span className="mt-1 text-xs text-slate-400">Fetching REST API endpoints...</span>
    </div>
  );
};
