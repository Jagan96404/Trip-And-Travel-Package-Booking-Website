import React from 'react';
import { X, Calendar, Clock, CloudSun, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destinationName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookNow,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/80 border border-white/20 text-white hover:bg-red-600 transition-colors z-20 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-black/40 to-transparent" />

          {/* Region Tag */}
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#ED1D24] text-white font-mono font-bold text-xs uppercase tracking-wider">
              {destination.region}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/15">
              {destination.state}
            </span>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {destination.name}
            </h3>
            <p className="text-amber-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
              {destination.tagline}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-zinc-400 block font-mono">Starting From</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-zinc-400 block">per person</span>
          </div>
        </div>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
          {destination.description}
        </p>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10">
            <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Best Season
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block">
              {destination.bestTime}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10">
            <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Suggested Duration
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block">
              {destination.duration}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10">
            <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 mb-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              Typical Climate
            </span>
            <span className="text-xs sm:text-sm font-bold text-white block">
              {destination.climate}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Top Highlights & Sights
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {destination.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onBookNow(destination.name);
            }}
            className="flex-1 py-3.5 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all"
          >
            <span>Book Trip to {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20am%20interested%20in%20a%20trip%20to%20${encodeURIComponent(destination.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>

          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-serif font-bold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
