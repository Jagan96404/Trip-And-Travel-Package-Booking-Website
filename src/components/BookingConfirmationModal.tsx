import React from 'react';
import { CheckCircle, Calendar, Users, MapPin, MessageCircle, X, ShieldAlert } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle className="w-8 h-8 text-emerald-700 stroke-[2.5]" />
        </div>

        <span className="px-3.5 py-1 rounded-full bg-brand-gold text-white font-serif font-bold text-xs uppercase tracking-wider inline-block mb-2">
          Enquiry Successfully Received
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black mb-2">
          Thank You, {data.fullName}!
        </h3>

        <p className="text-xs text-gray-600 mb-6">
          Your travel blueprint request has been assigned to our senior destination curator.
        </p>

        {/* Booking Reference Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left mb-6 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-xs font-serif font-bold text-gray-500">Booking Reference</span>
            <span className="font-mono text-sm font-bold text-black">{bookingRef}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" /> Destination:
            </span>
            <span className="font-serif font-bold text-black">{data.destination}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Users className="w-3.5 h-3.5 text-brand-gold" /> Travellers:
            </span>
            <span className="font-serif font-bold text-black">{data.travellers} Person(s)</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Travel Date:
            </span>
            <span className="font-serif font-bold text-black">{data.travelDate || 'To be finalized'}</span>
          </div>
        </div>

        {/* Demo Disclaimer */}
        <div className="flex items-start gap-2 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-left text-xs mb-6">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Demo Notice:</strong> This is a booking inquiry submission. Official tickets & confirmed room allocations are processed following phone/WhatsApp consultation.
          </span>
        </div>

        {/* WhatsApp & Call Action Buttons */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp Directly</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-xs"
          >
            Done & Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};
