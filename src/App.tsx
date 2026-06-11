import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const bookingUrl = import.meta.env.VITE_BOOKING_URL || '';

  // Unified Section Nav helper
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenScheduler = () => {
    // Directly open Google Booking modal for scheduling consultation session
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 antialiased font-sans flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      {/* Sleek, sticky design header block */}
      <Header onNavigate={handleNavigate} onOpenScheduler={handleOpenScheduler} />

      <main className="flex-grow">
        {/* Interactive Hero, Custom Quote Scheduler, and Selected Shaders Portfolio */}
        <Hero 
          onNavigate={handleNavigate} 
          bookingUrl={bookingUrl}
        />
      </main>

      {/* Website bottom sleek creative studio footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {showBookingModal && (
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            bookingUrl={bookingUrl}
          />
        )}
      </AnimatePresence>

      {/* Nice, theme-matching popup reminder */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xs"
            />
            {/* Modal Dialog container with premium grey borders and glow accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl space-y-5 overflow-hidden z-10"
            >
              {/* Thin metallic header accent */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-zinc-700 via-zinc-200 to-zinc-700" />
              
              {/* Top metadata badge row */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block">// SYSTEM NOTIFICATION</span>
                <span className="bg-zinc-900 border border-zinc-850 text-zinc-400 px-2 py-0.5 rounded text-[8px] font-mono tracking-wider">
                  VERIFICATION REQ
                </span>
              </div>

              {/* Central Graphic and Information Content */}
              <div className="text-center py-2 space-y-4" id="popup-content-block">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-zinc-900/80 border border-zinc-850 text-zinc-300">
                  <Calendar className="w-4.5 h-4.5 text-zinc-200 animate-pulse" id="popup-calendar-icon" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-base text-white uppercase tracking-tight">
                    Configure Estimation Specifications
                  </h4>
                  <span className="block text-[8px] font-mono text-zinc-500 uppercase tracking-widest">// ESTIMATOR v2 PROTOCOL PENDING</span>
                </div>
                
                <p className="text-xs text-zinc-400 font-light leading-relaxed px-1">
                  You are already viewing the active quote builder. Please <strong className="text-zinc-200 font-semibold">complete the estimator system</strong> to schedule a session, or click <strong className="text-zinc-200 font-semibold">"Skip & Book Directly"</strong> to choose your time slot via Google Calendar.
                </p>
              </div>

              {/* Footer CTA */}
              <div className="space-y-2 pt-1.5" id="popup-ctas-container">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-full py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-transform hover:-translate-y-px duration-150 cursor-pointer text-center block"
                  id="btn-complete-estimator"
                >
                  Complete Estimator System
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPopup(false);
                    setShowBookingModal(true);
                  }}
                  className="w-full py-2 bg-transparent hover:bg-zinc-900 border border-zinc-850 text-zinc-405 hover:text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-150 cursor-pointer text-center block"
                  id="btn-skip-estimator"
                >
                  Skip & Book Directly
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
