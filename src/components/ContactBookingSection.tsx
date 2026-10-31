import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { BookingFormData } from '../types';
import { BookingConfirmationModal } from './BookingConfirmationModal';

interface ContactBookingSectionProps {
  initialDestination?: string;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({
  initialDestination = '',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    destination: initialDestination || 'Kashmir',
    departureCity: 'Delhi',
    travelDate: '',
    travellers: 2,
    budget: '₹20,000 - ₹40,000 / Person',
    packageType: 'Family Holidays',
    specialRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState<BookingFormData | null>(null);
  const [bookingRef, setBookingRef] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.destination) errs.destination = 'Please select a destination';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `MH-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedRef);
      setConfirmedData({ ...formData });
      setIsSubmitting(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00F0FF', '#FFB703', '#38EF7D', '#FFFFFF'],
        });
      } catch (err) {
        // ignore if confetti blocked
      }
    }, 800);
  };

  const whatsappDirectUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Marvel Holidays! I want to enquire about holiday packages across India. Please share best offers and itinerary details.`
  )}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-navy-950">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-turquoise-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Connect With Us</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Plan Your Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Bookings</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Have a custom dream trip in mind or want to book an existing package? Fill out the details below and our travel designers will craft your personalized proposal.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info, WhatsApp & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Contact Marvel Holidays
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reach out directly via WhatsApp for rapid quotes, or call our customer happiness desk for immediate assistance.
              </p>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant Enquiry on WhatsApp</span>
              </a>

              {/* Contact Cards */}
              <div className="space-y-4 pt-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-turquoise-400/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-turquoise-500/10 flex items-center justify-center text-turquoise-400 group-hover:bg-turquoise-500 group-hover:text-navy-950 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Toll-Free Booking Desk</span>
                    <span className="text-sm font-bold text-white">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href="mailto:contact@marvelholidays.in"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800 hover:border-gold-400/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">General & Corporate Inquiries</span>
                    <span className="text-sm font-bold text-white">contact@marvelholidays.in</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Corporate Headquarters</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Marvel Holidays Tower, Connaught Place, New Delhi, India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-navy-900/60 border border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Operating Hours</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Monday – Sunday: 24/7 Travel Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Integration Embed */}
            <div className="glass-card rounded-3xl p-4 border border-slate-800 overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  Headquarters Location
                </span>
                <span className="text-[11px] text-turquoise-400 font-semibold">New Delhi, India</span>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-700/60 relative">
                <iframe
                  title="Marvel Holidays HQ Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887399856!2d77.2149526!3d28.6327435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b9278783%3A0x6b77ea8c38622f9!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Custom Booking & Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Tell us your preferences. No payment required upfront — receive your tailored quote and availability confirmation first.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Roy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-navy-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-turquoise-400'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-navy-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-turquoise-400'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-navy-900 border text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-turquoise-400'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Destination *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full p-3 rounded-xl bg-navy-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.region.split(' ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel Date & Number of Travellers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Target Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full p-3 rounded-xl bg-navy-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Travellers Count
                    </label>
                    <select
                      value={formData.travellers}
                      onChange={(e) => setFormData({ ...formData, travellers: Number(e.target.value) })}
                      className="w-full p-3 rounded-xl bg-navy-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple (2)' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Approx. Budget / Person
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-3 rounded-xl bg-navy-900 border border-slate-800 text-sm text-gold-300 focus:outline-none focus:border-turquoise-400 cursor-pointer"
                    >
                      <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                      <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000 (Popular)</option>
                      <option value="₹40,000 - ₹60,000">₹40,000 - ₹60,000 (Premium)</option>
                      <option value="₹60,000+">₹60,000+ (5-Star Luxury)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Special Requirements & Trip Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Honeymoon candle-light dinner, elderly-friendly vehicle, vegetarian meals, room with balcony view..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full p-3 rounded-xl bg-navy-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-turquoise-400 resize-none"
                  />
                </div>

                {/* Privacy & Guarantee note */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your privacy is 100% secured. We never spam or sell contact details.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-navy-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,183,3,0.4)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Your Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Booking & Travel Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Receipt Modal */}
      <BookingConfirmationModal
        data={confirmedData}
        bookingRef={bookingRef}
        onClose={() => setConfirmedData(null)}
      />
    </section>
  );
};

