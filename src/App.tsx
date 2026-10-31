import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FloatingSearch } from './components/FloatingSearch';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { SmartTripPlanner } from './components/SmartTripPlanner';
import { InteractiveMap } from './components/InteractiveMap';
import { ExperiencesSection } from './components/ExperiencesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactBookingSection } from './components/ContactBookingSection';
import { Footer } from './components/Footer';
import { Destination } from './types';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('');
  const [bookingDestination, setBookingDestination] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFloatingSearch = ({
    destination,
  }: {
    destination: string;
    departureCity: string;
    date: string;
    travellers: number;
    budget: string;
  }) => {
    if (destination) {
      setSelectedDestinationFilter(destination);
      scrollTo('destinations');
    } else {
      scrollTo('planner');
    }
  };

  const handleBookNow = (destinationOrPackageTitle: string) => {
    setBookingDestination(destinationOrPackageTitle);
    scrollTo('contact');
  };

  const handleSelectMapDestination = (dest: Destination) => {
    setBookingDestination(dest.name);
    scrollTo('contact');
  };

  const handleSelectExperience = (_category: string) => {
    scrollTo('packages');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 relative selection:bg-turquoise-500 selection:text-navy-950">
      {/* 1. Brand Loading Intro Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Navigation Bar */}
      <Navbar
        onOpenTripPlanner={() => scrollTo('planner')}
        onOpenBooking={() => scrollTo('contact')}
      />

      {/* 3. Hero Section with 3D Earth Globe & Animated Airplane */}
      <HeroSection
        onExploreDestinations={() => scrollTo('destinations')}
        onDiscoverPackages={() => scrollTo('packages')}
        onPlanTrip={() => scrollTo('planner')}
      />

      {/* 4. Modern Floating Travel Search Panel */}
      <FloatingSearch onSearch={handleFloatingSearch} />

      {/* 5. Explore Incredible India Destination Gallery */}
      <DestinationsSection
        selectedFilter={selectedDestinationFilter}
        onBookNow={handleBookNow}
      />

      {/* 6. Handcrafted Holiday Packages */}
      <PackagesSection onBookNow={handleBookNow} />

      {/* 7. Unique Feature A: Smart Trip Planner */}
      <SmartTripPlanner onBookCustomItinerary={handleBookNow} />

      {/* 8. Unique Feature B: Interactive India Map */}
      <InteractiveMap onSelectDestination={handleSelectMapDestination} />

      {/* 9. Unique Feature C: Travel Experiences Section */}
      <ExperiencesSection onSelectExperience={handleSelectExperience} />

      {/* 10. Unique Feature E: Why Choose Us */}
      <WhyChooseUs />

      {/* 11. Visual Spectacular Gallery with Lightbox */}
      <GallerySection />

      {/* 12. About Marvel Holidays */}
      <AboutSection />

      {/* 13. Unique Feature D: Customer Reviews & Ratings */}
      <TestimonialsSection />

      {/* 14. Contact & Booking Form with Google Maps & Validation */}
      <ContactBookingSection initialDestination={bookingDestination} />

      {/* 15. Comprehensive Footer */}
      <Footer />

      {/* Floating Action Button: Quick WhatsApp Assistance */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-navy-900/90 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all backdrop-blur-md"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href="https://wa.me/919876543210?text=Hello%20Marvel%20Holidays!%20I%20would%20like%20to%20plan%20a%20trip."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Inquiry"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all group"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Chat with Travel Expert</span>
        </a>
      </div>
    </div>
  );
};

export default App;

