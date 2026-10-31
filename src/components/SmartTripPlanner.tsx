import React, { useState } from 'react';
import { Sparkles, MapPin, Calendar, IndianRupee, Users, Compass, CheckCircle2, ArrowRight, RotateCcw, Share2, Download } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface SmartTripPlannerProps {
  onBookCustomItinerary: (itinerarySummary: string) => void;
}

export const SmartTripPlanner: React.FC<SmartTripPlannerProps> = ({ onBookCustomItinerary }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
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
    <section id="planner" className="py-24 relative overflow-hidden bg-navy-950">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-turquoise-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-turquoise-500/40 text-xs text-turquoise-400 font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Smart Travel Engine</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Smart Trip <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-gold-500">Planner</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            Design your bespoke Indian vacation in seconds. Select your travel vibe, dates, and budget to generate a custom day-by-day suggested itinerary with transparent pricing.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="glass-card rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 backdrop-blur-2xl">
          {!generatedItinerary ? (
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800">
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
                          ? 'bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 shadow-md'
                          : step > s.num
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-navy-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:inline ${
                        step === s.num ? 'text-white' : 'text-slate-500'
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
                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Departure City
                      </label>
                      <select
                        value={startCity}
                        onChange={(e) => setStartCity(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer"
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

                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Target Destination in India
                      </label>
                      <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer"
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
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold text-sm flex items-center gap-2 hover:brightness-110"
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
                  <h3 className="font-serif text-xl font-bold text-white mb-4">
                    2. Trip Duration & Travel Companions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Duration (Days): {durationDays} Days
                      </label>
                      <input
                        type="range"
                        min={3}
                        max={14}
                        value={durationDays}
                        onChange={(e) => setDurationDays(Number(e.target.value))}
                        className="w-full accent-turquoise-400 cursor-pointer mt-2"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                        <span>3 Days (Weekend)</span>
                        <span>7 Days (Classic)</span>
                        <span>14 Days (Grand)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Number of Travellers: {travelersCount}
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(Number(e.target.value))}
                        className="w-full accent-gold-400 cursor-pointer mt-2"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                        <span>Solo</span>
                        <span>Couple (2)</span>
                        <span>Group (12)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800">
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                        Trip Vibe
                      </label>
                      <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}
                        className="w-full bg-navy-950 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-turquoise-400 cursor-pointer"
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
                      className="px-5 py-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 text-sm font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold text-sm flex items-center gap-2 hover:brightness-110"
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
                            ? 'bg-navy-900 border-gold-400 shadow-[0_0_20px_rgba(255,183,3,0.2)]'
                            : 'bg-navy-900/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {tier.recommended && (
                          <span className="px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-950 font-extrabold text-[10px] mb-2 inline-block">
                            RECOMMENDED
                          </span>
                        )}
                        <h4 className="font-serif text-base font-bold text-white mb-1">{tier.name}</h4>
                        <span className="text-xs font-semibold text-turquoise-400 block mb-2">
                          {tier.priceLabel}
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed">{tier.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 text-sm font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold text-sm flex items-center gap-2 hover:brightness-110"
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
                  <p className="text-xs text-slate-400 mb-4">
                    Select what excites you the most so we customize your daily activity highlights.
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                          interests.includes(interest)
                            ? 'bg-gradient-to-r from-turquoise-500 to-cyan-400 text-navy-950 font-bold shadow-md'
                            : 'bg-navy-900/80 border border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-slate-800">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 text-sm font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-navy-950 font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(255,183,3,0.4)] hover:brightness-110 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Custom Itinerary</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Generated Itinerary Output */
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 inline-block">
                    ✓ Tailored Custom Plan
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {generatedItinerary.durationDays}-Day Bespoke {generatedItinerary.destObj.name} Explorer
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Departing from {generatedItinerary.startCity} for {generatedItinerary.travelersCount} Travellers ({generatedItinerary.travelType})
                  </p>
                </div>

                <div className="text-left sm:text-right p-4 rounded-2xl bg-navy-900/90 border border-gold-500/40">
                  <span className="text-xs text-slate-400 block">Estimated Cost / Person</span>
                  <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-400">
                    ₹{generatedItinerary.costPerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Total: ₹{generatedItinerary.totalCost.toLocaleString('en-IN')} (All inclusive)
                  </span>
                </div>
              </div>

              {/* Day-by-Day Roadmap */}
              <div className="space-y-4">
                {generatedItinerary.days.map((d: any) => (
                  <div
                    key={d.day}
                    className="p-4 sm:p-5 rounded-2xl bg-navy-900/60 border border-slate-800"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-turquoise-500/20 text-turquoise-300 font-bold text-xs">
                        Day {d.day}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                        {d.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 pl-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800">
                <button
                  onClick={() =>
                    onBookCustomItinerary(
                      `${generatedItinerary.durationDays}-Day custom trip to ${generatedItinerary.destObj.name} from ${generatedItinerary.startCity} for ${generatedItinerary.travelersCount} people.`
                    )
                  }
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,183,3,0.4)] hover:brightness-110"
                >
                  <span>Book This Custom Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setGeneratedItinerary(null)}
                  className="py-3.5 px-6 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 font-semibold text-sm hover:text-white flex items-center justify-center gap-2"
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

