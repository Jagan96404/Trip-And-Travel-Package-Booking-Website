import React from 'react';
import { ShieldCheck, HeartHandshake, Compass, Hotel, Sparkles, Headphones, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: 'Affordable Luxury Packages',
      description: 'Exclusive corporate tie-ups with premium luxury hotels and fleet operators ensure unmatched pricing without compromising on quality or comfort.',
    },
    {
      icon: <Compass className="w-6 h-6 text-black" />,
      title: 'Personalized Itineraries',
      description: 'Zero cookie-cutter plans. Every single trip is customized around your pace, travel dates, personal dietary preferences, and bucket-list desires.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Trusted Travel Assistance',
      description: 'Govt. recognized, fully licensed, and verified travel partners. Backed by comprehensive travel insurance and certified local escorts.',
    },
    {
      icon: <Hotel className="w-6 h-6 text-amber-700" />,
      title: 'Comfortable Accommodation',
      description: 'Hand-inspected 4-star, 5-star, and boutique heritage properties offering sanitized rooms, breathtaking views, and warm Indian hospitality.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-gold" />,
      title: 'Memorable Experiences',
      description: 'Exclusive VIP access to cultural aartis, private boat charters, local culinary walks, and photography vantage points away from tourist crowds.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-black" />,
      title: 'Dedicated 24/7 Customer Support',
      description: 'A personal travel concierge assigned to your trip round the clock from the minute you board till your safe return back home.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            The Marvel Standard
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Why Choose Marvel Holidays
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            We hold ourselves to the gold standard of international travel curating, delivering flawless journeys across the length and breadth of India.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-luxury white-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  {item.icon}
                </div>

                <h3 className="font-serif text-xl font-bold text-black mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-serif font-bold text-gray-400">
                <span>Pillar 0{index + 1}</span>
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
