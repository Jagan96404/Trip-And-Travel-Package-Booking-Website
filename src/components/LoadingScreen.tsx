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
          setTimeout(() => setFade(true), 200);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-turquoise-500/10 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gold-500/10 blur-[100px] pointer-events-none" />

      {/* Brand Medallion Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border border-gold-500/40 p-2 relative flex items-center justify-center bg-navy-900/60 shadow-[0_0_40px_rgba(255,183,3,0.25)]">
            <div className="w-full h-full rounded-full border border-turquoise-500/30 border-dashed animate-spin-slow flex items-center justify-center">
              <Compass className="w-10 h-10 text-gold-400" />
            </div>
            <Sparkles className="w-4 h-4 text-turquoise-400 absolute -top-1 -right-1 animate-ping" />
          </div>
        </div>

        {/* Brand Name Typography */}
        <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-500 mb-1">
          MARVEL
        </h1>
        <p className="font-display text-sm tracking-[0.45em] text-turquoise-400 font-semibold mb-6">
          HOLIDAYS
        </p>

        {/* Tagline */}
        <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8">
          Discover India • Experience Wonder
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-navy-800/80 rounded-full overflow-hidden border border-slate-700/50 p-0.5 relative">
          <div
            className="h-full bg-gradient-to-r from-turquoise-500 via-gold-500 to-turquoise-400 rounded-full transition-all duration-150 shadow-[0_0_12px_rgba(0,240,255,0.6)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <span className="text-xs font-mono text-slate-400 mt-3">{Math.min(progress, 100)}%</span>
      </div>
    </div>
  );
};

