import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { Layers, ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles, ArrowRight, Calendar, IndianRupee } from 'lucide-react';

interface InteractiveMapProps {
  onSelectDestination: (destination: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on India geographic heart
    const map = L.map(mapContainerRef.current, {
      center: [22.9734, 78.6569],
      zoom: 5,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // Default tile layer: CartoDB Positron (clean white luxury business map)
    const streetsLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    tileLayerRef.current = streetsLayer;

    // Create custom luxury pin icon
    const createCustomIcon = (name: string, price: number) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            background: #ffffff;
            color: #000000;
            border: 2px solid #b48a3c;
            border-radius: 9999px;
            padding: 3px 8px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.18);
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#b48a3c; margin-right:5px;"></span>
            <span>${name}</span>
            <span style="margin-left:4px; color:#8c6b2d; font-size:10px;">₹${(price / 1000).toFixed(0)}k</span>
          </div>
        `,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      });
    };

    // Add pins for all destinations
    DESTINATIONS.forEach((dest) => {
      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
        icon: createCustomIcon(dest.name, dest.startingPrice),
      }).addTo(map);

      // Popup with real photo
      const popupContent = document.createElement('div');
      popupContent.style.width = '240px';
      popupContent.innerHTML = `
        <div style="overflow:hidden; border-radius:12px; font-family:'Plus Jakarta Sans', sans-serif;">
          <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:120px; object-fit:cover;" />
          <div style="padding:12px; background:#ffffff;">
            <div style="font-family:'Times New Roman', Times, serif; font-size:16px; font-weight:800; color:#000000; margin-bottom:2px;">
              ${dest.name}
            </div>
            <div style="font-size:11px; color:#64748b; margin-bottom:8px;">${dest.state} • ${dest.region}</div>
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
              <span style="font-size:10px; color:#94a3b8;">Starting From</span>
              <span style="font-family:'Times New Roman', serif; font-size:16px; font-weight:800; color:#b48a3c;">₹${dest.startingPrice.toLocaleString('en-IN')}</span>
            </div>
            <button id="book-btn-${dest.id}" style="
              width:100%;
              background:#000000;
              color:#ffffff;
              border:none;
              padding:8px 0;
              border-radius:8px;
              font-size:11px;
              font-weight:700;
              cursor:pointer;
              transition:background 0.2s;
            ">
              View & Book Details →
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        setSelectedDest(dest);
        const btn = document.getElementById(`book-btn-${dest.id}`);
        if (btn) {
          btn.onclick = () => onSelectDestination(dest);
        }
      });

      marker.on('click', () => {
        setSelectedDest(dest);
      });
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onSelectDestination]);

  // Handle Layer Toggle (Satellite vs Street)
  const toggleMapLayer = (type: 'streets' | 'satellite') => {
    if (!mapInstanceRef.current) return;
    setMapStyle(type);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    if (type === 'satellite') {
      // Real Satellite World Imagery (Esri World Imagery)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 18,
        }
      ).addTo(mapInstanceRef.current);
    } else {
      // Clean Light Business Map
      tileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleReset = () => {
    mapInstanceRef.current?.setView([22.9734, 78.6569], 5);
  };

  const jumpToDestination = (dest: Destination) => {
    setSelectedDest(dest);
    mapInstanceRef.current?.setView([dest.coordinates.lat, dest.coordinates.lng], 9, {
      animate: true,
    });
  };

  return (
    <section id="interactive-map" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-2">
            Real Interactive Exploration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Interactive Map of India & World Destinations
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Zoom in or out to explore authentic geographic terrain and satellite imagery. Click on any destination to view real photographs, season highlights, and pricing.
          </p>
        </div>

        {/* Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Real Leaflet Map Container */}
          <div className="lg:col-span-8 bg-white p-3 rounded-3xl shadow-luxury border border-slate-200 relative">
            {/* Map Controls Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-2 bg-slate-100 rounded-2xl border border-slate-200">
              {/* Layer switch buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleMapLayer('streets')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mapStyle === 'streets'
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:text-black'
                  }`}
                >
                  Clean Street Map
                </button>
                <button
                  onClick={() => toggleMapLayer('satellite')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mapStyle === 'satellite'
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:text-black'
                  }`}
                >
                  Real Satellite View
                </button>
              </div>

              {/* Zoom & Reset Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-black hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-black hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  title="Reset to India View"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Center India</span>
                </button>
              </div>
            </div>

            {/* Real Interactive Map Canvas */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 z-10"
            />

            {/* Quick jump pills */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider shrink-0">
                Quick Jump:
              </span>
              {DESTINATIONS.slice(0, 10).map((d) => (
                <button
                  key={d.id}
                  onClick={() => jumpToDestination(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                    selectedDest.id === d.id
                      ? 'bg-brand-gold text-white font-bold'
                      : 'bg-slate-100 text-gray-800 hover:bg-slate-200'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Spotlight Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-luxury border border-slate-200">
            <div className="relative h-60 -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-3xl">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                  {selectedDest.region}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-black text-xs font-bold">
                  {selectedDest.state}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-black mb-1">
              {selectedDest.name}
            </h3>
            <p className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
              {selectedDest.tagline}
            </p>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-5">
              {selectedDest.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Best Season</span>
                <span className="text-xs font-bold text-black truncate block">{selectedDest.bestTime}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">Starting At</span>
                <span className="font-serif text-lg font-bold text-black">
                  ₹{selectedDest.startingPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Top Highlights
              </span>
              {selectedDest.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectDestination(selectedDest)}
              className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
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
