import React, { useState, useEffect } from 'react';
import { ThreeGlobe } from './ThreeGlobe';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreDestinations: () => void;
  onDiscoverPackages: () => void;
  onPlanTrip: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDestinations,
  onDiscoverPackages,
  onPlanTrip,
}) => {
  // Cinematic background slides showcasing Incredible India
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop', // Kashmir Shikara & Mountains
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop', // Taj Mahal
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop', // Munnar / Kerala Tea Valleys
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2000&auto=format&fit=crop', // Ladakh Pangong Tso
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <section id="home" className="relative min-h-[105vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Dynamic Cinematic Background Layer */}
      {heroBackgrounds.map((bg, idx) => (
        <div
          key={bg}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out scale-105 transform ${
            idx === currentSlide ? 'opacity-30' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Luxury Cinematic Vignette & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)]" />

      {/* Floating Cloud / Atmospheric Mist Layer */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-turquoise-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Value Propositions */}
          <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0">
            {/* Luxury Brand Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs sm:text-sm text-gold-300 backdrop-blur-md shadow-[0_0_25px_rgba(255,183,3,0.15)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-semibold tracking-wide">Premier India Holiday Curator</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-slate-400">Discover India. Experience Wonder.</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white mb-6">
              YOUR JOURNEY. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-turquoise-400 to-emerald-400">
                YOUR STORY.
              </span>{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-500">
                YOUR INDIA.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Explore incredible destinations, experience unforgettable adventures, and create memories that last forever with curated bespoke holidays crafted by India’s premier luxury travel agency.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onExploreDestinations}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-turquoise-500 via-cyan-400 to-teal-400 text-navy-950 font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscoverPackages}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-navy-900/80 hover:bg-navy-800 text-slate-200 border border-slate-700/80 hover:border-turquoise-400/50 font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Discover Holiday Packages</span>
              </button>

              <button
                onClick={onPlanTrip}
                className="px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-500/20 to-amber-500/10 border border-gold-500/60 text-gold-300 hover:text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all hover:border-gold-400"
              >
                <span>Plan Your Trip</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-gold-400 font-bold text-lg sm:text-xl">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                </div>
                <span className="text-xs text-slate-400">Verified Rating</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-white font-bold text-lg sm:text-xl">25,000+</span>
                <span className="text-xs text-slate-400">Delighted Travellers</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 text-turquoise-400 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-5 h-5" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-slate-400">Customized Tours</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Earth Globe with Flight Routes & 3D Airplane */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing background aura */}
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-tr from-turquoise-500/15 via-blue-500/10 to-gold-500/15 blur-[60px] pointer-events-none" />

            <div className="w-full h-[400px] sm:h-[480px] md:h-[540px] relative">
              <ThreeGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

