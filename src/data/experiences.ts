import { ExperienceCategory } from '../types';

export const EXPERIENCES: ExperienceCategory[] = [
  {
    id: 'mountains',
    name: 'Misty Mountains & Peaks',
    tagline: 'Snow-clad peaks, pine valleys & high altitude wonder',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
    count: 14,
    iconName: 'Mountain',
    popularDestinations: ['Kashmir', 'Manali', 'Ladakh', 'Ooty', 'Darjeeling']
  },
  {
    id: 'beaches',
    name: 'Sun-Kissed Beaches',
    tagline: 'Golden sands, turquoise waves & seaside sunsets',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    count: 8,
    iconName: 'SunMedium',
    popularDestinations: ['Goa', 'Pondicherry', 'Kanyakumari', 'Kerala Coast']
  },
  {
    id: 'waterfalls',
    name: 'Cascading Waterfalls',
    tagline: 'Thundering cascades deep inside lush rainforests',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    count: 12,
    iconName: 'Waves',
    popularDestinations: ['Meghalaya', 'Coorg', 'Athirappilly', 'Lonavala']
  },
  {
    id: 'wildlife',
    name: 'Untamed Wildlife Safaris',
    tagline: 'Spot Royal Bengal tigers, one-horned rhinos & wild elephants',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    count: 9,
    iconName: 'Footprints',
    popularDestinations: ['Assam (Kaziranga)', 'Thekkady (Periyar)', 'Bandipur', 'Ranthambore']
  },
  {
    id: 'historical',
    name: 'Historical Monuments & Forts',
    tagline: 'Step into legends of emperors, palaces & ancient citadels',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    count: 18,
    iconName: 'Landmark',
    popularDestinations: ['Agra', 'Jaipur', 'Delhi', 'Mysore', 'Jaisalmer']
  },
  {
    id: 'adventure',
    name: 'Adrenaline & High Thrills',
    tagline: 'White water rapids, paragliding, bungee & high passes',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1200&auto=format&fit=crop',
    count: 11,
    iconName: 'Compass',
    popularDestinations: ['Rishikesh', 'Ladakh', 'Manali', 'Goa']
  },
  {
    id: 'culture',
    name: 'Culture, Heritage & Spirituality',
    tagline: 'Living traditions, temple arts, folk dances & sacred aartis',
    image: 'https://images.unsplash.com/photo-1603288940320-984559a8361c?q=80&w=1200&auto=format&fit=crop',
    count: 16,
    iconName: 'Sparkles',
    popularDestinations: ['Varanasi', 'Udaipur', 'Amritsar', 'Hampi', 'Madurai']
  }
];

