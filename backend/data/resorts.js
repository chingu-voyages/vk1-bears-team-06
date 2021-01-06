const resorts = [
  {
    name: "Lakawon Island Resort",
    price_per_night: 2804,
    description:
      "On a lush 16-hectare island with white-sand beaches, this relaxed resort is 5 km from the jetty in Cadiz Viejo, a village on the mainland.",
    address: "Cadiz Viejo",
    city: "Cadiz",
    province: "Negros Occidental",
    zip_code: "6121",
    phone: "(034) 213 6354",
    website: 'www.lakawonislandresort.com',
    amenities: 
      {
        tv: false,
        reservation: false,
        moderate_noise: true,
        free_wifi: true,
        trendy: true,
        credit_card: true,
        bar: true,
        animals: true,
        kids: true
    },
    image:
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e"
  },
  {
    name: "Bluewater Maribago Beach Resort",
    price_per_night: 4156,
    description:
      "Set in a complex of thatch-roofed buildings on the Cebu Strait, this posh beachfront resort is 1 km from Mactan Island Aquarium and 4 km from the Magellan Shrine.",
    address: "Buyong",
    city: "Lapu-Lapu",
    province: "Maribago Mactan Island",
    zip_code: "6015",
    phone: "(032) 402 4100",
    website: "http://www.bluewater.com.ph/",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Camayan Beach Resort",
    price_per_night: 9316,
    description:
      "Set in a complex of thatch-roofed buildings on the Cebu Strait, this posh beachfront resort is 1 km from Mactan Island Aquarium and 4 km from the Magellan Shrine.",
    address: "Ilanin Road",
    city: "Subic Bay Freeport Zone",
    province: "Bataan",
    zip_code: "2222",
    latitude: 14.7647213,
    longitude: 120.250671,
    phone: "(047) 252 8000",
    website: "https://www.camayanbeachresort.ph/",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Sabang Inn Beach Resort",
    price_per_night: 1195,
    description:
      "Flanked by palm trees, this relaxed hotel on Sabang Beach is 2 minutes on foot from Sabang ferry terminal, 12 km from the Malasimbo Amphitheater and 18 km from Tamaraw Falls.",
    address: "Sabang Beach",
    city: "Puerto Galera",
    province: "Oriental Mindoro",
    zip_code: "5203",
    phone: "(043) 287 3198",
    website: "http://www.sabanginn.com/",
    image:
      "https://images.unsplash.com/photo-1495954484750-af469f2f9be5",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: true,
        free_wifi: true,
        trendy: true,
        credit_card: true,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Playa Tropical Resort Hotel",
    price_per_night: 2479,
    description:
      "Set 11 km from the Baroque Paoay Church, this traditional Balinese-inspired beachfront resort is 17 km from the scenic Paoay Sand Dunes.",
    address: "Barangay Victoria Currimao",
    city: "Laoag",
    province: "Ilocos Norte",
    zip_code: "2900",
    phone: "(077) 670 1211",
    website: "https://playatropical.ph/",
    image:
      "https://images.unsplash.com/photo-1476673160081-cf065607f449",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Utopia Resort & Spa",
    price_per_night: 2799,
    description:
      "Utopia Resort & Spa; a luxury resort in the Philippines. Join us at our five star resort in Puerto Galera! Utopia Resort & Spa is perched on top of the hill at Palangan, the first Barangay on the peninsular of Puerto Galera.",
    address: "Palangan Rd",
    city: "Puerto Galera",
    province: "Oriental Mindoro",
    zip_code: "5203",
    phone: "(043) 287 3681",
    email: "info@utopiaresort.ph",
    website: "https://utopiaresort.ph/",
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Duli Beach Resort",
    price_per_night: 1635,
    description:
      "Set on Duli Beach overlooking Base Bay, this unfussy resort surrounded by palm trees is 4 km from Verde Safari Beach and 7 km from Makinit Hot Springs.",
    address: "Barangay Bucana",
    city: "El Nido",
    province: "Palawan",
    zip_code: "5313",
    phone: "(043) 287 3681",
    email: "info@dulibeach.com",
    website: "https://www.dulibeach.com/",
    image:
      "https://images.unsplash.com/photo-1452784444945-3f422708fe5e",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Whispering Palms Island Resort",
    price_per_night: 1494,
    description:
      "At our resort going traditional charm and uniqueness of Philippine culture hand in hand. In an idyllic bay with turquoise-tropical water provides the Whispering Palms Bungalow Resort on Sipaway Island our discerning travelers the amenities of a comfortable life, and at the same time easy access to numerous Activities.",
    address: "Sipaway Island",
    city: "San Carlos",
    province: "Negros Occidental",
    zip_code: "6127",
    phone: "0917 310 6246",
    website: "https://whispering-palms.com/",
    image:
      "https://images.unsplash.com/photo-1504814532849-cff240bbc503",

    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Hoyohoy Villas",
    price_per_night: 2176,
    description:
      "Set on a serene, sandy beach along the Philippine Sea, this relaxed resort surrounded by palm trees is a 5-minute walk from Sta. Fe ferry terminal and 26 km from the remnants of a Spanish fort at Kota Park.",
    address: "Bantayan Island,F. Roska Street",
    city: "Santa Fe",
    province: "Cebu",
    zip_code: "6047",
    phone: "(032) 438 9021",
    email: "info@hoyohoy-villas.com",
    website: "http://hoyohoy-villas.com/",
    image:
      "https://images.unsplash.com/photo-1424581342241-2b1aba4d3462",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: true,
        free_wifi: false,
        trendy: false,
        credit_card: true,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Blue Ribbon Dive Resort",
    price_per_night: 3105,
    description:
      "Overlooking the bay of Sabang, this relaxed waterfront resort is a 4-minute walk from Sabang Beach and 70 km from Mamburao Airport.",
    address: "National Road",
    city: "Mabini",
    province: "Batangas",
    zip_code: "4202",
    phone: "0917 893 2719",
    website: "https://blueribbondivers.com/",
    image:
      "https://images.unsplash.com/photo-1484821582734-6c6c9f99a672",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Blue Ribbon Dive Resort",
    price_per_night: 2689,
    description:
      "Set along a white-sand beach, this upscale relaxed resort is a 10-minute walk from the shops and restaurants of D'Mall, and 6 km from the tranquil Puka Shell Beach.",
    address: "Beachfront, Station 2 Balabag Boracay Island",
    city: "Boracay",
    province: "Aklan",
    zip_code: "5608",
    phone: "0917 893 2719",
    email: "info@blueribbondivers.com",
    website: "https://blueribbondivers.com/",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Henann Regency Resort and Spa",
    price_per_night: 2689,
    description:
      "Set along a white-sand beach, this upscale relaxed resort is a 10-minute walk from the shops and restaurants of D'Mall, and 6 km from the tranquil Puka Shell Beach.",
    address: "Beachfront, Station 2 Balabag Boracay Island",
    city: "Malay",
    province: "Aklan",
    zip_code: "5608",
    phone: "(036) 288 6111",
    website: "https://www.henann.com/boracay/henannregency/",
    image:
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
 
  },
  {
    name: "Bohol Sunside Resort",
    price_per_night: 1439,
    description:
      "This relaxed hotel in a low-rise building surrounded by trees is 2 km from Alona Beach on the Bohol Sea, 11 km from the limestone Hinagdanan Cave and 18 km from Tagbilaran Airport.",
    address: "Bohol Sunside Resort",
    city: "Panglao",
    province: "Bohol",
    zip_code: "6340",
    phone: "(038) 502 4001",
    email: "info@bohol-sunside-resort.com",
    website: "https://bohol-sunside-resort.com/",
    image:
      "https://images.unsplash.com/photo-1579625197446-3b8c000acfac",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Kawili Resort",
    price_per_night: 1098,
    description:
      "Kawili resort is located 500m down the road from the cozy town General Luna. The resort features cottages with horrible WIFI, hot water, AC, relaxing lounging area with swimming pool. The livingroom opens everyday at 8am and serves breakfast, sandwiches and cold drinks.",
    address: "Tourism Rd",
    city: "General Luna",
    province: "Surigao del Norte",
    zip_code: "8419",
    phone: "0947 475 9922",
    website: "http://siargaophilippines.com/",
    image:
      "https://images.unsplash.com/photo-1590077983181-7cb31a76ed7f",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
 
  },
  {
    name: "Blanco Beach Resort",
    price_per_night: 1098,
    description:
      "Blanco Beach Resort brings you in to a whole new world of what we call, paradise. Blanco Beach Resort makes sure you’ll get the getaway you deserve, a time for you to embrace nature at its finest and rediscover live through relaxation and meditation. We’ll take care of your needs to reach your ultimate venture to explore paradise.",
    address: "Brgy. Logon",
    city: "Daanbantayan Malapascua Island",
    province: "Cebu",
    zip_code: "6013",
    phone: "0947 475 9922",
    website: "http://blancobeachresort.com/",
    image:
      "https://images.unsplash.com/photo-1548780772-e21fa3f2cfd7",
    amenities:
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Vista Mar Beach Resort & Country Club",
    price_per_night: 2929,
    description:
      "The resort nestled along the eastern island's line of beaches and locates 15 minutes from Mactan International Airport. It occupies a hectares residential cum leisure development that places Cebu in the roster of world exclusive resort destination.",
    address: "Dapdap",
    city: "Mactan Lapu-Lapu",
    province: "Cebu",
    zip_code: "6015",
    phone: "(032) 236 0197",
    email: "info@mactanvistamarbeachresort.com",
    website: "http://www.mactanvistamarbeachresort.com/",
    image:
      "https://images.unsplash.com/photo-1573808479782-7c84a7707492",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Puerto Del Sol Beach Resort and Hotel Club",
    price_per_night: 3601,
    description:
      "Puerto Del Sol Beach Resort is truly a jewel of the Philippine Isle. Its gleaming pools and airy interiors are artful creations evoking the mysteries of the past along with the serendipitous scent of the present.",
    address: "Patar Rd. Barangay Ilog Malino",
    city: "Bolinao",
    province: "Pangasinan",
    zip_code: "2406",
    phone: "(075) 696 0530",
    email: "info@puertodelsol.com.ph",
    website: "http://www.puertodelsol.com.ph/",
    amenities: 
    {
      tv: true,
      reservation: true,
      moderate_noise: false,
      free_wifi: false,
      trendy: false,
      credit_card: false,
      bar: true,
      animals: true,
      kids: true
  },
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  {
    name: "Alta Cebu - resort and convention centre",
    price_per_night: 1412,
    description:
      "This low-key resort, set in gardens beside a river, lies 3 km from scenic beaches and diving at Matcan Reef Flat and 12 km from the 17th-century, Spanish Fort San Pedro.",
    address: "Narra street",
    city: "Cordova",
    province: "Cebu",
    zip_code: "6017",
    phone: "(032) 496 7399",
    website: null,
    image:
      "https://images.unsplash.com/photo-1578721730435-453c4055edef",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }

  },
  {
    name: "Buceo Anilao Beach & Dive Resort",
    price_per_night: 3458,
    description:
      "Across colorful buildings on a lush beachfront property along the Verde Island Passage, this laid-back resort is 8 km from hiking on Mount Panay and 34 km from the Pan–Philippine Highway.",
    address: "Bauan - Mabini Rd",
    city: "Mabini",
    province: "Batangas",
    zip_code: "4202",
    phone: "0917 579 7333",
    website: "https://buceoanilao.business.site/",
    image:
      "https://images.unsplash.com/photo-1598090842581-c94b8e1e4bfb",
    amenities: 
      {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
    }
  },
  {
    name: "Dakak Park and Beach Resort",
    price_per_night: 5793,
    description:
      "On a serene beach along the Sulu Sea coast, this relaxed resort is 13 km from Gloria's Fantasyland theme park and 25 km from Dipolog Airport.",
    address: "Barangay Taguilon",
    city: "Dapitan",
    province: "Zamboanga del Norte",
    zip_code: "7101",
    phone: "(065) 213 6813",
    email: "info@dakakresort.com",
    website: "http://dakakresort.com/",
    image:
      "https://images.unsplash.com/photo-1585673103161-2ddf1521b8f6",
    amenities: {
        tv: true,
        reservation: true,
        moderate_noise: false,
        free_wifi: false,
        trendy: false,
        credit_card: false,
        bar: true,
        animals: true,
        kids: true
  }
  }
];

export default resorts







