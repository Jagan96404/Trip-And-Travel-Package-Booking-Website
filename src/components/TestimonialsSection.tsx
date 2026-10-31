import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Verified Guest Testimonials
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Loved By Thousands of Explorers
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            Discover how we turned dream vacations into lifelong memories for couples, families, and solo adventurers across India.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-gray-600 text-xs shadow-sm">
            <Info className="w-3.5 h-3.5 text-brand-gold" />
            <span>Demo sample reviews shown for presentation until live customer review sync is activated.</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-luxury white-card-hover flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="w-10 h-10 text-slate-100 absolute -top-1 -right-1 pointer-events-none" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-black flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <span className="text-[11px] text-gray-500 block">{t.location}</span>
                  <span className="text-[10px] text-brand-gold font-serif font-bold block">{t.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
