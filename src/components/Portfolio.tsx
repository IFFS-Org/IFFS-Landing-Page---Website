import React, { useState } from 'react';
import { PROJECTS } from '../data/agencyData';
import { Project } from '../types';
import { ExternalLink, TrendingUp, FolderGit2 } from 'lucide-react';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'web-apps', label: 'Web Applications' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'brand-sites', label: 'Editorial Brands' },
    { id: 'ai-integrations', label: 'AI Products' }
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">Proven Success Case Studies</p>
            <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight leading-none">
              Web solutions that move the needle.
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Explore concrete examples of our custom product engineering. We merge robust development cycles with immediate business value metrics.
            </p>
          </div>

          {/* Filtering buttons (Horizontal Scrollable on mobile) */}
          <div className="flex flex-wrap gap-2.5 items-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-black text-white border-black'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between p-6 rounded-lg border border-slate-200 bg-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Visual Placeholder Header */}
                <div className="h-44 w-full bg-slate-50 border border-slate-200 rounded-lg mb-6 relative overflow-hidden flex items-center justify-center">
                  {/* Subtle code pattern decoration */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                  
                  {/* Case Study Pill Category */}
                  <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded border border-slate-300 text-[10px] font-mono font-bold text-slate-700 shadow-2xs">
                    {project.category.replace('-', ' ').toUpperCase()}
                  </div>

                  <FolderGit2 className="w-10 h-10 text-slate-400 group-hover:scale-110 transition-transform duration-300" />
                  
                  {/* Real-time Metric Badge overlaying bottom right */}
                  <div className="absolute bottom-3 right-3 bg-black text-white px-3 py-1.5 rounded-md text-[10px] font-mono font-extrabold flex items-center gap-1 shadow-xs">
                    <TrendingUp className="w-3 h-3" />
                    {project.results}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-lg font-black text-slate-950 mb-2 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Stack and Action Link */}
              <div className="pt-4 border-t border-slate-150 flex items-center justify-between">
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {project.techStack.slice(0, 3).map((stack, idx) => (
                    <span key={idx} className="text-[9px] font-mono font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                      {stack}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[9px] font-mono font-medium text-slate-400 py-0.5 px-1">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={`#contact`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-black hover:underline transition-colors"
                >
                  Inquire
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
              <p className="text-slate-500 font-medium">No active templates found in this directory.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-3 text-sm font-semibold text-black hover:underline"
              >
                Reset tags filter
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
