import React from 'react';
import { Layers } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 relative z-10 pt-16 pb-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-xs">
        
        {/* Main Footer Multi-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Bio info block */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="p-1 bg-gradient-to-br from-white to-zinc-600 rounded">
                <Layers className="w-4 h-4 text-black" />
              </div>
              <span className="font-display font-bold tracking-tight uppercase">
                I.F.F SOLUTIONS
              </span>
            </div>
            <p className="text-zinc-500 leading-relaxed text-[11px] max-w-sm font-light">
              Designing and formulating hyper-dense interactive applications, custom cloud solutions, stable state structures, and pristine aesthetic grids. Empowering teams to deploy fast and beautiful.
            </p>
          </div>

          {/* Social connections info */}
          <div className="md:col-span-7 space-y-3">
            <h5 className="text-zinc-300 text-[11px] font-mono tracking-widest uppercase"><span className="text-emerald-500/80 font-bold mr-1">//</span>INQUIRIES & CABLES</h5>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
               Have a custom scope or specific interface design requirement? Connect with our architectural division:
            </p>
            <div className="text-[11px] font-mono text-white pt-1">
              immanuel.a.fowler@gmail.com
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600 font-mono tracking-wider uppercase">
          <p>© {currentYear} I.F.F SOLUTIONS. DESIGNED WITH PRECISION. ALL RIGHTS COMMITTED TO PRESERVATION.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-350 cursor-pointer">TERMS OF COMPILATION</span>
            <span>•</span>
            <span className="hover:text-zinc-350 cursor-pointer">PRIVACY PROTOCOL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
