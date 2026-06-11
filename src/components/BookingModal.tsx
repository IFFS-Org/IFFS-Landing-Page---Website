import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
}: BookingModalProps) {
  const [loading, setLoading] = useState(true);

  // Reset loading spinner when bookingUrl changes or when modal is opened
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen, bookingUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl h-[85vh] bg-zinc-950 border border-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Metallic Top Accent */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-zinc-700 via-zinc-200 to-zinc-700 z-20" />

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-900 bg-zinc-950 shrink-0 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight">
                Consultation Scheduler
              </h3>
              <span className="text-[9px] font-mono text-emerald-500/80 uppercase tracking-widest block">
                <span className="text-zinc-600 mr-0.5">//</span> Scheduler Active
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="flex-grow relative bg-zinc-900/10 overflow-hidden flex flex-col">
          <div className="w-full h-full relative font-sans">
            {/* Spinner while loading */}
            {loading && bookingUrl && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 space-y-4">
                <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                  Connecting to Scheduler...
                </span>
              </div>
            )}

            {/* No URL Warning */}
            {!bookingUrl || bookingUrl.trim() === '' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 z-10 p-6 text-center space-y-4 max-w-md mx-auto">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-white font-display text-sm font-bold uppercase tracking-wide">
                    Booking URL Required
                  </h5>
                  <p className="text-xs text-zinc-500 font-mono">
                    Please configure `VITE_BOOKING_URL` in your `.env` environment variables file to display the scheduler here.
                  </p>
                </div>
              </div>
            ) : (
              /* Iframe */
              <iframe
                src={bookingUrl}
                onLoad={() => setLoading(false)}
                className="w-full h-full border-0 bg-white"
                allowFullScreen
                title="Appointment Schedule Scheduler"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
