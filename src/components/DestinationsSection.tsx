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
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Pan-India Travel Portfolio
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Explore Incredible India
          </h2>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            From the snow-clad peaks of Kashmir to the tranquil backwaters of Kerala, explore 27 iconic destinations featuring authentic real travel photography, transparent pricing, and personalized itineraries.
          </p>
        </div>

        {/* Region Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${
                  activeRegion === region
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-700 hover:text-black hover:bg-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search destination, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-luxury white-card-hover flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Region Tag */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/90 text-white font-serif font-bold text-[11px]">
                  {dest.region}
                </span>

                {/* State Tag */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-black font-bold text-[11px] flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  {dest.state}
                </span>

                {/* Starting Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-right shadow-sm">
                  <span className="text-[10px] text-gray-500 block leading-none font-semibold">Starting From</span>
                  <span className="font-serif text-base font-bold text-black">
                    ₹{dest.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-black group-hover:text-brand-gold transition-colors mb-1">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-4">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {/* Best Time to Visit */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span className="truncate">Best: {dest.bestTime}</span>
                  </div>

                  {/* Explore More Button */}
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-black font-serif font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 group/btn"
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
            <p className="text-gray-600 text-lg">No destinations matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveRegion('All');
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-black text-white font-serif font-bold text-sm"
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
