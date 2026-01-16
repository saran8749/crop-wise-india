export type RiskLevel = 'low' | 'medium' | 'high';
export type WaterLevel = 'low' | 'medium' | 'high';
export type ProfitLevel = 'low' | 'medium' | 'high';
export type Season = 'kharif' | 'rabi' | 'zaid' | 'all';
export type SoilType = 'black' | 'red' | 'alluvial' | 'laterite' | 'sandy' | 'loamy' | 'clay';

export interface CropCalendar {
  sowing: string;
  growth: string;
  harvest: string;
}

export interface RiskFactors {
  climate: RiskLevel;
  pest: RiskLevel;
  waterDependency: RiskLevel;
}

export interface Crop {
  id: string;
  name: string;
  localName?: string;
  image: string;
  imageAlt: string;
  duration: string;
  season: Season[];
  waterRequirement: WaterLevel;
  waterDescription: string;
  soilTypes: string[];
  soilCategories: SoilType[];
  riskFactors: RiskFactors;
  profitLevel: ProfitLevel;
  marketDemand: string;
  facilities: string[];
  calendar: CropCalendar;
  description: string;
  fullDescription: string[];
}

export interface District {
  id: string;
  name: string;
  zone: string;
  topCrops: string[];
  soilType: SoilType[];
}

export interface Region {
  id: string;
  name: string;
  states?: string[];
  districts?: District[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'partly-cloudy';
  alerts: WeatherAlert[];
}

export interface WeatherAlert {
  type: 'heat' | 'rain' | 'flood' | 'drought' | 'frost' | 'cyclone';
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface MarketPrice {
  cropId: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

// Complete crop database with extended info
export const crops: Record<string, Crop> = {
  rice: {
    id: 'rice',
    name: 'Rice',
    localName: 'நெல்',
    image: '/crops/rice.jpg',
    imageAlt: '/crops/rice-alt.jpg',
    duration: '110-140 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'high',
    waterDescription: 'Requires standing water during early growth stages. Needs 1200-1500mm of water.',
    soilTypes: ['Alluvial soil', 'Clay loam soil', 'Black cotton soil'],
    soilCategories: ['alluvial', 'clay', 'black'],
    riskFactors: {
      climate: 'medium',
      pest: 'high',
      waterDependency: 'high',
    },
    profitLevel: 'high',
    marketDemand: 'Stable year-round demand, essential food crop',
    facilities: ['Irrigation canals / borewell', 'Nursery preparation area', 'Transplantation labor', 'Fertilizer availability', 'Harvesting equipment'],
    calendar: {
      sowing: 'June - July',
      growth: 'August - September',
      harvest: 'October - November',
    },
    description: 'Rice is the staple food crop of Tamil Nadu, extensively cultivated in the Cauvery Delta region.',
    fullDescription: [
      'Rice is the primary staple food for over half of the world\'s population and is the most important crop in Tamil Nadu.',
      'It requires flooded conditions for optimal growth and is highly sensitive to water stress during critical growth stages.',
      'Modern varieties offer high yields but require proper nutrient management and pest control for successful cultivation.'
    ],
  },
  sugarcane: {
    id: 'sugarcane',
    name: 'Sugarcane',
    localName: 'கரும்பு',
    image: '/crops/sugarcane.jpg',
    imageAlt: '/crops/sugarcane-alt.jpg',
    duration: '12-18 months',
    season: ['all'],
    waterRequirement: 'high',
    waterDescription: 'Requires regular irrigation throughout growth. Needs 1500-2000mm of water.',
    soilTypes: ['Deep loamy soil', 'Well-drained alluvial soil', 'Black soil'],
    soilCategories: ['loamy', 'alluvial', 'black'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'high',
    },
    profitLevel: 'high',
    marketDemand: 'High demand from sugar mills and jaggery units',
    facilities: ['Sugar mill proximity', 'Irrigation system', 'Transport facilities', 'Storage sheds'],
    calendar: {
      sowing: 'January - March',
      growth: 'April - October',
      harvest: 'December - March',
    },
    description: 'Major commercial crop providing raw material for sugar industry.',
    fullDescription: [
      'Sugarcane is a tall perennial grass that stores sugar in its stems, making it the primary source of sugar production in India.',
      'It is a long-duration crop requiring consistent care and irrigation throughout its 12-18 month growth cycle.',
      'The crop provides multiple products including sugar, jaggery, molasses, and bagasse for various industrial applications.'
    ],
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    localName: 'வாழை',
    image: '/crops/banana.jpg',
    imageAlt: '/crops/banana-alt.jpg',
    duration: '10-12 months',
    season: ['all'],
    waterRequirement: 'high',
    waterDescription: 'Requires consistent moisture. Drip irrigation recommended.',
    soilTypes: ['Deep loamy soil', 'Well-drained clay loam', 'Red soil'],
    soilCategories: ['loamy', 'clay', 'red'],
    riskFactors: {
      climate: 'medium',
      pest: 'medium',
      waterDependency: 'high',
    },
    profitLevel: 'high',
    marketDemand: 'Consistent domestic and export demand',
    facilities: ['Tissue culture lab access', 'Cold storage', 'Drip irrigation', 'Wind breaks'],
    calendar: {
      sowing: 'June - August',
      growth: 'September - March',
      harvest: 'April - June',
    },
    description: 'Important fruit crop with multiple varieties cultivated across Tamil Nadu.',
    fullDescription: [
      'Banana is one of the most important fruit crops in Tamil Nadu, grown across various agro-climatic zones.',
      'Multiple varieties like Poovan, Rasthali, Nendran, and Grand Naine cater to different market preferences.',
      'It is a highly profitable crop with year-round demand for both fresh consumption and processing industries.'
    ],
  },
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    localName: 'தேங்காய்',
    image: '/crops/coconut.jpg',
    imageAlt: '/crops/coconut-alt.jpg',
    duration: '6-8 years to full yield',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Requires moderate water with good drainage. Tolerates dry spells once established.',
    soilTypes: ['Sandy loam', 'Laterite soil', 'Coastal alluvial'],
    soilCategories: ['sandy', 'laterite', 'alluvial'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'medium',
    },
    profitLevel: 'high',
    marketDemand: 'Steady demand for oil, copra, and tender coconut',
    facilities: ['Coconut processing unit', 'Oil mill access', 'Climbing equipment', 'Storage facility'],
    calendar: {
      sowing: 'June - September',
      growth: 'Year-round',
      harvest: 'Year-round',
    },
    description: 'Perennial crop providing multiple products including oil, fiber, and water.',
    fullDescription: [
      'Coconut is known as the "Tree of Life" due to its extensive range of products and by-products.',
      'It is a perennial crop that starts yielding after 6-8 years and continues production for 60-80 years.',
      'Every part of the coconut tree is useful - from fruit, husk, shell to leaves and trunk for various applications.'
    ],
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton',
    localName: 'பருத்தி',
    image: '/crops/cotton.jpg',
    imageAlt: '/crops/cotton-alt.jpg',
    duration: '150-180 days',
    season: ['kharif'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water needs. Sensitive to waterlogging.',
    soilTypes: ['Black cotton soil', 'Deep alluvial', 'Medium black soil'],
    soilCategories: ['black', 'alluvial'],
    riskFactors: {
      climate: 'medium',
      pest: 'high',
      waterDependency: 'medium',
    },
    profitLevel: 'medium',
    marketDemand: 'Strong demand from textile industry',
    facilities: ['Ginning mills', 'Pest management', 'Storage godowns', 'Transport access'],
    calendar: {
      sowing: 'May - June',
      growth: 'July - October',
      harvest: 'November - January',
    },
    description: 'Major fiber crop supporting the textile industry of Tamil Nadu.',
    fullDescription: [
      'Cotton is the most important fiber crop in India, providing raw material for the massive textile industry.',
      'Black soil regions are ideal for cotton cultivation due to their moisture retention capacity.',
      'Modern Bt cotton varieties have improved yields but require integrated pest management strategies.'
    ],
  },
  maize: {
    id: 'maize',
    name: 'Maize',
    localName: 'மக்காச்சோளம்',
    image: '/crops/maize.jpg',
    imageAlt: '/crops/maize-alt.jpg',
    duration: '90-120 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water requirement. Critical during tasseling stage.',
    soilTypes: ['Well-drained loamy soil', 'Sandy loam', 'Alluvial soil'],
    soilCategories: ['loamy', 'sandy', 'alluvial'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'medium',
    },
    profitLevel: 'medium',
    marketDemand: 'High demand for poultry feed and starch industries',
    facilities: ['Drying yards', 'Storage silos', 'Feed mill access', 'Shelling equipment'],
    calendar: {
      sowing: 'June - July / Jan - Feb',
      growth: 'Aug - Sept / Feb - March',
      harvest: 'Sept - Oct / April - May',
    },
    description: 'Versatile cereal crop used for food, feed, and industrial purposes.',
    fullDescription: [
      'Maize is a versatile crop with multiple uses including human food, animal feed, and industrial applications.',
      'It grows well in various soil types and has a relatively short duration compared to other cereals.',
      'The crop provides excellent returns when linked to poultry, dairy, or starch manufacturing industries.'
    ],
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut',
    localName: 'நிலக்கடலை',
    image: '/crops/groundnut.jpg',
    imageAlt: '/crops/groundnut-alt.jpg',
    duration: '100-130 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Requires well-distributed rainfall.',
    soilTypes: ['Sandy loam', 'Red sandy soil', 'Light textured soil'],
    soilCategories: ['sandy', 'red', 'loamy'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Consistent demand for oil extraction and snacks',
    facilities: ['Oil mills', 'Drying facilities', 'Decorticating machines', 'Storage'],
    calendar: {
      sowing: 'June - July',
      growth: 'August - September',
      harvest: 'October - November',
    },
    description: 'Important oilseed crop well-suited to dry regions.',
    fullDescription: [
      'Groundnut is a major oilseed crop in India, well-adapted to semi-arid regions with sandy soils.',
      'It is a legume that fixes atmospheric nitrogen, improving soil fertility for subsequent crops.',
      'The crop provides both oil for cooking and protein-rich cake for animal feed and human consumption.'
    ],
  },
  turmeric: {
    id: 'turmeric',
    name: 'Turmeric',
    localName: 'மஞ்சள்',
    image: '/crops/turmeric.jpg',
    imageAlt: '/crops/turmeric-alt.jpg',
    duration: '7-9 months',
    season: ['kharif'],
    waterRequirement: 'medium',
    waterDescription: 'Requires regular moisture but not waterlogging.',
    soilTypes: ['Well-drained loamy soil', 'Alluvial soil', 'Forest loam'],
    soilCategories: ['loamy', 'alluvial'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'medium',
    },
    profitLevel: 'high',
    marketDemand: 'Strong export demand and domestic consumption',
    facilities: ['Boiling units', 'Drying yards', 'Polishing drums', 'Cold storage'],
    calendar: {
      sowing: 'May - June',
      growth: 'July - December',
      harvest: 'January - March',
    },
    description: 'High-value spice crop with medicinal and culinary importance.',
    fullDescription: [
      'Turmeric is a high-value spice crop with increasing global demand for its medicinal properties.',
      'Erode district in Tamil Nadu is known as the "Turmeric City" and hosts Asia\'s largest turmeric market.',
      'The curcumin content determines quality, with higher concentrations fetching premium prices in export markets.'
    ],
  },
  millets: {
    id: 'millets',
    name: 'Millets',
    localName: 'சிறுதானியங்கள்',
    image: '/crops/millets.jpg',
    imageAlt: '/crops/millets-alt.jpg',
    duration: '70-100 days',
    season: ['kharif'],
    waterRequirement: 'low',
    waterDescription: 'Highly drought tolerant. Minimal irrigation needed.',
    soilTypes: ['Red soil', 'Sandy loam', 'Shallow black soil'],
    soilCategories: ['red', 'sandy', 'black'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Growing health food market demand',
    facilities: ['Dehulling machines', 'Processing units', 'Storage', 'Market linkage'],
    calendar: {
      sowing: 'June - July',
      growth: 'August - September',
      harvest: 'September - October',
    },
    description: 'Climate-resilient nutritious grains gaining popularity as superfoods.',
    fullDescription: [
      'Millets are ancient grains now recognized as superfoods due to their superior nutritional profile.',
      'They are highly drought-tolerant and can thrive in poor soils, making them ideal for climate-resilient farming.',
      '2023 was declared International Year of Millets, boosting awareness and market demand globally.'
    ],
  },
  pulses: {
    id: 'pulses',
    name: 'Pulses',
    localName: 'பருப்பு வகைகள்',
    image: '/crops/pulses.jpg',
    imageAlt: '/crops/pulses-alt.jpg',
    duration: '90-120 days',
    season: ['rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Requires minimal irrigation.',
    soilTypes: ['Loamy soil', 'Black soil', 'Red soil'],
    soilCategories: ['loamy', 'black', 'red'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'High protein demand ensures stable market',
    facilities: ['Dal mills', 'Storage godowns', 'Grading equipment'],
    calendar: {
      sowing: 'October - November',
      growth: 'December - January',
      harvest: 'February - March',
    },
    description: 'Essential protein source and nitrogen-fixing crops improving soil health.',
    fullDescription: [
      'Pulses are the primary source of plant protein for millions of vegetarians in India.',
      'As legumes, they fix atmospheric nitrogen in soil, reducing fertilizer requirements for subsequent crops.',
      'India is the largest producer, consumer, and importer of pulses, ensuring strong domestic demand.'
    ],
  },
  greenGram: {
    id: 'greenGram',
    name: 'Green Gram',
    localName: 'பச்சை பயறு',
    image: '/crops/greengram.jpg',
    imageAlt: '/crops/greengram-alt.jpg',
    duration: '60-75 days',
    season: ['kharif', 'rabi', 'zaid'],
    waterRequirement: 'low',
    waterDescription: 'Very drought tolerant. Can grow with minimal water.',
    soilTypes: ['Sandy loam', 'Loamy soil', 'Well-drained soil'],
    soilCategories: ['sandy', 'loamy'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Good demand for sprouts and dal',
    facilities: ['Threshing floor', 'Storage bags', 'Market access'],
    calendar: {
      sowing: 'Feb-Mar / Jun-Jul / Oct-Nov',
      growth: 'Growing period varies',
      harvest: '60-75 days after sowing',
    },
    description: 'Quick-growing pulse crop ideal for intercropping.',
    fullDescription: [
      'Green gram is the shortest duration pulse crop, making it perfect for multiple cropping systems.',
      'It is highly valued for sprouting, which enhances its nutritional value and is widely consumed.',
      'The crop can be grown in all three seasons, providing flexibility in farming operations.'
    ],
  },
  blackGram: {
    id: 'blackGram',
    name: 'Black Gram',
    localName: 'உளுந்து',
    image: '/crops/blackgram.jpg',
    imageAlt: '/crops/blackgram-alt.jpg',
    duration: '80-100 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Moderate drought tolerance. Light irrigation beneficial.',
    soilTypes: ['Black soil', 'Loamy soil', 'Red soil'],
    soilCategories: ['black', 'loamy', 'red'],
    riskFactors: {
      climate: 'low',
      pest: 'medium',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Essential for South Indian cuisine',
    facilities: ['Dal mills', 'Drying facilities', 'Storage'],
    calendar: {
      sowing: 'September - October',
      growth: 'November - December',
      harvest: 'January - February',
    },
    description: 'Important pulse for idli and dosa batter preparation.',
    fullDescription: [
      'Black gram is an essential ingredient in South Indian cuisine, used in idli, dosa, and vada preparations.',
      'It commands premium prices due to its specific use in food processing and steady demand.',
      'The crop improves soil fertility through nitrogen fixation and fits well in rice-based cropping systems.'
    ],
  },
  gingelly: {
    id: 'gingelly',
    name: 'Gingelly (Sesame)',
    localName: 'எள்',
    image: '/crops/gingelly.jpg',
    imageAlt: '/crops/gingelly-alt.jpg',
    duration: '80-95 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought resistant. Minimal water requirement.',
    soilTypes: ['Sandy loam', 'Well-drained soil', 'Light soil'],
    soilCategories: ['sandy', 'loamy'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'low',
    },
    profitLevel: 'high',
    marketDemand: 'Premium prices for gingelly oil',
    facilities: ['Oil extraction units', 'Drying yards', 'Storage'],
    calendar: {
      sowing: 'June - July',
      growth: 'August - September',
      harvest: 'September - October',
    },
    description: 'Traditional oilseed with high nutritional and commercial value.',
    fullDescription: [
      'Gingelly oil is considered one of the healthiest cooking oils in traditional Indian medicine.',
      'It is a drought-resistant crop that grows well in light soils with minimal input requirements.',
      'The oil fetches premium prices, especially for cold-pressed varieties used in traditional cooking.'
    ],
  },
  sorghum: {
    id: 'sorghum',
    name: 'Sorghum',
    localName: 'சோளம்',
    image: '/crops/sorghum.jpg',
    imageAlt: '/crops/sorghum-alt.jpg',
    duration: '100-120 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Highly drought tolerant. Survives on minimal rainfall.',
    soilTypes: ['Black cotton soil', 'Red soil', 'Sandy loam'],
    soilCategories: ['black', 'red', 'sandy'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Demand for food, fodder, and ethanol',
    facilities: ['Threshing equipment', 'Fodder storage', 'Market linkage'],
    calendar: {
      sowing: 'June - July / October',
      growth: 'August - September / Nov - Dec',
      harvest: 'October - November / Jan - Feb',
    },
    description: 'Versatile crop for food security in dryland regions.',
    fullDescription: [
      'Sorghum is a multipurpose crop providing grain for food, fodder for livestock, and feedstock for ethanol.',
      'It is extremely drought-tolerant and can produce reasonable yields even in very low rainfall conditions.',
      'The crop is gaining importance in climate-change adaptation strategies for dryland agriculture.'
    ],
  },
  vegetables: {
    id: 'vegetables',
    name: 'Vegetables',
    localName: 'காய்கறிகள்',
    image: '/crops/vegetables.jpg',
    imageAlt: '/crops/vegetables-alt.jpg',
    duration: '45-120 days',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Regular irrigation needed. Drip system recommended.',
    soilTypes: ['Rich loamy soil', 'Well-drained soil', 'Composted soil'],
    soilCategories: ['loamy', 'alluvial'],
    riskFactors: {
      climate: 'medium',
      pest: 'high',
      waterDependency: 'medium',
    },
    profitLevel: 'high',
    marketDemand: 'Daily demand ensures quick sales',
    facilities: ['Pack house', 'Cold storage', 'Transport', 'Market access'],
    calendar: {
      sowing: 'Year-round',
      growth: 'Varies by crop',
      harvest: 'Based on maturity',
    },
    description: 'High-value crops with quick returns on investment.',
    fullDescription: [
      'Vegetables offer the quickest returns in agriculture with cycles as short as 45 days.',
      'Proximity to urban markets significantly increases profitability due to lower transport costs.',
      'Protected cultivation and drip irrigation can dramatically improve yields and quality.'
    ],
  },
  chillies: {
    id: 'chillies',
    name: 'Chillies',
    localName: 'மிளகாய்',
    image: '/crops/chillies.jpg',
    imageAlt: '/crops/chillies-alt.jpg',
    duration: '120-150 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Regular watering needed. Avoid waterlogging.',
    soilTypes: ['Black soil', 'Red sandy loam', 'Alluvial soil'],
    soilCategories: ['black', 'red', 'alluvial'],
    riskFactors: {
      climate: 'medium',
      pest: 'high',
      waterDependency: 'medium',
    },
    profitLevel: 'high',
    marketDemand: 'Strong demand for dried and fresh chillies',
    facilities: ['Drying yards', 'Cold storage', 'Processing units'],
    calendar: {
      sowing: 'May - June / September',
      growth: 'July - October / Oct - Dec',
      harvest: 'Oct - Dec / Jan - March',
    },
    description: 'Major spice crop with excellent export potential.',
    fullDescription: [
      'India is the world\'s largest producer and exporter of chillies, with strong international demand.',
      'Different varieties are grown for fresh consumption, drying, oleoresin extraction, and processing.',
      'Price volatility is high, but good quality produce fetches premium rates in export markets.'
    ],
  },
  onion: {
    id: 'onion',
    name: 'Onion',
    localName: 'வெங்காயம்',
    image: '/crops/onion.jpg',
    imageAlt: '/crops/onion-alt.jpg',
    duration: '100-150 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Regular irrigation needed during bulb formation.',
    soilTypes: ['Sandy loam', 'Alluvial soil', 'Well-drained soil'],
    soilCategories: ['sandy', 'alluvial', 'loamy'],
    riskFactors: {
      climate: 'medium',
      pest: 'medium',
      waterDependency: 'medium',
    },
    profitLevel: 'medium',
    marketDemand: 'Essential kitchen commodity with fluctuating prices',
    facilities: ['Cold storage', 'Sorting facility', 'Transport'],
    calendar: {
      sowing: 'Oct - Nov / May - June',
      growth: 'Dec - Feb / June - Aug',
      harvest: 'Feb - March / Aug - Sept',
    },
    description: 'Popular bulb crop with high demand throughout the year.',
    fullDescription: [
      'Onion is an essential commodity in every Indian kitchen, ensuring constant year-round demand.',
      'Price fluctuations can be extreme, making storage facilities crucial for profit optimization.',
      'Proper curing and storage can extend shelf life significantly, allowing sales during peak price periods.'
    ],
  },
  tapioca: {
    id: 'tapioca',
    name: 'Tapioca',
    localName: 'மரவள்ளிக்கிழங்கு',
    image: '/crops/tapioca.jpg',
    imageAlt: '/crops/tapioca-alt.jpg',
    duration: '8-10 months',
    season: ['all'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant once established.',
    soilTypes: ['Sandy loam', 'Red laterite', 'Well-drained soil'],
    soilCategories: ['sandy', 'laterite', 'red'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'low',
    },
    profitLevel: 'medium',
    marketDemand: 'Demand for starch and sago industries',
    facilities: ['Processing factory access', 'Transport', 'Storage'],
    calendar: {
      sowing: 'May - June',
      growth: 'July - January',
      harvest: 'February - April',
    },
    description: 'Hardy tuber crop for starch production.',
    fullDescription: [
      'Tapioca is a highly drought-resistant tuber crop that grows well in poor, marginal soils.',
      'It is primarily used for starch and sago production, with established processing industries in Tamil Nadu.',
      'The crop requires minimal inputs, making it ideal for farmers with limited resources.'
    ],
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    localName: 'மாம்பழம்',
    image: '/crops/mango.jpg',
    imageAlt: '/crops/mango-alt.jpg',
    duration: '4-6 years to fruiting',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water during fruit development.',
    soilTypes: ['Alluvial soil', 'Laterite', 'Well-drained loamy'],
    soilCategories: ['alluvial', 'laterite', 'loamy'],
    riskFactors: {
      climate: 'medium',
      pest: 'medium',
      waterDependency: 'medium',
    },
    profitLevel: 'high',
    marketDemand: 'Premium demand for quality varieties',
    facilities: ['Ripening chambers', 'Cold storage', 'Pack house'],
    calendar: {
      sowing: 'June - September (planting)',
      growth: 'Year-round',
      harvest: 'April - July',
    },
    description: 'King of fruits with excellent export potential.',
    fullDescription: [
      'Mango is the national fruit of India and is known globally for its superior taste and aroma.',
      'Premium varieties like Alphonso, Banganapalli, and Neelam fetch high prices in domestic and export markets.',
      'Proper orchard management and post-harvest handling are crucial for maximizing returns.'
    ],
  },
  cashew: {
    id: 'cashew',
    name: 'Cashew',
    localName: 'முந்திரி',
    image: '/crops/cashew.jpg',
    imageAlt: '/crops/cashew-alt.jpg',
    duration: '3-4 years to yield',
    season: ['all'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Minimal irrigation needed.',
    soilTypes: ['Red laterite', 'Sandy loam', 'Coastal sandy'],
    soilCategories: ['laterite', 'sandy', 'red'],
    riskFactors: {
      climate: 'low',
      pest: 'low',
      waterDependency: 'low',
    },
    profitLevel: 'high',
    marketDemand: 'High-value export crop',
    facilities: ['Processing unit', 'Drying yards', 'Storage'],
    calendar: {
      sowing: 'June - August (planting)',
      growth: 'Year-round',
      harvest: 'February - May',
    },
    description: 'Premium nut crop suitable for coastal regions.',
    fullDescription: [
      'Cashew is a high-value nut crop that thrives in coastal and laterite soil regions.',
      'India is a major producer and exporter of cashew, with a well-established processing industry.',
      'The cashew apple can also be processed into juice, feni, and other value-added products.'
    ],
  },
};

// Tamil Nadu Districts with their top crops and soil types
export const tamilNaduDistricts: District[] = [
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'banana', 'coconut', 'pulses', 'maize', 'cotton', 'greenGram', 'blackGram', 'gingelly'],
    soilType: ['alluvial', 'clay'],
  },
  {
    id: 'tiruvarur',
    name: 'Tiruvarur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'pulses', 'blackGram', 'greenGram', 'gingelly', 'banana', 'coconut', 'vegetables', 'groundnut'],
    soilType: ['alluvial', 'clay'],
  },
  {
    id: 'nagapattinam',
    name: 'Nagapattinam',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'coconut', 'banana', 'pulses', 'groundnut', 'blackGram', 'greenGram', 'gingelly', 'vegetables'],
    soilType: ['alluvial', 'sandy'],
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    zone: 'Western Zone',
    topCrops: ['cotton', 'maize', 'millets', 'turmeric', 'coconut', 'groundnut', 'banana', 'pulses', 'sorghum', 'vegetables'],
    soilType: ['black', 'red'],
  },
  {
    id: 'erode',
    name: 'Erode',
    zone: 'Western Zone',
    topCrops: ['turmeric', 'cotton', 'maize', 'sugarcane', 'coconut', 'banana', 'groundnut', 'millets', 'pulses', 'tapioca'],
    soilType: ['black', 'red', 'loamy'],
  },
  {
    id: 'salem',
    name: 'Salem',
    zone: 'Western Zone',
    topCrops: ['mango', 'tapioca', 'groundnut', 'millets', 'maize', 'sugarcane', 'cotton', 'pulses', 'vegetables', 'banana'],
    soilType: ['red', 'black'],
  },
  {
    id: 'namakkal',
    name: 'Namakkal',
    zone: 'Western Zone',
    topCrops: ['tapioca', 'maize', 'groundnut', 'millets', 'pulses', 'cotton', 'banana', 'coconut', 'sorghum', 'vegetables'],
    soilType: ['red', 'sandy'],
  },
  {
    id: 'madurai',
    name: 'Madurai',
    zone: 'Southern Zone',
    topCrops: ['rice', 'cotton', 'millets', 'pulses', 'groundnut', 'sugarcane', 'vegetables', 'chillies', 'banana', 'maize'],
    soilType: ['black', 'red', 'alluvial'],
  },
  {
    id: 'dindigul',
    name: 'Dindigul',
    zone: 'Southern Zone',
    topCrops: ['rice', 'cotton', 'millets', 'groundnut', 'maize', 'pulses', 'vegetables', 'banana', 'onion', 'chillies'],
    soilType: ['red', 'black'],
  },
  {
    id: 'theni',
    name: 'Theni',
    zone: 'Southern Zone',
    topCrops: ['banana', 'coconut', 'rice', 'sugarcane', 'vegetables', 'millets', 'pulses', 'groundnut', 'maize', 'turmeric'],
    soilType: ['red', 'loamy'],
  },
  {
    id: 'tirunelveli',
    name: 'Tirunelveli',
    zone: 'Southern Zone',
    topCrops: ['rice', 'banana', 'cotton', 'pulses', 'groundnut', 'millets', 'sugarcane', 'coconut', 'vegetables', 'chillies'],
    soilType: ['red', 'black', 'alluvial'],
  },
  {
    id: 'thoothukudi',
    name: 'Thoothukudi',
    zone: 'Southern Zone',
    topCrops: ['cotton', 'millets', 'pulses', 'groundnut', 'rice', 'chillies', 'coconut', 'vegetables', 'sorghum', 'maize'],
    soilType: ['red', 'sandy'],
  },
  {
    id: 'virudhunagar',
    name: 'Virudhunagar',
    zone: 'Southern Zone',
    topCrops: ['cotton', 'rice', 'millets', 'pulses', 'groundnut', 'chillies', 'vegetables', 'sugarcane', 'sorghum', 'maize'],
    soilType: ['black', 'red'],
  },
  {
    id: 'ramanathapuram',
    name: 'Ramanathapuram',
    zone: 'Southern Zone',
    topCrops: ['rice', 'millets', 'pulses', 'cotton', 'groundnut', 'chillies', 'coconut', 'vegetables', 'sorghum', 'blackGram'],
    soilType: ['red', 'sandy', 'alluvial'],
  },
  {
    id: 'villupuram',
    name: 'Villupuram',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'sugarcane', 'pulses', 'gingelly', 'cotton', 'vegetables', 'cashew', 'maize', 'tapioca'],
    soilType: ['red', 'alluvial'],
  },
  {
    id: 'cuddalore',
    name: 'Cuddalore',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'sugarcane', 'pulses', 'cashew', 'coconut', 'vegetables', 'gingelly', 'banana', 'maize'],
    soilType: ['alluvial', 'red', 'sandy'],
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'pulses', 'vegetables', 'sugarcane', 'coconut', 'banana', 'gingelly', 'millets', 'maize'],
    soilType: ['alluvial', 'clay'],
  },
  {
    id: 'chengalpattu',
    name: 'Chengalpattu',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'vegetables', 'pulses', 'coconut', 'banana', 'sugarcane', 'gingelly', 'millets', 'maize'],
    soilType: ['alluvial', 'clay', 'sandy'],
  },
  {
    id: 'tiruvallur',
    name: 'Tiruvallur',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'vegetables', 'pulses', 'sugarcane', 'coconut', 'banana', 'millets', 'gingelly', 'maize'],
    soilType: ['alluvial', 'clay'],
  },
  {
    id: 'vellore',
    name: 'Vellore',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'sugarcane', 'mango', 'vegetables', 'pulses', 'millets', 'gingelly', 'tapioca', 'banana'],
    soilType: ['red', 'black'],
  },
  {
    id: 'ranipet',
    name: 'Ranipet',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'sugarcane', 'vegetables', 'mango', 'pulses', 'millets', 'gingelly', 'maize', 'banana'],
    soilType: ['red', 'black', 'alluvial'],
  },
  {
    id: 'tirupattur',
    name: 'Tirupattur',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'millets', 'pulses', 'vegetables', 'sugarcane', 'mango', 'tapioca', 'maize', 'gingelly'],
    soilType: ['red', 'sandy'],
  },
  {
    id: 'dharmapuri',
    name: 'Dharmapuri',
    zone: 'Northern Zone',
    topCrops: ['mango', 'millets', 'groundnut', 'maize', 'pulses', 'cotton', 'tapioca', 'vegetables', 'sugarcane', 'rice'],
    soilType: ['red', 'black'],
  },
  {
    id: 'krishnagiri',
    name: 'Krishnagiri',
    zone: 'Northern Zone',
    topCrops: ['mango', 'millets', 'groundnut', 'vegetables', 'maize', 'pulses', 'sugarcane', 'rice', 'tapioca', 'banana'],
    soilType: ['red', 'black'],
  },
  {
    id: 'karur',
    name: 'Karur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['cotton', 'rice', 'maize', 'sugarcane', 'groundnut', 'pulses', 'vegetables', 'millets', 'sorghum', 'banana'],
    soilType: ['black', 'red', 'alluvial'],
  },
  {
    id: 'perambalur',
    name: 'Perambalur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'groundnut', 'cotton', 'maize', 'pulses', 'millets', 'gingelly', 'vegetables', 'sugarcane', 'sorghum'],
    soilType: ['black', 'red'],
  },
];

// India Regions
export const indiaRegions: Region[] = [
  {
    id: 'north',
    name: 'North India',
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir'],
  },
  {
    id: 'south',
    name: 'South India',
    states: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
  },
  {
    id: 'east',
    name: 'East India',
    states: ['West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Assam'],
  },
  {
    id: 'west',
    name: 'West India',
    states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'],
  },
  {
    id: 'central',
    name: 'Central India',
    states: ['Madhya Pradesh', 'Chhattisgarh'],
  },
];

// Region-wise crops for India
export const regionCrops: Record<string, string[]> = {
  north: ['rice', 'cotton', 'sugarcane', 'maize', 'groundnut', 'pulses', 'millets', 'vegetables', 'banana', 'mango'],
  south: ['rice', 'coconut', 'banana', 'sugarcane', 'cotton', 'turmeric', 'groundnut', 'millets', 'cashew', 'mango'],
  east: ['rice', 'pulses', 'vegetables', 'maize', 'sugarcane', 'banana', 'groundnut', 'millets', 'onion', 'tapioca'],
  west: ['cotton', 'groundnut', 'sugarcane', 'rice', 'pulses', 'millets', 'banana', 'mango', 'vegetables', 'onion'],
  central: ['rice', 'pulses', 'sorghum', 'maize', 'cotton', 'groundnut', 'sugarcane', 'vegetables', 'millets', 'onion'],
};

// Tamil Nadu Zones
export const tamilNaduZones = [
  { id: 'cauvery', name: 'Cauvery Delta Zone', districts: ['Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Karur', 'Perambalur'] },
  { id: 'western', name: 'Western Zone', districts: ['Coimbatore', 'Erode', 'Salem', 'Namakkal'] },
  { id: 'southern', name: 'Southern Zone', districts: ['Madurai', 'Dindigul', 'Theni', 'Tirunelveli', 'Thoothukudi', 'Virudhunagar', 'Ramanathapuram'] },
  { id: 'northern', name: 'Northern Zone', districts: ['Villupuram', 'Cuddalore', 'Kanchipuram', 'Chengalpattu', 'Tiruvallur', 'Vellore', 'Ranipet', 'Tirupattur', 'Dharmapuri', 'Krishnagiri'] },
  { id: 'coastal', name: 'Coastal Zone', districts: ['Chennai', 'Kanniyakumari'] },
];

// Soil type display names
export const soilTypeNames: Record<SoilType, string> = {
  black: 'Black Soil',
  red: 'Red Soil',
  alluvial: 'Alluvial Soil',
  laterite: 'Laterite Soil',
  sandy: 'Sandy Loam',
  loamy: 'Loamy Soil',
  clay: 'Clay Soil',
};

// District weather data (simulated - in real app, this would come from API)
export const districtWeather: Record<string, WeatherData> = {
  thanjavur: {
    temperature: 32,
    humidity: 78,
    rainfall: 2.5,
    condition: 'partly-cloudy',
    alerts: [{ type: 'heat', severity: 'medium', message: 'Heat wave warning: Stay hydrated and avoid outdoor work during peak hours' }],
  },
  coimbatore: {
    temperature: 28,
    humidity: 65,
    rainfall: 0,
    condition: 'sunny',
    alerts: [],
  },
  madurai: {
    temperature: 35,
    humidity: 55,
    rainfall: 0,
    condition: 'sunny',
    alerts: [{ type: 'heat', severity: 'high', message: 'Extreme heat alert: Temperature expected to exceed 40°C' }],
  },
  erode: {
    temperature: 30,
    humidity: 70,
    rainfall: 5,
    condition: 'rainy',
    alerts: [{ type: 'rain', severity: 'low', message: 'Light rainfall expected. Good for turmeric crop' }],
  },
  salem: {
    temperature: 29,
    humidity: 60,
    rainfall: 0,
    condition: 'cloudy',
    alerts: [],
  },
  tirunelveli: {
    temperature: 33,
    humidity: 72,
    rainfall: 8,
    condition: 'rainy',
    alerts: [{ type: 'flood', severity: 'medium', message: 'Moderate rainfall: Ensure proper field drainage' }],
  },
  villupuram: {
    temperature: 31,
    humidity: 68,
    rainfall: 0,
    condition: 'partly-cloudy',
    alerts: [],
  },
  dindigul: {
    temperature: 27,
    humidity: 75,
    rainfall: 3,
    condition: 'cloudy',
    alerts: [],
  },
};

// Market prices for crops (simulated)
export const marketPrices: Record<string, MarketPrice[]> = {
  thanjavur: [
    { cropId: 'rice', price: 2150, unit: '₹/quintal', change: 2.5, trend: 'up', lastUpdated: '2 hours ago' },
    { cropId: 'sugarcane', price: 3200, unit: '₹/tonne', change: -1.2, trend: 'down', lastUpdated: '1 hour ago' },
    { cropId: 'banana', price: 35, unit: '₹/kg', change: 5.0, trend: 'up', lastUpdated: '30 min ago' },
    { cropId: 'coconut', price: 28, unit: '₹/piece', change: 0, trend: 'stable', lastUpdated: '1 hour ago' },
  ],
  coimbatore: [
    { cropId: 'cotton', price: 6800, unit: '₹/quintal', change: 3.2, trend: 'up', lastUpdated: '1 hour ago' },
    { cropId: 'maize', price: 1950, unit: '₹/quintal', change: -0.5, trend: 'down', lastUpdated: '2 hours ago' },
    { cropId: 'turmeric', price: 12500, unit: '₹/quintal', change: 4.5, trend: 'up', lastUpdated: '45 min ago' },
    { cropId: 'groundnut', price: 5600, unit: '₹/quintal', change: 1.8, trend: 'up', lastUpdated: '1 hour ago' },
  ],
  erode: [
    { cropId: 'turmeric', price: 13200, unit: '₹/quintal', change: 5.8, trend: 'up', lastUpdated: '30 min ago' },
    { cropId: 'cotton', price: 6750, unit: '₹/quintal', change: 2.1, trend: 'up', lastUpdated: '1 hour ago' },
    { cropId: 'maize', price: 1920, unit: '₹/quintal', change: -1.0, trend: 'down', lastUpdated: '2 hours ago' },
    { cropId: 'coconut', price: 30, unit: '₹/piece', change: 3.5, trend: 'up', lastUpdated: '1 hour ago' },
  ],
  madurai: [
    { cropId: 'rice', price: 2100, unit: '₹/quintal', change: 1.5, trend: 'up', lastUpdated: '1 hour ago' },
    { cropId: 'cotton', price: 6900, unit: '₹/quintal', change: 4.0, trend: 'up', lastUpdated: '45 min ago' },
    { cropId: 'chillies', price: 18500, unit: '₹/quintal', change: -2.5, trend: 'down', lastUpdated: '2 hours ago' },
    { cropId: 'vegetables', price: 45, unit: '₹/kg', change: 8.0, trend: 'up', lastUpdated: '30 min ago' },
  ],
};

// Get random image for crop (alternates between main and alt)
export const getCropImage = (crop: Crop): string => {
  return Math.random() > 0.5 ? crop.image : crop.imageAlt;
};
