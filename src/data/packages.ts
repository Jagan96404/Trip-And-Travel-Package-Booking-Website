import { HolidayPackage } from '../types';

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'pkg-kashmir-honeymoon',
    title: 'Enchanted Kashmir & Gulmarg Luxury Escape',
    category: 'Honeymoon Packages',
    duration: { days: 6, nights: 5 },
    pricePerPerson: 28999,
    originalPrice: 35999,
    featuredImage: './images/destinations/kashmir.jpg',
    placesCovered: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonmarg', 'Dal Lake'],
    placesDetails: [
      {
        name: 'Srinagar',
        image: './images/places/srinagar.jpg',
        description: 'Mughal terraced gardens, ancient wooden bridges, and artisan saffron bazaars.',
      },
      {
        name: 'Gulmarg',
        image: './images/places/gulmarg.jpg',
        description: 'World-famous high altitude Gondola cable car and Apharwat snow meadows.',
      },
      {
        name: 'Pahalgam',
        image: './images/places/pahalgam.jpg',
        description: 'Betaab Valley pine groves and roaring turquoise Lidder riverbanks.',
      },
      {
        name: 'Sonmarg',
        image: './images/places/sonmarg.jpg',
        description: 'Meadow of Gold surrounded by Himalayan Thajiwas glacial peaks.',
      },
      {
        name: 'Dal Lake',
        image: './images/places/dallake.jpg',
        description: 'Carved cedarwood luxury houseboats and tranquil sunset Shikara cruises.',
      },
    ],
    hotelInfo: '5-Star Heritage Houseboat on Dal Lake & Luxury Pine Resort in Gulmarg',
    transportInfo: 'Private Luxury AC Innova Crysta for all sightseeing & transfers',
    inclusions: [
      '5 Nights accommodation in premier rooms & suite',
      'Daily gourmet buffet breakfast and 4-course dinner',
      'Complimentary Shikara ride with Kashmiri Kahwa on Dal Lake',
      'Phase 1 Gulmarg Gondola Cable Car tickets included',
      'Honeymoon cake, flower bed decoration & candle-lit dinner',
      'All toll taxes, parking, driver allowances, and airport transfers'
    ],
    exclusions: [
      'Domestic flights to/from Srinagar',
      'Pony rides or snow sledging personal rentals',
      'Personal laundry, beverages, and tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara', details: 'Warm welcome at Srinagar airport with Kashmiri saffron tea. Check-in to luxury traditional carved houseboat. Evening sunset Shikara ride across floating vegetable gardens.' },
      { day: 2, title: 'Srinagar Mughal Gardens to Gulmarg Meadow', details: 'Morning tour of Shalimar Bagh & Nishat Bagh. Scenic drive to Gulmarg through apple orchards. Gondola ride with panoramic views of Apharwat Peak.' },
      { day: 3, title: 'Gulmarg to Picturesque Pahalgam', details: 'Transfer to Pahalgam along the Lidder River. Visit saffron fields at Pampore and Avantipur ruins. Evening leisure amidst pine-scented breeze.' },
      { day: 4, title: 'Exploring Betaab Valley & Aru Valley', details: 'Excursion to legendary Betaab Valley and scenic Aru biosphere. Riverside picnic and photography tour.' },
      { day: 5, title: 'Sonmarg "Meadow of Gold" Day Excursion', details: 'Full day trip to Thajiwas Glacier. Pony trek or walk along turquoise Sindh river stream. Return to Srinagar for shopping.' },
      { day: 6, title: 'Departure with Cherished Memories', details: 'Final breakfast overlooking the tranquil waters. Transfer to Srinagar International Airport.' }
    ],
    rating: 4.95,
    reviewsCount: 142,
    badge: 'Bestseller Honeymoon'
  },
  {
    id: 'pkg-kerala-family',
    title: 'Emerald Kerala: Tea Valleys, Wildlife & Houseboats',
    category: 'Family Holidays',
    duration: { days: 6, nights: 5 },
    pricePerPerson: 22499,
    originalPrice: 28000,
    featuredImage: './images/destinations/kerala-backwaters.jpg',
    placesCovered: ['Cochin', 'Munnar', 'Thekkady', 'Alleppey Backwaters'],
    placesDetails: [
      {
        name: 'Cochin',
        image: './images/places/cochin.jpg',
        description: 'Colonial Fort Kochi, Chinese fishing nets, and spice trading alleys.',
      },
      {
        name: 'Munnar',
        image: './images/places/munnar.jpg',
        description: 'Endless rolling emerald tea plantations, Anamudi peak, and waterfalls.',
      },
      {
        name: 'Thekkady',
        image: './images/places/thekkady.jpg',
        description: 'Periyar Lake wildlife sanctuary, elephant herds, and spice estates.',
      },
      {
        name: 'Alleppey Backwaters',
        image: './images/places/alleppey.jpg',
        description: 'Private luxury houseboat cruise through palm-fringed canals and lagoons.',
      },
    ],
    hotelInfo: '4-Star & 5-Star Family Hill Resorts with Premium Private AC Houseboat',
    transportInfo: 'Dedicated AC Tempo Traveller / Innova with family-friendly courteous driver',
    inclusions: [
      '2 Nights in Munnar, 1 Night in Thekkady, 1 Night in Alleppey, 1 Night Cochin',
      'All meals on private Alleppey houseboat (authentic Kerala cuisine)',
      'Daily breakfast at all luxury resorts',
      'Eravikulam National Park safari entry',
      'Periyar Lake boat safari ticket for elephant spotting',
      'Spice plantation guided walk & Kathakali cultural show tickets'
    ],
    exclusions: [
      'Flight / Train tickets to Cochin',
      'Personal water sports or Ayurvedic treatments',
      'Camera fee at monuments'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Cochin to Munnar Hills', details: 'Pick up from Kochi airport. Drive past Cheeyappara & Valara cascading waterfalls into the misty hills of Munnar.' },
      { day: 2, title: 'Munnar Tea Gardens & Nilgiri Tahr Safari', details: 'Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and the interactive KDHP Tea Museum with tea tasting.' },
      { day: 3, title: 'Munnar to Thekkady Spice Sanctuary', details: 'Scenic descent into spice heartland. Spice plantation tour learning about cardamom, vanilla, and pepper. Evening martial arts (Kalaripayattu) show.' },
      { day: 4, title: 'Periyar Lake Safari to Alleppey Houseboat', details: 'Morning wildlife boat cruise. Board traditional wooden AC houseboat at Alleppey. Cruise past paddy fields, fishing nets, and palm lagoons.' },
      { day: 5, title: 'Alleppey to Cochin Heritage Fort', details: 'Morning cruise and hearty breakfast. Transfer to Fort Kochi. Walk past Chinese Fishing Nets, St. Francis Church, and Jewish Synagogue.' },
      { day: 6, title: 'Departure from Cochin', details: 'Souvenir shopping for spices and Kerala banana chips. Transfer to Cochin International Airport.' }
    ],
    rating: 4.9,
    reviewsCount: 188,
    badge: 'Top Family Choice'
  },
  {
    id: 'pkg-ladakh-adventure',
    title: 'Ultimate Ladakh: Khardung La & Pangong Lake Expedition',
    category: 'Adventure Trips',
    duration: { days: 7, nights: 6 },
    pricePerPerson: 29999,
    originalPrice: 38000,
    featuredImage: './images/destinations/ladakh.jpg',
    placesCovered: ['Leh', 'Nubra Valley', 'Turtuk', 'Pangong Tso', 'Magnetic Hill'],
    placesDetails: [
      {
        name: 'Leh',
        image: './images/places/leh.jpg',
        description: 'Shanti Stupa, Leh Palace, and Himalayan Buddhist monasteries.',
      },
      {
        name: 'Nubra Valley',
        image: './images/places/nubra.jpg',
        description: 'Hunder white sand dunes and double-humped Bactrian camel safaris.',
      },
      {
        name: 'Turtuk',
        image: './images/places/turtuk.jpg',
        description: 'Scenic northern frontier village with organic apricot orchards.',
      },
      {
        name: 'Pangong Tso',
        image: './images/places/pangong.jpg',
        description: 'High altitude crystal turquoise lake changing shades from dawn to dusk.',
      },
      {
        name: 'Magnetic Hill',
        image: './images/destinations/ladakh.jpg',
        description: 'Gravity-defying optical illusion hill and Indus-Zanskar Sangam confluence.',
      },
    ],
    hotelInfo: 'Boutique Leh Heritage Hotel & Deluxe Geodesic Domes at Nubra & Pangong',
    transportInfo: 'High-Clearance 4x4 Luxury Scorpio / Innova with Oxygen cylinder onboard',
    inclusions: [
      '6 Nights accommodation including luxury Swiss tents with heating',
      'Buffet breakfast & dinner daily curated for high altitude health',
      'Inner Line Permits & Wildlife environmental fees',
      'Camel safari voucher on Hunder white sand dunes',
      'Expert English/Hindi-speaking adventure tour captain & mechanic'
    ],
    exclusions: [
      'Flights to Leh (Kushok Bakula Rimpochee Airport)',
      'Motorbike rentals or fuel if biking',
      'Monastery entrance charges'
    ],
    itinerary: [
      { day: 1, title: 'Arrive in Leh & Acclimatization', details: 'Arrival at Leh. Mandatory rest to adjust to 11,500 ft altitude. Gentle evening walk to Leh Palace & Shanti Stupa.' },
      { day: 2, title: 'Sham Valley, Hall of Fame & Magnetic Hill', details: 'Visit Sangam (confluence of Indus & Zanskar rivers), Magnetic Hill gravity phenomenon, and Pathar Sahib Gurudwara.' },
      { day: 3, title: 'Crossing Khardung La to Nubra Valley', details: 'Scale Khardung La pass (17,582 ft). Descend into Nubra Valley. Ride double-humped Bactrian camels across Hunder sand dunes.' },
      { day: 4, title: 'Excursion to Turtuk (Balti Village)', details: 'Drive along the Shyok river to Turtuk, India’s northernmost village near LOC. Experience apricots and unique Balti culture.' },
      { day: 5, title: 'Nubra to Surreal Pangong Tso Lake', details: 'Off-road journey to Pangong Lake via Shyok. Witness the changing blues of the 134km-long high-altitude lake. Stargazing at night.' },
      { day: 6, title: 'Pangong over Chang La to Leh', details: 'Sunrise photography over Pangong. Cross Chang La pass (17,688 ft). Visit majestic Thiksey Monastery on return to Leh.' },
      { day: 7, title: 'Departure from Leh', details: 'Final breakfast overlooking the Stok Kangri peaks. Transfer to Leh Airport.' }
    ],
    rating: 4.98,
    reviewsCount: 95,
    badge: 'Adventure Thrill'
  },
  {
    id: 'pkg-rajasthan-royal-luxury',
    title: 'Royal Rajasthan: Palaces of Jaipur & Udaipur',
    category: 'Luxury Holidays',
    duration: { days: 6, nights: 5 },
    pricePerPerson: 36999,
    originalPrice: 47000,
    featuredImage: './images/destinations/udaipur.jpg',
    placesCovered: ['Jaipur', 'Pushkar', 'Jodhpur', 'Udaipur'],
    placesDetails: [
      {
        name: 'Jaipur',
        image: './images/places/jaipur.jpg',
        description: 'Amer Fort, Hawa Mahal, and royal courtyards of the Pink City.',
      },
      {
        name: 'Pushkar',
        image: './images/places/pushkar.jpg',
        description: 'Sacred ghats, Brahma Temple, and desert camel fair traditions.',
      },
      {
        name: 'Jodhpur',
        image: './images/places/jodhpur.jpg',
        description: 'Colossal Mehrangarh Fort overlooking indigo-blue havelis.',
      },
      {
        name: 'Udaipur',
        image: './images/places/udaipur.jpg',
        description: 'Lake Pichola sunset boat cruise and glistening white marble City Palace.',
      },
    ],
    hotelInfo: '5-Star Heritage Palaces (ITC Rajputana / Taj Fateh Prakash / Heritage Havelis)',
    transportInfo: 'Chauffeured Mercedes / BMW / Luxury Crysta throughout',
    inclusions: [
      '5 Nights in regal heritage suites with palace view',
      'Daily royal buffet breakfast & signature curated dinners',
      'Private sunset boat charter on Lake Pichola, Udaipur',
      'VIP priority entry passes to Amer Fort & City Palace',
      'Dedicated royal historian guide at all UNESCO monuments'
    ],
    exclusions: [
      'International / Domestic airfares',
      'Personal spa treatments',
      'Custom alcoholic beverages'
    ],
    itinerary: [
      { day: 1, title: 'Jaipur Royal Welcome & Chokhi Dhani', details: 'Traditional aarti & garland welcome at Jaipur palace hotel. Evening cultural dining experience with folk dances at Chokhi Dhani.' },
      { day: 2, title: 'Jaipur Forts & Royal Observatories', details: 'Ascend Amer Fort by royal jeep. Photo stop at Jal Mahal. Guided exploration of City Palace and Jantar Mantar solar observatory.' },
      { day: 3, title: 'Jaipur to Blue City Jodhpur via Pushkar', details: 'Drive via holy Pushkar Lake and Brahma Temple. Arrive in Jodhpur under the shadows of colossal Mehrangarh Fort.' },
      { day: 4, title: 'Mehrangarh Fort to Udaipur City of Lakes', details: 'Tour Mehrangarh and Jaswant Thada. Scenic drive through Aravallis with stop at intricate Ranakpur Jain Temple. Arrive in Udaipur.' },
      { day: 5, title: 'Venice of the East: Udaipur Lake Pichola', details: 'Visit Udaipur City Palace, Saheliyon Ki Bari, and enjoy a private sunset boat ride past Taj Lake Palace and Jagmandir.' },
      { day: 6, title: 'Departure from Udaipur', details: 'Leisurely champagne breakfast. Transfer to Udaipur Airport.' }
    ],
    rating: 4.97,
    reviewsCount: 110,
    badge: '5-Star Luxury'
  },
  {
    id: 'pkg-goa-friends',
    title: 'Vibrant Goa Beach Party & Yacht Adventure',
    category: 'Friends Group Trips',
    duration: { days: 4, nights: 3 },
    pricePerPerson: 13999,
    originalPrice: 18000,
    featuredImage: './images/destinations/goa.jpg',
    placesCovered: ['North Goa Beaches', 'South Goa Heritage', 'Mandovi River', 'Dudhsagar'],
    placesDetails: [
      {
        name: 'North Goa Beaches',
        image: './images/places/goa.jpg',
        description: 'Vibrant beach clubs at Vagator, Anjuna, and parasailing at Calangute.',
      },
      {
        name: 'South Goa Heritage',
        image: './images/destinations/pondicherry.jpg',
        description: 'Fontainhas Latin quarters, Portuguese churches, and serene Colva sands.',
      },
      {
        name: 'Mandovi River',
        image: './images/destinations/goa.jpg',
        description: 'Sunset catamaran yacht cruises and live DJ celebrations on water.',
      },
      {
        name: 'Dudhsagar',
        image: './images/destinations/lonavala.jpg',
        description: 'Four-tiered milky mountain waterfalls surrounded by Bhagwan Mahaveer reserve.',
      },
    ],
    hotelInfo: '4-Star Beachside Resort with Swimming Pool & Poolside Bar',
    transportInfo: 'Private AC Coach for group + self-drive scooters option',
    inclusions: [
      '3 Nights accommodation in interconnected superior group rooms',
      'Daily pool-side breakfast buffets',
      '2-Hour Private Sunset Catamaran Yacht Cruise with music & snacks',
      'Combo water sports pack (Jet Ski, Banana Ride, Bumper Ride, Parasailing)',
      'VIP entry vouchers to top Goa beach club'
    ],
    exclusions: [
      'Flight / Train tickets to Mopa / Dabolim',
      'Alcoholic drinks at clubs',
      'Scuba diving underwater video add-ons'
    ],
    itinerary: [
      { day: 1, title: 'Goa Arrival & Sunset Beach Chill', details: 'Pick up from Goa airport. Settle in resort. Evening sunset games and seafood feast at Anjuna & Vagator beach.' },
      { day: 2, title: 'Water Sports Rush & Private Yacht', details: 'Thrilling water sports package at Calangute. Late afternoon private catamaran cruise along Mandovi river with sunset DJ.' },
      { day: 3, title: 'Fontainhas Heritage & Nightlife Party', details: 'Explore colorful Portuguese Latin quarters of Fontainhas. Evening pub crawl and VIP beach club entry.' },
      { day: 4, title: 'Souvenir Flea Markets & Farewell', details: 'Shop at Saturday night market / local cashew & feni bazaars. Airport drop.' }
    ],
    rating: 4.88,
    reviewsCount: 215,
    badge: 'Group Special'
  },
  {
    id: 'pkg-rishikesh-weekend',
    title: 'Rishikesh Ganga River Rafting & Camping Retreat',
    category: 'Weekend Getaways',
    duration: { days: 3, nights: 2 },
    pricePerPerson: 7999,
    originalPrice: 11000,
    featuredImage: './images/destinations/rishikesh.jpg',
    placesCovered: ['Rishikesh', 'Shivpuri', 'Ram Jhula', 'Triveni Ghat'],
    placesDetails: [
      {
        name: 'Rishikesh',
        image: './images/places/rishikesh.jpg',
        description: 'Himalayan foothills, Beatles ashram, and meditation sanctuaries.',
      },
      {
        name: 'Shivpuri',
        image: './images/destinations/rishikesh.jpg',
        description: 'White-water rapids, cliff jumping, and luxury riverside glamping.',
      },
      {
        name: 'Ram Jhula',
        image: './images/places/rishikesh.jpg',
        description: 'Iconic suspension bridge spanning the emerald holy river Ganga.',
      },
      {
        name: 'Triveni Ghat',
        image: './images/places/varanasi.jpg',
        description: 'Grand evening Ganga Aarti with brass oil lamps and Vedic chants.',
      },
    ],
    hotelInfo: 'Luxury Riverside Glamping Camp with Swimming Pool & AC',
    transportInfo: 'Private AC Ertiga/Innova transfers from Dehradun airport / Haridwar station',
    inclusions: [
      '2 Nights luxury riverside glamping with attached washrooms',
      'All meals: 2 Breakfasts, 2 Lunches, 2 Dinners with evening barbecue & campfire',
      '16 KM River Rafting down the holy Ganges with cliff jumping',
      'Guided evening Ganga Aarti attendance at Triveni Ghat',
      'Music night, volleyball, badminton and camp games'
    ],
    exclusions: [
      'Bungee jumping or Giant Swing tickets (available as add-on)',
      'Transfers from Delhi unless requested'
    ],
    itinerary: [
      { day: 1, title: 'Riverside Camp Check-in & Evening Aarti', details: 'Check in to the scenic camp nestled in the Himalayan foothills. Evening visit to Ram Jhula and witness divine Triveni Ghat Aarti.' },
      { day: 2, title: '16 KM Ganga Rafting & Campfire BBQ', details: 'Gear up for high-octane white water rafting conquering rapids like Golf Course and Roller Coaster. Evening bonfire with acoustic music and barbecue.' },
      { day: 3, title: 'Beatles Ashram Walk & Departure', details: 'Morning yoga session by the river. Visit the historic Beatles Ashram before dropping back to Haridwar/Dehradun.' }
    ],
    rating: 4.92,
    reviewsCount: 167,
    badge: 'Weekend Favorite'
  },
  {
    id: 'pkg-varanasi-spiritual',
    title: 'Sacred Kashi, Ayodhya & Prayagraj Divine Tour',
    category: 'Spiritual Tours',
    duration: { days: 5, nights: 4 },
    pricePerPerson: 16499,
    originalPrice: 21000,
    featuredImage: './images/places/varanasi.jpg',
    placesCovered: ['Varanasi', 'Sarnath', 'Prayagraj Triveni Sangam', 'Ayodhya Ram Janmabhoomi'],
    placesDetails: [
      {
        name: 'Varanasi',
        image: './images/places/varanasi.jpg',
        description: 'Dashashwamedh Ghat Ganga Aarti and Kashi Vishwanath temple corridor.',
      },
      {
        name: 'Sarnath',
        image: './images/destinations/delhi.jpg',
        description: 'Dhamek Stupa and sacred deer park where Buddha delivered his first sermon.',
      },
      {
        name: 'Prayagraj Triveni Sangam',
        image: './images/places/varanasi.jpg',
        description: 'Holy confluence of Ganga, Yamuna, and mythical Saraswati.',
      },
      {
        name: 'Ayodhya Ram Janmabhoomi',
        image: './images/destinations/agra.jpg',
        description: 'Grand Shri Ram Mandir, Hanuman Garhi, and serene Sarayu river aarti.',
      },
    ],
    hotelInfo: '4-Star Premium Pilgrimage Hotels near major temples',
    transportInfo: 'Dedicated AC Vehicle with experienced spiritual tour coordinator',
    inclusions: [
      '4 Nights accommodation with pure vegetarian breakfasts & dinners',
      'Private dawn boat ride on Ganges witnessing subah-e-banaras',
      'Reserved VIP seating for Dashashwamedh Ghat Grand Ganga Aarti',
      'Special darshan facilitation at Kashi Vishwanath & Ayodhya Ram Mandir',
      'Boat ride at Prayagraj Triveni Sangam'
    ],
    exclusions: [
      'Personal pooja / pandit offerings',
      'Train or flight tickets'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi & Grand Ganga Aarti', details: 'Arrive at Varanasi airport. Evening witness the world-famous synchronized brass lamp Ganga Aarti from private boat.' },
      { day: 2, title: 'Kashi Vishwanath Corridor & Sarnath', details: 'Dawn boat ride past Manikarnika & Harishchandra Ghats. Darshan at Kashi Vishwanath temple. Afternoon visit Sarnath deer park where Buddha gave his first sermon.' },
      { day: 3, title: 'Excursion to Prayagraj Triveni Sangam', details: 'Drive to Prayagraj. Sacred holy dip at the confluence of Ganga, Yamuna, and Saraswati. Visit Anand Bhavan.' },
      { day: 4, title: 'Divine Pilgrimage to Ayodhya', details: 'Drive to Ayodhya. Darshan at the grand new Shri Ram Janmabhoomi temple, Hanuman Garhi, and Sarayu river aarti.' },
      { day: 5, title: 'Farewell & Blessings', details: 'Morning blessings and shopping for authentic Banarasi silk sarees. Drop at Varanasi/Ayodhya airport.' }
    ],
    rating: 4.96,
    reviewsCount: 128,
    badge: 'Divine Journey'
  },
  {
    id: 'pkg-budget-himachal',
    title: 'Himachal Explorer: Manali & Kasol Backpack Escape',
    category: 'Budget Holidays',
    duration: { days: 5, nights: 4 },
    pricePerPerson: 9999,
    originalPrice: 14500,
    featuredImage: './images/destinations/manali.jpg',
    placesCovered: ['Manali', 'Solang Valley', 'Kasol', 'Manikaran Sahib'],
    placesDetails: [
      {
        name: 'Manali',
        image: './images/places/manali.jpg',
        description: 'Old Manali cafes, cedar forests, and Beas river viewpoints.',
      },
      {
        name: 'Solang Valley',
        image: './images/destinations/manali.jpg',
        description: 'Paragliding, zorbing, and winter snow adventure park.',
      },
      {
        name: 'Kasol',
        image: './images/destinations/manali.jpg',
        description: 'Parvati Valley pine trails, indie cafes, and river walks.',
      },
      {
        name: 'Manikaran Sahib',
        image: './images/places/rishikesh.jpg',
        description: 'Natural medicinal hot sulfur springs and historic Gurudwara.',
      },
    ],
    hotelInfo: 'Comfortable Boutique Riverside Stays & Swiss Tents with mountain views',
    transportInfo: 'Delhi to Manali Luxury AC Volvo Bus + local shared/private sightseeing cabs',
    inclusions: [
      'Roundtrip Delhi-Manali-Delhi Semi-Sleeper AC Volvo tickets',
      '4 Nights comfortable mountain view accommodation',
      'Daily breakfast and dinner',
      'Sightseeing tour to Solang Valley, Atal Tunnel, and Jogini Waterfall',
      'Day excursion to Kasol hippie cafes and Manikaran natural hot springs'
    ],
    exclusions: [
      'Personal adventure sports gear rentals',
      'Lunches in cafes'
    ],
    itinerary: [
      { day: 1, title: 'Overnight Volvo from Delhi to Manali', details: 'Board luxury Volvo bus from Majnu Ka Tila, Delhi. Smooth overnight journey across Punjab and Himachal highways.' },
      { day: 2, title: 'Manali Arrival & Old Manali Cafes', details: 'Check-in to hotel. Relax and explore Hidimba Devi temple, Vashisht hot springs, and indie cafes of Old Manali.' },
      { day: 3, title: 'Solang Valley & Atal Tunnel Adventure', details: 'Full day excursion to Solang Valley for paragliding/zorbing. Drive through the historic Atal Tunnel to Sissu waterfall.' },
      { day: 4, title: 'Parvati Valley: Kasol & Manikaran', details: 'Transfer to Parvati Valley. Stroll through Kasol markets, try Israeli cuisine, and take a holy dip in Manikaran hot sulfur springs.' },
      { day: 5, title: 'Shopping at Mall Road & Return Volvo', details: 'Buy authentic Kullu shawls and Himachal apple jams. Evening board return Volvo to Delhi with amazing memories.' }
    ],
    rating: 4.86,
    reviewsCount: 310,
    badge: 'Super Saver'
  }
];
