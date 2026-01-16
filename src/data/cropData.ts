export type RiskLevel = 'low' | 'medium' | 'high';
export type WaterLevel = 'low' | 'medium' | 'high';
export type ProfitLevel = 'low' | 'medium' | 'high';
export type Season = 'kharif' | 'rabi' | 'zaid' | 'all';

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
  duration: string;
  season: Season[];
  waterRequirement: WaterLevel;
  waterDescription: string;
  soilTypes: string[];
  riskFactors: RiskFactors;
  profitLevel: ProfitLevel;
  marketDemand: string;
  facilities: string[];
  calendar: CropCalendar;
  description: string;
}

export interface District {
  id: string;
  name: string;
  zone: string;
  topCrops: string[];
}

export interface Region {
  id: string;
  name: string;
  states?: string[];
  districts?: District[];
}

// Complete crop database
export const crops: Record<string, Crop> = {
  rice: {
    id: 'rice',
    name: 'Rice',
    localName: 'நெல்',
    image: '/crops/rice.jpg',
    duration: '110-140 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'high',
    waterDescription: 'Requires standing water during early growth stages. Needs 1200-1500mm of water.',
    soilTypes: ['Alluvial soil', 'Clay loam soil', 'Black cotton soil'],
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
  },
  sugarcane: {
    id: 'sugarcane',
    name: 'Sugarcane',
    localName: 'கரும்பு',
    image: '/crops/sugarcane.jpg',
    duration: '12-18 months',
    season: ['all'],
    waterRequirement: 'high',
    waterDescription: 'Requires regular irrigation throughout growth. Needs 1500-2000mm of water.',
    soilTypes: ['Deep loamy soil', 'Well-drained alluvial soil', 'Black soil'],
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
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    localName: 'வாழை',
    image: '/crops/banana.jpg',
    duration: '10-12 months',
    season: ['all'],
    waterRequirement: 'high',
    waterDescription: 'Requires consistent moisture. Drip irrigation recommended.',
    soilTypes: ['Deep loamy soil', 'Well-drained clay loam', 'Red soil'],
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
  },
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    localName: 'தேங்காய்',
    image: '/crops/coconut.jpg',
    duration: '6-8 years to full yield',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Requires moderate water with good drainage. Tolerates dry spells once established.',
    soilTypes: ['Sandy loam', 'Laterite soil', 'Coastal alluvial'],
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
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton',
    localName: 'பருத்தி',
    image: '/crops/cotton.jpg',
    duration: '150-180 days',
    season: ['kharif'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water needs. Sensitive to waterlogging.',
    soilTypes: ['Black cotton soil', 'Deep alluvial', 'Medium black soil'],
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
  },
  maize: {
    id: 'maize',
    name: 'Maize',
    localName: 'மக்காச்சோளம்',
    image: '/crops/maize.jpg',
    duration: '90-120 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water requirement. Critical during tasseling stage.',
    soilTypes: ['Well-drained loamy soil', 'Sandy loam', 'Alluvial soil'],
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
  },
  groundnut: {
    id: 'groundnut',
    name: 'Groundnut',
    localName: 'நிலக்கடலை',
    image: '/crops/groundnut.jpg',
    duration: '100-130 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Requires well-distributed rainfall.',
    soilTypes: ['Sandy loam', 'Red sandy soil', 'Light textured soil'],
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
  },
  turmeric: {
    id: 'turmeric',
    name: 'Turmeric',
    localName: 'மஞ்சள்',
    image: '/crops/turmeric.jpg',
    duration: '7-9 months',
    season: ['kharif'],
    waterRequirement: 'medium',
    waterDescription: 'Requires regular moisture but not waterlogging.',
    soilTypes: ['Well-drained loamy soil', 'Alluvial soil', 'Forest loam'],
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
  },
  millets: {
    id: 'millets',
    name: 'Millets',
    localName: 'சிறுதானியங்கள்',
    image: '/crops/millets.jpg',
    duration: '70-100 days',
    season: ['kharif'],
    waterRequirement: 'low',
    waterDescription: 'Highly drought tolerant. Minimal irrigation needed.',
    soilTypes: ['Red soil', 'Sandy loam', 'Shallow black soil'],
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
  },
  pulses: {
    id: 'pulses',
    name: 'Pulses',
    localName: 'பருப்பு வகைகள்',
    image: '/crops/pulses.jpg',
    duration: '90-120 days',
    season: ['rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Requires minimal irrigation.',
    soilTypes: ['Loamy soil', 'Black soil', 'Red soil'],
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
  },
  greenGram: {
    id: 'greenGram',
    name: 'Green Gram',
    localName: 'பச்சை பயறு',
    image: '/crops/greengram.jpg',
    duration: '60-75 days',
    season: ['kharif', 'rabi', 'zaid'],
    waterRequirement: 'low',
    waterDescription: 'Very drought tolerant. Can grow with minimal water.',
    soilTypes: ['Sandy loam', 'Loamy soil', 'Well-drained soil'],
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
  },
  blackGram: {
    id: 'blackGram',
    name: 'Black Gram',
    localName: 'உளுந்து',
    image: '/crops/blackgram.jpg',
    duration: '80-100 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Moderate drought tolerance. Light irrigation beneficial.',
    soilTypes: ['Black soil', 'Loamy soil', 'Red soil'],
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
  },
  gingelly: {
    id: 'gingelly',
    name: 'Gingelly (Sesame)',
    localName: 'எள்',
    image: '/crops/gingelly.jpg',
    duration: '80-95 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Drought resistant. Minimal water requirement.',
    soilTypes: ['Sandy loam', 'Well-drained soil', 'Light soil'],
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
  },
  sorghum: {
    id: 'sorghum',
    name: 'Sorghum',
    localName: 'சோளம்',
    image: '/crops/sorghum.jpg',
    duration: '100-120 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'low',
    waterDescription: 'Highly drought tolerant. Survives on minimal rainfall.',
    soilTypes: ['Black cotton soil', 'Red soil', 'Sandy loam'],
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
  },
  vegetables: {
    id: 'vegetables',
    name: 'Vegetables',
    localName: 'காய்கறிகள்',
    image: '/crops/vegetables.jpg',
    duration: '45-120 days',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Regular irrigation needed. Drip system recommended.',
    soilTypes: ['Rich loamy soil', 'Well-drained soil', 'Composted soil'],
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
  },
  chillies: {
    id: 'chillies',
    name: 'Chillies',
    localName: 'மிளகாய்',
    image: '/crops/chillies.jpg',
    duration: '120-150 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Regular watering needed. Avoid waterlogging.',
    soilTypes: ['Black soil', 'Red sandy loam', 'Alluvial soil'],
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
  },
  onion: {
    id: 'onion',
    name: 'Onion',
    localName: 'வெங்காயம்',
    image: '/crops/onion.jpg',
    duration: '100-150 days',
    season: ['kharif', 'rabi'],
    waterRequirement: 'medium',
    waterDescription: 'Regular irrigation needed during bulb formation.',
    soilTypes: ['Sandy loam', 'Alluvial soil', 'Well-drained soil'],
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
  },
  tapioca: {
    id: 'tapioca',
    name: 'Tapioca',
    localName: 'மரவள்ளிக்கிழங்கு',
    image: '/crops/tapioca.jpg',
    duration: '8-10 months',
    season: ['all'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant once established.',
    soilTypes: ['Sandy loam', 'Red laterite', 'Well-drained soil'],
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
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    localName: 'மாம்பழம்',
    image: '/crops/mango.jpg',
    duration: '4-6 years to fruiting',
    season: ['all'],
    waterRequirement: 'medium',
    waterDescription: 'Moderate water during fruit development.',
    soilTypes: ['Alluvial soil', 'Laterite', 'Well-drained loamy'],
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
  },
  cashew: {
    id: 'cashew',
    name: 'Cashew',
    localName: 'முந்திரி',
    image: '/crops/cashew.jpg',
    duration: '3-4 years to yield',
    season: ['all'],
    waterRequirement: 'low',
    waterDescription: 'Drought tolerant. Minimal irrigation needed.',
    soilTypes: ['Red laterite', 'Sandy loam', 'Coastal sandy'],
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
  },
};

// Tamil Nadu Districts with their top crops
export const tamilNaduDistricts: District[] = [
  {
    id: 'thanjavur',
    name: 'Thanjavur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'banana', 'coconut', 'pulses', 'maize', 'cotton', 'greenGram', 'blackGram', 'gingelly'],
  },
  {
    id: 'tiruvarur',
    name: 'Tiruvarur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'pulses', 'blackGram', 'greenGram', 'gingelly', 'banana', 'coconut', 'vegetables', 'groundnut'],
  },
  {
    id: 'nagapattinam',
    name: 'Nagapattinam',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'sugarcane', 'coconut', 'banana', 'pulses', 'groundnut', 'blackGram', 'greenGram', 'gingelly', 'vegetables'],
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    zone: 'Western Zone',
    topCrops: ['cotton', 'maize', 'millets', 'turmeric', 'coconut', 'groundnut', 'banana', 'pulses', 'sorghum', 'vegetables'],
  },
  {
    id: 'erode',
    name: 'Erode',
    zone: 'Western Zone',
    topCrops: ['turmeric', 'cotton', 'maize', 'sugarcane', 'coconut', 'banana', 'groundnut', 'millets', 'pulses', 'tapioca'],
  },
  {
    id: 'salem',
    name: 'Salem',
    zone: 'Western Zone',
    topCrops: ['mango', 'tapioca', 'groundnut', 'millets', 'maize', 'sugarcane', 'cotton', 'pulses', 'vegetables', 'banana'],
  },
  {
    id: 'namakkal',
    name: 'Namakkal',
    zone: 'Western Zone',
    topCrops: ['tapioca', 'maize', 'groundnut', 'millets', 'pulses', 'cotton', 'banana', 'coconut', 'sorghum', 'vegetables'],
  },
  {
    id: 'madurai',
    name: 'Madurai',
    zone: 'Southern Zone',
    topCrops: ['rice', 'cotton', 'millets', 'pulses', 'groundnut', 'sugarcane', 'vegetables', 'chillies', 'banana', 'maize'],
  },
  {
    id: 'dindigul',
    name: 'Dindigul',
    zone: 'Southern Zone',
    topCrops: ['rice', 'cotton', 'millets', 'groundnut', 'maize', 'pulses', 'vegetables', 'banana', 'onion', 'chillies'],
  },
  {
    id: 'theni',
    name: 'Theni',
    zone: 'Southern Zone',
    topCrops: ['banana', 'coconut', 'rice', 'sugarcane', 'vegetables', 'millets', 'pulses', 'groundnut', 'grapes', 'cardamom'],
  },
  {
    id: 'tirunelveli',
    name: 'Tirunelveli',
    zone: 'Southern Zone',
    topCrops: ['rice', 'banana', 'cotton', 'pulses', 'groundnut', 'millets', 'sugarcane', 'coconut', 'vegetables', 'chillies'],
  },
  {
    id: 'thoothukudi',
    name: 'Thoothukudi',
    zone: 'Southern Zone',
    topCrops: ['cotton', 'millets', 'pulses', 'groundnut', 'rice', 'chillies', 'coconut', 'vegetables', 'sorghum', 'maize'],
  },
  {
    id: 'virudhunagar',
    name: 'Virudhunagar',
    zone: 'Southern Zone',
    topCrops: ['cotton', 'rice', 'millets', 'pulses', 'groundnut', 'chillies', 'vegetables', 'sugarcane', 'sorghum', 'maize'],
  },
  {
    id: 'ramanathapuram',
    name: 'Ramanathapuram',
    zone: 'Southern Zone',
    topCrops: ['rice', 'millets', 'pulses', 'cotton', 'groundnut', 'chillies', 'coconut', 'vegetables', 'sorghum', 'blackGram'],
  },
  {
    id: 'villupuram',
    name: 'Villupuram',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'sugarcane', 'pulses', 'gingelly', 'cotton', 'vegetables', 'cashew', 'maize', 'tapioca'],
  },
  {
    id: 'cuddalore',
    name: 'Cuddalore',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'sugarcane', 'pulses', 'cashew', 'casuarina', 'coconut', 'vegetables', 'gingelly', 'banana'],
  },
  {
    id: 'kanchipuram',
    name: 'Kanchipuram',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'pulses', 'vegetables', 'sugarcane', 'coconut', 'banana', 'gingelly', 'millets', 'flowers'],
  },
  {
    id: 'chengalpattu',
    name: 'Chengalpattu',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'vegetables', 'pulses', 'coconut', 'banana', 'sugarcane', 'gingelly', 'flowers', 'millets'],
  },
  {
    id: 'tiruvallur',
    name: 'Tiruvallur',
    zone: 'Northern Zone',
    topCrops: ['rice', 'groundnut', 'vegetables', 'pulses', 'sugarcane', 'flowers', 'coconut', 'banana', 'millets', 'gingelly'],
  },
  {
    id: 'vellore',
    name: 'Vellore',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'sugarcane', 'mango', 'vegetables', 'pulses', 'millets', 'gingelly', 'tapioca', 'banana'],
  },
  {
    id: 'ranipet',
    name: 'Ranipet',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'sugarcane', 'vegetables', 'mango', 'pulses', 'millets', 'gingelly', 'maize', 'banana'],
  },
  {
    id: 'tirupattur',
    name: 'Tirupattur',
    zone: 'Northern Zone',
    topCrops: ['groundnut', 'rice', 'millets', 'pulses', 'vegetables', 'sugarcane', 'mango', 'tapioca', 'maize', 'gingelly'],
  },
  {
    id: 'dharmapuri',
    name: 'Dharmapuri',
    zone: 'Northern Zone',
    topCrops: ['mango', 'millets', 'groundnut', 'maize', 'pulses', 'cotton', 'tapioca', 'vegetables', 'sugarcane', 'rice'],
  },
  {
    id: 'krishnagiri',
    name: 'Krishnagiri',
    zone: 'Northern Zone',
    topCrops: ['mango', 'millets', 'groundnut', 'tomato', 'vegetables', 'maize', 'pulses', 'sugarcane', 'rice', 'tapioca'],
  },
  {
    id: 'karur',
    name: 'Karur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['cotton', 'rice', 'maize', 'sugarcane', 'groundnut', 'pulses', 'vegetables', 'millets', 'sorghum', 'banana'],
  },
  {
    id: 'perambalur',
    name: 'Perambalur',
    zone: 'Cauvery Delta Zone',
    topCrops: ['rice', 'groundnut', 'cotton', 'maize', 'pulses', 'millets', 'gingelly', 'vegetables', 'sugarcane', 'sorghum'],
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
