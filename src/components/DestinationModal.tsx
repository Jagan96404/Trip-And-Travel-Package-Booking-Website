import React from 'react';
import { X, MapPin, Calendar, Clock, CloudSun, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-navy-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-turquoise-400 transition-colors z-20"
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

          {/* Region Tag */}
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-turquoise-500/90 text-navy-950 font-bold text-xs uppercase tracking-wider">
              {destination.region}
            </span>
            <span className="px-3 py-1 rounded-full bg-navy-900/80 backdrop-blur-md border border-slate-600 text-slate-200 text-xs">
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
            <p className="text-turquoise-400 text-sm font-medium">
              {destination.tagline}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Starting From</span>
            <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-400">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 block">per person</span>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {destination.description}
        </p>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              Best Season
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {destination.bestTime}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-turquoise-400" />
              Suggested Duration
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {destination.duration}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900/60 border border-slate-800">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              Typical Climate
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              {destination.climate}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Top Highlights & Attractions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {destination.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-turquoise-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onBookNow(destination.name);
            }}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-turquoise-500 via-cyan-400 to-teal-400 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
          >
            <span>Book This Destination</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 font-semibold text-sm hover:text-white transition-colors"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    </div>
  );
};

