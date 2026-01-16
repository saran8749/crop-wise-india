import { Crop } from '@/data/cropData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Droplets, Calendar, TrendingUp, AlertTriangle, 
  Leaf, Sun, CloudRain, Bug, Building2, X,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CropDetailModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
}

const CropDetailModal = ({ crop, isOpen, onClose }: CropDetailModalProps) => {
  if (!crop) return null;

  const riskColors = {
    low: { bg: 'bg-risk-low', text: 'text-risk-low', label: 'Low' },
    medium: { bg: 'bg-risk-medium', text: 'text-risk-medium', label: 'Medium' },
    high: { bg: 'bg-risk-high', text: 'text-risk-high', label: 'High' },
  };

  const waterPercentage = {
    low: 33,
    medium: 66,
    high: 100,
  };

  const profitStyles = {
    low: { color: 'text-profit-low', label: 'Low Profit' },
    medium: { color: 'text-profit-medium', label: 'Medium Profit' },
    high: { color: 'text-profit-high', label: 'High Profit' },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-card border-border">
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={crop.image}
              alt={crop.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="font-display text-4xl font-bold text-foreground mb-1">
                {crop.name}
              </h1>
              {crop.localName && (
                <p className="text-lg text-muted-foreground">{crop.localName}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Calendar className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">{crop.duration}</p>
              </div>
              <div className="p-4 rounded-xl bg-water/10 border border-water/20">
                <Droplets className="w-5 h-5 text-water mb-2" />
                <p className="text-sm text-muted-foreground">Water Need</p>
                <p className="font-semibold text-foreground capitalize">{crop.waterRequirement}</p>
              </div>
              <div className={cn('p-4 rounded-xl', profitStyles[crop.profitLevel].color === 'text-profit-high' ? 'bg-profit-high/10 border border-profit-high/20' : profitStyles[crop.profitLevel].color === 'text-profit-medium' ? 'bg-profit-medium/10 border border-profit-medium/20' : 'bg-profit-low/10 border border-profit-low/20')}>
                <TrendingUp className={cn('w-5 h-5 mb-2', profitStyles[crop.profitLevel].color)} />
                <p className="text-sm text-muted-foreground">Profit Level</p>
                <p className={cn('font-semibold', profitStyles[crop.profitLevel].color)}>{profitStyles[crop.profitLevel].label}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <Sun className="w-5 h-5 text-secondary mb-2" />
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-semibold text-foreground capitalize">{crop.season.join(', ')}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{crop.description}</p>
            </div>

            {/* Water Requirement */}
            <div className="p-5 rounded-xl bg-water/5 border border-water/10">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-water" />
                <h3 className="font-display text-lg font-semibold text-foreground">Water Requirement</h3>
              </div>
              <div className="mb-3">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full water-bar rounded-full transition-all duration-1000"
                    style={{ width: `${waterPercentage[crop.waterRequirement]}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{crop.waterDescription}</p>
            </div>

            {/* Risk Factors */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-risk-medium" />
                <h3 className="font-display text-lg font-semibold text-foreground">Risk Analysis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Climate Risk</span>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium text-white', riskColors[crop.riskFactors.climate].bg)}>
                      {riskColors[crop.riskFactors.climate].label}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full', riskColors[crop.riskFactors.climate].bg)}
                      style={{ width: crop.riskFactors.climate === 'low' ? '33%' : crop.riskFactors.climate === 'medium' ? '66%' : '100%' }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bug className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Pest Risk</span>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium text-white', riskColors[crop.riskFactors.pest].bg)}>
                      {riskColors[crop.riskFactors.pest].label}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full', riskColors[crop.riskFactors.pest].bg)}
                      style={{ width: crop.riskFactors.pest === 'low' ? '33%' : crop.riskFactors.pest === 'medium' ? '66%' : '100%' }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Water Dependency</span>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium text-white', riskColors[crop.riskFactors.waterDependency].bg)}>
                      {riskColors[crop.riskFactors.waterDependency].label}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn('h-full rounded-full', riskColors[crop.riskFactors.waterDependency].bg)}
                      style={{ width: crop.riskFactors.waterDependency === 'low' ? '33%' : crop.riskFactors.waterDependency === 'medium' ? '66%' : '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Crop Calendar */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-lg font-semibold text-foreground">Crop Calendar</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Sowing</p>
                  <p className="font-medium text-foreground text-sm">{crop.calendar.sowing}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/10 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Growth</p>
                  <p className="font-medium text-foreground text-sm">{crop.calendar.growth}</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Harvest</p>
                  <p className="font-medium text-foreground text-sm">{crop.calendar.harvest}</p>
                </div>
              </div>
            </div>

            {/* Soil Types */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-accent" />
                <h3 className="font-display text-lg font-semibold text-foreground">Suitable Soil Types</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {crop.soilTypes.map((soil) => (
                  <span
                    key={soil}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {soil}
                  </span>
                ))}
              </div>
            </div>

            {/* Required Facilities */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">Required Facilities</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {crop.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Demand */}
            <div className="p-5 rounded-xl gold-gradient">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-secondary-foreground" />
                <h3 className="font-display text-lg font-semibold text-secondary-foreground">Market Demand</h3>
              </div>
              <p className="text-secondary-foreground/80">{crop.marketDemand}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CropDetailModal;
