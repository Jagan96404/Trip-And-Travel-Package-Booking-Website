import React, { useState, useRef, useEffect } from 'react';
import { 
  Plane, 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CloudSun,
  Star,
  Luggage,
  QrCode
} from 'lucide-react';

interface RouteOption {
  id: string;
  packageId: string;
  name: string;
  tagline: string;
  cityFrom: string;
  codeFrom: string;
  cityTo: string;
  codeTo: string;
  flightTime: string;
  flightCode: string;
  image: string;
  temperature: string;
  bestSeason: string;
  startingPrice: number;
  inclusions: string[];
  bearing: string;
  seatClass: string;
}

const LUXURY_ROUTES: RouteOption[] = [
  {
    id: 'kashmir',
    packageId: 'pkg-kashmir-honeymoon',
    name: 'Kashmir Alpine Wonder',
    tagline: 'Snow-capped peaks, cedar houseboats & saffron tea',
    cityFrom: 'New Delhi',
    codeFrom: 'DEL',
    cityTo: 'Srinagar',
    codeTo: 'SXR',
    flightTime: '1h 35m Non-Stop',
    flightCode: 'MH-302',
    image: './images/destinations/kashmir.jpg',
    temperature: '12°C • Crisp Alpine',
    bestSeason: 'Spring & Winter',
    startingPrice: 28999,
    inclusions: ['Dal Lake Heritage Houseboat', 'Gulmarg Gondola Pass', 'Private Innova Crysta'],
    bearing: '34.08° N • Himalayas',
    seatClass: 'VIP First Class'
  },
  {
    id: 'ladakh',
    packageId: 'pkg-ladakh-adventure',
    name: 'Ladakh High Passes',
    tagline: 'Turquoise glacial lakes, sand dunes & monasteries',
    cityFrom: 'New Delhi',
    codeFrom: 'DEL',
    cityTo: 'Leh Ladakh',
    codeTo: 'IXL',
    flightTime: '1h 25m Scenic Flight',
    flightCode: 'MH-408',
    image: './images/destinations/ladakh.jpg',
    temperature: '8°C • High Altitude Sun',
    bestSeason: 'May to October',
    startingPrice: 24999,
    inclusions: ['Pangong Glacial Domes', 'Nubra Camel Safari', 'Oxygen Concierge & 4x4'],
    bearing: '34.15° N • Karakoram',
    seatClass: 'Expedition Royal'
  },
  {
    id: 'kerala',
    packageId: 'pkg-kerala-family',
    name: 'Kerala Emerald Waters',
    tagline: 'Tranquil backwaters, misty tea estates & spice hills',
    cityFrom: 'Mumbai',
    codeFrom: 'BOM',
    cityTo: 'Cochin',
    codeTo: 'COK',
    flightTime: '1h 50m Coastal Route',
    flightCode: 'MH-116',
    image: './images/destinations/kerala-backwaters.jpg',
    temperature: '26°C • Tropical Breeze',
    bestSeason: 'September to March',
    startingPrice: 16999,
    inclusions: ['Private Alleppey Houseboat', 'Munnar Tea Valley Villa', 'Kathakali VIP Evening'],
    bearing: '09.93° N • Malabar',
    seatClass: 'Bespoke Leisure'
  },
  {
    id: 'rajasthan',
    packageId: 'pkg-rajasthan-royal',
    name: 'Royal Rajasthan Heritage',
    tagline: 'Gilded palace courtyards, hill forts & lake sunsets',
    cityFrom: 'New Delhi',
    codeFrom: 'DEL',
    cityTo: 'Udaipur / Jaipur',
    codeTo: 'UDR',
    flightTime: '1h 15m Royal Corridor',
    flightCode: 'MH-552',
    image: './images/destinations/jaipur.jpg',
    temperature: '22°C • Golden Hour',
    bestSeason: 'October to March',
    startingPrice: 19999,
    inclusions: ['Lake Pichola Private Cruise', 'Amber Fort Guided Heritage', 'Royal Haveli Stays'],
    bearing: '24.58° N • Mewar',
    seatClass: 'Maharaja Suite'
  },
  {
    id: 'goa',
    packageId: 'pkg-goa-friends',
    name: 'Goa Coastal Serenity',
    tagline: 'White sand bays, private catamarans & sunset dining',
    cityFrom: 'Bangalore',
    codeFrom: 'BLR',
    cityTo: 'Goa Dabolim',
    codeTo: 'GOI',
    flightTime: '1h 10m Island Hop',
    flightCode: 'MH-224',
    image: './images/destinations/goa.jpg',
    temperature: '28°C • Warm Ocean',
    bestSeason: 'October to May',
    startingPrice: 14999,
    inclusions: ['Sunset Catamaran Charter', 'South Goa Boutique Resort', 'Private Beach Dinner'],
    bearing: '15.29° N • Konkan',
    seatClass: 'Coastal Elite'
  }
];

interface LuxuryTravelHubProps {
  onDiscoverPackages: () => void;
  onPlanTrip: () => void;
}

export const LuxuryTravelHub: React.FC<LuxuryTravelHubProps> = ({
  onDiscoverPackages,
  onPlanTrip,
}) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(LUXURY_ROUTES[0]);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth 3D tilt tracking on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle natural tilt angle (-7 to +7 degrees)
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;

    setCardRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Top Destination Selector Tabs */}
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-300 shadow-sm mb-4 overflow-x-auto no-scrollbar">
        {LUXURY_ROUTES.map((route) => {
          const isActive = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`flex-1 min-w-[70px] sm:min-w-[85px] py-2 px-2.5 rounded-xl text-center text-xs font-serif font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-black text-white shadow-md scale-[1.02]'
                  : 'text-gray-700 hover:text-black hover:bg-white/60'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-brand-gold">
                  {route.codeTo}
                </span>
                <span className="truncate w-full leading-tight font-serif text-[11px] sm:text-xs">
                  {route.name.split(' ')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3D Perspective Card Wrapper */}
      <div
        className="w-full relative [perspective:1400px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Brass Compass (Top Right Accent) */}
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30 bg-white rounded-2xl p-2.5 border-2 border-brand-gold/60 shadow-luxury flex items-center gap-2 animate-bounce-subtle">
          <div className="relative w-8 h-8 rounded-full border border-brand-gold bg-slate-50 flex items-center justify-center">
            <Compass className="w-5 h-5 text-brand-gold animate-spin-slow" />
            <div className="absolute top-0.5 w-1 h-1 bg-rose-500 rounded-full" />
          </div>
          <div className="text-left pr-1 hidden xs:block">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">Bearing</span>
            <span className="text-[11px] font-serif font-bold text-black block leading-none">{selectedRoute.bearing}</span>
          </div>
        </div>

        {/* Floating Verified Concierge Seal (Bottom Left Accent) */}
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-30 bg-white rounded-2xl p-2.5 border border-slate-200 shadow-luxury flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-[11px] font-serif font-bold text-black">4.98</span>
            </div>
            <span className="text-[10px] text-gray-500 block leading-tight">Verified Luxury Escorted</span>
          </div>
        </div>

        {/* Main Luxury Boarding Card */}
        <div
          ref={cardRef}
          style={{
            transform: `rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl overflow-hidden transition-shadow duration-300"
        >
          {/* Subtle Golden Sheen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-amber-100/20 pointer-events-none z-10" />

          {/* CARD HEADER: VIP Flight Pass Header */}
          <div className="bg-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-brand-gold/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center">
                <Plane className="w-4 h-4 text-brand-gold" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase block leading-none">
                  MARVEL AIRWAYS • ESCORTED PASS
                </span>
                <span className="font-serif text-sm font-bold text-white tracking-wide">
                  {selectedRoute.seatClass}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                Daily Departure
              </span>
            </div>
          </div>

          {/* FLIGHT CORRIDOR ROUTE SECTION */}
          <div className="px-5 sm:px-6 pt-5 pb-4 bg-slate-50/70 border-b border-dashed border-slate-300">
            <div className="flex items-center justify-between">
              {/* Origin */}
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-black tracking-tight block">
                  {selectedRoute.codeFrom}
                </span>
                <span className="text-xs text-gray-500 font-medium block">
                  {selectedRoute.cityFrom}
                </span>
              </div>

              {/* Animated Flight Path */}
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-center relative">
                  <div className="w-full border-t-2 border-dashed border-brand-gold/60 relative" />
                  <div className="absolute bg-white px-2 py-0.5 rounded-full border border-brand-gold/40 shadow-sm flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-brand-gold transform rotate-45" />
                    <span className="text-[10px] font-mono font-bold text-black">
                      {selectedRoute.flightTime}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-500 mt-2">
                  Flight {selectedRoute.flightCode} • Premium Chauffeur
                </span>
              </div>

              {/* Destination */}
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-brand-gold tracking-tight block">
                  {selectedRoute.codeTo}
                </span>
                <span className="text-xs text-gray-900 font-bold font-serif block">
                  {selectedRoute.cityTo}
                </span>
              </div>
            </div>
          </div>

          {/* PERFORATED TICKET NOTCHES */}
          <div className="relative flex items-center justify-between">
            <div className="w-5 h-5 -ml-2.5 rounded-full bg-slate-100 border-r border-slate-300 shadow-inner" />
            <div className="flex-1 border-t-2 border-dotted border-slate-300 mx-2" />
            <div className="w-5 h-5 -mr-2.5 rounded-full bg-slate-100 border-l border-slate-300 shadow-inner" />
          </div>

          {/* DESTINATION CINEMATIC PHOTO & EXPERIENCE DETAILS */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Real Travel Photo with Cinematic Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img
                src={selectedRoute.image}
                alt={selectedRoute.name}
                className="w-full h-44 sm:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Weather Chip (Top Left of Photo) */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-xs font-semibold text-black shadow-sm flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedRoute.temperature}</span>
              </div>

              {/* Best Season Chip (Top Right) */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white shadow-sm flex items-center gap-1">
                <Calendar className="w-3 h-3 text-brand-gold" />
                <span>{selectedRoute.bestSeason}</span>
              </div>

              {/* Title & Tagline at Bottom of Photo */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold block">
                  Signature Holiday Itinerary
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  {selectedRoute.name}
                </h3>
                <p className="text-xs text-white/90 line-clamp-1 mt-0.5">
                  {selectedRoute.tagline}
                </p>
              </div>
            </div>

            {/* Inclusions Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {selectedRoute.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-medium text-gray-800 flex items-center gap-1.5 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            {/* PRICING & CALL-TO-ACTION FOOTER */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block">
                  All-Inclusive Package From
                </span>
                <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-black">
                    ₹{selectedRoute.startingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-500">/ person</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onDiscoverPackages}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-all active:scale-95"
                >
                  <span>Explore Route</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </button>

                <button
                  onClick={onPlanTrip}
                  className="px-4 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldDark text-white font-serif font-bold text-xs sm:text-sm shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-1"
                >
                  <Luggage className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              </div>
            </div>

            {/* Barcode & Security Hologram Strip */}
            <div className="pt-2 flex items-center justify-between text-gray-400 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-6 h-6 text-slate-800" />
                <span className="text-[9px] font-mono text-gray-500 tracking-wider">
                  TICKET: MH-VIP-{selectedRoute.id.toUpperCase()}-2026
                </span>
              </div>
              <span className="text-[9px] font-serif uppercase tracking-widest text-brand-gold font-bold">
                100% Guaranteed Marvel Booking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

