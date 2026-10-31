import React, { useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFade(true), 150);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-brand-gold p-2 relative flex items-center justify-center bg-white shadow-luxury">
            <div className="w-full h-full rounded-full border border-black border-dashed animate-spin-slow flex items-center justify-center">
              <Compass className="w-10 h-10 text-brand-gold" />
            </div>
            <Sparkles className="w-4 h-4 text-black absolute -top-1 -right-1" />
          </div>
        </div>

        {/* Brand Name Typography in Times New Roman Black */}
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-black text-black mb-1">
          MARVEL
        </h1>
        <p className="font-serif text-sm tracking-[0.45em] text-brand-gold font-bold mb-6">
          HOLIDAYS
        </p>

        {/* Tagline */}
        <p className="text-gray-500 font-serif text-xs sm:text-sm tracking-widest uppercase mb-8">
          Discover India • Experience Wonder
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5 relative">
          <div
            className="h-full bg-black rounded-full transition-all duration-150"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-black mt-3">{Math.min(progress, 100)}%</span>
      </div>
    </div>
  );
};
