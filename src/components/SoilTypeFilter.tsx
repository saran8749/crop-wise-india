import { SoilType, soilTypeNames } from '@/data/cropData';
import { Layers, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SoilTypeFilterProps {
  selectedSoilType: SoilType | null;
  onSoilTypeChange: (soilType: SoilType | null) => void;
  availableSoilTypes?: SoilType[];
}

const soilTypeColors: Record<SoilType, { bg: string; border: string; text: string }> = {
  black: { bg: 'bg-gray-800', border: 'border-gray-700', text: 'text-white' },
  red: { bg: 'bg-red-600', border: 'border-red-500', text: 'text-white' },
  alluvial: { bg: 'bg-amber-200', border: 'border-amber-300', text: 'text-amber-900' },
  laterite: { bg: 'bg-orange-500', border: 'border-orange-400', text: 'text-white' },
  sandy: { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-800' },
  loamy: { bg: 'bg-amber-700', border: 'border-amber-600', text: 'text-white' },
  clay: { bg: 'bg-amber-900', border: 'border-amber-800', text: 'text-white' },
};

const SoilTypeFilter = ({ selectedSoilType, onSoilTypeChange, availableSoilTypes }: SoilTypeFilterProps) => {
  const soilTypes: SoilType[] = availableSoilTypes || ['black', 'red', 'alluvial', 'laterite', 'sandy', 'loamy', 'clay'];

  return (
    <div className="card-gradient rounded-2xl p-6 shadow-card border border-border/50 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-accent/10">
          <Layers className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">Soil Type</h3>
          <p className="text-xs text-muted-foreground">Filter crops by soil compatibility</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSoilTypeChange(null)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            selectedSoilType === null
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          )}
        >
          All Soils
        </button>
        
        {soilTypes.map((soil) => {
          const colors = soilTypeColors[soil];
          const isSelected = selectedSoilType === soil;
          
          return (
            <button
              key={soil}
              onClick={() => onSoilTypeChange(isSelected ? null : soil)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2',
                isSelected
                  ? `${colors.bg} ${colors.text} shadow-md ring-2 ring-offset-2 ring-offset-background ring-primary`
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              )}
            >
              <span
                className={cn(
                  'w-3 h-3 rounded-full border',
                  colors.bg,
                  colors.border
                )}
              />
              {soilTypeNames[soil]}
              {isSelected && <Check className="w-3 h-3" />}
            </button>
          );
        })}
      </div>

      {selectedSoilType && (
        <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/10 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{soilTypeNames[selectedSoilType]}</span>
            {' '}is selected. Showing crops that grow well in this soil type.
          </p>
        </div>
      )}
    </div>
  );
};

export default SoilTypeFilter;
