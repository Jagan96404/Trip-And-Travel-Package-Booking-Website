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
    <div className="w-full max-w-5xl mx-auto -mt-16 sm:-mt-20 relative z-30 px-4">
      <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-700/60 relative overflow-hidden backdrop-blur-2xl">
        {/* Subtle top glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-turquoise-500 via-gold-500 to-turquoise-400" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-center">
            {/* 1. Destination */}
            <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-700/70 hover:border-turquoise-500/50 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-turquoise-400" />
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="" className="bg-navy-900 text-slate-300">Where to? (All India)</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.name} className="bg-navy-900 text-white">
                    {dest.name} ({dest.region.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Departure City */}
            <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-700/70 hover:border-turquoise-500/50 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <Navigation className="w-3.5 h-3.5 text-gold-400" />
                Departure City
              </label>
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                {popularDepartureCities.map((city) => (
                  <option key={city} value={city} className="bg-navy-900 text-white">
                    From {city}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Travel Date */}
            <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-700/70 hover:border-turquoise-500/50 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-turquoise-400" />
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>

            {/* 4. Number of Travellers */}
            <div className="p-3 rounded-xl bg-navy-900/80 border border-slate-700/70 hover:border-turquoise-500/50 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                Travellers
              </label>
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-navy-900 text-white">1 Solo Explorer</option>
                <option value={2} className="bg-navy-900 text-white">2 Couple / Duo</option>
                <option value={4} className="bg-navy-900 text-white">3-4 Family / Small Group</option>
                <option value={6} className="bg-navy-900 text-white">5-8 Friends Group</option>
                <option value={10} className="bg-navy-900 text-white">9+ Large Group</option>
              </select>
            </div>

            {/* 5. Budget & Search Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <div className="p-2.5 rounded-xl bg-navy-900/80 border border-slate-700/70">
                <label className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  <IndianRupee className="w-3 h-3 text-gold-400" />
                  Budget / Person
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-gold-300 focus:outline-none cursor-pointer"
                >
                  <option value="₹7,000 - ₹15,000" className="bg-navy-900 text-white">Under ₹15,000 (Budget)</option>
                  <option value="₹15,000 - ₹30,000" className="bg-navy-900 text-white">₹15,000 - ₹30,000 (Standard)</option>
                  <option value="₹30,000 - ₹50,000" className="bg-navy-900 text-white">₹30,000 - ₹50,000 (Premium)</option>
                  <option value="₹50,000+" className="bg-navy-900 text-white">₹50,000+ (5-Star Luxury)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-turquoise-500 via-cyan-400 to-teal-400 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-95"
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

