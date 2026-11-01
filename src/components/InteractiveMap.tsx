import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
    gm_authFailure?: () => void;
  }
}

interface InteractiveMapProps {
  onSelectDestination: (destination: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectDestination }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);

  // References for Google Map
  const googleMapRef = useRef<any>(null);
  const googleMarkersRef = useRef<any[]>([]);
  const googleInfoWindowRef = useRef<any>(null);

  // References for Leaflet Map
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletTileRef = useRef<L.TileLayer | null>(null);

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
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#272738' }],
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

  // 1. ATTEMPT GOOGLE MAPS FIRST WITH USER'S KEY
  useEffect(() => {
    let isCancelled = false;
    let fallbackTimer: any = null;

    // Handle Google Maps auth failure gracefully
    window.gm_authFailure = () => {
      console.warn('Google Maps API Key notice: switching to high-availability map engine.');
      if (!isCancelled) {
        googleMapRef.current = null;
        if (mapContainerRef.current) {
          delete (mapContainerRef.current as any)._leaflet_id;
          mapContainerRef.current.innerHTML = '';
        }
        setMapEngine('leaflet');
      }
    };

    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        initGoogleMap();
        return;
      }

      // Fallback timer: If Google Maps doesn't load within 3.5s, switch cleanly to Leaflet
      fallbackTimer = setTimeout(() => {
        if (!window.google?.maps && !isCancelled) {
          console.info('Google Maps timeout; switching to high-performance Leaflet engine.');
          setMapEngine('leaflet');
        }
      }, 3500);

      // Check if script already exists
      const existingScript = document.getElementById('gmaps-script') as HTMLScriptElement | null;
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (!isCancelled) initGoogleMap();
        });
        existingScript.addEventListener('error', () => {
          if (!isCancelled) setMapEngine('leaflet');
        });
        return;
      }

      const script = document.createElement('script');
      script.id = 'gmaps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBS6yLzsR2WYjsUI0DK1aFZXaG2Jzi10ZQ&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (!isCancelled) initGoogleMap();
      };
      script.onerror = () => {
        if (!isCancelled) setMapEngine('leaflet');
      };
      document.head.appendChild(script);
    };

    const initGoogleMap = () => {
      try {
        if (!mapContainerRef.current || !window.google?.maps) {
          setMapEngine('leaflet');
          return;
        }

        if (fallbackTimer) clearTimeout(fallbackTimer);

        mapContainerRef.current.innerHTML = '';
        delete (mapContainerRef.current as any)._leaflet_id;

        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: 22.9734, lng: 78.6569 },
          zoom: 5,
          minZoom: 3,
          maxZoom: 18,
          disableDefaultUI: true,
          styles: darkMapStyle,
        });

        googleMapRef.current = map;
        googleInfoWindowRef.current = new window.google.maps.InfoWindow();

        const createPinIcon = () => ({
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 34 42">
              <path d="M17 0 C7.6 0 0 7.6 0 17 C0 27.5 17 42 17 42 C17 42 34 27.5 34 17 C34 7.6 26.4 0 17 0 Z" fill="#ED1D24"/>
              <circle cx="17" cy="16" r="9" fill="#09090b" stroke="#fbbf24" stroke-width="2"/>
              <circle cx="17" cy="16" r="4" fill="#fbbf24"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 36),
          anchor: new window.google.maps.Point(15, 36),
        });

        googleMarkersRef.current = [];
        DESTINATIONS.forEach((dest) => {
          const marker = new window.google.maps.Marker({
            position: { lat: dest.coordinates.lat, lng: dest.coordinates.lng },
            map,
            title: dest.name,
            icon: createPinIcon(),
          });

          marker.addListener('click', () => {
            setSelectedDest(dest);
            const content = `
              <div style="background:#0c0c12; color:#ffffff; padding:12px; border-radius:12px; max-width:240px; font-family:'Plus Jakarta Sans',sans-serif; border:1px solid rgba(255,255,255,0.15);">
                <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:110px; object-fit:cover; border-radius:8px; margin-bottom:8px;" />
                <div style="font-family:'Times New Roman',serif; font-size:16px; font-weight:bold; color:#ffffff; margin-bottom:2px;">
                  ${dest.name}
                </div>
                <div style="font-size:11px; color:#a1a1aa; margin-bottom:6px;">${dest.state} • ${dest.region}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span style="font-size:10px; color:#71717a;">Starting From</span>
                  <span style="font-family:'Times New Roman',serif; font-size:15px; font-weight:bold; color:#fbbf24;">₹${dest.startingPrice.toLocaleString('en-IN')}</span>
                </div>
                <button id="gmap-btn-${dest.id}" style="width:100%; background:#ED1D24; color:#ffffff; border:none; padding:7px 0; border-radius:8px; font-size:11px; font-weight:bold; cursor:pointer;">
                  View Details & Book →
                </button>
              </div>
            `;
            googleInfoWindowRef.current.setContent(content);
            googleInfoWindowRef.current.open(map, marker);

            setTimeout(() => {
              const btn = document.getElementById(`gmap-btn-${dest.id}`);
              if (btn) btn.onclick = () => onSelectDestination(dest);
            }, 100);
          });

          googleMarkersRef.current.push(marker);
        });

        setMapEngine('google');
      } catch (err) {
        console.warn('Google Maps initialization failed, switching to resilient map engine:', err);
        setMapEngine('leaflet');
      }
    };

    loadGoogleMaps();

    return () => {
      isCancelled = true;
    };
  }, [onSelectDestination]);

  // 2. RESILIENT LEAFLET ENGINE (No API Key Required, Zero Watermarks)
  useEffect(() => {
    if (mapEngine !== 'leaflet' || !mapContainerRef.current) return;

    if (leafletMapRef.current) {
      try {
        leafletMapRef.current.remove();
      } catch (e) {
        console.warn('Leaflet cleanup:', e);
      }
      leafletMapRef.current = null;
    }

    // Clean container completely of any prior DOM / Leaflet internal markers
    delete (mapContainerRef.current as any)._leaflet_id;
    mapContainerRef.current.innerHTML = '';

    const map = L.map(mapContainerRef.current, {
      center: [22.9734, 78.6569],
      zoom: 5,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    leafletMapRef.current = map;

    // Use Esri Dark Gray Canvas (Completely free, no API key, no watermark!)
    const streetTile = L.tileLayer(
      'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }
    ).addTo(map);

    leafletTileRef.current = streetTile;

    // Custom dark luxury pin icon
    const createLeafletIcon = (name: string, price: number) =>
      L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            background: #09090b;
            color: #ffffff;
            border: 2px solid #ED1D24;
            border-radius: 9999px;
            padding: 3px 8px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.8);
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            cursor: pointer;
            transform: translate(-50%, -50%);
          ">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#ED1D24; margin-right:5px; box-shadow:0 0 6px #ED1D24;"></span>
            <span>${name}</span>
            <span style="margin-left:4px; color:#fbbf24; font-size:10px;">₹${(price / 1000).toFixed(0)}k</span>
          </div>
        `,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      });

    DESTINATIONS.forEach((dest) => {
      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], {
        icon: createLeafletIcon(dest.name, dest.startingPrice),
      }).addTo(map);

      const popupContent = document.createElement('div');
      popupContent.style.width = '240px';
      popupContent.innerHTML = `
        <div style="overflow:hidden; border-radius:12px; font-family:'Plus Jakarta Sans', sans-serif; background:#0d0d14; color:#ffffff;">
          <img src="${dest.image}" alt="${dest.name}" style="width:100%; height:110px; object-fit:cover;" />
          <div style="padding:12px; background:#0d0d14;">
            <div style="font-family:'Times New Roman', Times, serif; font-size:16px; font-weight:800; color:#ffffff; margin-bottom:2px;">
              ${dest.name}
            </div>
            <div style="font-size:11px; color:#a1a1aa; margin-bottom:8px;">${dest.state} • ${dest.region}</div>
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
              <span style="font-size:10px; color:#71717a;">Starting From</span>
              <span style="font-family:'Times New Roman', serif; font-size:16px; font-weight:800; color:#fbbf24;">₹${dest.startingPrice.toLocaleString('en-IN')}</span>
            </div>
            <button id="leaflet-book-${dest.id}" style="
              width:100%;
              background:#ED1D24;
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
        const btn = document.getElementById(`leaflet-book-${dest.id}`);
        if (btn) btn.onclick = () => onSelectDestination(dest);
      });

      marker.on('click', () => setSelectedDest(dest));
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [mapEngine, onSelectDestination]);

  // Toggle Map Type (Street vs Satellite)
  const toggleMapLayer = (type: 'streets' | 'satellite') => {
    setMapStyle(type);

    if (mapEngine === 'google' && googleMapRef.current) {
      if (type === 'satellite') {
        googleMapRef.current.setMapTypeId('hybrid');
      } else {
        googleMapRef.current.setMapTypeId('roadmap');
        googleMapRef.current.setOptions({ styles: darkMapStyle });
      }
    } else if (leafletMapRef.current) {
      if (leafletTileRef.current) {
        leafletMapRef.current.removeLayer(leafletTileRef.current);
      }
      if (type === 'satellite') {
        // High-Resolution Esri World Imagery (No key needed)
        leafletTileRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
            maxZoom: 18,
          }
        ).addTo(leafletMapRef.current);
      } else {
        // High-Quality Esri Dark Gray Canvas (No key needed)
        leafletTileRef.current = L.tileLayer(
          'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri',
            maxZoom: 16,
          }
        ).addTo(leafletMapRef.current);
      }
    }
  };

  const handleZoomIn = () => {
    if (mapEngine === 'google' && googleMapRef.current) {
      googleMapRef.current.setZoom(googleMapRef.current.getZoom() + 1);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapEngine === 'google' && googleMapRef.current) {
      googleMapRef.current.setZoom(googleMapRef.current.getZoom() - 1);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (mapEngine === 'google' && googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: 22.9734, lng: 78.6569 });
      googleMapRef.current.setZoom(5);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.setView([22.9734, 78.6569], 5);
    }
  };

  const jumpToDestination = (dest: Destination) => {
    setSelectedDest(dest);
    if (mapEngine === 'google' && googleMapRef.current) {
      googleMapRef.current.panTo({ lat: dest.coordinates.lat, lng: dest.coordinates.lng });
      googleMapRef.current.setZoom(8);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([dest.coordinates.lat, dest.coordinates.lng], 8, {
        duration: 1.2,
      });
    }
  };

  return (
    <section id="interactive-map" className="py-24 bg-[#050507] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Explorer • 27 Destinations</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive India Explorer Map
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Pan, zoom, and discover all 27 destinations across North, South, East, and West India with dark street styles, real satellite imagery, and verified real destination photography.
          </p>
        </div>

        {/* Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Container */}
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
                  Real Satellite View
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

            {/* Map Canvas */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] rounded-2xl overflow-hidden border border-white/10 z-10 bg-[#09090e]"
            />

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
