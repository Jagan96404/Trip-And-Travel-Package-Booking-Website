import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { Eye, X, Camera, MapPin, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'Waterfalls', 'Resorts', 'Culture'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-navy-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Spectacle</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Incredible India <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Gallery</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Glimpse the breathtaking colors, royal monuments, tranquil waters, and majestic heights captured across our handpicked tours.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold shadow-md'
                  : 'glass-card text-slate-300 hover:text-white hover:border-turquoise-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-72 border border-slate-800 glass-card-hover shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Category Pill */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-bold text-turquoise-300">
                {item.category}
              </span>

              {/* Hover View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-gold-400" />
              </div>

              {/* Title & Location */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-turquoise-400" />
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-700 bg-navy-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-navy-950/80 border border-slate-700 text-white hover:text-turquoise-400 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            <div className="p-6 bg-navy-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-turquoise-500/20 text-turquoise-400 font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">{activeItem.title}</h3>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  {activeItem.location}
                </span>
              </div>

              <a
                href="#contact"
                onClick={() => setActiveItem(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-bold text-xs sm:text-sm hover:brightness-110"
              >
                Plan A Trip Here
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

