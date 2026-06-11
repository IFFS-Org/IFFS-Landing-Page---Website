import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/agencyData';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center font-sans">
        
        {/* Header Block */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">Client Satisfaction Endorsements</p>
          <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight leading-none">
            What our product partners say about us.
          </h2>
        </div>

        {/* Dynamic Review Layout */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 border border-slate-200 rounded-lg shadow-xs transition-all relative">
          <div className="flex justify-center gap-1 mb-6 text-slate-900">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} className="text-sm">✦</span>
            ))}
          </div>

          <blockquote className="text-lg md:text-xl font-medium text-slate-900 leading-relaxed max-w-2xl mx-auto italic mb-8">
            &ldquo;{TESTIMONIALS[activeIdx].text}&rdquo;
          </blockquote>

          {/* Author info */}
          <div>
            <p className="font-display text-base font-extrabold text-slate-950">{TESTIMONIALS[activeIdx].name}</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              {TESTIMONIALS[activeIdx].role} &middot; <span className="text-black font-extrabold underline decoration-black decoration-1">{TESTIMONIALS[activeIdx].company}</span>
            </p>
          </div>

          {/* Switch bullets */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((test, idx) => (
              <button
                key={test.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-black scale-125'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Show review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
