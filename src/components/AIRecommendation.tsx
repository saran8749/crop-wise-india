import { useState, useEffect } from 'react';
import { 
  Sparkles, Lightbulb, TrendingUp, Droplets, 
  Sun, AlertTriangle, CheckCircle2, ArrowRight
} from 'lucide-react';
import { crops, tamilNaduDistricts, districtWeather, SoilType, soilTypeNames, Crop } from '@/data/cropData';
import { cn } from '@/lib/utils';

interface AIRecommendationProps {
  districtId: string | undefined;
  selectedSoilType: SoilType | null;
  onCropSelect: (crop: Crop) => void;
}

interface Recommendation {
  cropId: string;
  score: number;
  reasons: string[];
  warnings: string[];
}

const AIRecommendation = ({ districtId, selectedSoilType, onCropSelect }: AIRecommendationProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    if (districtId) {
      setLoading(true);
      setTimeout(() => {
        const district = tamilNaduDistricts.find(d => d.id === districtId);
        const weather = districtWeather[districtId];
        
        if (district) {
          const recs: Recommendation[] = district.topCrops
            .map(cropId => {
              const crop = crops[cropId];
              if (!crop) return null;

              let score = 70 + Math.random() * 20;
              const reasons: string[] = [];
              const warnings: string[] = [];

              // Soil type matching
              if (selectedSoilType && crop.soilCategories.includes(selectedSoilType)) {
                score += 10;
                reasons.push(`Excellent match for ${soilTypeNames[selectedSoilType]}`);
              } else if (selectedSoilType) {
                score -= 5;
                warnings.push(`Not ideal for ${soilTypeNames[selectedSoilType]}, consider alternatives`);
              }

              // Weather-based recommendations
              if (weather) {
                if (weather.rainfall > 5 && crop.waterRequirement === 'high') {
                  score += 5;
                  reasons.push('Current rainfall favorable for this crop');
                }
                if (weather.temperature > 35 && crop.riskFactors.climate === 'high') {
                  score -= 5;
                  warnings.push('High temperature may stress the crop');
                }
                if (weather.alerts.some(a => a.type === 'drought') && crop.waterRequirement === 'low') {
                  score += 8;
                  reasons.push('Drought-tolerant crop suitable for current conditions');
                }
              }

              // Profit potential
              if (crop.profitLevel === 'high') {
                reasons.push('High profit potential with strong market demand');
              }

              // Risk assessment
              if (crop.riskFactors.pest === 'high') {
                warnings.push('Requires intensive pest management');
              }

              // Add generic positive reasons
              if (reasons.length < 2) {
                reasons.push('Well-suited for this region\'s agro-climatic conditions');
              }

              return {
                cropId,
                score: Math.min(98, Math.max(50, Math.round(score))),
                reasons,
                warnings,
              };
            })
            .filter(Boolean)
            .sort((a, b) => (b?.score || 0) - (a?.score || 0))
            .slice(0, 5) as Recommendation[];

          setRecommendations(recs);
        }
        setLoading(false);
      }, 800);
    } else {
      setRecommendations([]);
    }
  }, [districtId, selectedSoilType]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-profit-high bg-profit-high';
    if (score >= 70) return 'text-risk-medium bg-risk-medium';
    return 'text-risk-high bg-risk-high';
  };

  if (!districtId) {
    return null;
  }

  return (
    <div className="card-gradient rounded-2xl p-6 shadow-card border border-border/50 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            AI Recommendations
          </h3>
          <p className="text-xs text-muted-foreground">
            Smart crop suggestions based on conditions
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-purple-500/20 rounded-full" />
            <div className="absolute inset-0 w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-muted-foreground">Analyzing conditions...</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-3">
          {recommendations.map((rec, index) => {
            const crop = crops[rec.cropId];
            if (!crop) return null;

            const isExpanded = showDetails === rec.cropId;

            return (
              <div
                key={rec.cropId}
                className={cn(
                  'rounded-xl border transition-all duration-300 overflow-hidden',
                  index === 0 
                    ? 'bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20' 
                    : 'bg-muted/30 border-border/50 hover:border-primary/30'
                )}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setShowDetails(isExpanded ? null : rec.cropId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {index === 0 && (
                        <div className="p-1 rounded-full bg-purple-500/20">
                          <Lightbulb className="w-4 h-4 text-purple-500" />
                        </div>
                      )}
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div>
                        <p className="font-medium text-foreground flex items-center gap-2">
                          {crop.name}
                          {index === 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-500">
                              Top Pick
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{crop.localName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center font-bold text-white',
                        getScoreColor(rec.score).split(' ')[1]
                      )}>
                        {rec.score}
                      </div>
                      <ArrowRight className={cn(
                        'w-4 h-4 text-muted-foreground transition-transform',
                        isExpanded && 'rotate-90'
                      )} />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-in">
                    <div className="h-px bg-border" />
                    
                    {/* Reasons */}
                    {rec.reasons.length > 0 && (
                      <div className="space-y-2">
                        {rec.reasons.map((reason, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-profit-high mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{reason}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Warnings */}
                    {rec.warnings.length > 0 && (
                      <div className="space-y-2">
                        {rec.warnings.map((warning, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-risk-medium mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{warning}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="flex gap-3 pt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Droplets className="w-3 h-3" />
                        <span className="capitalize">{crop.waterRequirement} water</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span className="capitalize">{crop.profitLevel} profit</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Sun className="w-3 h-3" />
                        <span>{crop.duration}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCropSelect(crop);
                      }}
                      className="w-full mt-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      View Full Details
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Select a district to get AI recommendations</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
