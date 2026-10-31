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

    const generatedDays = Array.from({ length: durationDays }).map((_, index) => {
      const dayNum = index + 1;
      let dayTitle = '';
      let desc = '';

      if (dayNum === 1) {
        dayTitle = `Arrive from ${startCity} & Grand Welcome`;
        desc = `Flight/transfer arrival in ${selectedDestObj.name}. Private luxury check-in, orientation tea, and leisurely evening exploring ${selectedDestObj.highlights[0]}.`;
      } else if (dayNum === durationDays) {
        dayTitle = `Sunrise Vistas, Souvenir Trails & Departure`;
        desc = `Final breakfast with panoramic views. Visit local craft bazaars for authentic regional souvenirs. Private airport drop back to ${startCity}.`;
      } else {
        const highlightIndex = (dayNum - 2) % selectedDestObj.highlights.length;
        dayTitle = `Immersive Experience: ${selectedDestObj.highlights[highlightIndex]}`;
        desc = `Full day excursion tailored to your interest in ${interests.slice(0, 2).join(' & ')}. Includes private guide, priority entrance passes, and scenic lunch spot.`;
      }

      return {
        day: dayNum,
        title: dayTitle,
        desc,
      };
    });

    setGeneratedItinerary({
      destObj: selectedDestObj,
      durationDays,
      startCity,
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
    <section id="planner" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-serif uppercase tracking-widest text-brand-gold block mb-2">
            AI-Assisted Smart Travel Engine
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Smart Trip Planner
          </h2>

          <p className="text-gray-700 text-sm sm:text-base">
            Design your bespoke Indian vacation in seconds. Select your travel vibe, dates, and budget to generate a custom suggested itinerary with transparent pricing.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-luxury p-6 sm:p-10">
          {!generatedItinerary ? (
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
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
                          ? 'bg-black text-white shadow-sm'
                          : step > s.num
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-gray-500'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span
                      className={`font-serif text-xs font-bold hidden sm:inline ${
                        step === s.num ? 'text-black' : 'text-gray-400'
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
                  <h3 className="font-serif text-xl font-bold text-black mb-4">
                    1. Choose Starting Point & Dream Destination
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="text-xs font-serif font-bold text-black uppercase tracking-wider block mb-2">
                        Departure City
                      </label>
                      <select
                        value={startCity}
                        onChange={(e) => setStartCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm"
                      >
                        {['Delhi NCR', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'].map(
                          (c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="text-xs font-serif font-bold text-black uppercase tracking-wider block mb-2">
                        Target Destination in India
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.state})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-sm"
                    >
                      <span>Continue to Duration</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Duration and Group */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="font-serif text-xl font-bold text-black mb-4">
                    2. Trip Duration & Travel Companions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="text-xs font-serif font-bold text-black uppercase tracking-wider block mb-2">
                        Duration (Days): {durationDays} Days
                      </label>
                      <input
                        type="range"
                        min={3}
                        max={14}
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        className="w-full accent-black cursor-pointer mt-2"
                      />
                      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        <span>3 Days</span>
                        <span>7 Days</span>
                        <span>14 Days</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="text-xs font-serif font-bold text-black uppercase tracking-wider block mb-2">
                        Number of Travellers: {travelersCount}
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(Number(e.target.value))}
                        className="w-full accent-brand-gold cursor-pointer mt-2"
                      />
                      <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                        <span>Solo</span>
                        <span>Couple (2)</span>
                        <span>Group (12)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <label className="text-xs font-serif font-bold text-black uppercase tracking-wider block mb-2">
                        Trip Vibe
                      </label>
                      <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-sm font-serif font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm"
                      >
                        <option value="Couple / Honeymoon">Couple / Honeymoon</option>
                        <option value="Family with Kids">Family with Kids</option>
                        <option value="Senior Citizens Comfort">Senior Citizens Comfort</option>
                        <option value="Friends Adventure Group">Friends Adventure Group</option>
                        <option value="Solo Rejuvenation">Solo Rejuvenation</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-sm"
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
                  <h3 className="font-serif text-xl font-bold text-black mb-4">
                    3. Select Accommodation & Comfort Tier
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        id: 'budget',
                        name: 'Smart Explorer',
                        desc: 'Clean 3-Star verified boutique hotels, shared or private swift cabs, scenic stays.',
                        priceLabel: 'Economy Friendly',
                      },
                      {
                        id: 'comfort',
                        name: 'Premium Comfort',
                        desc: '4-Star luxury resorts, dedicated private AC Innova, gourmet buffet breakfasts.',
                        priceLabel: 'Most Popular',
                        recommended: true,
                      },
                      {
                        id: 'luxury',
                        name: 'Royal 5-Star Luxury',
                        desc: 'Palace suites, heritage villas, private boat charters, luxury chauffeur service.',
                        priceLabel: 'Ultimate Experience',
                      },
                    ].map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setBudgetTier(tier.id as any)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          budgetTier === tier.id
                            ? 'bg-slate-50 border-black shadow-md'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-white font-serif font-bold text-[10px] mb-2 inline-block">
                            RECOMMENDED
                          </span>
                        )}
                        <h4 className="font-serif text-base font-bold text-black mb-1">{tier.name}</h4>
                        <span className="text-xs font-bold text-brand-gold block mb-2">
                          {tier.priceLabel}
                        </span>
                        <p className="text-xs text-gray-600 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-sm"
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
                  <h3 className="font-serif text-xl font-bold text-black mb-2">
                    4. Select Your Travel Interests
                  </h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Select what excites you the most so we customize your daily activity highlights.
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all ${
                          interests.includes(interest)
                            ? 'bg-black text-white shadow-sm'
                            : 'bg-slate-50 border border-slate-200 text-gray-800 hover:border-black'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-slate-100">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-8 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center gap-2 shadow-md transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-brand-gold" />
                      <span>Generate Custom Itinerary</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Generated Itinerary Output */
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-serif font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                    ✓ Custom Plan Ready
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black">
                    {generatedItinerary.durationDays}-Day Bespoke {generatedItinerary.destObj.name} Explorer
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    Departing from {generatedItinerary.startCity} for {generatedItinerary.travelersCount} Travellers ({generatedItinerary.travelType})
                  </p>
                </div>

                <div className="text-left sm:text-right p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-gray-500 block">Estimated Cost / Person</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-black">
                    ₹{generatedItinerary.costPerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-gray-600 block">
                    Total: ₹{generatedItinerary.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Day-by-Day Roadmap */}
              <div className="space-y-4">
                {generatedItinerary.days.map((d: any) => (
                  <div
                    key={d.day}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-black text-white font-serif font-bold text-xs">
                        Day {d.day}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-black">
                        {d.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 pl-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                <button
                  onClick={() =>
                    onBookCustomItinerary(
                      `${generatedItinerary.durationDays}-Day custom trip to ${generatedItinerary.destObj.name} from ${generatedItinerary.startCity} for ${generatedItinerary.travelersCount} people.`
                    )
                  }
                  className="flex-1 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Book This Custom Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setGeneratedItinerary(null)}
                  className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-black font-serif font-bold text-sm flex items-center justify-center gap-2"
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
