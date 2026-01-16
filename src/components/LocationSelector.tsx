import { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Leaf } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { indiaRegions, tamilNaduDistricts, tamilNaduZones } from '@/data/cropData';

interface LocationSelectorProps {
  onLocationChange: (location: {
    country: string;
    state: string;
    region?: string;
    district?: string;
  }) => void;
}

const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [country] = useState('india');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');

  const states = ['Tamil Nadu', ...indiaRegions.flatMap(r => r.states || []).filter(s => s !== 'Tamil Nadu')];

  const availableRegions = state === 'Tamil Nadu' 
    ? tamilNaduZones 
    : state 
      ? indiaRegions.filter(r => r.states?.includes(state))
      : [];

  const availableDistricts = state === 'Tamil Nadu' && region
    ? tamilNaduDistricts.filter(d => {
        const zone = tamilNaduZones.find(z => z.id === region);
        return zone?.districts.includes(d.name);
      })
    : [];

  useEffect(() => {
    if (state || region || district) {
      onLocationChange({ country, state, region, district });
    }
  }, [country, state, region, district, onLocationChange]);

  const handleStateChange = (value: string) => {
    setState(value);
    setRegion('');
    setDistrict('');
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    setDistrict('');
  };

  return (
    <div className="card-gradient rounded-2xl p-6 shadow-card border border-border/50 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Select Location</h2>
          <p className="text-sm text-muted-foreground">Choose your region for personalized recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            State
          </label>
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger className="h-12 bg-background border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {states.map((s) => (
                <SelectItem key={s} value={s} className="hover:bg-primary/5">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region/Zone Selector */}
        {state && (
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              {state === 'Tamil Nadu' ? 'Agricultural Zone' : 'Region'}
            </label>
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger className="h-12 bg-background border-border hover:border-primary/50 transition-colors">
                <SelectValue placeholder={state === 'Tamil Nadu' ? 'Select Zone' : 'Select Region'} />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {state === 'Tamil Nadu' ? (
                  tamilNaduZones.map((z) => (
                    <SelectItem key={z.id} value={z.id} className="hover:bg-primary/5">
                      {z.name}
                    </SelectItem>
                  ))
                ) : (
                  availableRegions.map((r) => (
                    <SelectItem key={r.id} value={r.id} className="hover:bg-primary/5">
                      {r.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* District Selector (Tamil Nadu only) */}
        {state === 'Tamil Nadu' && region && (
          <div className="space-y-2 animate-fade-in">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              District
            </label>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger className="h-12 bg-background border-border hover:border-primary/50 transition-colors">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {availableDistricts.map((d) => (
                  <SelectItem key={d.id} value={d.id} className="hover:bg-primary/5">
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Location Summary */}
      {(state || region || district) && (
        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-slide-up">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Selected:</span>
            <span className="font-medium text-foreground">
              India {state && `→ ${state}`} {region && `→ ${state === 'Tamil Nadu' ? tamilNaduZones.find(z => z.id === region)?.name : region}`} {district && `→ ${tamilNaduDistricts.find(d => d.id === district)?.name}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
