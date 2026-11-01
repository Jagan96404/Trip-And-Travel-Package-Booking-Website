import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';
import { MarvelLogo } from './MarvelLogo';

interface NavbarProps {
  onOpenTripPlanner: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTripPlanner, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Holiday Packages', href: '#packages' },
    { label: 'Interactive Map', href: '#interactive-map' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Contact & Social Bar (Matches Brand Screenshot) */}
      <div className="bg-[#050507] border-b border-white/10 text-white/90 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Tagline / Segments */}
          <div className="hidden md:flex items-center gap-2 text-zinc-300">
            <span className="text-[#ED1D24] font-bold">📍 Assemble Your Next Adventure ❤️‍🔥</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">🎒 School</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">🎓 College IV</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">💼 Corporate</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">♦️ Family</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">♦️ Devotional</span>
          </div>

          {/* Direct Contact Links */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto font-medium">
            <a 
              href="tel:7867818790" 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              title="Call Marvel Holidays"
            >
              <div className="w-5 h-5 rounded-full border border-amber-400/60 bg-amber-400/10 flex items-center justify-center">
                <Phone className="w-2.5 h-2.5 text-amber-400" />
              </div>
              <span className="font-mono font-bold text-white tracking-wide">7867818790</span>
            </a>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            <a 
              href="mailto:marvelholidaysandtours@gmail.com" 
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              title="Email Marvel Holidays"
            >
              <div className="w-5 h-5 rounded-full border border-amber-400/60 bg-amber-400/10 flex items-center justify-center">
                <Mail className="w-2.5 h-2.5 text-amber-400" />
              </div>
              <span className="text-zinc-300 truncate max-w-[200px] lg:max-w-none">
                marvelholidaysandtours@gmail.com
              </span>
            </a>

            <span className="text-zinc-700">|</span>

            <a 
              href="https://www.instagram.com/marvel_holidays.official/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
              title="Follow on Instagram"
            >
              <div className="w-5 h-5 rounded-full border border-amber-400/60 bg-amber-400/10 flex items-center justify-center">
                <InstagramIcon className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-zinc-200">marvel_holidays.official</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5'
            : 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Official Marvel Holidays Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <MarvelLogo size="md" />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-serif text-sm font-bold text-zinc-300 hover:text-white hover:border-b-2 hover:border-[#ED1D24] transition-all duration-200 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp / Call Enquiry */}
              <a
                href="https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20would%20like%20to%20enquire%20about%20a%20holiday%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold font-serif text-white px-4 py-2.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/40 shadow-sm transition-all"
              >
                <span>WhatsApp: 7867818790</span>
              </a>

              {/* Plan Your Trip Highlight Button */}
              <button
                onClick={onOpenTripPlanner}
                className="px-5 py-2.5 rounded-full bg-[#ED1D24] hover:bg-[#c9181e] text-white font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95 hover:scale-105"
              >
                <span>Plan Your Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenTripPlanner}
                className="px-3.5 py-1.5 rounded-full bg-[#ED1D24] text-white font-serif font-bold text-xs"
              >
                Plan Trip
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer in Pure Dark Theme */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl text-white animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-3">
            {/* Quick Segment Highlights */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 space-y-1">
              <p className="font-bold text-[#ED1D24]">📍 Assemble Your Next Adventure</p>
              <p className="text-[11px] text-zinc-400">School • College IV • Corporate • Family • Devotional</p>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-base font-bold text-zinc-200 hover:text-amber-400 transition-colors py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}

            {/* Direct Contact Links in Mobile Menu */}
            <div className="pt-3 space-y-2 text-xs">
              <a
                href="tel:7867818790"
                className="flex items-center gap-2 text-white font-bold py-1.5"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: 7867818790</span>
              </a>

              <a
                href="mailto:marvelholidaysandtours@gmail.com"
                className="flex items-center gap-2 text-zinc-300 py-1"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="truncate">marvelholidaysandtours@gmail.com</span>
              </a>

              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-200 py-1"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@marvel_holidays.official</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-3 py-3 rounded-xl bg-[#ED1D24] text-white font-serif font-bold text-center shadow-lg hover:bg-red-700"
            >
              Quick Booking Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
