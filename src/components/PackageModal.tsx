import React from 'react';
import { X, Check, AlertCircle, Clock, Hotel, Car, Star, ArrowRight, ShieldCheck, MapPin, MessageCircle } from 'lucide-react';
import { HolidayPackage } from '../types';

interface PackageModalProps {
  pkg: HolidayPackage | null;
  onClose: () => void;
  onBookNow: (packageTitle: string) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  pkg,
  onClose,
  onBookNow,
}) => {
  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d14] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/80 border border-white/20 text-white hover:bg-red-600 transition-colors z-20 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="relative h-64 sm:h-72 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img
            src={pkg.featuredImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-black/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#ED1D24] text-white font-mono font-bold text-xs uppercase tracking-wider">
              {pkg.category}
            </span>
            {pkg.badge && (
              <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/15">
                {pkg.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 sm:left-8">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-semibold mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{pkg.rating} ({pkg.reviewsCount} verified traveler reviews)</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-2xl leading-tight">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Price & Duration Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900 border border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-black border border-white/10 text-white">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 block font-mono">Trip Duration</span>
              <span className="font-serif text-sm sm:text-base font-bold text-white">
                {pkg.duration.days} Days / {pkg.duration.nights} Nights
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {pkg.originalPrice && (
              <div className="text-right">
                <span className="text-xs text-zinc-500 line-through">
                  ₹{pkg.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-400 block font-bold font-mono">Special Offer</span>
              </div>
            )}
            <div className="text-right">
              <span className="text-xs text-zinc-400 block font-mono">Price Per Person</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* REAL IMAGES FOR ALL PLACES IN PACKING */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-white">
              Places Covered in this Package (Real Photographs & Sights)
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pkg.placesDetails && pkg.placesDetails.length > 0
              ? pkg.placesDetails.map((place, idx) => (
                  <div
                    key={idx}
                    className="group/place bg-zinc-900/90 rounded-2xl overflow-hidden border border-white/10 shadow-sm hover:border-white/25 transition-all"
                  >
                    <div className="h-28 overflow-hidden relative">
                      <img
                        src={place.image}
                        alt={place.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/place:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-black/85 text-white font-serif font-bold text-[10px] border border-white/10">
                        {place.name}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-tight">
                        {place.description}
                      </p>
                    </div>
                  </div>
                ))
              : pkg.placesCovered.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-900 rounded-xl border border-white/10 text-xs font-serif font-bold text-white"
                  >
                    📍 {place}
                  </div>
                ))}
          </div>
        </div>

        {/* Hotel & Transport Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center gap-2 text-white text-xs font-serif font-bold uppercase tracking-wider mb-1.5">
              <Hotel className="w-4 h-4 text-amber-400" />
              <span>Accommodation Details</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">{pkg.hotelInfo}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center gap-2 text-white text-xs font-serif font-bold uppercase tracking-wider mb-1.5">
              <Car className="w-4 h-4 text-amber-400" />
              <span>Transportation & Transfers</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300">{pkg.transportInfo}</p>
          </div>
        </div>

        {/* Day-by-Day Itinerary */}
        <div className="mb-8">
          <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ED1D24]" />
            Day-by-Day Detailed Itinerary
          </h4>
          <div className="space-y-3">
            {pkg.itinerary.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ED1D24] text-white font-mono font-bold text-xs">
                    Day {item.day}
                  </span>
                  <h5 className="font-serif text-sm sm:text-base font-bold text-white">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 pl-2 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
            <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Package Inclusions
            </h5>
            <ul className="space-y-2">
              {pkg.inclusions.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-emerald-200 font-medium">
                  <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
            <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Package Exclusions
            </h5>
            <ul className="space-y-2">
              {pkg.exclusions.map((exc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-rose-200 font-medium">
                  <span className="text-rose-400 shrink-0 font-bold">✕</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onBookNow(pkg.title);
            }}
            className="flex-1 py-3.5 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all"
          >
            <span>Book This Package Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20want%20to%20enquire%20and%20book%20the%20package:%20${encodeURIComponent(pkg.title)}`}
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
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
