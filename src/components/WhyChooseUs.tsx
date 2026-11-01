import React from 'react';
import { ShieldCheck, Compass, Hotel, Sparkles, Headphones, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'Affordable Luxury Packages',
      description: 'Exclusive corporate tie-ups with premium luxury hotels and fleet operators ensure unmatched pricing without compromising on quality or comfort.',
    },
    {
      icon: <Compass className="w-6 h-6 text-[#ED1D24]" />,
      title: 'Personalized Group & IV Itineraries',
      description: 'Specialized arrangements for College IVs, School groups, Corporate retreats, and Family holidays with verified plant permissions and custom timelines.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Trusted All-India Assistance',
      description: 'Govt. recognized, fully licensed, and verified travel partners. Backed by 24/7 dedicated assistance and certified local escorts.',
    },
    {
      icon: <Hotel className="w-6 h-6 text-amber-400" />,
      title: 'Comfortable Accommodation',
      description: 'Hand-inspected 4-star, 5-star, and boutique heritage properties offering sanitized rooms, breathtaking views, and warm Indian hospitality.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      title: 'Memorable Experiences',
      description: 'Exclusive VIP access to cultural aartis, private boat charters, local culinary walks, campfires, and photography vantage points.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-400" />,
      title: 'Dedicated 24/7 Customer Support',
      description: 'Direct phone & WhatsApp hotline (7867818790) assigned round the clock from the minute you begin till your safe return back home.',
    },
  ];

  return (
    <section className="py-24 bg-[#050507] text-white border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            The Marvel Standard
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Marvel Holidays
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            We hold ourselves to the gold standard of travel curating, delivering flawless journeys across the length and breadth of Incredible India.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <div
              key={index}
              className="bg-[#0e0e14] rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-md">
                  {item.icon}
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-zinc-500">
                <span>Pillar 0{index + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[#ED1D24]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
