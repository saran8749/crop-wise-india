import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, 
  IndianRupee, RefreshCw, Store
} from 'lucide-react';
import { MarketPrice, marketPrices, crops, tamilNaduDistricts } from '@/data/cropData';
import { cn } from '@/lib/utils';

interface MarketPricesProps {
  districtId: string | undefined;
}

const MarketPrices = ({ districtId }: MarketPricesProps) => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchPrices = () => {
    if (districtId) {
      setLoading(true);
      setTimeout(() => {
        const districtPrices = marketPrices[districtId];
        if (districtPrices) {
          setPrices(districtPrices);
        } else {
          // Generate random prices for districts without data
          const district = tamilNaduDistricts.find(d => d.id === districtId);
          if (district) {
            const generatedPrices = district.topCrops.slice(0, 4).map(cropId => ({
              cropId,
              price: Math.floor(1000 + Math.random() * 10000),
              unit: '₹/quintal',
              change: parseFloat((Math.random() * 10 - 5).toFixed(1)),
              trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' as 'up' | 'down' | 'stable',
              lastUpdated: `${Math.floor(Math.random() * 3) + 1} hour${Math.random() > 0.5 ? 's' : ''} ago`,
            }));
            setPrices(generatedPrices);
          }
        }
        setLastRefresh(new Date());
        setLoading(false);
      }, 500);
    } else {
      setPrices([]);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [districtId]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-profit-high" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-risk-high" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return 'text-profit-high';
    if (trend === 'down') return 'text-risk-high';
    return 'text-muted-foreground';
  };

  const districtName = districtId 
    ? tamilNaduDistricts.find(d => d.id === districtId)?.name 
    : null;

  if (!districtId) {
    return null;
  }

  return (
    <div className="card-gradient rounded-2xl p-6 shadow-card border border-border/50 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-profit-high/10">
            <IndianRupee className="w-5 h-5 text-profit-high" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Market Prices - {districtName}
            </h3>
            <p className="text-xs text-muted-foreground">
              Updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <button
          onClick={fetchPrices}
          disabled={loading}
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <RefreshCw className={cn('w-4 h-4 text-primary', loading && 'animate-spin')} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
        </div>
      ) : prices.length > 0 ? (
        <div className="space-y-3">
          {prices.map((price) => {
            const crop = crops[price.cropId];
            if (!crop) return null;
            
            return (
              <div
                key={price.cropId}
                className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{crop.name}</p>
                      <p className="text-xs text-muted-foreground">{price.lastUpdated}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      {price.price.toLocaleString('en-IN')} <span className="text-xs font-normal text-muted-foreground">{price.unit.replace('₹/', '')}</span>
                    </p>
                    <div className={cn('flex items-center gap-1 text-sm', getTrendColor(price.trend, price.change))}>
                      {getTrendIcon(price.trend)}
                      <span>{price.change > 0 ? '+' : ''}{price.change}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Store className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No market data available</p>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
