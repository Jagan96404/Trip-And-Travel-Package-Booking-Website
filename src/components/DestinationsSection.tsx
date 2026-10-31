import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination, Region } from '../types';
import { DestinationModal } from './DestinationModal';
import { Calendar, Compass, ArrowRight, Search, MapPin } from 'lucide-react';

interface DestinationsSectionProps {
  onBookNow: (destinationName: string) => void;
  selectedFilter?: string;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onBookNow,
  selectedFilter = '',
}) => {
  const [activeRegion, setActiveRegion] = useState<Region>('All');
  const [searchQuery, setSearchQuery] = useState(selectedFilter);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const regions: Region[] = ['All', 'North India', 'South India', 'East India', 'West India'];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesRegion = activeRegion === 'All' || dest.region === activeRegion;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="destinations" className="py-24 relative overflow-hidden bg-navy-950">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-turquoise-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-turquoise-500/40 text-xs text-turquoise-400 font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Pan-India Portfolio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Incredible India</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From the snow-clad peaks of Kashmir to the palm lagoons of Kerala, explore 27 iconic handpicked destinations featuring authentic travel photography, transparent pricing, and personalized itineraries.
          </p>
        </div>

        {/* Region Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-navy-900/80 border border-slate-800">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeRegion === region
                    ? 'bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-turquoise-400 transition-colors"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group glass-card rounded-2xl overflow-hidden border border-slate-800/90 glass-card-hover flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                {/* Region Tag */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-semibold text-turquoise-300">
                  {dest.region}
                </span>

                {/* State Tag */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gold-400" />
                  {dest.state}
                </span>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-navy-900/90 backdrop-blur-md border border-gold-500/40 text-right">
                  <span className="text-[10px] text-slate-400 block leading-none">Starting From</span>
                  <span className="font-serif text-base font-extrabold text-gold-400">
                    ₹{dest.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-turquoise-300 transition-colors mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  {/* Best Time to Visit */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="truncate">Best: {dest.bestTime}</span>
                  </div>

                  {/* Explore More Button */}
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-gradient-to-r hover:from-turquoise-500 hover:to-cyan-400 hover:text-navy-950 text-slate-200 border border-slate-700 hover:border-transparent font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 group/btn"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No destinations matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveRegion('All');
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-turquoise-500 text-navy-950 font-bold text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Destination Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookNow={onBookNow}
      />
    </section>
  );
};

