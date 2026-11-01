import React, { useState, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CloudSun,
  Star,
  Luggage,
  QrCode,
  Bus,
  GraduationCap,
  Users,
  Heart,
  Landmark
} from 'lucide-react';
import { MarvelLogo } from './MarvelLogo';

interface TourOption {
  id: string;
  packageId: string;
  name: string;
  tourType: string;
  tourIcon: React.ElementType;
  tagline: string;
  origin: string;
  destination: string;
  duration: string;
  transportMode: string;
  image: string;
  temperature: string;
  bestSeason: string;
  startingPrice: number;
  inclusions: string[];
  region: string;
}

const SIGNATURE_TOURS: TourOption[] = [
  {
    id: 'kashmir',
    packageId: 'pkg-kashmir-honeymoon',
    name: 'Kashmir Paradise & Valley of Wonder',
    tourType: 'Family & Honeymoon Special',
    tourIcon: Heart,
    tagline: 'Cedarwood houseboats, snow peaks of Gulmarg & saffron valleys',
    origin: 'Delhi / Srinagar',
    destination: 'Kashmir & Gulmarg',
    duration: '6 Days • 5 Nights',
    transportMode: 'Private AC Innova Crysta Chauffeur',
    image: './images/destinations/kashmir.jpg',
    temperature: '12°C • Alpine Wonder',
    bestSeason: 'Spring, Autumn & Winter',
    startingPrice: 28999,
    inclusions: ['Dal Lake Heritage Houseboat', 'Gulmarg Gondola Cable Car', 'Dedicated Tour Guide'],
    region: 'North India'
  },
  {
    id: 'college-iv',
    packageId: 'pkg-goa-friends',
    name: 'Goa & Coastal Industrial Visit (IV)',
    tourType: 'College & School IV Trip',
    tourIcon: GraduationCap,
    tagline: 'Industry visits, water sports, beach resorts & campfire nights',
    origin: 'Bangalore / Chennai / Mumbai',
    destination: 'Goa Coastal Circuit',
    duration: '5 Days • 4 Nights',
    transportMode: 'Luxury AC Multi-Axle Volvo Coach',
    image: './images/destinations/goa.jpg',
    temperature: '28°C • Coastal Breeze',
    bestSeason: 'Year-Round Available',
    startingPrice: 8999,
    inclusions: ['Industrial Plant Permission', 'Beachside Resort Stay', 'Campfire & DJ Night'],
    region: 'South & West'
  },
  {
    id: 'kerala',
    packageId: 'pkg-kerala-family',
    name: 'Kerala Emerald Backwaters & Hills',
    tourType: 'Family & Group Holiday',
    tourIcon: Users,
    tagline: 'Misty tea gardens of Munnar, luxury Alleppey houseboat & spice trails',
    origin: 'Cochin / Coimbatore',
    destination: 'Munnar & Alleppey',
    duration: '5 Days • 4 Nights',
    transportMode: 'Private AC Tempo Traveller / Coach',
    image: './images/destinations/kerala-backwaters.jpg',
    temperature: '24°C • Tropical Lush',
    bestSeason: 'September to April',
    startingPrice: 16999,
    inclusions: ['Alleppey Private Houseboat Cruise', 'Munnar Tea Plantation Resort', 'All Meals Included'],
    region: 'South India'
  },
  {
    id: 'rajasthan',
    packageId: 'pkg-rajasthan-royal',
    name: 'Royal Rajasthan Heritage Circuit',
    tourType: 'Corporate & Heritage Tour',
    tourIcon: Landmark,
    tagline: 'Magnificent hill forts, lake palaces of Udaipur & desert campfires',
    origin: 'Delhi / Jaipur',
    destination: 'Jaipur & Udaipur',
    duration: '6 Days • 5 Nights',
    transportMode: 'Luxury Pushback AC Tourist Coach',
    image: './images/destinations/jaipur.jpg',
    temperature: '22°C • Royal Sunsets',
    bestSeason: 'October to March',
    startingPrice: 19999,
    inclusions: ['Lake Pichola Boat Cruise', 'Amber Fort Guided Heritage', 'Royal Haveli Stays'],
    region: 'North & West'
  },
  {
    id: 'ladakh',
    packageId: 'pkg-ladakh-adventure',
    name: 'Ladakh High Pass Expedition',
    tourType: 'Adventure & Group Expedition',
    tourIcon: Compass,
    tagline: 'Turquoise Pangong lake, sand dunes of Nubra & ancient monasteries',
    origin: 'Leh Airport Hub',
    destination: 'Leh, Nubra & Pangong',
    duration: '7 Days • 6 Nights',
    transportMode: '4x4 Luxury Tourist Expeditions',
    image: './images/destinations/ladakh.jpg',
    temperature: '10°C • High Mountain Sun',
    bestSeason: 'May to October',
    startingPrice: 24999,
    inclusions: ['Pangong Glacial Luxury Domes', 'Nubra Camel Safari', 'Oxygen Backups & Permits'],
    region: 'Himalayas'
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
  const [selectedTour, setSelectedTour] = useState<TourOption>(SIGNATURE_TOURS[0]);
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

    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;

    setCardRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const TourIcon = selectedTour.tourIcon;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Top Tour Category Selector Tabs */}
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2 p-1.5 bg-zinc-900/90 rounded-2xl border border-white/10 shadow-lg mb-4 overflow-x-auto no-scrollbar">
        {SIGNATURE_TOURS.map((tour) => {
          const isActive = selectedTour.id === tour.id;
          return (
            <button
              key={tour.id}
              onClick={() => setSelectedTour(tour)}
              className={`flex-1 min-w-[75px] sm:min-w-[95px] py-2 px-2.5 rounded-xl text-center text-xs font-serif font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-[#ED1D24] text-white shadow-lg shadow-red-900/40 scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-300 uppercase">
                  {tour.id === 'college-iv' ? 'College IV' : tour.region.split(' ')[0]}
                </span>
                <span className="truncate w-full leading-tight font-serif text-[11px] sm:text-xs text-white">
                  {tour.name.split(' ')[0]}
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
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30 bg-[#09090b] rounded-2xl p-2.5 border-2 border-amber-400/60 shadow-2xl flex items-center gap-2 animate-bounce-subtle">
          <div className="relative w-8 h-8 rounded-full border border-amber-400 bg-zinc-900 flex items-center justify-center">
            <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
            <div className="absolute top-0.5 w-1 h-1 bg-[#ED1D24] rounded-full" />
          </div>
          <div className="text-left pr-1 hidden xs:block">
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono block">Specialization</span>
            <span className="text-[11px] font-serif font-bold text-white block leading-none">Tour & Travels</span>
          </div>
        </div>

        {/* Floating Verified Seal (Bottom Left Accent) */}
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 z-30 bg-[#09090b] rounded-2xl p-2.5 border border-white/10 shadow-2xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-[11px] font-serif font-bold text-white">4.98</span>
            </div>
            <span className="text-[10px] text-zinc-400 block leading-tight">School • College • Corporate</span>
          </div>
        </div>

        {/* Main Signature Tour Pass Card (Dark Luxury) */}
        <div
          ref={cardRef}
          style={{
            transform: `rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative bg-[#0c0c11] rounded-3xl border-2 border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden transition-shadow duration-300"
        >
          {/* Subtle Red & Gold Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ED1D24]/10 via-transparent to-amber-500/10 pointer-events-none z-10" />

          {/* CARD HEADER: Marvel Holidays Signature Tour Pass */}
          <div className="bg-[#121218] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ED1D24]/20 border border-[#ED1D24] flex items-center justify-center">
                <TourIcon className="w-4 h-4 text-[#ED1D24]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#ED1D24] uppercase block leading-none font-bold">
                  MARVEL HOLIDAYS • OFFICIAL TOUR PASS
                </span>
                <span className="font-serif text-sm font-bold text-white tracking-wide">
                  {selectedTour.tourType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                Daily Departures
              </span>
            </div>
          </div>

          {/* TOUR ROUTE & TRANSPORT SECTION */}
          <div className="px-5 sm:px-6 pt-5 pb-4 bg-[#08080c] border-b border-dashed border-white/10">
            <div className="flex items-center justify-between">
              {/* Origin */}
              <div className="text-left">
                <span className="text-xs text-zinc-500 font-mono uppercase block">Starting Hub</span>
                <span className="text-base sm:text-lg font-serif font-bold text-white tracking-tight block">
                  {selectedTour.origin}
                </span>
              </div>

              {/* Tour Duration & Transport Hub */}
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-center relative">
                  <div className="w-full border-t-2 border-dashed border-amber-400/50 relative" />
                  <div className="absolute bg-[#181822] px-3 py-1 rounded-full border border-amber-400/40 shadow-sm flex items-center gap-1.5">
                    <Bus className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-mono font-bold text-white">
                      {selectedTour.duration}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-2 text-center">
                  {selectedTour.transportMode}
                </span>
              </div>

              {/* Destination */}
              <div className="text-right">
                <span className="text-xs text-zinc-500 font-mono uppercase block">Destination</span>
                <span className="text-base sm:text-lg font-serif font-bold text-amber-400 tracking-tight block">
                  {selectedTour.destination}
                </span>
              </div>
            </div>
          </div>

          {/* PERFORATED TICKET NOTCHES */}
          <div className="relative flex items-center justify-between">
            <div className="w-5 h-5 -ml-2.5 rounded-full bg-[#050507] border-r border-white/10 shadow-inner" />
            <div className="flex-1 border-t-2 border-dotted border-white/15 mx-2" />
            <div className="w-5 h-5 -mr-2.5 rounded-full bg-[#050507] border-l border-white/10 shadow-inner" />
          </div>

          {/* DESTINATION CINEMATIC PHOTO & EXPERIENCE DETAILS */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Real Travel Photo with Cinematic Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-md group">
              <img
                src={selectedTour.image}
                alt={selectedTour.name}
                className="w-full h-44 sm:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Weather Chip (Top Left of Photo) */}
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-sm flex items-center gap-1.5">
                <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedTour.temperature}</span>
              </div>

              {/* Best Season Chip (Top Right) */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-amber-300 shadow-sm flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>{selectedTour.bestSeason}</span>
              </div>

              {/* Title & Tagline at Bottom of Photo */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ED1D24] block font-bold">
                  Curated Marvel Itinerary
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                  {selectedTour.name}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                  {selectedTour.tagline}
                </p>
              </div>
            </div>

            {/* Inclusions Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {selectedTour.inclusions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-[11px] font-medium text-zinc-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            {/* PRICING & CALL-TO-ACTION FOOTER */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">
                  All-Inclusive Package From
                </span>
                <div className="flex items-baseline gap-1.5 justify-center sm:justify-start">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    ₹{selectedTour.startingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-400">/ person</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onDiscoverPackages}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/30 hover:scale-105 transition-all active:scale-95"
                >
                  <span>Explore Route</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>

                <a
                  href={`https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedTour.name)}%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-xs sm:text-sm shadow-sm hover:scale-105 transition-all flex items-center justify-center gap-1"
                >
                  <span>Book: 7867818790</span>
                </a>
              </div>
            </div>

            {/* Barcode & Security Hologram Strip */}
            <div className="pt-2 flex items-center justify-between text-zinc-500 border-t border-white/5">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-zinc-400" />
                <span className="text-[9px] font-mono text-zinc-400 tracking-wider">
                  MARVEL-TOUR-{selectedTour.id.toUpperCase()}-2026
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Assemble Your Next Adventure
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
