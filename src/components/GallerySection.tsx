import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { Eye, X, Camera, MapPin } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'Waterfalls', 'Resorts', 'Culture'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            Real Visual Spectacle
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Incredible India Gallery
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            Glimpse the breathtaking colors, royal monuments, tranquil waters, and majestic heights captured across our handpicked tours with real photography.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-slate-100 text-gray-700 hover:text-black hover:bg-slate-200 border border-slate-200'
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
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-72 border border-slate-200 shadow-luxury white-card-hover"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Category Pill */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-black font-serif font-bold text-[11px] shadow-sm">
                {item.category}
              </span>

              {/* Hover View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <Eye className="w-4 h-4 text-black" />
              </div>

              {/* Title & Location */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-200 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition-colors z-20 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-black font-serif font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                  {activeItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-black">{activeItem.title}</h3>
                <span className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  {activeItem.location}
                </span>
              </div>

              <a
                href="#contact"
                onClick={() => setActiveItem(null)}
                className="px-6 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-xs sm:text-sm shadow-md"
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
