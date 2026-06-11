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
  bookingUrl: string;
}

export default function Hero({ 
  onNavigate,
  bookingUrl
}: HeroProps) {
  // Configured default state transitions
  const [activeTab, setActiveTab] = useState<'saas' | 'ecommerce' | 'brand'>('brand');
  const [iframeLoading, setIframeLoading] = useState(true);
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

  const [copiedField, setCopiedField] = useState<string | null>(null);



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

  const specSummaryText = `Client Designation: ${clientName}
Email: ${clientEmail}
Project Archetype: ${
    activeTab === 'brand' 
      ? `Interactive Brand Portfolio (${portfolioTier.toUpperCase()} TIER)` 
      : activeTab === 'ecommerce'
        ? `E-Commerce Portal (${ecomTier === 'fixed' ? 'FIXED PROD' : ecomTier.toUpperCase() + ' DYNAMIC'})`
        : `Custom SaaS Platform (${saasTier.toUpperCase()} TIER)`
  }
Estimate: $${finalPrice.toLocaleString()} USD
Timeline: ${HORIZONS[timelineMode]?.label}
Selected Addons: ${
    [
      activeTab === 'brand' && videoCount > 0 ? `Video Showcase (${videoCount})` : '',
      activeTab === 'brand' && interactiveFeatures ? 'Interactive Grids' : '',
      activeTab === 'ecommerce' && liveOrderService ? 'Live Order Stream' : '',
      activeTab === 'saas' && screenCount > 0 ? `Screens (${screenCount})` : '',
      apiIntegration ? 'Custom API Links' : ''
    ].filter(Boolean).join(', ') || 'None'
  }
Remarks: ${notes || 'None specified.'}`;

  const triggerCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getPrefilledUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('calendly.com')) {
      try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('name', clientName);
        urlObj.searchParams.set('email', clientEmail);
        urlObj.searchParams.set('a1', specSummaryText);
        return urlObj.toString();
      } catch {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}name=${encodeURIComponent(clientName)}&email=${encodeURIComponent(clientEmail)}&a1=${encodeURIComponent(specSummaryText)}`;
      }
    }
    return url;
  };

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
    setIframeLoading(true);
  };

  const handleClearJournal = () => {
    setQuotesList([]);
    try {
      localStorage.removeItem('iff_solutions_quotes_journal');
    } catch (e) {
      console.error(e);
    }
  };


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

                {/* Main Interactive Form / booking scheduler integration flow */}
                {isSubmitted ? (
                  <div className="space-y-5 animate-fadeIn">
                    {/* Success Alert */}
                    <div className="p-4 bg-zinc-900 border border-emerald-900/60 rounded-xl space-y-2">
                      <p className="text-xs font-mono font-bold text-emerald-400">✓ PROPOSAL SAVED & SYNCED</p>
                      <p className="text-[11px] text-zinc-400 leading-normal">
                        Choose a time slot for your free consultation session below to review specifications with our lead architect.
                      </p>
                    </div>

                    {/* Copy-Paste Specs Helper (only shown for Google Calendar embeds since Calendly handles pre-filling automatically) */}
                    {!bookingUrl.includes('calendly.com') && (
                      <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-3">
                        <div>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                            📋 Google Booking Integration Helper
                          </span>
                          <p className="text-[10px] text-zinc-405 leading-normal mt-1 text-zinc-400">
                            Google Booking does not support automatic form pre-filling. Use the buttons below to quickly copy your specification details and paste them into the Google Calendar booking form fields:
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => triggerCopy(clientName, 'name')}
                            className={`px-3 py-1.5 border rounded text-[10px] font-mono transition-all flex items-center justify-center cursor-pointer ${
                              copiedField === 'name' 
                                ? 'bg-emerald-950 border-emerald-800 text-emerald-400' 
                                : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-350 hover:text-white'
                            }`}
                          >
                            {copiedField === 'name' ? '✓ Copied Name' : 'Copy Name'}
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerCopy(clientEmail, 'email')}
                            className={`px-3 py-1.5 border rounded text-[10px] font-mono transition-all flex items-center justify-center cursor-pointer ${
                              copiedField === 'email' 
                                ? 'bg-emerald-950 border-emerald-800 text-emerald-400' 
                                : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-350 hover:text-white'
                            }`}
                          >
                            {copiedField === 'email' ? '✓ Copied Email' : 'Copy Email'}
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerCopy(specSummaryText, 'specs')}
                            className={`px-3 py-1.5 border rounded text-[10px] font-mono transition-all flex items-center justify-center cursor-pointer ${
                              copiedField === 'specs' 
                                ? 'bg-emerald-950 border-emerald-800 text-emerald-400' 
                                : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-350 hover:text-white'
                            }`}
                          >
                            {copiedField === 'specs' ? '✓ Copied Specs' : 'Copy Specs Summary'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Booking Scheduler Iframe Embedded */}
                    <div className="relative border border-zinc-900 bg-white rounded-xl overflow-hidden h-[480px] shadow-2xl">
                      {iframeLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 space-y-4">
                          <div className="w-6 h-6 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                          <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">Connecting to scheduler...</span>
                        </div>
                      )}
                      
                      {!bookingUrl || bookingUrl.includes('schedules/...') || bookingUrl.trim() === '' ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 p-6 text-center space-y-3">
                          <AlertCircle className="w-6 h-6 text-zinc-400" />
                          <h5 className="text-white font-display text-xs font-bold uppercase tracking-wide">Booking URL Setup Required</h5>
                          <p className="text-[10px] text-zinc-500 font-mono">Set your Booking URL in .env as VITE_BOOKING_URL or click the gear icon above.</p>
                        </div>
                      ) : (
                        <iframe
                          src={getPrefilledUrl(bookingUrl)}
                          onLoad={() => setIframeLoading(false)}
                          className="w-full h-full border-0"
                          allowFullScreen
                          title="Inline Booking Calendar Page"
                        />
                      )}
                    </div>

                    {/* Control buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setIframeLoading(true);
                        }}
                        className="flex-grow py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                      >
                        [ Edit Specifications ]
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setClientName('');
                          setClientEmail('');
                          setNotes('');
                          setIframeLoading(true);
                        }}
                        className="py-2.5 px-4 bg-white text-black hover:bg-zinc-200 font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center"
                      >
                        New Spec
                      </button>
                    </div>
                  </div>
                ) : (
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
                )}

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
          
          <div className="grid grid-cols-1">
            <div className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 shadow-2xl">
              <div className="bg-zinc-950/90 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Radial gradient glow background */}
                <div className="absolute inset-0 bg-radial-gradient from-zinc-900/40 via-transparent to-transparent pointer-events-none" />
                
                <div className="space-y-4 max-w-xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM SYNCING // PIPELINE HYDRATION
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight animate-fadeIn">
                    Our new public design portfolio is coming soon.
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light font-sans">
                    We are currently hydrating our database with our latest deployed custom SaaS applications, modern brand portfolios, and high-performance storefronts. All systems are scheduled to launch shortly.
                  </p>
                </div>

                <div className="shrink-0 relative z-10 w-full md:w-auto">
                  <div className="p-6 bg-zinc-900/50 border border-zinc-850 rounded-xl space-y-4 text-center md:text-left max-w-xs mx-auto">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                      Need references?
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                      If you require immediate references or case study documentations, our team can deliver developer logs directly to your inbox.
                    </p>
                    <a
                      href="mailto:hello@iffsolutions.com"
                      className="inline-flex items-center justify-center w-full py-2 px-4 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center block"
                    >
                      Request Case Studies
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
