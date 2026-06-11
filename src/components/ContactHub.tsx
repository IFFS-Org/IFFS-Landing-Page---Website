import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2, AlertCircle, FileText, Clock } from 'lucide-react';

interface ContactHubProps {
  preloadedEstimates: {
    platformName: string;
    addonsSelectedNames: string[];
    timelineName: string;
    totalAmount: number;
  } | null;
}

export default function ContactHub({ preloadedEstimates }: ContactHubProps) {
  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('web-apps');
  const [budget, setBudget] = useState(5000);
  const [timeline, setTimeline] = useState('t_standard');
  const [details, setDetails] = useState('');
  
  // App states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientInquiries, setClientInquiries] = useState<Inquiry[]>([]);

  // Pre-load calculator details when they are passed down via prop
  useEffect(() => {
    if (preloadedEstimates) {
      setBudget(preloadedEstimates.totalAmount);
      
      let mappedType = 'web-apps';
      if (preloadedEstimates.platformName.toLowerCase().includes('landing')) mappedType = 'brand-sites';
      if (preloadedEstimates.platformName.toLowerCase().includes('marketing')) mappedType = 'brand-sites';
      if (preloadedEstimates.platformName.toLowerCase().includes('commerce')) mappedType = 'e-commerce';
      if (preloadedEstimates.platformName.toLowerCase().includes('saas')) mappedType = 'web-apps';
      setProjectType(mappedType);

      let detailsStr = `Scope Proposal Generated in Estimator Card:\n`;
      detailsStr += `• Platform: ${preloadedEstimates.platformName}\n`;
      if (preloadedEstimates.addonsSelectedNames.length > 0) {
        detailsStr += `• Modules: ${preloadedEstimates.addonsSelectedNames.join(', ')}\n`;
      }
      detailsStr += `• Launch Priority Track: ${preloadedEstimates.timelineName}\n`;
      detailsStr += `• Preliminary Investment: $${preloadedEstimates.totalAmount.toLocaleString()}\n\n`;
      detailsStr += `Hi I.F.F Solutions Team, we would like to schedule a feasibility consultation review for this configuration.`;
      
      setDetails(detailsStr);
      
      // Auto-focus scroll to the contact form so they can review their selection
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preloadedEstimates]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('iff_solutions_inquiries');
    if (saved) {
      try {
        setClientInquiries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse previous submissions keys', e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Full name and work email are required to process proposals.');
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || 'Undisclosed Venture',
      projectType,
      estimatedBudget: budget,
      deliveryTimeline: timeline === 't_rapid' ? 'Rapid 1-2 Weeks' : timeline === 't_express' ? 'Express 3-5 Weeks' : 'Standard 6-8 Weeks',
      details: details.trim() || 'No supplementary details provided. Requesting baseline architecture consult.',
      status: 'Received',
      createdAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updatedInquiries = [newInquiry, ...clientInquiries];
    setClientInquiries(updatedInquiries);
    localStorage.setItem('iff_solutions_inquiries', JSON.stringify(updatedInquiries));

    // Reset fields, show success
    setName('');
    setEmail('');
    setCompany('');
    setDetails('');
    setFormSubmitted(true);

    // Turn success modal off after several seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('iff_solutions_inquiries');
    setClientInquiries([]);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 font-sans">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-3">Initiate Collaboration Workspace</p>
          <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Schedule your architecture consult today.
          </h2>
          <p className="text-sm text-slate-600 mt-4 max-w-xl">
            We reply to all qualified requests within business hours. Provide your goals below or import a template directly from the cost estimator card above.
          </p>
        </div>

        {/* Form and Inquiry Track Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block - Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-lg border border-slate-200">
            <h3 className="font-display text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-black" />
              Project Blueprint Configuration
            </h3>

            {formSubmitted && (
              <div className="mb-6 p-4.5 bg-slate-100 border border-slate-350 text-slate-900 rounded-lg flex gap-3 items-start animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-black mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Proposal Request Dispatched Successfully!</p>
                  <p className="text-xs text-slate-600 mt-1">Our lead engineer will review your configuration parameters and reach out via email within 4 hours.</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4.5 bg-slate-150 border border-slate-300 text-slate-900 rounded-lg flex gap-3 items-start animate-fade-in font-mono">
                <AlertCircle className="w-5 h-5 text-black mt-0.5 shrink-0" />
                <p className="text-xs font-semibold">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="client-name" className="text-xs font-bold text-slate-700 block mb-1.5 font-mono uppercase tracking-wider">Your Full Name*</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-black focus:outline-hidden"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="client-email" className="text-xs font-bold text-slate-700 block mb-1.5 font-mono uppercase tracking-wider font-semibold">Work Email*</label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-black focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div>
                  <label htmlFor="client-company" className="text-xs font-bold text-slate-700 block mb-1.5 font-mono uppercase tracking-wider">Company / Entity</label>
                  <input
                    id="client-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Inc. Corporation"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-black focus:outline-hidden"
                  />
                </div>

                {/* Project Category Selection */}
                <div>
                  <label htmlFor="client-category" className="text-xs font-bold text-slate-700 block mb-1.5 font-mono uppercase tracking-wider">Product Segment</label>
                  <select
                    id="client-category"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-black focus:outline-hidden"
                  >
                    <option value="web-apps">Custom SaaS / Full Stack</option>
                    <option value="e-commerce">E-Commerce Web Portal</option>
                    <option value="brand-sites">Corporate Landing / Brand Page</option>
                    <option value="ai-integrations">Gemini AI Implementation</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Budget Slider */}
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">Project Budget:</span>
                  <span className="font-display font-black text-black text-lg">${budget.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="1500"
                  max="25000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>$1.5k</span>
                  <span>$10k</span>
                  <span>$25k+</span>
                </div>
              </div>

              {/* Scope Message Details Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="client-details" className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">Additional details or Scope Requirements</label>
                  {preloadedEstimates && (
                    <span className="text-[10px] bg-black text-white font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      Estimator Connected
                    </span>
                  )}
                </div>
                <textarea
                  id="client-details"
                  rows={6}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Outline feature specifications, current technology stack options, or general timelines..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:border-black focus:outline-hidden font-sans placeholder-slate-400 leading-relaxed"
                ></textarea>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-4 text-base font-bold text-white bg-black border border-black hover:bg-zinc-900 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:translate-y-[-1px]"
              >
                <Send className="w-4 h-4" />
                Submit Integration Proposal Inquiry
              </button>
            </form>
          </div>

          {/* Right Block - Client persistent Local Storage tracker (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6 font-sans">
              
              {/* Context Block */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                <h4 className="font-display font-black text-slate-950 mb-2">Why I.F.F Solutions?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We maintain a deliberate boutique scale to ensure each product benefits from senior engineering focus, strict type-safety architectures, and optimal conversion styling.
                </p>

                <div className="space-y-4 pt-5 mt-5 border-t border-slate-200">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 border border-slate-200 rounded-lg text-slate-900 bg-white shadow-2xs shrink-0 font-sans">
                      <Mail className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Email Direct Line</h5>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">hello@iffsolutions.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-2 border border-slate-200 rounded-lg text-slate-900 bg-white shrink-0 font-sans">
                      <MapPin className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Operational Base</h5>
                      <p className="text-xs text-slate-500 mt-0.5">Silicon Valley Hub &amp; Distributed Remote</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry History tracker panel (Saves to state / localStorage) */}
              <div className="bg-black text-white p-6 rounded-lg border border-zinc-900 shadow-xl relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
                    <div>
                      <h4 className="font-display font-black text-xs tracking-wide">MY PROPOSAL TRACKER</h4>
                      <p className="text-[9px] font-mono text-slate-400">SESSION PERSISTENCE HISTORY</p>
                    </div>
                    {clientInquiries.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="text-[10px] text-zinc-100 bg-zinc-900 hover:bg-zinc-805 font-mono font-bold border border-zinc-800 px-2.5 py-1 rounded cursor-pointer"
                      >
                        Clear Tracker lists
                      </button>
                    )}
                  </div>

                  {clientInquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 space-y-3">
                      <FileText className="w-8 h-8 mx-auto text-slate-800 stroke-[1.5]" />
                      <p className="text-xs font-semibold text-slate-405">No proposal submitted in this session browser yet.</p>
                      <p className="text-[10px] text-slate-500 max-w-xs mx-auto leading-normal">Configure a budget estimation above and click dispatch to monitor inquiry progress statuses here in real-time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                      {clientInquiries.map((inq) => (
                        <div key={inq.id} className="p-4.5 bg-zinc-900 rounded border border-zinc-800/80 space-y-3 text-xs">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="font-bold text-white max-w-[130px] truncate">{inq.company}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{inq.projectType.replace('-', ' ')}</p>
                            </div>
                            <span className="font-mono font-bold text-white text-sm">
                              ${inq.estimatedBudget.toLocaleString()}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
                              <Clock className="w-3.5 h-3.5 text-zinc-400" />
                              {inq.createdAt}
                            </span>
                            <span className="font-bold font-mono text-[10px] text-white bg-zinc-800 px-2.5 py-1 rounded-sm border border-zinc-750">
                              {inq.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-800 text-[10px] text-slate-500 text-center leading-relaxed mt-4">
                  These requests are saved securely to your current client sandboxed browser profile. Use these configurations to guide structured developer negotiations.
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
