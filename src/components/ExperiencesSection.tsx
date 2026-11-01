import React from 'react';
import { EXPERIENCES } from '../data/experiences';
import { Mountain, SunMedium, Waves, Footprints, Landmark, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface ExperiencesSectionProps {
  onSelectExperience: (categoryName: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectExperience }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain': return <Mountain className="w-5 h-5 text-white" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5 text-amber-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-teal-400" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-300" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#ED1D24]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      default: return <Compass className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="experiences" className="py-24 bg-[#050507] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Thematic Indian Travel
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Travel Experiences
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Whether you crave high-altitude summits, quiet palm lagoons, historic royal forts, or adrenaline-packed rapids, find experiences tailored to your rhythm.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-1 h-72' : 'h-72'
              }`}
            >
              <img
                src={exp.image}
                alt={exp.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-md">
                  {getIcon(exp.iconName)}
                </div>

                <span className="px-3 py-1 rounded-full bg-[#ED1D24] text-white text-[11px] font-mono font-bold">
                  {exp.count}+ Packages
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {exp.name}
                </h3>
                <p className="text-xs text-zinc-300 mb-3 line-clamp-1">
                  {exp.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-bold text-white">
                  <span className="truncate pr-2">{exp.popularDestinations.slice(0, 3).join(', ')}</span>
                  <div className="w-7 h-7 rounded-full bg-[#ED1D24] text-white flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
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
