import React from 'react';

interface MarvelLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const MarvelLogo: React.FC<MarvelLogoProps> = ({ 
  className = '', 
  size = 'md',
  showTagline = false 
}) => {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24'
  };

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className={`flex items-center select-none ${sizeClasses[size]}`}>
        {/* Crisp Image Logo */}
        <img 
          src="./marvel-logo.png" 
          alt="MARVEL HOLIDAYS" 
          className="h-full w-auto object-contain drop-shadow-[0_2px_12px_rgba(237,29,36,0.3)]"
          onError={(e) => {
            // Fallback to pure HTML/CSS representation if image not loaded
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />

        {/* High-fidelity CSS/SVG Fallback */}
        <div className="hidden items-center h-full">
          {/* MARVEL Red Block */}
          <div className="bg-[#ED1D24] px-3.5 py-1.5 flex items-center justify-center rounded-xs shadow-md">
            <span className="text-white font-sans font-black tracking-tighter text-xl sm:text-2xl leading-none uppercase">
              MARVEL
            </span>
          </div>
          {/* HOLIDAYS Box with top & bottom borders */}
          <div className="border-t-2 border-b-2 border-white px-3 py-1 flex items-center justify-center ml-1">
            <span className="text-white font-sans font-extrabold tracking-widest text-lg sm:text-xl leading-none uppercase">
              HOLIDAYS
            </span>
          </div>
        </div>
      </div>

      {showTagline && (
        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-400 uppercase mt-1">
          Assemble Your Next Adventure
        </span>
      )}
    </div>
  );
};

