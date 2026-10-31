import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-turquoise-500/40 text-xs text-turquoise-400 font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-turquoise-400 text-turquoise-400" />
            <span>Traveler Experiences</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Loved By <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-turquoise-400 to-emerald-400">Thousands</span> of Explorers
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Discover how we turned dream vacations into lifelong memories for couples, families, and solo adventurers.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900/80 border border-slate-700 text-slate-400 text-xs">
            <Info className="w-3.5 h-3.5 text-gold-400" />
            <span>Demo sample reviews shown for presentation until live customer review sync is activated.</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 glass-card-hover flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-slate-800 absolute -top-1 -right-1 pointer-events-none" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-turquoise-400/50 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-turquoise-400" />
                  </h4>
                  <span className="text-[11px] text-slate-400 block">{t.location}</span>
                  <span className="text-[10px] text-gold-400 font-semibold block">{t.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

