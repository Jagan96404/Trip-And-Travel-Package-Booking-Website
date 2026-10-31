import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, ArrowRight, Heart, Shield, Check } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-turquoise-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Tagline & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold-500/60 p-1.5 flex items-center justify-center bg-navy-900/80 shadow-[0_0_20px_rgba(255,183,3,0.2)]">
                <Compass className="w-full h-full text-gold-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
                  MARVEL
                </span>
                <span className="font-display text-xs font-semibold tracking-[0.35em] text-turquoise-400">
                  HOLIDAYS
                </span>
              </div>
            </div>

            <p className="text-gold-400 font-serif text-sm tracking-widest uppercase">
              Discover India. Experience Wonder.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India’s premier luxury travel designer. Delivering unforgettable journeys, handcrafted itineraries, and 5-star hospitality across 27+ iconic destinations.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Subscribe for Exclusive Deals & Travel Guides
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-navy-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-turquoise-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold text-xs hover:brightness-110 shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  ✓ Welcome to Marvel Holidays VIP travel club!
                </span>
              )}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Holiday Packages
                </a>
              </li>
              <li>
                <a href="#planner" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Smart Trip Planner
                </a>
              </li>
              <li>
                <a href="#interactive-map" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Interactive India Map
                </a>
              </li>
              <li>
                <a href="#experiences" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  About Marvel Holidays
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-turquoise-400 transition-colors">
                  Contact & Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Destinations */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Kashmir & Gulmarg Valley
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Kerala Backwaters & Munnar
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Leh Ladakh High Passes
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Royal Rajasthan Forts
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Goa Beaches & Cruises
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Darjeeling & Sikkim
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Rishikesh Yoga & Rafting
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-400 hover:text-gold-400 transition-colors">
                  Meghalaya Living Root Bridges
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Social Handles */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 mb-6">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-turquoise-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-turquoise-400 shrink-0" />
                <span>+91 98765 43210</span>
              </a>

              <a
                href="mailto:contact@marvelholidays.in"
                className="flex items-center gap-2 hover:text-gold-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>contact@marvelholidays.in</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Connaught Place, New Delhi, India</span>
              </div>
            </div>

            {/* Official Instagram Handle Button */}
            <a
              href="https://www.instagram.com/marvel_holidays.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@marvel_holidays.official</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MARVEL HOLIDAYS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#home" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </a>
            <span className="text-slate-700">•</span>
            <a href="#home" className="hover:text-slate-300 transition-colors">
              Travel Insurance Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

