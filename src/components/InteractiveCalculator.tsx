import React, { useState, useEffect } from 'react';
import {
  CALCULATOR_PLATFORMS,
  CALCULATOR_ADDONS,
  CALCULATOR_TIMELINES
} from '../data/agencyData';
import { CalculatorOption } from '../types';
import { Sparkles, Coins, Clock, ChevronRight, Check, CheckCircle2 } from 'lucide-react';

interface InteractiveCalculatorProps {
  selectedPlatformId: string;
  selectedAddonIds: string[];
  selectedTimelineId: string;
  onConfigChange: (platformId: string, addonIds: string[], timelineId: string) => void;
  onSendEstimateToContact: (estimateSummary: {
    platformName: string;
    addonsSelectedNames: string[];
    timelineName: string;
    totalAmount: number;
  }) => void;
}

export default function InteractiveCalculator({
  selectedPlatformId,
  selectedAddonIds,
  selectedTimelineId,
  onConfigChange,
  onSendEstimateToContact
}: InteractiveCalculatorProps) {
  
  // Local state to keep UI reactive
  const [platform, setPlatform] = useState<string>(selectedPlatformId || 'p_landing');
  const [addons, setAddons] = useState<string[]>(selectedAddonIds || []);
  const [timeline, setTimeline] = useState<string>(selectedTimelineId || 't_standard');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Sync state if prop changes (e.g. if arriving from a service-card click)
  useEffect(() => {
    if (selectedPlatformId) {
      setPlatform(selectedPlatformId);
    }
  }, [selectedPlatformId]);

  useEffect(() => {
    if (selectedAddonIds && selectedAddonIds.length > 0) {
      setAddons(selectedAddonIds);
    }
  }, [selectedAddonIds]);

  useEffect(() => {
    if (selectedTimelineId) {
      setTimeline(selectedTimelineId);
    }
  }, [selectedTimelineId]);

  // Handle updates to coordinate back to App
  const handlePlatformSet = (id: string) => {
    setPlatform(id);
    onConfigChange(id, addons, timeline);
  };

  const handleAddonToggle = (id: string) => {
    let updated;
    if (addons.includes(id)) {
      updated = addons.filter(curr => curr !== id);
    } else {
      updated = [...addons, id];
    }
    setAddons(updated);
    onConfigChange(platform, updated, timeline);
  };

  const handleTimelineSet = (id: string) => {
    setTimeline(id);
    onConfigChange(platform, addons, id);
  };

  // Cost calculation arithmetic
  const getSubtotal = () => {
    const platCost = CALCULATOR_PLATFORMS.find(p => p.id === platform)?.price || 0;
    const addonsCost = addons.reduce((sum, currentId) => {
      const addObj = CALCULATOR_ADDONS.find(a => a.id === currentId);
      return sum + (addObj?.price || 0);
    }, 0);
    return platCost + addonsCost;
  };

  const getTimelineMultiplier = () => {
    const timObj = CALCULATOR_TIMELINES.find(t => t.id === timeline);
    return timObj?.multiplier || 1.0;
  };

  const getFinalTotal = () => {
    return Math.round(getSubtotal() * getTimelineMultiplier());
  };

  const currentPlatformObj = CALCULATOR_PLATFORMS.find(p => p.id === platform);
  const currentTimelineObj = CALCULATOR_TIMELINES.find(t => t.id === timeline);
  const activeAddonObjs = CALCULATOR_ADDONS.filter(addon => addons.includes(addon.id));

  const handleSendToContact = () => {
    onSendEstimateToContact({
      platformName: currentPlatformObj?.name || 'Custom Web Site',
      addonsSelectedNames: activeAddonObjs.map(a => a.name),
      timelineName: currentTimelineObj?.name || 'Standard 6-8 Weeks',
      totalAmount: getFinalTotal()
    });

    setCopiedSuccess(true);
    setTimeout(() => {
      setCopiedSuccess(false);
    }, 2500);
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white/40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">Interactive Scope Planner</p>
          <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Calculate your investment dynamically in real time.
          </h2>
          <p className="text-base text-slate-600 mt-4 max-w-xl">
            Select your project type, choose key user core features, and select your target timeline metrics. Instantly review an itemized, custom design proposal draft.
          </p>
        </div>

        {/* Dynamic Calculator Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Selectable Configurations (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Step 1: Base Platform */}
            <div className="bg-white p-6 md:p-8 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center text-xs font-mono font-bold">1</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">Choose Core Web Platform</h3>
                  <p className="text-xs text-slate-500">Pick the architectural layout framework that aligns with your product goal.</p>
                </div>
              </div>

              <div className="space-y-4">
                {CALCULATOR_PLATFORMS.map((plat) => {
                  const isCurPlat = platform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => handlePlatformSet(plat.id)}
                      className={`w-full text-left p-4.5 rounded-lg border transition-all flex justify-between items-start cursor-pointer ${
                        isCurPlat
                          ? 'bg-slate-50 border-black ring-1 ring-black/30'
                          : 'bg-white border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="max-w-[78%] flex gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          isCurPlat ? 'border-black bg-black text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isCurPlat && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{plat.name}</p>
                          <p className="text-xs text-slate-500 mt-1 leading-normal">{plat.description}</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100/80 shrink-0">
                        ${plat.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Advanced Features */}
            <div className="bg-white p-6 md:p-8 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center text-xs font-mono font-bold">2</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">Custom Engineering Modules</h3>
                  <p className="text-xs text-slate-500">Select multi-dimensional tools to elevate security, layout, or AI features.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CALCULATOR_ADDONS.map((addon) => {
                  const isActive = addons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`text-left p-4 rounded-lg border transition-all flex flex-col justify-between h-40 cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 border-black text-white ring-1 ring-black/20'
                          : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                            isActive ? 'bg-white border-white text-black' : 'bg-white border-slate-300'
                          }`}>
                            {isActive && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
                          </span>
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                            isActive ? 'text-white bg-slate-850 border border-slate-700' : 'text-slate-800 bg-slate-100'
                          }`}>
                            +${addon.price.toLocaleString()}
                          </span>
                        </div>
                        <p className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>{addon.name}</p>
                        <p className={`text-[11px] mt-1 leading-normal line-clamp-3 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{addon.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Timelines */}
            <div className="bg-white p-6 md:p-8 rounded-lg border border-slate-200 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 bg-black text-white rounded-md flex items-center justify-center text-xs font-mono font-bold">3</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">Launch Priority &amp; Testing Timeline</h3>
                  <p className="text-xs text-slate-500">Pick a deployment cycle to determine development resource allocation.</p>
                </div>
              </div>

              <div className="space-y-3">
                {CALCULATOR_TIMELINES.map((timeObj) => {
                  const isCurTime = timeline === timeObj.id;
                  return (
                    <button
                      key={timeObj.id}
                      onClick={() => handleTimelineSet(timeObj.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                        isCurTime
                          ? 'bg-slate-50 border-black ring-1 ring-black/20'
                          : 'bg-white border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="max-w-[75%] flex gap-3 items-center">
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                          isCurTime ? 'bg-black border-black text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isCurTime && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{timeObj.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{timeObj.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-100 border border-slate-150">
                        {timeObj.multiplier === 1.0 ? 'Baseline' : `x${timeObj.multiplier}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
          </div>

          {/* Proposal Summary Invoice (Right 5 Cols - Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-black text-white p-6 md:p-8 rounded-lg border border-black shadow-2xl relative overflow-hidden">

              {/* Company Logo Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
                <div>
                  <h4 className="font-display font-black text-md sm:text-lg tracking-wide flex items-center gap-1.5 p-0">
                    <span className="text-emerald-500 font-mono font-bold">//</span> I.F.F SOLUTIONS
                  </h4>
                  <p className="text-[9px] font-mono text-emerald-400 tracking-widest uppercase">PRELIMINARY INVOICE SPEC</p>
                </div>
                <Coins className="w-5.5 h-5.5 text-emerald-500 animate-pulse" />
              </div>

              {/* Scope breakdown list */}
              <div className="space-y-4 my-6">
                {/* Platform Item */}
                <div className="flex justify-between items-start text-xs">
                  <div className="max-w-[75%]">
                    <p className="text-slate-400 font-mono uppercase tracking-wider text-[9px]"><span className="text-emerald-500 mr-1">//</span>PLATFORM ARCHITECTURE</p>
                    <p className="font-bold text-white mt-1">{currentPlatformObj?.name}</p>
                  </div>
                  <span className="font-mono text-slate-200 mt-4">${currentPlatformObj?.price.toLocaleString()}</span>
                </div>

                {/* Add-ons list */}
                {activeAddonObjs.length > 0 && (
                  <div className="pt-3 border-t border-zinc-900">
                    <p className="text-slate-400 font-mono uppercase tracking-wider text-[9px] mb-2"><span className="text-emerald-500 mr-1">//</span>CUSTOM MODULES</p>
                    <div className="space-y-2">
                      {activeAddonObjs.map((addon) => (
                        <div key={addon.id} className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium truncate max-w-[75%]">● {addon.name}</span>
                          <span className="font-mono text-slate-300 shrink-0">+${addon.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timeline Item */}
                <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-slate-400 font-mono uppercase tracking-wider text-[9px]"><span className="text-emerald-500 mr-1">//</span>TIMELINE &amp; TESTING RATE</p>
                    <p className="font-bold text-white mt-0.5">{currentTimelineObj?.name}</p>
                  </div>
                  <span className="font-mono text-slate-300">
                    x{currentTimelineObj?.multiplier}
                  </span>
                </div>
              </div>

              {/* Total Calculation Area */}
              <div className="pt-6 border-t border-zinc-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Gross Subtotal</span>
                  <span className="font-mono">${getSubtotal().toLocaleString()}</span>
                </div>
                {getTimelineMultiplier() !== 1.0 && (
                  <div className="flex justify-between text-xs text-slate-300 font-medium">
                    <span>Priority Speed Premium</span>
                    <span className="font-mono">+{Math.round((getTimelineMultiplier() - 1.0) * 100)}%</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-zinc-400 font-medium items-center">
                  <span>Architecture Consultation</span>
                  <span className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 text-white px-2 py-0.5 rounded">100% FREE</span>
                </div>

                {/* Final Total Badge */}
                <div className="flex justify-between items-baseline pt-4 border-t border-zinc-800">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">ESTIMATED TOTAL</span>
                  <div className="text-right">
                    <span className="text-3xl font-display font-black text-white">
                      ${getFinalTotal().toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">USD (Excl. Tax)</span>
                  </div>
                </div>
              </div>

              {/* CTA Action - Export to Client Inquiry workspace container */}
              <div className="mt-8">
                <button
                  onClick={handleSendToContact}
                  className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copiedSuccess
                      ? 'bg-zinc-800 text-white hover:bg-zinc-750 border border-zinc-700'
                      : 'bg-white text-black hover:bg-slate-100 border border-white'
                  }`}
                >
                  {copiedSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 animate-bounce" />
                      Scope Loaded in Contacts Block!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5" />
                      Apply Scope to Project Form
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2.5">
                  Does not bind you. Pre-populates the inquiry planner below for instant review.
                </p>
              </div>

            </div>

            {/* Trust Assurance Card */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 text-slate-600 text-xs leading-relaxed space-y-3">
              <p className="font-bold text-slate-800 font-display">Our Structural Commitments:</p>
              <div className="flex gap-2.5 items-start">
                <span className="text-black font-bold block mt-0.5">✔</span>
                <span><strong>No Hidden Charges</strong>: Custom database structure design, web hosting routing, and UI elements are fully bundled.</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-black font-bold block mt-0.5">✔</span>
                <span><strong>Continuous Deployment updates</strong>: Daily developer previews of active repositories mean you remain are in operational control.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
