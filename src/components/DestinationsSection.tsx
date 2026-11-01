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
    <section id="destinations" className="py-24 bg-[#050507] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Pan-India Travel Portfolio
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Incredible India
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            From the snow-clad peaks of Kashmir to the tranquil backwaters of Kerala, explore 27 iconic destinations with verified real photography, transparent pricing, and customized group & family itineraries.
          </p>
        </div>

        {/* Region Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${
                  activeRegion === region
                    ? 'bg-[#ED1D24] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-[#ED1D24] transition-colors"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[#0d0d14] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Region Tag */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono font-bold text-[10px] border border-white/10">
                  {dest.region}
                </span>

                {/* State Tag */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 font-bold text-[11px] flex items-center gap-1 border border-white/10">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {dest.state}
                </span>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-right shadow-md">
                  <span className="text-[10px] text-zinc-400 block leading-none font-semibold">Starting From</span>
                  <span className="font-serif text-base font-bold text-white">
                    ₹{dest.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  {/* Best Time to Visit */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Best: {dest.bestTime}</span>
                  </div>

                  {/* Explore More Button */}
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-[#ED1D24] text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 border border-white/10 group/btn"
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
            <p className="text-zinc-400 text-lg">No destinations matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveRegion('All');
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-[#ED1D24] text-white font-serif font-bold text-sm"
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
