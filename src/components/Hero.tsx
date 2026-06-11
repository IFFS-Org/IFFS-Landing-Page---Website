import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Clock, 
  Send,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Sliders,
  Maximize2,
  Trash2,
  TrendingUp,
  Cpu,
  Layers,
  Code
} from 'lucide-react';
import WireframeGlobe from './WireframeGlobe';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Configured default state transitions
  const [activeTab, setActiveTab] = useState<'saas' | 'ecommerce' | 'brand'>('brand');
  const [portfolioTier, setPortfolioTier] = useState<'small' | 'medium' | 'large'>('medium');
  const [ecomTier, setEcomTier] = useState<'fixed' | 'small' | 'medium' | 'large'>('small');
  const [saasTier, setSaasTier] = useState<'small' | 'medium' | 'large'>('medium');
  const [videoCount, setVideoCount] = useState<number>(0);
  const [screenCount, setScreenCount] = useState<number>(0);
  const [interactiveFeatures, setInteractiveFeatures] = useState<boolean>(false);
  const [liveOrderService, setLiveOrderService] = useState<boolean>(false);
  const [apiIntegration, setApiIntegration] = useState<boolean>(false);
  const [timelineMode, setTimelineMode] = useState<'express' | 'standard'>('standard');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Status logs
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [quotesList, setQuotesList] = useState<any[]>([]);

  // Selected project details lightbox state
  const [inspectingProject, setInspectingProject] = useState<string | null>(null);

  // Initialize and load persistent inquiries
  useEffect(() => {
    try {
      const stored = localStorage.getItem('iff_solutions_quotes_journal');
      if (stored) {
        setQuotesList(JSON.parse(stored));
      } else {
        // Hydrate default modern item so the list looks elegant from first load
        const defaultSample = [
          {
            id: "SP-9921",
            clientName: "Aether Dynamics Inc.",
            clientEmail: "ops@aether.io",
            service: "Full-Stack Web App Engine",
            addons: ["SEO Audit", "Mathematical Type-Safety Protocol"],
            timeline: "Standard Horizon (30 Days)",
            total: 8500,
            notes: "Requires real-time streaming capability and a custom theme setup.",
            timestamp: "Oct 12, 10:45",
            status: "IN REVIEW"
          }
        ];
        setQuotesList(defaultSample);
        localStorage.setItem('iff_solutions_quotes_journal', JSON.stringify(defaultSample));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // System Catalog
  const SERVICE_PACKS = {
    brand: { 
      name: 'Interactive Brand Portfolio', 
      price: 500, 
      performance: '100%', 
      tech: 'React / Motion / SVG Grid',
      description: 'Minimal high-contrast creative hubs with slick grey gradients, bold display headers, and smooth state transitions.'
    },
    ecommerce: { 
      name: 'E-Commerce Portal', 
      price: 4900, 
      performance: '98%', 
      tech: 'Vite / Shopify / Tailwind',
      description: 'Sophisticated storefronts with secure checkouts, structured directories, and smooth visual filters.'
    },
    saas: { 
      name: 'Custom SaaS Platform', 
      price: 6800, 
      performance: '99%', 
      tech: 'React / Next.js / Tailwind',
      description: 'Fully responsive cloud SaaS with real-time UI, state management, secure endpoints, and optimal styling.'
    }
  };

  const HORIZONS = {
    standard: { label: 'Standard (30 Days)', rate: 1.0 },
    express: { label: 'Express (14 Days Speedy Horizon)', rate: 1.3 },
  };

  // Live dynamic calculations
  const basePrice = activeTab === 'brand' 
    ? (portfolioTier === 'small' ? 250 : portfolioTier === 'medium' ? 500 : 1000) 
    : activeTab === 'ecommerce'
      ? (ecomTier === 'fixed' ? 2500 : ecomTier === 'small' ? 5000 : ecomTier === 'medium' ? 7500 : 10000)
      : activeTab === 'saas'
        ? (saasTier === 'small' ? 5000 : saasTier === 'medium' ? 7500 : 10000)
        : (SERVICE_PACKS[activeTab]?.price || 500);
  const addonsPrice = (activeTab === 'brand' ? (videoCount * 50 + (interactiveFeatures ? 100 : 0)) : 0) + (activeTab === 'ecommerce' && liveOrderService ? 1000 : 0) + (activeTab === 'saas' ? screenCount * 100 : 0) + (apiIntegration ? 150 : 0);
  const factor = HORIZONS[timelineMode]?.rate || 1.0;
  const finalPrice = Math.round((basePrice + addonsPrice) * factor);

  // Submit quote & update database/localStorage journal
  const handleDispatchProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      setErrorMessage('COMPULSORY CHECKS: PLEASE ENTER CLIENT DESIGNATION & MAILING DETAILS.');
      return;
    }

    setErrorMessage('');
    
    const addonsSelected: string[] = [];
    if (activeTab === 'brand') {
      if (videoCount > 0) {
        addonsSelected.push(`Video Showcase Addon (${videoCount} videos)`);
      }
      if (interactiveFeatures) {
        addonsSelected.push('Interactive Features Addon');
      }
    }
    if (activeTab === 'ecommerce' && liveOrderService) {
      addonsSelected.push('Live Order Service Addon');
    }
    if (activeTab === 'saas' && screenCount > 0) {
      addonsSelected.push(`Additional Screens/Pages Addon (${screenCount} screens)`);
    }
    if (apiIntegration) {
      addonsSelected.push('Custom API Integration Addon');
    }

    const newQuoteSpec = {
      id: 'SP-' + Math.floor(1000 + Math.random() * 9000),
      clientName: clientName,
      clientEmail: clientEmail,
      service: activeTab === 'brand' 
        ? `${SERVICE_PACKS[activeTab].name} (${portfolioTier.toUpperCase()} TIER)` 
        : activeTab === 'ecommerce'
          ? `${SERVICE_PACKS[activeTab].name} (${ecomTier === 'fixed' ? 'FIXED PROD' : ecomTier.toUpperCase() + ' DYNAMIC'})`
          : activeTab === 'saas'
            ? `${SERVICE_PACKS[activeTab].name} (${saasTier.toUpperCase()} TIER)`
            : SERVICE_PACKS[activeTab].name,
      addons: addonsSelected,
      timeline: HORIZONS[timelineMode].label,
      total: finalPrice,
      notes: notes || 'No custom remarks specified.',
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: 'VERIFIED SUCCESS'
    };

    const newArray = [newQuoteSpec, ...quotesList];
    setQuotesList(newArray);
    try {
      localStorage.setItem('iff_solutions_quotes_journal', JSON.stringify(newArray));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
    setClientName('');
    setClientEmail('');
    setNotes('');
  };

  const handleClearJournal = () => {
    setQuotesList([]);
    try {
      localStorage.removeItem('iff_solutions_quotes_journal');
    } catch (e) {
      console.error(e);
    }
  };

  // Design Portfolio showcase variables
  const CASE_STUDIES = [
    {
      id: 'case-1',
      title: 'Aether Cloud Interface',
      tag: 'FINTECH SAAS',
      performance: '99.8%',
      bundleSize: '42KB',
      gradient: 'from-zinc-900 to-zinc-800',
      description: 'High-density numeric dashboard built for enterprise monitoring. Features smooth gray reactive graphs and custom slate layouts.'
    },
    {
      id: 'case-2',
      title: 'Monolith Gallery',
      tag: 'E-COMMERCE',
      performance: '100% Core Web',
      bundleSize: '24KB',
      gradient: 'from-zinc-800 via-zinc-900 to-zinc-950',
      description: 'Creative digital asset store utilizing lightweight web structures and beautiful glass transitions.'
    },
    {
      id: 'case-3',
      title: 'Zeta Protocol Engine',
      tag: 'BRAND PLATFORM',
      performance: '99.4%',
      bundleSize: '31KB',
      gradient: 'from-zinc-950 to-zinc-900',
      description: 'Minimalistic architecture utilizing custom CSS canvas grids, micro-interactions, and pristine typography.'
    }
  ];

  return (
    <section id="hero" className="w-full bg-zinc-950 min-h-screen text-slate-100 font-sans pb-24 overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      
      {/* Decorative Top Mesh Line and Hero header */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900/10 via-zinc-950/0 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 relative">
        
        {/* Modern Intro Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-[1px] w-8 bg-emerald-500/80 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            <span className="text-emerald-500/80 font-bold mr-1">//</span>I.F.F Solutions Digital Solutions Specialist
          </span>
        </div>

        {/* Dynamic Title and Intro Split */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Enlarged Transparent Wireframe Globe behind content - Fixed to travel down with user */}
          <div className="fixed right-[-50px] sm:right-[-20px] md:right-[0px] lg:right-[-40px] xl:right-[-80px] top-1/2 -translate-y-1/2 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[640px] md:h-[640px] lg:w-[760px] lg:h-[760px] pointer-events-none z-0 opacity-20 lg:opacity-30 mix-blend-screen overflow-visible select-none transition-all duration-300">
            <WireframeGlobe />
          </div>

          <div className="lg:col-span-12 xl:col-span-7 relative z-10 space-y-8">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600">
              Powerful interfaces for ambitious thinkers.
            </h1>

            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              We engineer bespoke digital systems configured with ultra-clean layouts, premium gray gradients, and flawless performance parameters. This is custom software built to look and act premium.
            </p>

            {/* Quick Interactive Nav Triggers */}
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('quotes-estimator-block');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg hover:-translate-y-0.5 duration-200 cursor-pointer"
              >
                Launch Scheduler Spec
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('portfolio-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-900/60 hover:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 rounded-lg transition-all cursor-pointer"
              >
                <span className="text-emerald-500/80 font-bold mr-0.5">//</span> Explore Interactive Work
              </button>
            </div>
          </div>

          {/* Right Column: Premium Quote Scheduler Drawer (5 Columns) */}
          <div id="quotes-estimator-block" className="lg:col-span-12 xl:col-span-5 relative z-10">

            <div className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 shadow-2xl">
              
              {/* Backing glass layer */}
              <div className="bg-zinc-950/95 rounded-2xl p-6 relative z-10 space-y-6">
                
                {/* Title */}
                <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">
                      <span className="text-emerald-500/80 font-bold mr-1">//</span>ESTIMATOR SYSTEM v2
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-1 uppercase tracking-tight">
                      Estimator System
                    </h3>
                  </div>
                  <div className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    REALTIME ENGINE
                  </div>
                </div>

                {/* Main Interactive Form */}
                <form onSubmit={handleDispatchProposal} className="space-y-5">
                  {isSubmitted && (
                    <div className="p-4 bg-zinc-900 border border-emerald-800 rounded-xl space-y-2">
                      <p className="text-xs font-mono font-bold text-emerald-400">✓ ESTIMATE JOURNALED SUCCESSFULLY</p>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Your specifications are logged securely to your guest session browser. View the persistent ledger at the bottom of the dashboard.
                      </p>
                      <button 
                        type="button" 
                        onClick={() => setIsSubmitted(false)}
                        className="text-[10px] font-mono font-bold underline text-emerald-400 hover:text-emerald-300 cursor-pointer"
                      >
                        [ Formulate Another Specification ]
                      </button>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 bg-zinc-950 border border-rose-900 text-[11px] font-mono text-rose-400 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Service selector tabs */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                      1. Select Project archetype
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {Object.entries(SERVICE_PACKS).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveTab(key as 'saas' | 'ecommerce' | 'brand')}
                          className={`py-2 text-[10px] font-mono font-bold tracking-wider rounded-md uppercase border transition-all cursor-pointer ${
                            activeTab === key
                              ? 'bg-zinc-800 border-zinc-600 text-white shadow-xs'
                              : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-zinc-350 hover:bg-zinc-900'
                          }`}
                        >
                          {key === 'saas' ? 'Custom SAAS' : key === 'ecommerce' ? 'E-Com' : 'Portfolio'}
                        </button>
                      ))}
                    </div>
                    {/* Selected archetype details */}
                    <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-lg space-y-2.5">
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        {activeTab === 'brand' 
                          ? (portfolioTier === 'small' 
                              ? 'Single-page essential landing core. Crisp, minimal showcase built with lightweight key-value sections.' 
                              : portfolioTier === 'medium' 
                                ? SERVICE_PACKS.brand.description 
                                : 'Immersive enterprise creative hub. Multi-page showcases, customized 3D grids, and deep interactive layouts.')
                          : activeTab === 'ecommerce'
                            ? (ecomTier === 'fixed'
                                ? 'Fixed-product static catalog storefront. Tailored for solid curated collections without heavy database management.'
                                : ecomTier === 'small'
                                  ? 'Dynamic inventory storefront with agile product indexing and fast integrated checkout flow.'
                                  : ecomTier === 'medium'
                                    ? SERVICE_PACKS.ecommerce.description
                                    : 'Scale-focused enterprise commerce engine. Advanced inventories, database synclinks, and deep visual filters.')
                            : activeTab === 'saas'
                              ? (saasTier === 'small'
                                  ? 'Agile SaaS platform boilerplate. Essential authentication, a clean core dashboard, and basic database integration.'
                                  : saasTier === 'medium'
                                    ? SERVICE_PACKS.saas.description
                                    : 'Enterprise-grade custom SaaS architecture. High-performance states, deeply complex dashboards, cloud synchronization, and custom UI modules.')
                              : SERVICE_PACKS[activeTab].description}
                      </p>

                      {activeTab === 'brand' && (
                        <div className="space-y-1.5 pt-2 border-t border-zinc-850">
                          <span className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                            Portfolio Size Tier
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {(['small', 'medium', 'large'] as const).map((tier) => (
                              <button
                                key={tier}
                                type="button"
                                onClick={() => setPortfolioTier(tier)}
                                className={`py-1 rounded text-[9px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                                  portfolioTier === tier
                                    ? 'bg-zinc-850 border-zinc-650 text-white'
                                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900'
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'ecommerce' && (
                        <div className="space-y-1.5 pt-2 border-t border-zinc-850">
                          <span className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                            E-Commerce Platform Tier
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {(['fixed', 'small', 'medium', 'large'] as const).map((tier) => {
                              const labels = {
                                fixed: 'Fixed Prod',
                                small: 'Small Dynamic',
                                medium: 'Medium Dynamic',
                                large: 'Large Dynamic'
                              };
                              return (
                                <button
                                  key={tier}
                                  type="button"
                                  onClick={() => setEcomTier(tier)}
                                  className={`py-1.5 px-2 rounded text-[9px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                                    ecomTier === tier
                                      ? 'bg-zinc-850 border-zinc-650 text-white'
                                      : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900'
                                  }`}
                                >
                                  {labels[tier]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {activeTab === 'saas' && (
                        <div className="space-y-1.5 pt-2 border-t border-zinc-850">
                          <span className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                            SaaS Platform Tier
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(['small', 'medium', 'large'] as const).map((tier) => (
                              <button
                                key={tier}
                                type="button"
                                onClick={() => setSaasTier(tier)}
                                className={`py-1.5 px-2 rounded text-[9px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                                  saasTier === tier
                                    ? 'bg-zinc-850 border-zinc-650 text-white'
                                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900'
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Protocols extra selectors */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                      2. Optional Architectural addon layers
                    </span>
                    <div className="p-3 bg-zinc-900/60 border border-zinc-900 rounded-lg space-y-3">
                      {activeTab === 'brand' && (
                        <>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="block text-xs font-mono font-bold text-white">Video Showcase Addon</span>
                              <span className="block text-[10px] text-zinc-500 leading-normal">Interactive video players integrated directly into work showcases.</span>
                            </div>
                            <span className="font-semibold font-mono text-zinc-400 text-xs shrink-0 self-start">+$50 / video</span>
                          </div>
                          <div className="flex items-center justify-between bg-zinc-950/80 p-2 rounded-md border border-zinc-900">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase">Videos to embed</span>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                disabled={videoCount <= 0}
                                onClick={() => setVideoCount(prev => Math.max(0, prev - 1))}
                                className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center font-mono disabled:opacity-45 disabled:pointer-events-none cursor-pointer text-xs"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono font-bold text-white min-w-[12px] text-center">{videoCount}</span>
                              <button
                                type="button"
                                onClick={() => setVideoCount(prev => prev + 1)}
                                className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center font-mono cursor-pointer text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Elegant Divider */}
                          <div className="border-t border-zinc-950/80 my-1" />

                          {/* Interactive Features Optional Addon */}
                          <button
                            type="button"
                            onClick={() => setInteractiveFeatures(p => !p)}
                            className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                              interactiveFeatures
                                ? 'bg-zinc-950/80 border-zinc-700/80 text-white'
                                : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-950/30'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className={`w-3.5 h-3.5 mt-0.5 border flex items-center justify-center rounded shrink-0 ${interactiveFeatures ? 'bg-white border-white text-black' : 'border-zinc-800'}`}>
                                {interactiveFeatures && <Check className="w-2.5 h-2.5 text-zinc-950 stroke-[3.5]" />}
                              </span>
                              <div>
                                <span className="block text-xs font-mono font-bold text-zinc-300">Interactive Features Addon</span>
                                <span className="block text-[10px] text-zinc-500 leading-tight mt-0.5">Custom dynamic grids, layouts, or premium visual filters.</span>
                              </div>
                            </div>
                            <span className="font-semibold font-mono text-zinc-400 text-xs shrink-0 self-start">+$100</span>
                          </button>

                          {/* Elegant Divider */}
                          <div className="border-t border-zinc-950/80 mt-1" />
                        </>
                      )}

                      {activeTab === 'ecommerce' && (
                        <>
                          <button
                            type="button"
                            onClick={() => setLiveOrderService(p => !p)}
                            className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                              liveOrderService
                                ? 'bg-zinc-950/80 border-zinc-700/80 text-white'
                                : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-950/30'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className={`w-3.5 h-3.5 mt-0.5 border flex items-center justify-center rounded shrink-0 ${liveOrderService ? 'bg-white border-white text-black' : 'border-zinc-800'}`}>
                                {liveOrderService && <Check className="w-2.5 h-2.5 text-zinc-950 stroke-[3.5]" />}
                              </span>
                              <div>
                                <span className="block text-xs font-mono font-bold text-zinc-300">Live Order Service Addon</span>
                                <span className="block text-[10px] text-zinc-500 leading-tight mt-0.5">Real-time dynamic order stream with push notification triggers.</span>
                              </div>
                            </div>
                            <span className="font-semibold font-mono text-zinc-400 text-xs shrink-0 self-start">+$1,000</span>
                          </button>

                          {/* Elegant Divider */}
                          <div className="border-t border-zinc-950/80 my-1" />
                        </>
                      )}

                      {/* Additional Screens/Pages Addon */}
                      {activeTab === 'saas' && (
                        <>
                          <div className="space-y-2.5 p-2 rounded-lg bg-zinc-950/25 border border-zinc-900/60 transition-all">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="block text-xs font-mono font-bold text-zinc-300">Additional Screens/Pages</span>
                                <span className="block text-[10px] text-zinc-500 leading-normal">Expand interface coverage with customized responsive views or layouts.</span>
                              </div>
                              <span className="font-semibold font-mono text-zinc-400 text-xs shrink-0 self-start">+$100 / pg</span>
                            </div>
                            <div className="flex items-center justify-between bg-zinc-950/80 p-2 rounded border border-zinc-900">
                              <span className="text-[10px] font-mono text-zinc-400 uppercase">Quantity</span>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  disabled={screenCount <= 0}
                                  onClick={() => setScreenCount(prev => Math.max(0, prev - 1))}
                                  className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center font-mono disabled:opacity-45 disabled:pointer-events-none cursor-pointer text-xs"
                                >
                                  -
                                </button>
                                <span className="text-xs font-mono font-bold text-white min-w-[12px] text-center">{screenCount}</span>
                                <button
                                  type="button"
                                  onClick={() => setScreenCount(prev => prev + 1)}
                                  className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center font-mono cursor-pointer text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Elegant Divider */}
                          <div className="border-t border-zinc-950/80 my-1" />
                        </>
                      )}

                      {/* Custom API Integration Addon (available for all archetypes) */}
                      <button
                        type="button"
                        onClick={() => setApiIntegration(p => !p)}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                          apiIntegration
                            ? 'bg-zinc-950/80 border-zinc-700/80 text-white'
                            : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-950/30'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-3.5 h-3.5 mt-0.5 border flex items-center justify-center rounded shrink-0 ${apiIntegration ? 'bg-white border-white text-black' : 'border-zinc-800'}`}>
                            {apiIntegration && <Check className="w-2.5 h-2.5 text-zinc-950 stroke-[3.5]" />}
                          </span>
                          <div>
                            <span className="block text-xs font-mono font-bold text-zinc-300">Custom API Integration</span>
                            <span className="block text-[10px] text-zinc-500 leading-tight mt-0.5">Integrate third-party services, raw data feeds, or REST endpoints.</span>
                          </div>
                        </div>
                        <span className="font-semibold font-mono text-zinc-400 text-xs shrink-0 self-start">+$150</span>
                      </button>
                    </div>
                  </div>

                  {/* Select timeline limits */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                      3. Speed Schedule Horizon
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(HORIZONS).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setTimelineMode(key as 'standard' | 'express')}
                          className={`py-2 text-[10px] font-mono rounded border transition-all cursor-pointer ${
                            timelineMode === key
                              ? 'bg-white text-black border-white font-bold'
                              : 'bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-400'
                          }`}
                        >
                          <div>{value.label}</div>
                          <div className="text-[9px] text-zinc-500 mt-0.5">
                            {value.rate > 1.0 ? '+30% fast rate apply' : 'Base premium rate'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer designations */}
                  <div className="space-y-3 pt-2 border-t border-zinc-900 text-zinc-300">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase mb-1">Your Name *</label>
                        <input 
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Client Designation"
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono rounded-lg focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase mb-1">Email Address *</label>
                        <input 
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="client@domain.com"
                          className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono rounded-lg focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono tracking-wider text-zinc-500 uppercase mb-1">Additional Project Specifications</label>
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Detail specific views, design references, database systems, or unique criteria..."
                        rows={2}
                        className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs font-mono rounded-lg focus:outline-hidden focus:border-zinc-500 text-white placeholder-zinc-600 leading-relaxed resize-none"
                      />
                    </div>
                  </div>

                  {/* Total pricing feedback */}
                  <div className="p-3.5 bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase text-zinc-400">Total Project Estimate</span>
                    <span className="text-lg font-display font-bold text-white tracking-tight">
                      ${finalPrice.toLocaleString()} <span className="text-xs text-zinc-500 uppercase font-mono font-normal">USD</span>
                    </span>
                  </div>

                  {/* Submission dispatch */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-transform hover:-translate-y-px duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Schedule quote and consultation session
                  </button>

                  <p className="text-[8px] font-mono text-zinc-600 text-center leading-normal">
                    * Interactive budget simulator. Real commission timelines and parameters are locked down during introductory telephone syncs.
                  </p>
                </form>

              </div>
            </div>
          </div>

        </div>

        {/* Selected Projects/Shaders Showcases "Design Portfolio Section" */}
        <div id="portfolio-grid" className="mt-32 pt-20 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase block">
                <span className="text-emerald-500/80 font-bold mr-1">//</span>WORK SHOWCASE
              </span>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-white mt-1 tracking-tight">
                Refined digital systems we've shipped.
              </h2>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm">
              Each commission is meticulously structured, utilizing nice grey gradients, pristine typography grid alignments, and high performance scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c) => (
              <div 
                key={c.id} 
                className={`group border border-zinc-900 bg-gradient-to-b ${c.gradient} p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 relative overflow-hidden`}
              >
                {/* Glowing mesh background for hover state */}
                <div className="absolute inset-0 bg-radial-gradient from-zinc-700/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span className="tracking-widest uppercase block bg-zinc-950 px-2.5 py-1 rounded border border-zinc-900 text-zinc-400">{c.tag}</span>
                    <span>SIZE: {c.bundleSize}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-zinc-200 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {c.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-900/60 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Speed: {c.performance}</span>
                  </div>
                  
                  <button
                    onClick={() => setInspectingProject(inspectingProject === c.id ? null : c.id)}
                    className="text-[10px] font-mono font-bold tracking-wider text-white hover:text-zinc-300 uppercase underline cursor-pointer "
                  >
                    {inspectingProject === c.id ? '[ Close Specifications ]' : '[ INSPECT SPECS ]'}
                  </button>
                </div>

                {/* Inspect specs detailed overlay */}
                {inspectingProject === c.id && (
                  <div className="absolute inset-0 bg-zinc-950 p-6 z-20 flex flex-col justify-between animate-fadeIn border border-zinc-800 rounded-2xl font-mono text-[11px] leading-relaxed">
                    <div className="space-y-3 text-zinc-400">
                      <div className="flex justify-between text-[10px] text-zinc-500 uppercase border-b border-zinc-900 pb-1.5">
                        <span>SYSTEM SPEC SHEET</span>
                        <span className="text-white font-bold">{c.title}</span>
                      </div>
                      
                      <div>
                        <strong className="text-white"><span className="text-emerald-500/80 font-bold mr-1">//</span>RENDERING PIPELINE:</strong>
                        <p className="text-zinc-400 mt-0.5">High-efficiency layout nodes, optimized vector packages, absolute styling grids.</p>
                      </div>

                      <div>
                        <strong className="text-white"><span className="text-emerald-500/80 font-bold mr-1">//</span>OPTIMAL LOAD PROFILE:</strong>
                        <div className="grid grid-cols-2 gap-2 mt-1 bg-zinc-900 p-2 rounded border border-zinc-850 text-[10px]">
                          <span>JS Bndl: {c.bundleSize}</span>
                          <span>FID Check: &lt;1.2ms</span>
                          <span>CLS Score: 0.00</span>
                          <span>TBT Run: 0.05ms</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-zinc-500 italic mt-2">
                        Designed with modern zinc and metallic steel grays to emulate pristine technical blueprinting.
                      </p>
                    </div>

                    <button
                      onClick={() => setInspectingProject(null)}
                      className="w-full mt-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-[10px] text-white font-bold uppercase rounded border border-zinc-800 cursor-pointer text-center"
                    >
                      Return to Gallery
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



      </div>
    </section>
  );
}
