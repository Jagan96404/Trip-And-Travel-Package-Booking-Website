import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, IndianRupee, Users, Compass, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface SmartTripPlannerProps {
  onBookCustomItinerary: (itinerarySummary: string) => void;
}

export const SmartTripPlanner: React.FC<SmartTripPlannerProps> = ({ onBookCustomItinerary }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [startCity, setStartCity] = useState('Delhi');
  const [destination, setDestination] = useState('Kashmir');
  const [durationDays, setDurationDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'comfort' | 'luxury'>('comfort');
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelType, setTravelType] = useState('Couple / Honeymoon');
  const [interests, setInterests] = useState<string[]>(['Mountains & Snow', 'Scenic Photography', 'Luxury Houseboat']);
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);

  const availableInterests = [
    'Mountains & Snow',
    'Beaches & Sunsets',
    'Historical Forts & Palaces',
    'River Rafting & Adventure',
    'Tea & Spice Plantations',
    'Houseboats & Backwaters',
    'Spiritual Temples & Aartis',
    'Wildlife & Jungle Safari',
    'Authentic Culinary Trails',
    'Luxury Wellness & Spa',
  ];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleGenerate = () => {
    const selectedDestObj = DESTINATIONS.find((d) => d.name.toLowerCase() === destination.toLowerCase()) || DESTINATIONS[0];
    const estimatedCostPerPerson =
      budgetTier === 'budget'
        ? selectedDestObj.startingPrice
        : budgetTier === 'comfort'
        ? Math.round(selectedDestObj.startingPrice * 1.45)
        : Math.round(selectedDestObj.startingPrice * 2.3);

    const generatedDays = Array.from({ length: durationDays }, (_, idx) => {
      const dayNum = idx + 1;
      if (dayNum === 1) {
        return {
          day: 1,
          title: `Arrival & VIP Reception in ${selectedDestObj.name}`,
          desc: `Scenic transfer from ${startCity} hub. Private check-in to handpicked resort. Evening orientation and authentic local dinner.`,
        };
      } else if (dayNum === durationDays) {
        return {
          day: dayNum,
          title: `Souvenir Shopping & Farewell Departure`,
          desc: `Morning breakfast with panoramic views. Artisan market visit for local specialties. Private transfer back with memories of a lifetime.`,
        };
      } else {
        const highlight = selectedDestObj.highlights[idx % selectedDestObj.highlights.length];
        return {
          day: dayNum,
          title: `Exploring ${highlight}`,
          desc: `Private chauffeured sightseeing excursion to ${highlight}. Curated photography stops, lunch at heritage eatery, and leisurely evening.`,
        };
      }
    });

    setGeneratedItinerary({
      destObj: selectedDestObj,
      startCity,
      durationDays,
      travelersCount,
      travelType,
      budgetTier,
      costPerPerson: estimatedCostPerPerson,
      totalCost: estimatedCostPerPerson * travelersCount,
      interests,
      days: generatedDays,
    });
  };

  return (
    <section id="planner" className="py-24 bg-[#050507] text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
            AI-Assisted Smart Travel Engine
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Smart Trip Planner
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base">
            Design your bespoke Indian vacation in seconds. Select your travel vibe, dates, and budget to generate a custom suggested itinerary with transparent pricing.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#0e0e14] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10">
          {!generatedItinerary ? (
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                {[
                  { num: 1, label: 'Destinations' },
                  { num: 2, label: 'Duration & Group' },
                  { num: 3, label: 'Budget & Style' },
                  { num: 4, label: 'Interests' },
                ].map((s) => (
                  <button
                    key={s.num}
                    onClick={() => setStep(s.num as any)}
                    className="flex flex-col sm:flex-row items-center gap-2 group focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        step === s.num
                          ? 'bg-[#ED1D24] text-white shadow-md'
                          : step > s.num
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span
                      className={`font-serif text-xs font-bold hidden sm:inline ${
                        step === s.num ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step 1: Destination and Departure */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="font-serif text-xl font-bold text-white mb-4">
                    1. Choose Starting Point & Dream Destination
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                      <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Departure City
                      </label>
                      <select
                        value={startCity}
                        onChange={(e) => setStartCity(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-sm font-serif font-bold text-white focus:outline-none focus:border-[#ED1D24] cursor-pointer"
                      >
                        {['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'].map(
                          (c) => (
                            <option key={c} value={c} className="bg-zinc-900 text-white">
                              {c}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                      <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Target Destination in India
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-sm font-serif font-bold text-white focus:outline-none focus:border-[#ED1D24] cursor-pointer"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.name} className="bg-zinc-900 text-white">
                            {d.name} ({d.region})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-md"
                    >
                      <span>Continue to Duration & Group</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Duration & Travellers */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="font-serif text-xl font-bold text-white mb-4">
                    2. Trip Duration & Group Composition
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                      <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        min={3}
                        max={14}
                        value={durationDays}
                        onChange={(e) => setDurationDays(parseInt(e.target.value) || 3)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-sm font-serif font-bold text-white focus:outline-none focus:border-[#ED1D24]"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                      <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Total Travellers
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-sm font-serif font-bold text-white focus:outline-none focus:border-[#ED1D24]"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                      <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                        Travel Type
                      </label>
                      <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}
                        className="w-full bg-zinc-800 border border-white/10 rounded-xl p-3 text-sm font-serif font-bold text-white focus:outline-none focus:border-[#ED1D24] cursor-pointer"
                      >
                        <option className="bg-zinc-900 text-white">🎒 School Excursion</option>
                        <option className="bg-zinc-900 text-white">🎓 College IV Trip</option>
                        <option className="bg-zinc-900 text-white">💼 Corporate Offsite</option>
                        <option className="bg-zinc-900 text-white">Couple / Honeymoon</option>
                        <option className="bg-zinc-900 text-white">Family Vacation</option>
                        <option className="bg-zinc-900 text-white">Friends Group</option>
                        <option className="bg-zinc-900 text-white">♦️ Devotional Yatra</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-md"
                    >
                      <span>Continue to Budget</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget Tier */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="font-serif text-xl font-bold text-white mb-4">
                    3. Select Accommodation & Service Standard
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        id: 'budget',
                        name: 'Smart Explorer',
                        desc: 'Clean 3-Star boutique hotels, comfortable private transit, breakfast included.',
                        priceLabel: 'Best Value',
                      },
                      {
                        id: 'comfort',
                        name: 'Premium Comfort',
                        desc: '4-Star luxury resorts, dedicated private AC Innova/coach, gourmet buffet meals.',
                        priceLabel: 'Most Popular',
                        recommended: true,
                      },
                      {
                        id: 'luxury',
                        name: 'Royal 5-Star Luxury',
                        desc: 'Palace suites, heritage villas, private boat charters, dedicated chauffeur service.',
                        priceLabel: 'Ultimate Experience',
                      },
                    ].map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setBudgetTier(tier.id as any)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          budgetTier === tier.id
                            ? 'bg-zinc-900 border-[#ED1D24] shadow-lg shadow-red-900/20'
                            : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ED1D24] text-white font-mono font-bold text-[10px] mb-2 inline-block">
                            RECOMMENDED
                          </span>
                        )}
                        <h4 className="font-serif text-base font-bold text-white mb-1">{tier.name}</h4>
                        <span className="text-xs font-bold text-amber-400 block mb-2 font-mono">
                          {tier.priceLabel}
                        </span>
                        <p className="text-xs text-zinc-400 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-md"
                    >
                      <span>Continue to Interests</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Interests */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    4. Select Your Travel Interests
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Select what excites you the most so we customize your daily activity highlights.
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all ${
                          interests.includes(interest)
                            ? 'bg-[#ED1D24] text-white shadow-md'
                            : 'bg-zinc-900 border border-white/10 text-zinc-300 hover:border-white/30'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-white/10">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-8 py-3.5 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Generate Custom Itinerary</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Generated Itinerary Output */
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider mb-2 inline-block border border-emerald-500/30">
                    ✓ Custom Plan Ready
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {generatedItinerary.durationDays}-Day Bespoke {generatedItinerary.destObj.name} Explorer
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                    Departing from {generatedItinerary.startCity} for {generatedItinerary.travelersCount} Travellers ({generatedItinerary.travelType})
                  </p>
                </div>

                <div className="text-left sm:text-right p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <span className="text-xs text-zinc-400 block font-mono">Estimated Cost / Person</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    ₹{generatedItinerary.costPerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-zinc-400 block">
                    Total: ₹{generatedItinerary.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Day-by-Day Roadmap */}
              <div className="space-y-4">
                {generatedItinerary.days.map((d: any) => (
                  <div
                    key={d.day}
                    className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#ED1D24] text-white font-serif font-bold text-xs">
                        Day {d.day}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                        {d.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 pl-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
                <button
                  onClick={() =>
                    onBookCustomItinerary(
                      `${generatedItinerary.durationDays}-Day custom trip to ${generatedItinerary.destObj.name} from ${generatedItinerary.startCity} for ${generatedItinerary.travelersCount} people.`
                    )
                  }
                  className="flex-1 py-3.5 rounded-xl bg-[#ED1D24] hover:bg-red-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <span>Book This Custom Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/917867818790?text=Hi%20Marvel%20Holidays,%20I%20generated%20a%20${generatedItinerary.durationDays}-Day%20itinerary%20for%20${encodeURIComponent(generatedItinerary.destObj.name)}.%20Please%20share%20booking%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-sm flex items-center justify-center gap-2"
                >
                  <span>WhatsApp: 7867818790</span>
                </a>

                <button
                  onClick={() => setGeneratedItinerary(null)}
                  className="py-3.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-serif font-bold text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Modify Plan</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
