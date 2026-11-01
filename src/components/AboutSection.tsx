import React from 'react';
import { Compass, Sparkles, CheckCircle2, Phone, Mail } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { MarvelLogo } from './MarvelLogo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#09090d] border-t border-b border-white/10 text-white relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ED1D24]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Collage with Stats */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="./images/destinations/kashmir.jpg"
                alt="Marvel Holidays Experiential Travel"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Floating Stat Badge in Dark Glass */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0e0e14]/95 backdrop-blur-md border border-white/15 shadow-2xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">
                      12+
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Years of Excellence</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-400 block">
                      27+
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Iconic Regions</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 block">
                      99.4%
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Delighted Clients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Marvel Accent Badge */}
            <div className="absolute -top-4 -left-4 p-2 rounded-2xl bg-black border border-white/20 shadow-xl hidden sm:flex items-center justify-center">
              <MarvelLogo size="sm" />
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-amber-400 block mb-2">
              About MARVEL HOLIDAYS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              "We Don't Just Plan Trips.{' '}
              <span className="text-[#ED1D24]">
                We Create Memories.
              </span>"
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
              <strong className="text-white font-serif font-bold">MARVEL HOLIDAYS</strong> was founded with a singular conviction: travel across India should be an unforgettable, inspiring adventure. Guided by our motto <span className="text-amber-400 font-semibold font-mono">"Assemble Your Next Adventure ❤️‍🔥"</span>, we specialize in high-impact group journeys, educational and corporate retreats, and bespoke leisure escapes.
            </p>

            {/* Core Offerings Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                <span className="text-xs font-bold text-white block">🎒 School & 🎓 College IV</span>
                <span className="text-[11px] text-zinc-400">Curated industrial visits, plant permissions & team building.</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                <span className="text-xs font-bold text-white block">💼 Corporate Retreats</span>
                <span className="text-[11px] text-zinc-400">Executive offsites, conferences & leadership summits.</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                <span className="text-xs font-bold text-white block">♦️ Family & Honeymoon</span>
                <span className="text-[11px] text-zinc-400">Private luxury villas, houseboats & scenic getaways.</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10">
                <span className="text-xs font-bold text-white block">♦️ Devotional Yatras</span>
                <span className="text-[11px] text-zinc-400">Sacred pilgrimage circuits with VIP darshan coordination.</span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'Bespoke itineraries tailored to your schedule',
                'Transparent pricing with zero hidden surcharges',
                '24/7 Dedicated on-trip personal coordinator',
                'Handpicked boutique & luxury verified stays',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Direct Contact Banner */}
            <div className="p-5 rounded-2xl bg-[#121218] border border-white/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-zinc-400 block font-mono">Speak with our Trip Director</span>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="tel:7867818790" className="flex items-center gap-1.5 text-white font-mono font-bold hover:text-amber-400">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>7867818790</span>
                  </a>
                  <span className="text-zinc-600 hidden sm:inline">|</span>
                  <a href="mailto:marvelholidaysandtours@gmail.com" className="flex items-center gap-1.5 text-zinc-300 text-xs hover:text-amber-400">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>marvelholidaysandtours@gmail.com</span>
                  </a>
                </div>
              </div>

              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white text-xs font-serif font-bold transition-all flex items-center gap-2 shadow-md shrink-0"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
