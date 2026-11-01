import React, { useState } from 'react';
import { Phone, Mail, MapPin, Check, Heart } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { MarvelLogo } from './MarvelLogo';

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
    <footer className="bg-[#050507] border-t border-white/10 pt-16 pb-12 relative text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Tagline & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            {/* Official Marvel Logo */}
            <MarvelLogo size="lg" />

            <p className="text-amber-400 font-mono text-sm font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span>Assemble Your Next Adventure</span>
              <Heart className="w-3.5 h-3.5 fill-[#ED1D24] text-[#ED1D24]" />
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India’s premier travel specialist. Crafting high-energy School & College Industrial Visits (IV), Corporate retreats, Family holidays, Honeymoons, and Devotional Yatras across 27+ iconic destinations.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                Subscribe for Exclusive Offers & Travel Alerts
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ED1D24]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-xs shrink-0 transition-colors shadow-md"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </form>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 font-bold mt-1.5 block">
                  ✓ Welcome to Marvel Holidays VIP travel club!
                </span>
              )}
            </div>
          </div>

          {/* Col 3: Specializations */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Specialized Tours
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li className="hover:text-white transition-colors">🎒 School Excursions</li>
              <li className="hover:text-white transition-colors">🎓 College IV Trips</li>
              <li className="hover:text-white transition-colors">💼 Corporate Offsites</li>
              <li className="hover:text-white transition-colors">♦️ Family Vacations</li>
              <li className="hover:text-white transition-colors">♦️ Devotional Yatras</li>
              <li className="hover:text-white transition-colors">♦️ Honeymoon Escapes</li>
              <li className="hover:text-white transition-colors">♦️ Adventure Treks</li>
            </ul>
          </div>

          {/* Col 4: Popular Circuits */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Kashmir & Gulmarg Valley
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Kerala Backwaters & Munnar
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Leh Ladakh High Passes
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Royal Rajasthan Forts
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Goa Coastal & Catamarans
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Ooty & Kodaikanal
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-amber-400 transition-colors">
                  Varanasi & Ayodhya Yatra
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Social Handles */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300 mb-6 font-medium">
              <a
                href="tel:7867818790"
                className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="font-mono font-bold text-white text-sm">7867818790</span>
              </a>

              <a
                href="mailto:marvelholidaysandtours@gmail.com"
                className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="truncate max-w-[200px]">marvelholidaysandtours@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                </div>
                <span className="text-zinc-400 text-xs">All-India Tour & Travel Operations</span>
              </div>
            </div>

            {/* Official Instagram Handle Button */}
            <a
              href="https://www.instagram.com/marvel_holidays.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white font-serif font-bold text-xs shadow-lg transition-all hover:scale-105"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>@marvel_holidays.official</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal, Privacy & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MARVEL HOLIDAYS • Tours & Travels. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#home" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <span>•</span>
            <a href="tel:7867818790" className="text-amber-400 font-bold hover:underline">
              Call: 7867818790
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
