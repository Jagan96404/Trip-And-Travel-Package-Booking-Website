import React, { useState, useEffect } from 'react';
import { ThreeGlobe } from './ThreeGlobe';
import { ArrowRight, Sparkles, ShieldCheck, Star } from 'lucide-react';

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
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop', // Kashmir Shikara
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop', // Taj Mahal
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop', // Munnar Kerala
    'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2000&auto=format&fit=crop', // Ladakh Pangong
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Light Cinematic Photo Scrim */}
      {heroBackgrounds.map((bg, idx) => (
        <div
          key={bg}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-10' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Subtle pearl white gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-slate-50" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Value Propositions */}
          <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-300 text-xs sm:text-sm text-black font-serif font-bold shadow-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Premier Indian Travel Agency</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              <span className="text-gray-600 font-sans font-medium">Discover India. Experience Wonder.</span>
            </div>

            {/* Main Headline in Times New Roman Bold Black */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-black mb-6">
              YOUR JOURNEY. <br />
              <span className="text-black">
                YOUR STORY.
              </span>{' '}
              <br />
              <span className="text-brand-gold">
                YOUR INDIA.
              </span>
            </h1>

            {/* Subtitle in Crisp Readable Sans / Serif */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-gray-800 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Explore incredible destinations, experience unforgettable adventures, and create memories that last forever with curated bespoke holidays crafted by India’s premier luxury travel agency.
            </p>

            {/* Action Buttons in Black & Gold Luxury Style */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onExploreDestinations}
                className="px-7 py-3.5 rounded-full bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm sm:text-base flex items-center gap-2 shadow-luxury hover:scale-105 transition-all active:scale-95"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscoverPackages}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-black border-2 border-black font-serif font-bold text-sm sm:text-base shadow-sm hover:scale-105 transition-all active:scale-95"
              >
                <span>Discover Holiday Packages</span>
              </button>

              <button
                onClick={onPlanTrip}
                className="px-6 py-3.5 rounded-full bg-brand-gold hover:bg-brand-goldDark text-white font-serif font-bold text-sm sm:text-base shadow-md hover:scale-105 transition-all"
              >
                <span>Plan Your Trip</span>
              </button>
            </div>

            {/* Trust Badges in White Box */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 font-serif text-black font-bold text-lg sm:text-xl">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                </div>
                <span className="text-xs text-gray-600 font-medium">Verified Rating</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-black font-bold text-lg sm:text-xl">25,000+</span>
                <span className="text-xs text-gray-600 font-medium">Delighted Travellers</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 font-serif text-black font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">Customized Tours</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Earth Globe Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-[400px] sm:h-[480px] md:h-[520px] relative bg-white/60 rounded-3xl p-2 shadow-luxury border border-slate-200">
              <ThreeGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
