import React, { useState } from 'react';
import { Compass, Phone, Mail, MapPin, Check } from 'lucide-react';
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
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1 & 2: Brand & Tagline & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-brand-gold p-1.5 flex items-center justify-center bg-white shadow-sm">
                <Compass className="w-full h-full text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black tracking-widest text-black">
                  MARVEL
                </span>
                <span className="font-serif text-xs font-bold tracking-[0.3em] text-brand-gold">
                  HOLIDAYS
                </span>
              </div>
            </div>

            <p className="text-black font-serif text-sm font-bold tracking-widest uppercase">
              Discover India. Experience Wonder.
            </p>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              India’s premier luxury travel designer. Delivering unforgettable journeys, handcrafted itineraries, and 5-star hospitality across 27+ iconic destinations.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-black block mb-2">
                Subscribe for Exclusive Deals & Travel Guides
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs shrink-0 transition-colors"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
                  ✓ Welcome to Marvel Holidays VIP travel club!
                </span>
              )}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-sm font-bold text-black uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif font-bold">
              <li>
                <a href="#home" className="text-gray-600 hover:text-black transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-black transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#packages" className="text-gray-600 hover:text-black transition-colors">
                  Holiday Packages
                </a>
              </li>
              <li>
                <a href="#planner" className="text-gray-600 hover:text-black transition-colors">
                  Smart Trip Planner
                </a>
              </li>
              <li>
                <a href="#interactive-map" className="text-gray-600 hover:text-black transition-colors">
                  Interactive India Map
                </a>
              </li>
              <li>
                <a href="#experiences" className="text-gray-600 hover:text-black transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-600 hover:text-black transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-black transition-colors">
                  About Marvel Holidays
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-black transition-colors">
                  Contact & Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Destinations */}
          <div>
            <h4 className="font-serif text-sm font-bold text-black uppercase tracking-wider mb-4">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-serif font-bold">
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Kashmir & Gulmarg Valley
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Kerala Backwaters & Munnar
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Leh Ladakh High Passes
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Royal Rajasthan Forts
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Goa Beaches & Cruises
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Darjeeling & Sikkim
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Rishikesh Yoga & Rafting
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-600 hover:text-brand-gold transition-colors">
                  Meghalaya Living Root Bridges
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Social Handles */}
          <div>
            <h4 className="font-serif text-sm font-bold text-black uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 mb-6 font-medium">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="font-serif font-bold text-black">+91 98765 43210</span>
              </a>

              <a
                href="mailto:contact@marvelholidays.in"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>contact@marvelholidays.in</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Connaught Place, New Delhi, India</span>
              </div>
            </div>

            {/* Official Instagram Handle Button */}
            <a
              href="https://www.instagram.com/marvel_holidays.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>@marvel_holidays.official</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-serif">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MARVEL HOLIDAYS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#home" className="hover:text-black transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="#home" className="hover:text-black transition-colors">
              Travel Insurance Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
