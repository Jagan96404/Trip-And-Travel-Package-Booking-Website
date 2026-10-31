import { ExperienceCategory } from '../types';

export const EXPERIENCES: ExperienceCategory[] = [
  {
    id: 'mountains',
    name: 'Misty Mountains & Peaks',
    tagline: 'Snow-clad peaks, pine valleys & high altitude wonder',
    image: './images/destinations/kashmir.jpg',
    count: 14,
    iconName: 'Mountain',
    popularDestinations: ['Kashmir', 'Manali', 'Ladakh', 'Ooty', 'Darjeeling']
  },
  {
    id: 'beaches',
    name: 'Sun-Kissed Beaches',
    tagline: 'Golden sands, turquoise waves & seaside sunsets',
    image: './images/destinations/goa.jpg',
    count: 8,
    iconName: 'SunMedium',
    popularDestinations: ['Goa', 'Pondicherry', 'Kanyakumari', 'Kerala Coast']
  },
  {
    id: 'waterfalls',
    name: 'Cascading Waterfalls',
    tagline: 'Thundering cascades deep inside lush rainforests',
    image: './images/destinations/lonavala.jpg',
    count: 12,
    iconName: 'Waves',
    popularDestinations: ['Meghalaya', 'Coorg', 'Athirappilly', 'Lonavala']
  },
  {
    id: 'wildlife',
    name: 'Untamed Wildlife Safaris',
    tagline: 'Spot Royal Bengal tigers, one-horned rhinos & wild elephants',
    image: './images/destinations/assam.jpg',
    count: 9,
    iconName: 'Footprints',
    popularDestinations: ['Assam (Kaziranga)', 'Thekkady (Periyar)', 'Bandipur', 'Ranthambore']
  },
  {
    id: 'historical',
    name: 'Historical Monuments & Forts',
    tagline: 'Step into legends of emperors, palaces & ancient citadels',
    image: './images/destinations/agra.jpg',
    count: 18,
    iconName: 'Landmark',
    popularDestinations: ['Agra', 'Jaipur', 'Delhi', 'Mysore', 'Jaisalmer']
  },
  {
    id: 'adventure',
    name: 'Adrenaline & High Thrills',
    tagline: 'White water rapids, paragliding, bungee & high passes',
    image: './images/destinations/rishikesh.jpg',
    count: 11,
    iconName: 'Compass',
    popularDestinations: ['Rishikesh', 'Ladakh', 'Manali', 'Goa']
  },
  {
    id: 'culture',
    name: 'Culture, Heritage & Spirituality',
    tagline: 'Living traditions, temple arts, folk dances & sacred aartis',
    image: './images/places/varanasi.jpg',
    count: 16,
    iconName: 'Sparkles',
    popularDestinations: ['Varanasi', 'Udaipur', 'Amritsar', 'Hampi', 'Madurai']
  }
];
