import React, { useEffect, useRef, useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles, ArrowRight, Calendar, IndianRupee } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
    initGoogleMap?: () => void;
  }
}

interface InteractiveMapProps {
  onSelectDestination: (destination: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Google Maps Dark Luxury Styling
  const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#121218' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#09090b' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#a1a1aa' }] },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#d4af37' }, { weight: 1.2 }],
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#3f3f46' }, { weight: 0.8 }],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#fbbf24' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#71717a' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#14231b' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#272738' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#181824' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#3f3f56' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#090e18' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#38bdf8' }],
    },
  ];

  // Initialize Google Map
  useEffect(() => {
    let checkInterval: any = null;

    const initMap = () => {
      if (!mapContainerRef.current || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 22.9734, lng: 78.6569 },
        zoom: 5,
        minZoom: 3,
        maxZoom: 18,
        disableDefaultUI: true,
        styles: darkMapStyle,
      });

      mapInstanceRef.current = map;
      infoWindowRef.current = new window.google.maps.InfoWindow();

      // Clear old markers
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      // Create Custom SVG Marker Icon
      const createPinIcon = (name: string) => ({
        url:
          'data:image/svg+xml;charset=UTF-8,' +
          encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 34 42">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.9"/>
              </filter>
            </defs>
            <path d="M17 0 C7.6 0 0 7.6 0 17 C0 27.5 17 42 17 42 C17 42 34 27.5 34 17 C34 7.6 26.4 0 17 0 Z" fill="#ED1D24" filter="url(#glow)"/>
            <circle cx="17" cy="16" r="10" fill="#09090b" stroke="#fbbf24" stroke-width="2"/>
            <circle cx="17" cy="16" r="4.5" fill="#fbbf24"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(30, 36),
        anchor: new window.google.maps.Point(15, 36),
      });

      // Add pins for all 27 destinations
      DESTINATIONS.forEach((dest) => {
        const marker = new window.google.maps.Marker({
          position: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
          map,
          title: dest.name,
          icon: createPinIcon(dest.name),
        });

        marker.addListener('click', () => {
          setSelectedDest(dest);

          const contentString = `
            <div style="background:#0c0c12; color:#ffffff; padding:12px; border-radius:14px; max-width:240px; font-family:'Plus Jakarta Sans',sans-serif; border:1px solid rgba(255,255,255,0.15);">
              <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:110px; object-fit:cover; border-radius:10px; margin-bottom:8px;" />
              <div style="font-family:'Times New Roman',serif; font-size:16px; font-weight:bold; color:#ffffff; margin-bottom:2px;">
                ${dest.name}
              </div>
              <div style="font-size:11px; color:#a1a1aa; margin-bottom:6px;">${dest.state} • ${dest.region}</div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-size:10px; color:#71717a;">Starting From</span>
                <span style="font-family:'Times New Roman',serif; font-size:15px; font-weight:bold; color:#fbbf24;">₹${dest.startingPrice.toLocaleString('en-IN')}</span>
              </div>
              <button id="gmap-book-${dest.id}" style="width:100%; background:#ED1D24; color:#ffffff; border:none; padding:7px 0; border-radius:8px; font-size:11px; font-weight:bold; cursor:pointer;">
                View Details & Book →
              </button>
            </div>
          `;

          infoWindowRef.current.setContent(contentString);
          infoWindowRef.current.open(map, marker);

          setTimeout(() => {
            const btn = document.getElementById(`gmap-book-${dest.id}`);
            if (btn) {
              btn.onclick = () => onSelectDestination(dest);
            }
          }, 100);
        });

        markersRef.current.push(marker);
      });

      setIsMapLoaded(true);
    };

    if (window.google?.maps) {
      initMap();
    } else {
      checkInterval = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(checkInterval);
          initMap();
        }
      }, 300);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [onSelectDestination]);

  // Toggle Map Type (Street vs Satellite)
  const toggleMapLayer = (type: 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    setMapStyle(type);

    if (type === 'satellite') {
      mapInstanceRef.current.setMapTypeId('hybrid');
    } else {
      mapInstanceRef.current.setMapTypeId('roadmap');
      mapInstanceRef.current.setOptions({ styles: darkMapStyle });
    }
  };

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1);
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1);
  };

  const handleReset = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setCenter({ lat: 22.9734, lng: 78.6569 });
    mapInstanceRef.current.setZoom(5);
  };

  const jumpToDestination = (dest: Destination) => {
    setSelectedDest(dest);
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.panTo({ lat: dest.coordinates.lat, lng: dest.coordinates.lng });
    mapInstanceRef.current.setZoom(8);

    const targetMarker = markersRef.current.find((m) => m.getTitle() === dest.name);
    if (targetMarker && infoWindowRef.current) {
      targetMarker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => targetMarker.setAnimation(null), 1400);
    }
  };

  return (
    <section id="interactive-map" className="py-24 bg-[#050507] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Maps Engine • All 27 Destinations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive India Explorer Map
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Powered by official Google Maps. Pan, zoom, and explore North, South, East, and West India with dark street styles, real satellite imagery, and verified real destination photography.
          </p>
        </div>

        {/* Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Google Maps Container */}
          <div className="lg:col-span-8 bg-[#0d0d14] p-3 rounded-3xl shadow-2xl border border-white/10 relative">
            {/* Map Controls Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-2 bg-zinc-900/90 rounded-2xl border border-white/10">
              {/* Layer switch buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleMapLayer('streets')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mapStyle === 'streets'
                      ? 'bg-[#ED1D24] text-white shadow-md'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Dark Street Map
                </button>
                <button
                  onClick={() => toggleMapLayer('satellite')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mapStyle === 'satellite'
                      ? 'bg-[#ED1D24] text-white shadow-md'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Google Satellite View
                </button>
              </div>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="w-8 h-8 rounded-xl bg-zinc-800 border border-white/10 text-white hover:bg-zinc-700 flex items-center justify-center font-bold"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="w-8 h-8 rounded-xl bg-zinc-800 border border-white/10 text-white hover:bg-zinc-700 flex items-center justify-center font-bold"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  title="Reset to India View"
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Center India</span>
                </button>
              </div>
            </div>

            {/* Google Map Canvas */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 z-10 bg-[#09090e]"
            >
              {!isMapLoaded && (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-3">
                  <div className="w-8 h-8 border-2 border-[#ED1D24] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono">Initializing Google Maps...</span>
                </div>
              )}
            </div>

            {/* Quick jump pills */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider shrink-0">
                Quick Jump:
              </span>
              {DESTINATIONS.slice(0, 12).map((d) => (
                <button
                  key={d.id}
                  onClick={() => jumpToDestination(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                    selectedDest.id === d.id
                      ? 'bg-[#ED1D24] text-white font-bold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/10'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Spotlight Card */}
          <div className="lg:col-span-4 bg-[#0d0d14] rounded-3xl p-6 shadow-2xl border border-white/10">
            <div className="relative h-60 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
                  {selectedDest.region}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/15">
                  {selectedDest.state}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-1">
              {selectedDest.name}
            </h3>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              {selectedDest.tagline}
            </p>

            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
              {selectedDest.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 bg-zinc-900/80 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">Best Season</span>
                <span className="text-xs font-bold text-white truncate block">{selectedDest.bestTime}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block font-mono">Starting At</span>
                <span className="font-serif text-lg font-bold text-amber-400">
                  ₹{selectedDest.startingPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                Top Highlights
              </span>
              {selectedDest.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectDestination(selectedDest)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/30"
            >
              <span>Book Trip to {selectedDest.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
