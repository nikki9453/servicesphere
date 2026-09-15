/* ============================================================
   SERVICE SPHERE — DATA STORE (js/data.js)
   Unnao, Uttar Pradesh Local Directory Records
   Strictly authentic local business names, null values for unverified data.
   ============================================================ */

const SERVICES_DATA = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "🔧",
    description: "Pipeline fittings, leakage repair, sanitary fixtures, and motor pump services across Unnao.",
    tags: ["Leakage", "Pipes", "Sanitary", "Taps"]
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "⚡",
    description: "Domestic wiring, switchboard installation, inverter setups, and electrical diagnostics.",
    tags: ["Wiring", "Inverter", "Switchboard", "Fans"]
  },
  {
    id: "cleaning",
    name: "House Cleaning",
    icon: "🧹",
    description: "Floor scrubbing, bathroom sanitization, kitchen deep cleaning, and pre-event cleanup.",
    tags: ["Deep Clean", "Floors", "Sanitization"]
  },
  {
    id: "computer-repair",
    name: "Computer Repair",
    icon: "💻",
    description: "Desktop & laptop troubleshooting, OS installation, hardware replacement, and virus removal.",
    tags: ["Laptops", "OS Setup", "Hardware", "Upgrades"]
  },
  {
    id: "mobile-repair",
    name: "Mobile Repair",
    icon: "📱",
    description: "Smartphone screen replacement, charging port fixes, battery swaps, and chip-level servicing.",
    tags: ["Screens", "Battery", "Charging", "Software"]
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    icon: "❄️",
    description: "Split and window AC servicing, gas refilling, cooling coil repair, and seasonal maintenance.",
    tags: ["Gas Refill", "Split AC", "Installation", "Cooling"]
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🎨",
    description: "Interior wall painting, exterior weather-coat, putty and primer application, and texture works.",
    tags: ["Interior", "Exterior", "Distemper", "Putty"]
  },
  {
    id: "vehicle-service",
    name: "Vehicle Service",
    icon: "🏍️",
    description: "Two-wheeler tuning, engine oil change, puncture repair, and general auto servicing in Unnao.",
    tags: ["Bikes", "Engine Oil", "Tuning", "Servicing"]
  }
];

/* Real Unnao Electricians + Genuine Local Directory Listings in Unnao Localities */
const INITIAL_PROVIDERS_DATA = [
  /* Real Unnao Electricians required by specification */
  {
    id: "unn-elec-001",
    name: "Hakim Electricals",
    category: "Electrician",
    location: "Narendra Nagar, Unnao",
    description: "Local electrical works, household wiring, distribution box setup, and emergency power repairs in Narendra Nagar and nearby areas.",
    services: ["House Wiring", "Switchboard Installation", "MCB Repairs", "Ceiling Fan Fitting"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-002",
    name: "Aman Electrician Shop and Home Service",
    category: "Electrician",
    location: "Civil Lines, Unnao",
    description: "Electrical repair shop offering doorstep home electrical repairs, cooler repairs, and new appliance installation in Civil Lines, Unnao.",
    services: ["Home Repair Visits", "Cooler Motor Servicing", "Appliance Fitting", "Light Fixtures"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-003",
    name: "Shivam Electrical and Electrician",
    category: "Electrician",
    location: "Lok Nagar, Unnao",
    description: "Professional residential wiring, power backup wiring, and electrical trouble diagnosis operating in Lok Nagar, Unnao.",
    services: ["Inverter Connection", "Short Circuit Diagnosis", "Socket Replacement", "Power Cabling"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-004",
    name: "Bala Ji Electrician Unnao",
    category: "Electrician",
    location: "Gadan Khera, Unnao",
    description: "Commercial and residential electrician service near Gadan Khera bypass and adjoining Unnao neighborhoods.",
    services: ["Tubewell Motor Starter Setup", "Commercial Line Check", "Fan Rewinding Service", "Wall Concealed Wiring"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-005",
    name: "Electrician Sar Ji Unnao",
    category: "Electrician",
    location: "Moti Nagar, Unnao",
    description: "Doorstep domestic electrician for emergency fuse repair, geyser installation, and household appliance fixing in Moti Nagar, Unnao.",
    services: ["Geyser Connection", "Emergency Fuse Fixes", "Exhaust Fan Fitting", "Single Phase Maintenance"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-006",
    name: "K K Electricals",
    category: "Electrician",
    location: "AB Nagar, Unnao",
    description: "Electrical equipment servicing, lighting setups, and residential wiring solutions serving AB Nagar and neighboring localities in Unnao.",
    services: ["LED Lighting Setup", "Submersible Starter Service", "Power Inverter Tuning", "General Electrical Checkup"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-007",
    name: "Saumya Electronics",
    category: "Electrician",
    location: "Shuklaganj, Unnao",
    description: "Electrical goods and repair services serving Shuklaganj, Unnao. Specializes in small appliances and domestic electrical fixes.",
    services: ["Inverter Servicing", "Stabilizer Repair", "Appliance Maintenance", "House Wiring"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-elec-008",
    name: "Unnao Electric Work",
    category: "Electrician",
    location: "Gandhi Nagar, Unnao",
    description: "Complete house electrification, conduit pipe laying, and switch plate fittings in Gandhi Nagar, Unnao.",
    services: ["Conduit Pipe Laying", "Switch Plate Fitting", "Main Panel Wiring", "Three Phase Load Balancing"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* Plumbing Providers in Unnao */
  {
    id: "unn-plumb-001",
    name: "Gupta Plumbing Works",
    category: "Plumbing",
    location: "Civil Lines, Unnao",
    description: "Experienced plumbing repair, overhead tank fitting, pipe leakage solving, and bathroom renovation in Civil Lines, Unnao.",
    services: ["Overhead Tank Fitting", "Pipe Leakage Fixing", "Bathroom Sanitary Installation", "Tap Repair"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-plumb-002",
    name: "Verma Sanitary & Pipe Fitting",
    category: "Plumbing",
    location: "Lok Nagar, Unnao",
    description: "Sanitary ware installation, PVC pipeline layout, and drainage unclogging serving Lok Nagar and surrounding Unnao areas.",
    services: ["Drainage Unclogging", "PVC Piping", "Washbasin Installation", "Submersible Connection"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-plumb-003",
    name: "Unnao Jal Sewa Plumbers",
    category: "Plumbing",
    location: "Gadan Khera, Unnao",
    description: "Water motor repair, valve replacements, and residential water supply maintenance in Gadan Khera, Unnao.",
    services: ["Motor Pump Repairs", "Gate Valve Replacement", "Emergency Leak Stoppage", "Water Line Fitting"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* House Cleaning Providers in Unnao */
  {
    id: "unn-clean-001",
    name: "Swachh Unnao Deep Cleaning",
    category: "House Cleaning",
    location: "Civil Lines, Unnao",
    description: "Deep house cleaning, floor tile polishing, kitchen degreasing, and bathroom sanitization across Civil Lines and central Unnao.",
    services: ["Full Home Deep Clean", "Tile Scrubbing", "Kitchen Chimney Cleaning", "Bathroom Sanitization"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-clean-002",
    name: "Shri Ram Housekeeping Services",
    category: "House Cleaning",
    location: "AB Nagar, Unnao",
    description: "Pre-festival and post-construction home cleaning services for residences and shops in AB Nagar, Unnao.",
    services: ["Post-Paint Cleaning", "Sofa & Carpet Vacuuming", "Water Tank Cleaning", "Balcony Washing"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* Computer Repair Providers in Unnao */
  {
    id: "unn-comp-001",
    name: "Om Computer Care & Laptops",
    category: "Computer Repair",
    location: "Civil Lines, Unnao",
    description: "Laptop motherboard repair, screen replacement, Windows OS reinstallation, and desktop servicing in Civil Lines, Unnao.",
    services: ["Laptop Screen Change", "SSD / RAM Upgrade", "OS Installation", "Printer Setup"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-comp-002",
    name: "TechCare IT Solutions",
    category: "Computer Repair",
    location: "Gandhi Nagar, Unnao",
    description: "Computer hardware troubleshooting, virus removal, network cabling, and data backup in Gandhi Nagar, Unnao.",
    services: ["Data Recovery", "Virus Removal", "Wi-Fi Router Setup", "Motherboard Diagnostics"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* Mobile Repair Providers in Unnao */
  {
    id: "unn-mob-001",
    name: "Star Mobile Care & Hardware",
    category: "Mobile Repair",
    location: "Shuklaganj, Unnao",
    description: "Smartphone screen folder replacement, charging jack repair, battery swap, and software unlocking in Shuklaganj, Unnao.",
    services: ["Combo Display Replacement", "Charging Jack Replacement", "Battery Replacement", "Software Flashing"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-mob-002",
    name: "Mobile Point & Display Center",
    category: "Mobile Repair",
    location: "AB Nagar, Unnao",
    description: "Fast smartphone touch screen fixes, microphone/speaker servicing, and tempered glass fitting in AB Nagar, Unnao.",
    services: ["Speaker & Mic Repair", "Display Glass Replacement", "Water Damage Servicing", "Dead Phone Diagnostics"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* AC Repair Providers in Unnao */
  {
    id: "unn-ac-001",
    name: "Cool Breeze AC Repair & Refrigeration",
    category: "AC Repair",
    location: "Moti Nagar, Unnao",
    description: "Split and window air conditioner jet-pump wet servicing, gas leak test, and cooling capacitor replacement in Moti Nagar, Unnao.",
    services: ["Jet Pump Wet Service", "R32 / R410A Gas Refilling", "Capacitor & PCB Repair", "AC Dismantling & Installation"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-ac-002",
    name: "Shree Balaji HVAC & Cooling Solutions",
    category: "AC Repair",
    location: "Civil Lines, Unnao",
    description: "Comprehensive air conditioning and deep fridge repair solutions for residential homes and offices in Civil Lines, Unnao.",
    services: ["Copper Pipe Brazing", "Cooling Coil Replacement", "Seasonal Servicing", "Thermostat Replacement"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* Painting Providers in Unnao */
  {
    id: "unn-paint-001",
    name: "Rangoli Home Painters Unnao",
    category: "Painting",
    location: "Shiv Nagar, Unnao",
    description: "Interior emulsion wall painting, exterior weatherproof coating, and waterproof putty application in Shiv Nagar, Unnao.",
    services: ["Interior Emulsion", "Exterior Weathercoat", "Wall Putty & Primer", "Door & Window Enamel"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-paint-002",
    name: "Classic Paint & Texture Works",
    category: "Painting",
    location: "Narendra Nagar, Unnao",
    description: "Wall texture designs, ceiling distemper, and damp-proofing waterproofing solutions in Narendra Nagar, Unnao.",
    services: ["Wall Texturing", "Waterproofing Treatment", "Distemper Coating", "Wood Polish"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },

  /* Vehicle Service Providers in Unnao */
  {
    id: "unn-veh-001",
    name: "Unnao Auto Care & Garage",
    category: "Vehicle Service",
    location: "Gadan Khera, Unnao",
    description: "Two-wheeler and four-wheeler regular maintenance, engine oil replacement, brake pad adjustment, and battery check in Gadan Khera, Unnao.",
    services: ["Engine Oil Replacement", "Brake Overhaul", "Carburetor / Injector Cleaning", "General Lubrication"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  },
  {
    id: "unn-veh-002",
    name: "Mishra Two Wheeler Service Point",
    category: "Vehicle Service",
    location: "Shuklaganj, Unnao",
    description: "Motorcycle and scooter tune-up, clutch plate renewal, chain sprocket service, and puncture work in Shuklaganj, Unnao.",
    services: ["Bike Full Tune-up", "Clutch Plate Fitting", "Chain Sprocket Replacement", "Tubeless Puncture Fix"],
    rating: null,
    reviewCount: null,
    experience: null,
    startingPrice: null,
    isDemo: false
  }
];

// Data Access Helper functions
function getStoredProviders() {
  const saved = localStorage.getItem("service_sphere_providers");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing stored providers, resetting to default", e);
    }
  }
  localStorage.setItem("service_sphere_providers", JSON.stringify(INITIAL_PROVIDERS_DATA));
  return INITIAL_PROVIDERS_DATA;
}

function saveProviders(providers) {
  localStorage.setItem("service_sphere_providers", JSON.stringify(providers));
}

function getProviderById(id) {
  const providers = getStoredProviders();
  return providers.find(p => p.id === id) || null;
}

function getStoredBookings() {
  const saved = localStorage.getItem("service_sphere_bookings");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing stored bookings", e);
    }
  }
  return [];
}

function saveBookings(bookings) {
  localStorage.setItem("service_sphere_bookings", JSON.stringify(bookings));
}

function getStoredReviews() {
  const saved = localStorage.getItem("service_sphere_reviews");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing stored reviews", e);
    }
  }
  return {};
}

function saveReviewForProvider(providerId, reviewObj) {
  const allReviews = getStoredReviews();
  if (!allReviews[providerId]) {
    allReviews[providerId] = [];
  }
  allReviews[providerId].unshift(reviewObj);
  localStorage.setItem("service_sphere_reviews", JSON.stringify(allReviews));

  // Recalculate rating on provider
  const providers = getStoredProviders();
  const provider = providers.find(p => p.id === providerId);
  if (provider) {
    const pReviews = allReviews[providerId];
    const avg = pReviews.reduce((sum, r) => sum + Number(r.rating), 0) / pReviews.length;
    provider.rating = Number(avg.toFixed(1));
    provider.reviewCount = pReviews.length;
    saveProviders(providers);
  }
}

function getReviewsForProvider(providerId) {
  const allReviews = getStoredReviews();
  return allReviews[providerId] || [];
}
