import React from 'react';
import { X, Check, AlertCircle, Clock, Hotel, Car, Star, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/90 border border-slate-200 text-black hover:bg-slate-100 transition-colors z-20 shadow-sm"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-brand-gold text-white font-serif font-bold text-xs">
              {packageData.category}
            </span>
            {packageData.badge && (
              <span className="px-3.5 py-1 rounded-full bg-black text-white font-bold text-xs">
                {packageData.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 sm:left-8">
            <div className="flex items-center gap-2 text-white text-xs font-semibold mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{packageData.rating} ({packageData.reviewsCount} verified traveler reviews)</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white max-w-2xl leading-tight">
              {packageData.title}
            </h3>
          </div>
        </div>

        {/* Price & Duration Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-black">
              <Clock className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <span className="text-xs text-gray-500 block">Trip Duration</span>
              <span className="font-serif text-sm sm:text-base font-bold text-black">
                {packageData.duration.days} Days / {packageData.duration.nights} Nights
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {packageData.originalPrice && (
              <div className="text-right">
                <span className="text-xs text-gray-400 line-through">
                  ₹{packageData.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-700 block font-bold">Save 20%</span>
              </div>
            )}
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Price Per Person</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-black">
                ₹{packageData.pricePerPerson.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* REAL IMAGES FOR ALL PLACES IN PACKING */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <h4 className="font-serif text-base sm:text-lg font-bold text-black">
              Places Covered in this Package (Real Photographs & Sights)
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {packageData.placesDetails && packageData.placesDetails.length > 0
              ? packageData.placesDetails.map((place, idx) => (
                  <div
                    key={idx}
                    className="group/place bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-28 overflow-hidden relative">
                      <img
                        src={place.image}
                        alt={place.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/place:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-black/80 text-white font-serif font-bold text-[10px]">
                        {place.name}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[11px] text-gray-600 line-clamp-2 leading-tight">
                        {place.description}
                      </p>
                    </div>
                  </div>
                ))
              : packageData.placesCovered.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-serif font-bold text-black"
                  >
                    📍 {place}
                  </div>
                ))}
          </div>
        </div>

        {/* Hotel & Transport Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-black text-xs font-serif font-bold uppercase tracking-wider mb-1.5">
              <Hotel className="w-4 h-4 text-brand-gold" />
              <span>Accommodation Details</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">{packageData.hotelInfo}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-black text-xs font-serif font-bold uppercase tracking-wider mb-1.5">
              <Car className="w-4 h-4 text-brand-gold" />
              <span>Transportation & Transfers</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">{packageData.transportInfo}</p>
          </div>
        </div>

        {/* Day-by-Day Itinerary */}
        <div className="mb-8">
          <h4 className="font-serif text-base sm:text-lg font-bold text-black mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
            Day-by-Day Detailed Itinerary
          </h4>
          <div className="space-y-3">
            {packageData.itinerary.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-serif font-bold text-xs">
                    Day {item.day}
                  </span>
                  <h5 className="font-serif text-sm sm:text-base font-bold text-black">
                    {item.title}
                  </h5>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 pl-2 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              Package Inclusions
            </h5>
            <ul className="space-y-2">
              {packageData.inclusions.map((inc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                  <span className="text-emerald-700 shrink-0 font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-rose-900 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              Package Exclusions
            </h5>
            <ul className="space-y-2">
              {packageData.exclusions.map((exc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-rose-950 font-medium">
                  <span className="text-rose-700 shrink-0 font-bold">✕</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-gray-600 mb-6">
          <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
          <span>Demo package configuration. Actual inclusions and dynamic flight fares can be personalized upon inquiry.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={() => {
              onClose();
              onBookNow(packageData.title);
            }}
            className="flex-1 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>Book This Package Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
