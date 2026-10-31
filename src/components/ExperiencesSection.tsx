import React from 'react';
import { EXPERIENCES } from '../data/experiences';
import { Mountain, SunMedium, Waves, Footprints, Landmark, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface ExperiencesSectionProps {
  onSelectExperience: (categoryName: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectExperience }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain': return <Mountain className="w-5 h-5 text-black" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5 text-brand-gold" />;
      case 'Waves': return <Waves className="w-5 h-5 text-teal-700" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-700" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-700" />;
      case 'Compass': return <Compass className="w-5 h-5 text-black" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-brand-gold" />;
      default: return <Compass className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Thematic Indian Travel
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Travel Experiences
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            Whether you crave high-altitude summits, quiet palm lagoons, historic royal forts, or adrenaline-packed rapids, find experiences tailored to your rhythm.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-luxury border border-slate-200 white-card-hover ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-1 h-72' : 'h-72'
              }`}
            >
              <img
                src={exp.image}
                alt={exp.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md">
                  {getIcon(exp.iconName)}
                </div>

                <span className="px-3 py-1 rounded-full bg-black/80 text-white text-xs font-serif font-bold">
                  {exp.count}+ Packages
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {exp.name}
                </h3>
                <p className="text-xs text-slate-200 mb-3 line-clamp-1">
                  {exp.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-bold text-white">
                  <span>{exp.popularDestinations.slice(0, 3).join(', ')}</span>
                  <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
