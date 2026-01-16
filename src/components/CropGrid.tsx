import { useMemo } from 'react';
import { crops, tamilNaduDistricts, regionCrops, Crop } from '@/data/cropData';
import CropCard from './CropCard';
import { Sprout, Loader2 } from 'lucide-react';

interface CropGridProps {
  location: {
    country: string;
    state: string;
    region?: string;
    district?: string;
  } | null;
  onCropSelect: (crop: Crop) => void;
}

const CropGrid = ({ location, onCropSelect }: CropGridProps) => {
  const topCrops = useMemo(() => {
    if (!location) return [];

    let cropIds: string[] = [];

    // Tamil Nadu with district selected
    if (location.state === 'Tamil Nadu' && location.district) {
      const district = tamilNaduDistricts.find(d => d.id === location.district);
      cropIds = district?.topCrops || [];
    }
    // Tamil Nadu with only region selected
    else if (location.state === 'Tamil Nadu' && location.region) {
      // Map region IDs to zone names
      const zoneMap: Record<string, string> = {
        'cauvery': 'Cauvery Delta Zone',
        'western': 'Western Zone',
        'southern': 'Southern Zone',
        'northern': 'Northern Zone',
        'coastal': 'Coastal Zone',
      };
      const zoneName = zoneMap[location.region];
      const zoneDistricts = tamilNaduDistricts.filter(d => d.zone === zoneName);
      const allCrops = zoneDistricts.flatMap(d => d.topCrops);
      cropIds = [...new Set(allCrops)].slice(0, 10);
    }
    // Other Indian states/regions
    else if (location.region && regionCrops[location.region]) {
      cropIds = regionCrops[location.region];
    }
    // Default fallback
    else {
      cropIds = Object.keys(crops).slice(0, 10);
    }

    return cropIds
      .map(id => crops[id])
      .filter(Boolean)
      .slice(0, 10);
  }, [location]);

  if (!location || (!location.region && !location.district)) {
    return (
      <div className="card-gradient rounded-2xl p-12 shadow-card border border-border/50 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <Sprout className="w-10 h-10 text-primary animate-pulse-slow" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
          Select Your Location
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose your state, region, and district to see the top 10 recommended crops for your area with detailed information.
        </p>
      </div>
    );
  }

  const locationName = location.district 
    ? tamilNaduDistricts.find(d => d.id === location.district)?.name 
    : location.region;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-secondary/20">
          <Sprout className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Top 10 Crops for {locationName}
          </h2>
          <p className="text-sm text-muted-foreground">
            Click on any crop to view detailed information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {topCrops.map((crop, index) => (
          <div
            key={crop.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CropCard
              crop={crop}
              rank={index + 1}
              onClick={() => onCropSelect(crop)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropGrid;
