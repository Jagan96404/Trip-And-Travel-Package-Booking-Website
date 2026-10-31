import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { MapPin, Sparkles, ArrowRight, Calendar, IndianRupee } from 'lucide-react';

interface InteractiveMapProps {
  onSelectDestination: (destination: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  // Map markers positions normalized across SVG viewBox (0 0 800 900)
  const mapHotspots = [
    { destId: 'kashmir', x: 260, y: 110, label: 'Kashmir' },
    { destId: 'ladakh', x: 330, y: 100, label: 'Ladakh' },
    { destId: 'manali', x: 300, y: 160, label: 'Manali' },
    { destId: 'shimla', x: 310, y: 195, label: 'Shimla' },
    { destId: 'delhi', x: 300, y: 270, label: 'Delhi' },
    { destId: 'rishikesh', x: 340, y: 240, label: 'Rishikesh' },
    { destId: 'jaipur', x: 250, y: 310, label: 'Jaipur' },
    { destId: 'agra', x: 325, y: 300, label: 'Agra' },
    { destId: 'jaisalmer', x: 160, y: 320, label: 'Jaisalmer' },
    { destId: 'udaipur', x: 220, y: 380, label: 'Udaipur' },
    { destId: 'mumbai', x: 210, y: 530, label: 'Mumbai' },
    { destId: 'lonavala', x: 235, y: 545, label: 'Lonavala' },
    { destId: 'goa', x: 230, y: 640, label: 'Goa' },
    { destId: 'coorg', x: 270, y: 720, label: 'Coorg' },
    { destId: 'ooty', x: 290, y: 750, label: 'Ooty' },
    { destId: 'munnar', x: 300, y: 780, label: 'Munnar' },
    { destId: 'kerala-backwaters', x: 285, y: 810, label: 'Alleppey' },
    { destId: 'kanyakumari', x: 310, y: 870, label: 'Kanyakumari' },
    { destId: 'darjeeling', x: 570, y: 320, label: 'Darjeeling' },
    { destId: 'sikkim', x: 580, y: 290, label: 'Sikkim' },
    { destId: 'meghalaya', x: 650, y: 340, label: 'Meghalaya' },
    { destId: 'assam', x: 690, y: 310, label: 'Assam' },
    { destId: 'pondicherry', x: 360, y: 740, label: 'Pondicherry' },
  ];

  const [activeDestId, setActiveDestId] = useState<string>('kashmir');
  const activeDest = DESTINATIONS.find((d) => d.id === activeDestId) || DESTINATIONS[0];

  return (
    <section id="interactive-map" className="py-24 relative overflow-hidden bg-navy-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Exploration</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-turquoise-400 to-emerald-400">India Map</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Click on any destination pin on the map to explore travel highlights, best seasons to visit, and instant booking details.
          </p>
        </div>

        {/* Map & Card Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Vector India Map */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[560px] aspect-[800/900] glass-card rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden">
              {/* Atmospheric Background Mesh */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.06)_0%,transparent_75%)]" />

              <svg
                viewBox="0 0 800 900"
                className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#111C3A" />
                    <stop offset="50%" stop-color="#0B132B" />
                    <stop offset="100%" stop-color="#070E20" />
                  </linearGradient>
                  <linearGradient id="pinGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFE699" />
                    <stop offset="100%" stop-color="#FFB703" />
                  </linearGradient>
                  <linearGradient id="pinCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#5FFBF1" />
                    <stop offset="100%" stop-color="#00F0FF" />
                  </linearGradient>
                </defs>

                {/* Stylized Silhouette Contour of Indian Subcontinent */}
                <path
                  d="M 280 60 
                     C 320 50, 360 80, 380 120 
                     C 400 160, 440 210, 460 250
                     C 500 240, 560 250, 600 270
                     C 660 280, 720 290, 750 320
                     C 760 360, 720 400, 680 390
                     C 630 380, 590 370, 560 410
                     C 540 440, 510 490, 480 540
                     C 450 600, 420 660, 390 730
                     C 360 780, 340 830, 310 880
                     C 280 840, 260 770, 240 700
                     C 220 620, 210 540, 200 480
                     C 190 420, 160 360, 140 310
                     C 160 260, 180 220, 210 170
                     C 230 130, 250 80, 280 60 Z"
                  fill="url(#mapGradient)"
                  stroke="#1E3A5F"
                  strokeWidth="2.5"
                />

                {/* Latitude and Longitude Grid Lines */}
                <path d="M 100 250 L 750 250" stroke="rgba(0, 240, 255, 0.08)" strokeDasharray="4 4" />
                <path d="M 100 500 L 750 500" stroke="rgba(0, 240, 255, 0.08)" strokeDasharray="4 4" />
                <path d="M 100 750 L 750 750" stroke="rgba(0, 240, 255, 0.08)" strokeDasharray="4 4" />
                <path d="M 300 80 L 300 880" stroke="rgba(0, 240, 255, 0.08)" strokeDasharray="4 4" />
                <path d="M 500 80 L 500 880" stroke="rgba(0, 240, 255, 0.08)" strokeDasharray="4 4" />

                {/* Animated Flight Connection Lines between Major Hubs */}
                <path
                  d="M 300 270 Q 280 190 260 110"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  opacity="0.4"
                />
                <path
                  d="M 300 270 Q 255 400 210 530"
                  fill="none"
                  stroke="#FFB703"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  opacity="0.4"
                />
                <path
                  d="M 210 530 Q 250 670 285 810"
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  opacity="0.4"
                />

                {/* Destination Markers */}
                {mapHotspots.map((spot) => {
                  const isSelected = spot.destId === activeDestId;
                  return (
                    <g
                      key={spot.destId}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setActiveDestId(spot.destId)}
                    >
                      {/* Outer pulse when selected */}
                      {isSelected && (
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r="18"
                          fill="none"
                          stroke="#00F0FF"
                          strokeWidth="2"
                          opacity="0.8"
                          className="animate-ping"
                        />
                      )}

                      {/* Halo ring */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isSelected ? 10 : 6}
                        fill={isSelected ? '#00F0FF' : '#FFB703'}
                        fillOpacity={isSelected ? 0.3 : 0.2}
                        stroke={isSelected ? '#00F0FF' : '#FFB703'}
                        strokeWidth="1.5"
                      />

                      {/* Center solid pin */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isSelected ? 6 : 3.5}
                        fill={isSelected ? 'url(#pinCyan)' : 'url(#pinGold)'}
                      />

                      {/* Destination Label */}
                      <text
                        x={spot.x}
                        y={spot.y - 12}
                        textAnchor="middle"
                        fontSize={isSelected ? '14' : '11'}
                        fontWeight={isSelected ? '700' : '500'}
                        fill={isSelected ? '#00F0FF' : '#CBD5E1'}
                        className="pointer-events-none select-none tracking-wider"
                      >
                        {spot.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-4 left-4 text-[11px] text-slate-400 bg-navy-950/80 px-3 py-1 rounded-full border border-slate-800">
                Tap any marker to explore
              </div>
            </div>
          </div>

          {/* Right: Active Destination Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl overflow-hidden border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative">
              <div className="relative h-64 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden">
                <img
                  src={activeDest.image}
                  alt={activeDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider">
                    {activeDest.region}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-navy-900/90 text-slate-200 text-xs font-medium">
                    {activeDest.state}
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between">
                  <h3 className="font-serif text-3xl font-bold text-white">
                    {activeDest.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Starting From</span>
                    <span className="font-serif text-2xl font-extrabold text-gold-400">
                      ₹{activeDest.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-turquoise-400 text-sm font-semibold mb-2">
                {activeDest.tagline}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {activeDest.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    Best Time to Visit
                  </span>
                  <span className="text-xs font-semibold text-slate-200 block truncate">
                    {activeDest.bestTime}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/60 border border-slate-800">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-turquoise-400" />
                    Popular For
                  </span>
                  <span className="text-xs font-semibold text-slate-200 block truncate">
                    {activeDest.popularFor}
                  </span>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Attractions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDest.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-navy-800/80 border border-slate-700 text-xs text-slate-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectDestination(activeDest)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-turquoise-500 via-cyan-400 to-teal-400 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
              >
                <span>View Full {activeDest.name} Package Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

