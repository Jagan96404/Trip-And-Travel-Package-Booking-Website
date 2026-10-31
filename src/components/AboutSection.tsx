import React from 'react';
import { Compass, Sparkles, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage with Stats */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop"
                alt="Marvel Holidays Experiential Travel"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-navy-900/90 backdrop-blur-xl border border-gold-500/40 shadow-2xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-400 block">
                      12+
                    </span>
                    <span className="text-[11px] text-slate-400">Years of Wonder</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-turquoise-400 block">
                      27+
                    </span>
                    <span className="text-[11px] text-slate-400">Iconic Destinations</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                      99.4%
                    </span>
                    <span className="text-[11px] text-slate-400">Guest Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-tr from-gold-500 to-amber-300 p-0.5 shadow-xl hidden sm:flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-navy-950 flex flex-col items-center justify-center text-center p-1">
                <Compass className="w-5 h-5 text-gold-400" />
                <span className="text-[8px] font-bold text-white uppercase tracking-tighter">Bespoke</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>About MARVEL HOLIDAYS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              "We Don't Just Plan Trips.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">
                We Create Memories.
              </span>"
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              <strong>MARVEL HOLIDAYS</strong> was founded with a singular conviction: travel across India should be an art form. We believe that stepping into the snow-capped amphitheater of Kashmir, gliding along the emerald backwaters of Kerala, or tracing the sandstone bastions of Rajasthan should never be a generic tour — it should be a transformative, unforgettable chapter of your life.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
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
                  <CheckCircle2 className="w-4 h-4 text-turquoise-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Instagram Connect */}
            <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Follow Our Journey on Instagram</span>
                <span className="text-sm font-bold text-pink-400">@marvel_holidays.official</span>
              </div>

              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/30 text-xs font-bold transition-all"
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

