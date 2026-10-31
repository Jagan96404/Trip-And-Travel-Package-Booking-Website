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

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000000', '#B48A3C', '#10B981', '#FFFFFF'],
        });
      } catch (err) {
        // ignore if blocked
      }
    }, 800);
  };

  const whatsappDirectUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Marvel Holidays! I want to enquire about holiday packages across India. Please share best offers and itinerary details.`
  )}`;

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Plan Your Journey
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Contact & Bookings
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            Have a custom dream trip in mind or want to book an existing package? Fill out the details below and our travel designers will craft your personalized proposal.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info, WhatsApp & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-luxury space-y-6">
              <h3 className="font-serif text-2xl font-bold text-black">
                Contact Marvel Holidays
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Reach out directly via WhatsApp for rapid quotes, or call our customer happiness desk for immediate assistance.
              </p>

              {/* Direct WhatsApp CTA Button */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Instant Enquiry on WhatsApp</span>
              </a>

              {/* Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-black transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-medium">Toll-Free Booking Desk</span>
                    <span className="font-serif text-sm font-bold text-black">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href="mailto:contact@marvelholidays.in"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-black transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-medium">General & Corporate Inquiries</span>
                    <span className="font-serif text-sm font-bold text-black">contact@marvelholidays.in</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-medium">Corporate Headquarters</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-black">
                      Marvel Holidays Tower, Connaught Place, New Delhi, India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-black">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 block font-medium">Operating Hours</span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-black">
                      Monday – Sunday: 24/7 Travel Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Integration Embed */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 overflow-hidden shadow-luxury">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-serif font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  Headquarters Location
                </span>
                <span className="text-[11px] text-gray-600 font-bold">New Delhi, India</span>
              </div>
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 relative">
                <iframe
                  title="Marvel Holidays HQ Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114887399856!2d77.2149526!3d28.6327435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b9278783%3A0x6b77ea8c38622f9!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black mb-2">
                Custom Booking & Enquiry Form
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Tell us your preferences. No payment required upfront — receive your tailored quote and availability confirmation first.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Roy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-slate-50 border text-sm text-black placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-200 focus:border-black'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-slate-50 border text-sm text-black placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-black'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-slate-50 border text-sm text-black placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-black'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Destination *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer"
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
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Target Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Travellers Count
                    </label>
                    <select
                      value={formData.travellers}
                      onChange={(e) => setFormData({ ...formData, travellers: Number(e.target.value) })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple (2)' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-serif font-bold text-black block mb-1.5">
                      Approx. Budget / Person
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                      <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000</option>
                      <option value="₹40,000 - ₹60,000">₹40,000 - ₹60,000</option>
                      <option value="₹60,000+">₹60,000+ (5-Star Luxury)</option>
                    </select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="text-xs font-serif font-bold text-black block mb-1.5">
                    Special Requirements & Trip Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Honeymoon candle-light dinner, elderly-friendly vehicle, vegetarian meals, room with balcony view..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black resize-none"
                  />
                </div>

                {/* Privacy note */}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your privacy is 100% secured. We never share contact details.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-luxury transition-all active:scale-95 disabled:opacity-50"
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
