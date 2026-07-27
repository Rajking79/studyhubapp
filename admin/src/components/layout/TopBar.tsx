import React, { useState, useRef, useEffect } from 'react';
import { ViewType } from '../../types';
import { LogOut, User, ShieldCheck, ChevronDown, X, Menu } from 'lucide-react';

interface TopBarProps {
  currentView: ViewType;
  onOpenQuickCreate?: () => void;
  onOpenSearch?: () => void;
  onLogout?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentView, onLogout, onToggleMobileSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTitle = (v: ViewType) => {
    return v
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-7 flex items-center justify-between shadow-xs">
      {/* View Title & Mobile Hamburger Button */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button (Visible only on mobile/tablet screens < 1024px) */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          title="Open Menu Drawer"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight truncate">
          {formatTitle(currentView)}
        </h1>
      </div>

      {/* Right Profile Avatar Container */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100/80 transition duration-150 select-none"
        >
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=68"
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#2563EB]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
              Admin System <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Super Administrator</span>
          </div>
        </div>

        {/* Profile Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header with Close X Button */}
            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Super Admin Session</span>
                <span className="text-[10px] text-slate-400 font-mono">admin@studyhub.com</span>
              </div>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                title="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="py-2 px-4 space-y-1">
              <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>JWT Token Authenticated</span>
              </div>
              <p className="text-[10px] text-slate-400">Click anywhere outside or press X to close this popup.</p>
            </div>

            <div className="border-t border-slate-100 pt-1">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  if (onLogout) onLogout();
                }}
                className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 text-left transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout System</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
