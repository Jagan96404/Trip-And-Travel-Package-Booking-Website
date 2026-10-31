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
      setIsScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-gradient-to-b from-navy-950/90 via-navy-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-500/60 p-1.5 flex items-center justify-center bg-navy-900/80 shadow-[0_0_20px_rgba(255,183,3,0.2)] group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-full h-full text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-white leading-none group-hover:text-gold-300 transition-colors">
                MARVEL
              </span>
              <span className="font-display text-[10px] sm:text-xs font-semibold tracking-[0.35em] text-turquoise-400 leading-tight">
                HOLIDAYS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-turquoise-400 transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-turquoise-400 to-gold-400 transition-all duration-300 group-hover:w-full" />
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
              className="p-2 rounded-full border border-slate-700/60 text-slate-300 hover:text-pink-400 hover:border-pink-500/40 bg-navy-900/40 backdrop-blur-sm transition-all duration-300 hover:scale-110"
              title="@marvel_holidays.official"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Quick Hotline Call */}
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-navy-900/60 border border-slate-800"
            >
              <Phone className="w-3.5 h-3.5 text-turquoise-400" />
              <span>+91 98765 43210</span>
            </a>

            {/* Plan Your Trip Highlight Button */}
            <button
              onClick={onOpenTripPlanner}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-semibold rounded-full group bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 shadow-[0_0_20px_rgba(255,183,3,0.3)] hover:shadow-[0_0_30px_rgba(255,183,3,0.5)] transition-all duration-300"
            >
              <span className="relative px-4 sm:px-5 py-2 transition-all ease-in duration-200 bg-navy-950 rounded-full group-hover:bg-opacity-0 flex items-center gap-2 text-gold-300 group-hover:text-navy-950 font-bold">
                <span>Plan Your Trip</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onOpenTripPlanner}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-bold text-xs"
            >
              Plan Trip
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-900/80 border border-slate-700 text-slate-200 hover:text-turquoise-400"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-turquoise-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            <div className="h-px bg-slate-800 my-2" />

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://www.instagram.com/marvel_holidays.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-pink-400 font-medium"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@marvel_holidays.official</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-turquoise-400 font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold text-center shadow-lg"
            >
              Quick Booking Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

