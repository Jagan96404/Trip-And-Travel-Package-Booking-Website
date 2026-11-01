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
    <section id="gallery" className="py-24 bg-[#08080c] text-white border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Real Visual Spectacle
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Incredible India Gallery
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Glimpse the breathtaking colors, royal monuments, tranquil waters, and majestic heights captured across our handpicked tours with authentic real photography.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all duration-200 ${activeCategory === cat
                  ? 'bg-[#ED1D24] text-white shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-72 border border-white/10 shadow-2xl hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Category Pill */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs font-mono font-bold border border-white/10">
                {item.category}
              </span>

              {/* View Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-white" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <span className="text-xs text-zinc-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0d0d14] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-6 bg-[#0e0e14] text-white">
              <span className="text-xs font-mono uppercase tracking-widest text-[#ED1D24] font-bold block mb-1">
                {activeItem.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {activeItem.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
