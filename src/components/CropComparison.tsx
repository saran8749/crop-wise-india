import { useState } from 'react';
import { crops, Crop } from '@/data/cropData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitCompare, Droplets, Calendar, TrendingUp, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CropComparison = () => {
  const [crop1Id, setCrop1Id] = useState<string>('');
  const [crop2Id, setCrop2Id] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const crop1 = crop1Id ? crops[crop1Id] : null;
  const crop2 = crop2Id ? crops[crop2Id] : null;

  const cropList = Object.values(crops);

  const riskScore = (crop: Crop) => {
    const scores = { low: 1, medium: 2, high: 3 };
    const total = scores[crop.riskFactors.climate] + scores[crop.riskFactors.pest] + scores[crop.riskFactors.waterDependency];
    if (total <= 4) return 'low';
    if (total <= 6) return 'medium';
    return 'high';
  };

  const waterScore = { low: 1, medium: 2, high: 3 };
  const profitScore = { low: 1, medium: 2, high: 3 };

  const CompareBar = ({ label, value1, value2, type }: { 
    label: string; 
    value1: 'low' | 'medium' | 'high'; 
    value2: 'low' | 'medium' | 'high';
    type: 'water' | 'profit' | 'risk';
  }) => {
    const colors = {
      water: { low: 'bg-risk-low', medium: 'bg-water', high: 'bg-water' },
      profit: { low: 'bg-profit-low', medium: 'bg-profit-medium', high: 'bg-profit-high' },
      risk: { low: 'bg-risk-low', medium: 'bg-risk-medium', high: 'bg-risk-high' },
    };

    const widths = { low: '33%', medium: '66%', high: '100%' };

    return (
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all', colors[type][value1])} style={{ width: widths[value1] }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{value1}</p>
          </div>
          <div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all', colors[type][value2])} style={{ width: widths[value2] }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{value2}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full hero-gradient text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <GitCompare className="w-5 h-5" />
        Compare Crops
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-full max-w-lg card-gradient rounded-2xl shadow-hover border border-border/50 overflow-hidden animate-scale-in">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg font-semibold">Compare Crops</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Crop Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Crop 1</label>
            <Select value={crop1Id} onValueChange={setCrop1Id}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cropList.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id} disabled={crop.id === crop2Id}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Crop 2</label>
            <Select value={crop2Id} onValueChange={setCrop2Id}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cropList.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id} disabled={crop.id === crop1Id}>
                    {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Comparison Results */}
        {crop1 && crop2 && (
          <div className="space-y-4 pt-2 animate-fade-in">
            {/* Header */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-semibold text-foreground">{crop1.name}</p>
                <p className="text-xs text-muted-foreground">{crop1.duration}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">{crop2.name}</p>
                <p className="text-xs text-muted-foreground">{crop2.duration}</p>
              </div>
            </div>

            <div className="space-y-3 p-3 rounded-xl bg-muted/30">
              <CompareBar 
                label="Water Requirement" 
                value1={crop1.waterRequirement} 
                value2={crop2.waterRequirement}
                type="water"
              />
              <CompareBar 
                label="Profit Level" 
                value1={crop1.profitLevel} 
                value2={crop2.profitLevel}
                type="profit"
              />
              <CompareBar 
                label="Overall Risk" 
                value1={riskScore(crop1)} 
                value2={riskScore(crop2)}
                type="risk"
              />
            </div>

            {/* Summary */}
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Recommendation:</strong>{' '}
                {profitScore[crop1.profitLevel] >= profitScore[crop2.profitLevel] && waterScore[crop1.waterRequirement] <= waterScore[crop2.waterRequirement]
                  ? `${crop1.name} offers better balance of profit and water efficiency.`
                  : profitScore[crop2.profitLevel] >= profitScore[crop1.profitLevel] && waterScore[crop2.waterRequirement] <= waterScore[crop1.waterRequirement]
                    ? `${crop2.name} offers better balance of profit and water efficiency.`
                    : 'Both crops have trade-offs. Consider your water availability and risk tolerance.'}
              </p>
            </div>
          </div>
        )}

        {(!crop1 || !crop2) && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Select two crops to compare their characteristics
          </div>
        )}
      </div>
    </div>
  );
};

export default CropComparison;
