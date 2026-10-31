import React from 'react';
import { X, Calendar, Clock, CloudSun, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/90 border border-slate-200 text-black hover:bg-slate-100 transition-colors z-20 shadow-sm"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Region Tag */}
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-black text-white font-serif font-bold text-xs uppercase tracking-wider">
              {destination.region}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white text-black font-bold text-xs shadow-sm">
              {destination.state}
            </span>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black mb-1">
              {destination.name}
            </h3>
            <p className="text-brand-gold text-xs sm:text-sm font-bold uppercase tracking-wider">
              {destination.tagline}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-gray-500 block">Starting From</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-black">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-500 block">per person</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
          {destination.description}
        </p>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              Best Season
            </span>
            <span className="text-xs sm:text-sm font-bold text-black block">
              {destination.bestTime}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              Suggested Duration
            </span>
            <span className="text-xs sm:text-sm font-bold text-black block">
              {destination.duration}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-1">
              <CloudSun className="w-3.5 h-3.5 text-brand-gold" />
              Typical Climate
            </span>
            <span className="text-xs sm:text-sm font-bold text-black block">
              {destination.climate}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-bold font-serif uppercase tracking-wider text-black mb-3">
            Top Highlights & Attractions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {destination.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={() => {
              onClose();
              onBookNow(destination.name);
            }}
            className="flex-1 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Book This Destination</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm transition-colors"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    </div>
  );
};
