import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { BookingFormData } from '../types';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { InstagramIcon } from './InstagramIcon';
import { MarvelLogo } from './MarvelLogo';

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

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ED1D24', '#B48A3C', '#10B981', '#FFFFFF'],
        });
      } catch (err) {
        // ignore if blocked
      }
    }, 800);
  };

  const whatsappDirectUrl = `https://wa.me/917867818790?text=${encodeURIComponent(
    `Hello Marvel Holidays! I want to enquire about holiday packages (School/College IV trips, Corporate, Family, Devotional). Please share details.`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#050507] border-t border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Assemble Your Next Adventure
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Contact & Custom Bookings
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Have a custom dream trip, college IV, school tour, corporate offsite, or family vacation in mind? Contact our travel directors for personalized proposals.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info, WhatsApp & Instagram */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e0e14] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <MarvelLogo size="md" />
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Online 24/7
                </span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Connect directly with our tour planners for instant quotes, customized itineraries, hotel bookings, and travel assistance.
              </p>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/30 transition-all active:scale-95 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant WhatsApp Enquiry: 7867818790</span>
              </a>

              {/* Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:7867818790"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-amber-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-medium">Direct Booking Desk & Calls</span>
                    <span className="font-mono text-base font-bold text-white">7867818790</span>
                  </div>
                </a>

                <a
                  href="mailto:marvelholidaysandtours@gmail.com"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-amber-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-medium">Official Email Address</span>
                    <span className="text-xs sm:text-sm font-semibold text-white break-all">
                      marvelholidaysandtours@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/marvel_holidays.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-pink-500 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-medium">Follow & DM on Instagram</span>
                    <span className="text-sm font-bold text-white">
                      @marvel_holidays.official
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block font-medium">Operational Support</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-white">
                      Monday – Sunday: 24/7 All-India Travel Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Preview */}
            <div className="bg-[#0e0e14] rounded-3xl p-4 border border-white/10 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-serif font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  All-India Operations
                </span>
                <span className="text-[11px] text-zinc-400 font-mono">Incredible India</span>
              </div>
              <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 relative">
                <iframe
                  title="Marvel Holidays HQ Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887399856!2d77.2149526!3d28.6327435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b9278783%3A0x6b77ea8c38622f9!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale invert contrast-125"
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e0e14] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Custom Booking & Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Tell us your preferences. No payment required upfront — receive your tailored quote and availability confirmation first.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full p-3.5 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-[#ED1D24]'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3.5 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-white/10 focus:border-[#ED1D24]'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 7867818790"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3.5 rounded-xl bg-zinc-900 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-white/10 focus:border-[#ED1D24]'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Dream Destination *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#ED1D24]"
                    >
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name} className="bg-zinc-900 text-white">
                          {d.name} ({d.region})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Package Type & Travellers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Trip Category
                    </label>
                    <select
                      value={formData.packageType}
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#ED1D24]"
                    >
                      <option className="bg-zinc-900 text-white">🎒 School Excursion</option>
                      <option className="bg-zinc-900 text-white">🎓 College IV Trip</option>
                      <option className="bg-zinc-900 text-white">💼 Corporate Offsite</option>
                      <option className="bg-zinc-900 text-white">♦️ Family Holidays</option>
                      <option className="bg-zinc-900 text-white">♦️ Devotional Yatra</option>
                      <option className="bg-zinc-900 text-white">Honeymoon Packages</option>
                      <option className="bg-zinc-900 text-white">Adventure Trips</option>
                      <option className="bg-zinc-900 text-white">Weekend Getaways</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Number of Travellers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={formData.travellers}
                      onChange={(e) => setFormData({ ...formData, travellers: parseInt(e.target.value) || 1 })}
                      className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#ED1D24]"
                    />
                  </div>
                </div>

                {/* Dates & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Approximate Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#ED1D24]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                      Budget Expectation
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-[#ED1D24]"
                    >
                      <option className="bg-zinc-900 text-white">Budget (Under ₹15,000 / person)</option>
                      <option className="bg-zinc-900 text-white">Standard (₹15,000 - ₹30,000 / person)</option>
                      <option className="bg-zinc-900 text-white">Premium (₹30,000 - ₹50,000 / person)</option>
                      <option className="bg-zinc-900 text-white">Luxury & VIP (₹50,000+ / person)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="text-xs font-serif font-bold text-zinc-200 block mb-1.5">
                    Special Requirements / Group Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about special requests (e.g. College department, number of students, Jain/veg food, 5-star hotel, tempo traveller, industrial visit permission needed)..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ED1D24]"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry & Get Free Itinerary'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmedData && (
        <BookingConfirmationModal
          data={confirmedData}
          bookingRef={bookingRef}
          onClose={() => setConfirmedData(null)}
        />
      )}
    </section>
  );
};
