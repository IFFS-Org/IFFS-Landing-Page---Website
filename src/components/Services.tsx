import React from 'react';
import { SERVICES } from '../data/agencyData';
import { LayoutGrid, ShoppingCart, Sparkles, Compass, Check, ArrowRight } from 'lucide-react';

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid,
  ShoppingCart,
  Sparkles,
  Compass
};

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-white border-y border-slate-200/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        {/* Sections Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">Our Core Expertise</p>
          <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive development solutions built for optimal scalability and speed.
          </h2>
          <p className="text-base text-slate-600 mt-4 max-w-xl">
            We don’t believe in generic templates. Every line of React code, each database query, and all prompt layers are engineered to fuel business growth.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service) => {
            const IconComponent = IconMap[service.iconName] || LayoutGrid;
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative flex flex-col justify-between p-8 border border-slate-200 hover:border-black rounded-lg bg-white transition-all duration-300"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-slate-50 group-hover:bg-black group-hover:text-white rounded-lg text-slate-900 transition-all border border-slate-100">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-slate-950">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-black stroke-[3] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom interactive action */}
                <div className="pt-6 border-t border-slate-150 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 block uppercase">Baseline Investment</span>
                    <span className="text-lg font-display font-black text-slate-900">
                      from ${service.baselinePrice.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-black bg-slate-100 group-hover:bg-black group-hover:text-white border border-slate-200 rounded-lg transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Customise Proposal
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
