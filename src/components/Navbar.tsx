import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Compass, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './InstagramIcon';

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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name in Times New Roman Black */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-brand-gold p-1.5 flex items-center justify-center bg-white shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-full h-full text-brand-gold group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-widest text-black leading-none">
                MARVEL
              </span>
              <span className="font-serif text-[11px] sm:text-xs font-bold tracking-[0.3em] text-brand-gold leading-tight">
                HOLIDAYS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links in Times New Roman Black */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-serif text-sm font-bold text-gray-800 hover:text-black hover:border-b-2 hover:border-black transition-all duration-200 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/marvel_holidays.official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Marvel Holidays Instagram"
              className="p-2 rounded-full border border-slate-300 text-gray-700 hover:text-black hover:border-black bg-white shadow-sm transition-all duration-300 hover:scale-110"
              title="@marvel_holidays.official"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Quick Hotline Call */}
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-2 text-xs font-bold font-serif text-black px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>+91 98765 43210</span>
            </a>

            {/* Plan Your Trip Highlight Button */}
            <button
              onClick={onOpenTripPlanner}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>Plan Your Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenTripPlanner}
              className="px-3.5 py-1.5 rounded-full bg-black text-white font-serif font-bold text-xs"
            >
              Plan Trip
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-black"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-base font-bold text-black hover:text-brand-gold transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            <div className="h-px bg-slate-200 my-2" />

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-black font-serif font-bold"
              >
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <span>@marvel_holidays.official</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-black font-serif font-bold"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Us</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-black text-white font-serif font-bold text-center shadow-md"
            >
              Quick Booking Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
