import React from 'react';
import { EXPERIENCES } from '../data/experiences';
import { Mountain, SunMedium, Waves, Footprints, Landmark, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface ExperiencesSectionProps {
  onSelectExperience: (categoryName: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectExperience }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Mountain': return <Mountain className="w-5 h-5 text-turquoise-400" />;
      case 'SunMedium': return <SunMedium className="w-5 h-5 text-gold-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      default: return <Compass className="w-5 h-5 text-turquoise-400" />;
    }
  };

  return (
    <section id="experiences" className="py-24 relative overflow-hidden bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-turquoise-500/40 text-xs text-turquoise-400 font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Theme-Based Adventures</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Experiences</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Whether you crave high-altitude summits, quiet palm lagoons, historic royal forts, or adrenaline-packed rapids, find experiences tailored to your inner traveler.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp.name)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer glass-card-hover border border-slate-800 shadow-xl ${
                idx === 0 ? 'sm:col-span-2 sm:row-span-1 h-72' : 'h-72'
              }`}
            >
              {/* Background Photo */}
              <img
                src={exp.image}
                alt={exp.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent group-hover:via-navy-950/40 transition-colors" />

              {/* Top Bar with Icon & Count */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-navy-950/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center">
                  {getIcon(exp.iconName)}
                </div>

                <span className="px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-300">
                  {exp.count}+ Packages
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                  {exp.name}
                </h3>
                <p className="text-xs text-slate-300 mb-3 line-clamp-1">
                  {exp.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-semibold text-turquoise-400">
                  <span>{exp.popularDestinations.slice(0, 3).join(', ')}</span>
                  <div className="w-7 h-7 rounded-full bg-turquoise-500/10 flex items-center justify-center group-hover:bg-turquoise-500 group-hover:text-navy-950 transition-colors">
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

