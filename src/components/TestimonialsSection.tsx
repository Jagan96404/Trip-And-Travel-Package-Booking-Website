import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#08080c] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Verified Guest Testimonials
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Loved By Thousands of Explorers
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Discover how we turned dream vacations, college IVs, and family trips into lifelong memories across India.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 text-xs shadow-sm">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified traveler reviews from School, College IV, Corporate, and Family tours.</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#0e0e14] rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-white/5 absolute -top-1 -right-1 pointer-events-none" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-zinc-800 border-2 border-amber-400 flex items-center justify-center text-white font-serif font-bold text-sm shadow-sm flex-shrink-0">
                  {t.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <span className="text-[11px] text-zinc-400 block">{t.location}</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold block">{t.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
