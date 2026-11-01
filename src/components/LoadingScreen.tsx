import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MarvelLogo } from './MarvelLogo';

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
        return prev + Math.floor(Math.random() * 10) + 6;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-white transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Official Marvel Logo */}
        <div className="mb-6 transform hover:scale-105 transition-transform">
          <MarvelLogo size="xl" />
        </div>

        {/* Tagline from Brand Profile */}
        <p className="text-amber-400 font-mono text-xs sm:text-sm tracking-wider uppercase mb-8 flex items-center gap-1.5">
          <span>Assemble Your Next Adventure</span>
          <Heart className="w-3.5 h-3.5 fill-[#ED1D24] text-[#ED1D24]" />
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/15 p-0.5 relative">
          <div
            className="h-full bg-[#ED1D24] rounded-full transition-all duration-150 shadow-[0_0_10px_#ED1D24]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-64 text-[11px] font-mono text-zinc-500">
          <span>Tours & Travels</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
