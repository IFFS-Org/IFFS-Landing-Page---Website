import React from 'react';
import { Layers, Calendar, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenScheduler: () => void;
}

export default function Header({ onNavigate, onOpenScheduler }: HeaderProps) {
  return (
    <header className="sticky top-0 w-full bg-zinc-950/85 backdrop-blur-md text-white border-b border-zinc-900 z-50 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* Brand Identity */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-white cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-300 via-zinc-600 to-zinc-900 p-[1px] shadow-lg shadow-black/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
              <Layers className="w-4 h-4 text-zinc-300" />
            </div>
          </div>
          <div className="text-left font-display">
            <span className="text-sm font-bold tracking-tight text-white block">I.F.F SOLUTIONS</span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-500/80 block uppercase"><span className="text-zinc-600 mr-0.5">//</span>DESIGN & DIGITAL</span>
          </div>
        </button>

        {/* Central Nav Menu Option */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest text-zinc-400">
          <button
            onClick={() => onNavigate('hero')}
            className="hover:text-emerald-400 transition-colors cursor-pointer uppercase group/item"
          >
            <span className="text-emerald-500/70 group-hover/item:text-emerald-400 transition-colors mr-0.5">//</span> OVERVIEW
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('portfolio-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-emerald-400 transition-colors cursor-pointer uppercase group/item"
          >
            <span className="text-emerald-500/70 group-hover/item:text-emerald-400 transition-colors mr-0.5">//</span> SAMPLE PROJECTS
          </button>
        </nav>

        {/* Right Action: Sleek Scheduling Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenScheduler}
            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-zinc-850 to-zinc-900 hover:from-white hover:to-zinc-200 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-black border border-zinc-800 hover:border-white rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Project Quote</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
}
