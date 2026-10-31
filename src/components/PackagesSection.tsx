import React, { useState } from 'react';
import { HOLIDAY_PACKAGES } from '../data/packages';
import { HolidayPackage, PackageCategory } from '../types';
import { PackageModal } from './PackageModal';
import { Clock, Star, ArrowRight, Check, Sparkles, MapPin, Info } from 'lucide-react';

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
    <section id="packages" className="py-24 relative overflow-hidden bg-navy-900/60">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-turquoise-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Signature Travel Itineraries</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Handcrafted <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-turquoise-400 to-emerald-400">Holiday Packages</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Curated by destination connoisseurs. Each package includes handpicked luxury stays, chauffeured private transit, authentic experiences, and 24/7 on-trip concierge assistance.
          </p>

          {/* Demo Content Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/80 border border-slate-700 text-slate-400 text-xs">
            <Info className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Sample package rates shown for demonstration. Final prices tailored on inquiry.</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 shadow-md font-bold'
                  : 'glass-card text-slate-300 hover:text-white hover:border-gold-500/40'
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
              className="group glass-card rounded-3xl overflow-hidden border border-slate-800/90 glass-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Image & Header Overlay */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.featuredImage}
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy-950/90 backdrop-blur-md border border-gold-500/40 text-[11px] font-bold text-gold-300">
                    {pkg.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-navy-950/90 backdrop-blur-md border border-slate-700 flex items-center gap-1 text-[11px] font-bold text-gold-400">
                    <Star className="w-3.5 h-3.5 fill-gold-400" />
                    <span>{pkg.rating}</span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-navy-900/90 backdrop-blur-md border border-slate-700 flex items-center gap-1.5 text-xs text-white">
                    <Clock className="w-3.5 h-3.5 text-turquoise-400" />
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors mb-2 leading-snug">
                    {pkg.title}
                  </h3>

                  {/* Places Covered */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 truncate">
                    <MapPin className="w-3.5 h-3.5 text-turquoise-400 shrink-0" />
                    <span>{pkg.placesCovered.join(' • ')}</span>
                  </div>

                  {/* Inclusions highlights */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-800/80">
                    {pkg.inclusions.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
                    <span className="text-[11px] text-slate-400 block">Starting From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-extrabold text-gold-400">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">/ person</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-navy-900 border border-slate-700 hover:border-turquoise-400 text-slate-200 text-xs font-semibold hover:text-white transition-colors text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onBookNow(pkg.title)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:brightness-110 text-navy-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
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

