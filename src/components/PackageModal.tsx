import React from 'react';
import { X, Check, AlertCircle, Clock, Hotel, Car, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { HolidayPackage } from '../types';

interface PackageModalProps {
  packageData: HolidayPackage | null;
  onClose: () => void;
  onBookNow: (packageTitle: string) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  packageData,
  onClose,
  onBookNow,
}) => {
  if (!packageData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-card rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-navy-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-turquoise-400 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative h-64 sm:h-72 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={packageData.featuredImage}
            alt={packageData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold-500 text-navy-950 font-extrabold text-xs">
              {packageData.category}
            </span>
            {packageData.badge && (
              <span className="px-3 py-1 rounded-full bg-turquoise-500 text-navy-950 font-bold text-xs">
                {packageData.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 sm:left-8">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold mb-1">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span>{packageData.rating} ({packageData.reviewsCount} verified traveler reviews)</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-2xl leading-tight">
              {packageData.title}
            </h3>
          </div>
        </div>

        {/* Price & Duration Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-navy-900/70 border border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-turquoise-500/10 border border-turquoise-500/20 text-turquoise-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Trip Duration</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {packageData.duration.days} Days / {packageData.duration.nights} Nights
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {packageData.originalPrice && (
              <div className="text-right">
                <span className="text-xs text-slate-500 line-through">
                  ₹{packageData.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-400 block font-semibold">Save 20%</span>
              </div>
            )}
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Price Per Person</span>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-400">
                ₹{packageData.pricePerPerson.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Places Covered */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Places Covered
          </span>
          <div className="flex flex-wrap gap-2">
            {packageData.placesCovered.map((place, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-navy-800 border border-slate-700 text-xs font-medium text-slate-200"
              >
                📍 {place}
              </span>
            ))}
          </div>
        </div>

        {/* Hotel & Transport Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Hotel className="w-4 h-4" />
              <span>Accommodation Details</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{packageData.hotelInfo}</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-turquoise-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Car className="w-4 h-4" />
              <span>Transportation & Transfers</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{packageData.transportInfo}</p>
          </div>
        </div>

        {/* Day-by-Day Itinerary */}
        <div className="mb-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            Day-by-Day Detailed Itinerary
          </h4>
          <div className="space-y-3">
            {packageData.itinerary.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-xl bg-navy-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-turquoise-500/20 text-turquoise-300 font-bold text-xs">
                    Day {item.day}
                  </span>
                  <h5 className="font-serif text-sm sm:text-base font-bold text-white">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-2 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Inclusions */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Package Inclusions
            </h5>
            <ul className="space-y-2">
              {packageData.inclusions.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Package Exclusions
            </h5>
            <ul className="space-y-2">
              {packageData.exclusions.map((exc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-rose-400 shrink-0">✕</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-900 border border-slate-700/60 text-xs text-slate-400 mb-6">
          <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Demo package configuration. Actual inclusions and dynamic flight fares can be personalized upon booking enquiry.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onBookNow(packageData.title);
            }}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,183,3,0.4)] hover:brightness-110 transition-all"
          >
            <span>Book This Package Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 font-semibold text-sm hover:text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

