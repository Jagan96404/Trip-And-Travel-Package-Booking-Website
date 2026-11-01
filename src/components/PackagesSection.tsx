import React, { useState } from 'react';
import { HOLIDAY_PACKAGES } from '../data/packages';
import { HolidayPackage, PackageCategory } from '../types';
import { PackageModal } from './PackageModal';
import { Clock, Star, ArrowRight, Check, Sparkles, MapPin, Info, Phone } from 'lucide-react';

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
    <section id="packages" className="py-24 bg-[#08080c] text-white border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Signature Itineraries & Real Photography
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Curated Holiday Packages
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Crafted for unforgettable memories. Handpicked luxury stays, private chauffeured transit, expert coordinators, and authentic real photography of every place covered.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs shadow-sm">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>School, College IV & Corporate group bookings available with custom bus & permissions.</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${activeCategory === cat
                  ? 'bg-[#ED1D24] text-white shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
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
              className="group bg-[#0d0d14] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#ED1D24] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                    {pkg.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center gap-1 text-[11px] font-bold border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{pkg.rating}</span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md text-zinc-200 font-semibold flex items-center gap-1.5 text-xs border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Places Covered with Real Thumbnail Images */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      Places Covered ({pkg.placesCovered.length} Sights):
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {pkg.placesDetails && pkg.placesDetails.length > 0
                        ? pkg.placesDetails.map((place, idx) => (
                            <div
                              key={idx}
                              title={`${place.name}: ${place.description}`}
                              className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-900 border border-white/10"
                            >
                              <img
                                src={place.image}
                                alt={place.name}
                                className="w-5 h-5 rounded-md object-cover"
                              />
                              <span className="text-[11px] font-serif font-bold text-zinc-200 whitespace-nowrap">
                                {place.name}
                              </span>
                            </div>
                          ))
                        : pkg.placesCovered.map((place, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-serif font-bold text-zinc-200 px-2 py-0.5 bg-zinc-900 rounded-md whitespace-nowrap border border-white/10"
                            >
                              📍 {place}
                            </span>
                          ))}
                    </div>
                  </div>

                  {/* Inclusions highlights */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-6 pt-0">
                <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">
                      Starting Per Person
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-white">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {pkg.badge || 'Best Seller'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-serif font-bold text-xs flex items-center justify-center gap-1 border border-white/15 transition-all"
                  >
                    <span>View Details</span>
                  </button>

                  <a
                    href={`https://wa.me/917867818790?text=Hi%20Marvel%20Holidays!%20I%20want%20to%20book%20the%20package:%20${encodeURIComponent(pkg.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
                  >
                    <span>Book: 7867818790</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={onBookNow}
      />
    </section>
  );
};
