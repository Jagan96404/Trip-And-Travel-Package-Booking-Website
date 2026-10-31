import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Hotel, Sparkles, Headphones, Award, Star } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-gold-400" />,
      title: 'Affordable Luxury Packages',
      description: 'Exclusive corporate tie-ups with premium luxury hotels and fleet operators ensure unmatched pricing without compromising on quality or comfort.',
    },
    {
      icon: <Compass className="w-6 h-6 text-turquoise-400" />,
      title: 'Personalized Itineraries',
      description: 'Zero cookie-cutter plans. Every single trip is customized around your pace, travel dates, personal dietary preferences, and bucket-list desires.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Trusted Travel Assistance',
      description: 'Govt. recognized, fully licensed, and verified travel partners. Backed by comprehensive travel insurance and certified local escorts.',
    },
    {
      icon: <Hotel className="w-6 h-6 text-amber-400" />,
      title: 'Comfortable Accommodation',
      description: 'Hand-inspected 4-star, 5-star, and boutique heritage properties offering sanitized rooms, breathtaking views, and warm Indian hospitality.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: 'Memorable Experiences',
      description: 'Exclusive VIP access to cultural aartis, private boat charters, local culinary walks, and photography vantage points away from tourist crowds.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-purple-400" />,
      title: 'Dedicated 24/7 Customer Support',
      description: 'A personal travel concierge assigned to your trip round the clock from the minute you board till your safe return back home.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-navy-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/40 text-xs text-gold-300 font-semibold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>The Marvel Standard</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Marvel Holidays</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            We hold ourselves to the gold standard of international travel curating, delivering flawless journeys across the length and breadth of India.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl p-8 border border-slate-800 glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-navy-950/80 border border-slate-700/80 flex items-center justify-center mb-6 shadow-lg">
                  {item.icon}
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Pillar 0{index + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-turquoise-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

