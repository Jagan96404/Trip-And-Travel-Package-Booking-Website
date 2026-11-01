import React, { useState } from 'react';
import { MapPin, Calendar, Users, IndianRupee, Search, Navigation } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface FloatingSearchProps {
  onSearch: (params: {
    destination: string;
    departureCity: string;
    date: string;
    travellers: number;
    budget: string;
  }) => void;
}

export const FloatingSearch: React.FC<FloatingSearchProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [departureCity, setDepartureCity] = useState('Delhi');
  const [date, setDate] = useState('');
  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState('₹15,000 - ₹35,000');

  const popularDepartureCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Ahmedabad', 'Pune'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination,
      departureCity,
      date,
      travellers,
      budget,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 sm:-mt-12 relative z-30 px-4">
      <div className="bg-[#0e0e14] rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/15 relative overflow-hidden text-white">
        {/* Top Marvel Red Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ED1D24]" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
            {/* 1. Destination */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#ED1D24] transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-serif font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900 text-white">Where to? (All India)</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.name} className="bg-zinc-900 text-white">
                    {dest.name} ({dest.region.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Departure City */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#ED1D24] transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-1">
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                Departure City
              </label>
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full bg-transparent text-sm font-serif font-bold text-white focus:outline-none cursor-pointer"
              >
                {popularDepartureCities.map((city) => (
                  <option key={city} value={city} className="bg-zinc-900 text-white">
                    From {city}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Travel Date */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#ED1D24] transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm font-serif font-bold text-white focus:outline-none cursor-pointer"
              />
            </div>

            {/* 4. Number of Travellers */}
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#ED1D24] transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-serif font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-zinc-900 text-white">1 Solo Explorer</option>
                <option value={2} className="bg-zinc-900 text-white">2 Couple / Duo</option>
                <option value={4} className="bg-zinc-900 text-white">3-4 Family / Small Group</option>
                <option value={6} className="bg-zinc-900 text-white">5-8 Friends / Batch</option>
                <option value={30} className="bg-zinc-900 text-white">30+ School / College IV / Corp</option>
              </select>
            </div>

            {/* 5. Budget & Search Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <div className="p-2.5 rounded-2xl bg-zinc-900 border border-white/10">
                <label className="flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider mb-0.5">
                  <IndianRupee className="w-3 h-3 text-amber-400" />
                  Budget / Person
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-xs font-serif font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="₹7,000 - ₹15,000" className="bg-zinc-900 text-white">Under ₹15,000 (Budget)</option>
                  <option value="₹15,000 - ₹30,000" className="bg-zinc-900 text-white">₹15,000 - ₹30,000 (Standard)</option>
                  <option value="₹30,000 - ₹50,000" className="bg-zinc-900 text-white">₹30,000 - ₹50,000 (Premium)</option>
                  <option value="₹50,000+" className="bg-zinc-900 text-white">₹50,000+ (5-Star Luxury)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search Trips</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
