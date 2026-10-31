import React from 'react';
import { CheckCircle, Calendar, Users, MapPin, Phone, MessageCircle, X, ShieldAlert } from 'lucide-react';
import { BookingFormData } from '../types';

interface BookingConfirmationModalProps {
  data: BookingFormData | null;
  bookingRef: string;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  data,
  bookingRef,
  onClose,
}) => {
  if (!data) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Marvel Holidays! I just submitted an inquiry for ${data.destination}.\nReference ID: ${bookingRef}\nName: ${data.fullName}\nDates: ${data.travelDate || 'Flexible'}\nTravellers: ${data.travellers}\nBudget: ${data.budget}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg glass-card rounded-3xl border border-gold-500/50 shadow-2xl p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-navy-900 border border-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-turquoise-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          <CheckCircle className="w-8 h-8 text-navy-950 stroke-[2.5]" />
        </div>

        <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 font-bold text-xs uppercase tracking-wider inline-block mb-2">
          Enquiry Successfully Received
        </span>

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Thank You, {data.fullName}!
        </h3>

        <p className="text-xs text-slate-300 mb-6">
          Your travel blueprint request has been assigned to our senior destination curator.
        </p>

        {/* Booking Reference Box */}
        <div className="p-4 rounded-2xl bg-navy-900/90 border border-slate-700 text-left mb-6 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">Booking Reference</span>
            <span className="font-mono text-sm font-bold text-turquoise-400">{bookingRef}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-gold-400" /> Destination:
            </span>
            <span className="font-semibold text-white">{data.destination}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Users className="w-3.5 h-3.5 text-turquoise-400" /> Travellers:
            </span>
            <span className="font-semibold text-white">{data.travellers} Person(s)</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Travel Date:
            </span>
            <span className="font-semibold text-white">{data.travelDate || 'To be finalized'}</span>
          </div>
        </div>

        {/* Important notice / Demo Disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-left text-xs mb-6">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Notice:</strong> This is a booking inquiry submission. Official tickets & confirmed room allocations are processed following phone/WhatsApp consultation.
          </span>
        </div>

        {/* WhatsApp & Call Direct Action Buttons */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp Directly</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 text-xs font-semibold hover:text-white"
          >
            Done & Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};

