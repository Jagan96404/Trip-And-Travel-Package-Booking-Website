import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage with Stats */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop"
                alt="Marvel Holidays Experiential Travel"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-luxury">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-black block">
                      12+
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">Years of Wonder</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold block">
                      27+
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">Iconic Destinations</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 block">
                      99.4%
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">Guest Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-black p-1 shadow-xl hidden sm:flex items-center justify-center">
              <div className="w-full h-full rounded-full border-2 border-brand-gold flex flex-col items-center justify-center text-center p-1">
                <Compass className="w-5 h-5 text-brand-gold" />
                <span className="text-[8px] font-serif font-bold text-white uppercase tracking-tighter">Bespoke</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
              About MARVEL HOLIDAYS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
              "We Don't Just Plan Trips.{' '}
              <span className="text-brand-gold">
                We Create Memories.
              </span>"
            </h2>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              <strong className="text-black font-serif">MARVEL HOLIDAYS</strong> was founded with a singular conviction: travel across India should be an art form. We believe that stepping into the snow-capped amphitheater of Kashmir, gliding along the emerald backwaters of Kerala, or tracing the sandstone bastions of Rajasthan should never be a generic tour — it should be a transformative, unforgettable chapter of your life.
            </p>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-8">
              From our dedicated on-ground concierge network in every state to our hand-inspected heritage stays and private luxury transit, we ensure every detail of your journey is orchestrated with precision, warmth, and peerless hospitality.
            </p>

            {/* 4 Feature Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Bespoke luxury itineraries tailored to your rhythm',
                'Transparent pricing with zero hidden costs',
                '24/7 Dedicated on-trip personal travel coordinator',
                'Handpicked boutique & 5-star heritage properties',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Instagram Connect */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Follow Our Journey on Instagram</span>
                <span className="font-serif text-sm font-bold text-black">@marvel_holidays.official</span>
              </div>

              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-xs font-serif font-bold transition-all"
              >
                Follow Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
