import React from 'react';
import { CheckCircle, Calendar, Users, MapPin, MessageCircle, X, ShieldAlert } from 'lucide-react';
import { BookingFormData } from '../types';
import { MarvelLogo } from './MarvelLogo';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg bg-[#0d0d14] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 text-center text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Logo & Icon */}
        <div className="mb-4 flex flex-col items-center">
          <MarvelLogo size="sm" />
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center mt-3 shadow-md">
            <CheckCircle className="w-7 h-7 text-emerald-400 stroke-[2.5]" />
          </div>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-[#ED1D24] text-white font-mono font-bold text-xs uppercase tracking-wider inline-block mb-2">
          Enquiry Successfully Received
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          Thank You, {data.fullName}!
        </h3>

        <p className="text-xs text-zinc-300 mb-6">
          Your travel blueprint request has been assigned to our senior tour coordinator at Marvel Holidays.
        </p>

        {/* Booking Reference Box */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-left mb-6 space-y-2">
          <div className="flex justify-between items-center pb-2 border-b border-white/10">
            <span className="text-xs font-mono font-bold text-zinc-400">Reference ID</span>
            <span className="font-mono text-sm font-bold text-amber-400">{bookingRef}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Destination
            </span>
            <span className="font-bold text-white">{data.destination}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Users className="w-3.5 h-3.5 text-amber-400" /> Travellers
            </span>
            <span className="font-bold text-white">{data.travellers} Person(s)</span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Travel Date
            </span>
            <span className="font-bold text-white">{data.travelDate || 'Flexible Dates'}</span>
          </div>
        </div>

        {/* WhatsApp Direct Connect */}
        <a
          href={`https://wa.me/917867818790?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg mb-3 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Confirm Immediately via WhatsApp</span>
        </a>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-serif font-bold text-xs transition-colors"
        >
          Back to Website
        </button>
      </div>
    </div>
  );
};
