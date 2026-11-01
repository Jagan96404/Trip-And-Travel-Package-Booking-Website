import React, { useState, useEffect } from 'react';
import { LuxuryTravelHub } from './LuxuryTravelHub';
import { MarvelLogo } from './MarvelLogo';
import { ArrowRight, Sparkles, ShieldCheck, Star, Phone, CheckCircle2 } from 'lucide-react';

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
    './images/destinations/kashmir.jpg',
    './images/destinations/agra.jpg',
    './images/destinations/munnar.jpg',
    './images/destinations/ladakh.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050507]">
      {/* Dark Cinematic Photo Scrim */}
      {heroBackgrounds.map((bg, idx) => (
        <div
          key={bg}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-25' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Deep Obsidian Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/90 via-[#050507]/80 to-[#050507]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headings & Value Propositions */}
          <div className="lg:col-span-7 text-center lg:text-left pt-4 lg:pt-0">
            {/* Prominent Marvel Brand Logo */}
            <div className="flex justify-center lg:justify-start mb-6">
              <MarvelLogo size="lg" />
            </div>

            {/* Marvel Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/15 text-xs sm:text-sm text-white font-mono font-bold shadow-lg mb-6 backdrop-blur-md">
              <span className="text-[#ED1D24]">📍</span>
              <span className="text-white font-sans font-bold">Assemble Your Next Adventure ❤️‍🔥</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 hidden sm:inline" />
              <span className="text-zinc-400 font-sans font-normal hidden sm:inline">Tours & Travels</span>
            </div>

            {/* Main Headline in Times New Roman Bold White */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] text-white mb-6 drop-shadow-md">
              YOUR JOURNEY. <br />
              <span className="text-zinc-200">
                YOUR STORY.
              </span>{' '}
              <br />
              <span className="text-[#ED1D24]">
                MARVEL{' '}
              </span>
              <span className="text-amber-400">
                HOLIDAYS.
              </span>
            </h1>

            {/* Travel Niches & Core Offerings */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              {['🎒 School Trips', '🎓 College IV Trips', '💼 Corporate Retreats', '♦️ Family Vacations', '♦️ Devotional Trips'].map((niche, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 font-medium"
                >
                  {niche}
                </span>
              ))}
            </div>

            {/* Subtitle in Crisp Readable Light Text */}
            <p className="font-sans text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              Discover Incredible India with expert-crafted travel experiences. Specializing in memorable School & College Industrial Visits (IV), Corporate offsites, Family getaways, Honeymoons, and Devotional Yatras with 24/7 dedicated assistance.
            </p>

            {/* Action Buttons in Black, Red & Gold Style */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={onDiscoverPackages}
                className="px-7 py-3.5 rounded-full bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-red-900/40 hover:scale-105 transition-all active:scale-95"
              >
                <span>Discover Holiday Packages</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20want%20to%20plan%20a%20trip%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 7867818790</span>
              </a>

              <button
                onClick={onPlanTrip}
                className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-serif font-bold text-sm sm:text-base shadow-md hover:scale-105 transition-all"
              >
                <span>Plan Your Trip</span>
              </button>
            </div>

            {/* Trust Badges in Dark Luxury Box */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 font-serif text-white font-bold text-lg sm:text-xl">
                  <span>4.98</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-zinc-400 font-medium">Verified Customer Rating</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <span className="font-serif text-white font-bold text-lg sm:text-xl">25,000+</span>
                <span className="text-xs text-zinc-400 font-medium">Happy Travelers</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1 font-serif text-white font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-zinc-400 font-medium">Customized Itineraries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Tour Experience Showcase (No Airplane) */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            <LuxuryTravelHub
              onDiscoverPackages={onDiscoverPackages}
              onPlanTrip={onPlanTrip}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
