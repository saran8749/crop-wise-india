import { useState, useEffect } from 'react';
import { Crop, getCropImage } from '@/data/cropData';
import { Droplets, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CropCardProps {
  crop: Crop;
  rank: number;
  onClick: () => void;
}

const CropCard = ({ crop, rank, onClick }: CropCardProps) => {
  const [currentImage, setCurrentImage] = useState(crop.image);

  // Randomly select image on mount
  useEffect(() => {
    setCurrentImage(Math.random() > 0.5 ? crop.image : crop.imageAlt);
  }, [crop.id]);

  const waterColors = {
    low: 'bg-risk-low',
    medium: 'bg-risk-medium',
    high: 'bg-water',
  };

  const profitColors = {
    low: 'text-profit-low',
    medium: 'text-profit-medium',
    high: 'text-profit-high',
  };

  const getOverallRisk = () => {
    const risks = Object.values(crop.riskFactors);
    const highCount = risks.filter(r => r === 'high').length;
    const medCount = risks.filter(r => r === 'medium').length;
    if (highCount >= 2) return 'high';
    if (highCount >= 1 || medCount >= 2) return 'medium';
    return 'low';
  };

  const overallRisk = getOverallRisk();

  return (
    <div
      onClick={onClick}
      className="group relative card-gradient rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/30 transform hover:-translate-y-1"
    >
      {/* Rank Badge */}
      <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-sm font-bold text-secondary-foreground shadow-lg">
        {rank}
      </div>

      {/* Crop Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={currentImage}
          alt={crop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = crop.image;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Quick Stats Overlay */}
        <div className="absolute bottom-2 right-2 flex gap-1.5">
          <div className={cn('px-2 py-1 rounded-full text-xs font-medium', waterColors[crop.waterRequirement], 'text-white/90 backdrop-blur-sm')}>
            <Droplets className="w-3 h-3 inline mr-1" />
            {crop.waterRequirement}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {crop.name}
            </h3>
            {crop.localName && (
              <p className="text-sm text-muted-foreground">{crop.localName}</p>
            )}
          </div>
          <div className={cn('flex items-center gap-1', profitColors[crop.profitLevel])}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium capitalize">{crop.profitLevel}</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{crop.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertTriangle className={cn('w-3.5 h-3.5', 
              overallRisk === 'high' ? 'text-risk-high' : 
              overallRisk === 'medium' ? 'text-risk-medium' : 'text-risk-low'
            )} />
            <span className="capitalize">{overallRisk} risk</span>
          </div>
        </div>

        {/* 3-Line Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {crop.fullDescription?.[0] || crop.description}
        </p>

        {/* Seasons */}
        <div className="flex flex-wrap gap-1.5">
          {crop.season.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default CropCard;
