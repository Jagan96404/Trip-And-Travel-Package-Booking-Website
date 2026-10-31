export type Region = 'All' | 'North India' | 'South India' | 'East India' | 'West India';

export interface Destination {
  id: string;
  name: string;
  region: 'North India' | 'South India' | 'East India' | 'West India';
  state: string;
  tagline: string;
  description: string;
  image: string;
  galleryImages?: string[];
  startingPrice: number;
  bestTime: string;
  duration: string;
  climate: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  popularFor: string;
}

export type PackageCategory = 
  | 'All'
  | 'Family Holidays' 
  | 'Honeymoon Packages' 
  | 'Adventure Trips' 
  | 'Friends Group Trips' 
  | 'Luxury Holidays' 
  | 'Budget Holidays' 
  | 'Weekend Getaways' 
  | 'Spiritual Tours';

export interface HolidayPackage {
  id: string;
  title: string;
  category: PackageCategory;
  duration: {
    days: number;
    nights: number;
  };
  pricePerPerson: number;
  originalPrice?: number;
  featuredImage: string;
  placesCovered: string[];
  hotelInfo: string;
  transportInfo: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: number;
    title: string;
    details: string;
  }[];
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface ExperienceCategory {
  id: string;
  name: string;
  tagline: string;
  image: string;
  count: number;
  iconName: string;
  popularDestinations: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  destination: string;
  rating: number;
  packageType: string;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'Mountains' | 'Beaches' | 'Heritage' | 'Waterfalls' | 'Resorts' | 'Culture';
  image: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  departureCity: string;
  travelDate: string;
  travellers: number;
  budget: string;
  packageType: string;
  specialRequirements: string;
}

