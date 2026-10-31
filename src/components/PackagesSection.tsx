import React, { useState } from 'react';
import { HOLIDAY_PACKAGES } from '../data/packages';
import { HolidayPackage, PackageCategory } from '../types';
import { PackageModal } from './PackageModal';
import { Clock, Star, ArrowRight, Check, Sparkles, MapPin, Info, Image as ImageIcon } from 'lucide-react';

interface PackagesSectionProps {
  onBookNow: (packageTitle: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onBookNow }) => {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('All');
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);

  const categories: PackageCategory[] = [
    'All',
    'Family Holidays',
    'Honeymoon Packages',
    'Adventure Trips',
    'Friends Group Trips',
    'Luxury Holidays',
    'Budget Holidays',
    'Weekend Getaways',
    'Spiritual Tours',
  ];

  const filteredPackages = HOLIDAY_PACKAGES.filter((pkg) => {
    return activeCategory === 'All' || pkg.category === activeCategory;
  });

  return (
    <section id="packages" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Signature Itineraries & Real Photography
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Holiday Packages
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Curated by destination connoisseurs. Each package includes handpicked luxury stays, chauffeured private transit, authentic experiences, and real photography of every place covered.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-gray-600 text-xs shadow-sm">
            <Info className="w-3.5 h-3.5 text-brand-gold" />
            <span>Sample package rates shown for demonstration. Custom flight & hotel options tailored on inquiry.</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:text-black hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-luxury white-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Main Featured Photo */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.featuredImage}
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-gold text-white text-[11px] font-serif font-bold">
                    {pkg.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-black flex items-center gap-1 text-[11px] font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-white/95 text-black font-semibold flex items-center gap-1.5 text-xs shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-black group-hover:text-brand-gold transition-colors mb-2 leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Places Covered with Real Thumbnail Images */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                      Places Covered ({pkg.placesCovered.length} Sights):
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {pkg.placesDetails && pkg.placesDetails.length > 0
                        ? pkg.placesDetails.map((place, idx) => (
                            <div
                              key={idx}
                              title={`${place.name}: ${place.description}`}
                              className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200"
                            >
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-5 h-5 rounded-md object-cover"
                              />
                              <span className="text-[11px] font-serif font-bold text-black whitespace-nowrap">
                                {place.name}
                              </span>
                            </div>
                          ))
                        : pkg.placesCovered.map((place, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-serif font-bold text-black px-2 py-0.5 bg-slate-100 rounded-md whitespace-nowrap"
                            >
                              📍 {place}
                            </span>
                          ))}
                    </div>
                  </div>

                  {/* Inclusions highlights */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-6 pt-0">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-gray-500 block">Starting From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-black">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">/ person</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-xs transition-colors text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onBookNow(pkg.title)}
                    className="py-2.5 px-3 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={onBookNow}
      />
    </section>
  );
};
