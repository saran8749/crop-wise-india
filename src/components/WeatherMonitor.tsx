import { useState, useEffect } from 'react';
import { 
  Cloud, Sun, CloudRain, CloudLightning, 
  Thermometer, Droplets, Wind, AlertTriangle,
  CloudSun
} from 'lucide-react';
import { WeatherData, districtWeather, tamilNaduDistricts } from '@/data/cropData';
import { cn } from '@/lib/utils';

interface WeatherMonitorProps {
  districtId: string | undefined;
}

const WeatherMonitor = ({ districtId }: WeatherMonitorProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (districtId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const data = districtWeather[districtId] || {
          temperature: 28 + Math.floor(Math.random() * 8),
          humidity: 60 + Math.floor(Math.random() * 20),
          rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0,
          condition: ['sunny', 'cloudy', 'partly-cloudy', 'rainy'][Math.floor(Math.random() * 4)] as WeatherData['condition'],
          alerts: [],
        };
        setWeather(data);
        setLoading(false);
      }, 500);
    } else {
      setWeather(null);
    }
  }, [districtId]);

  const getWeatherIcon = (condition: WeatherData['condition']) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-amber-500" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 'partly-cloudy':
        return <CloudSun className="w-12 h-12 text-amber-400" />;
      case 'rainy':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      case 'stormy':
        return <CloudLightning className="w-12 h-12 text-purple-500" />;
      default:
        return <Sun className="w-12 h-12 text-amber-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'heat':
        return <Thermometer className="w-4 h-4" />;
      case 'rain':
      case 'flood':
        return <CloudRain className="w-4 h-4" />;
      case 'drought':
        return <Sun className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-risk-low/10 border-risk-low/20 text-risk-low';
      case 'medium':
        return 'bg-risk-medium/10 border-risk-medium/20 text-risk-medium';
      case 'high':
        return 'bg-risk-high/10 border-risk-high/20 text-risk-high';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const districtName = districtId 
    ? tamilNaduDistricts.find(d => d.id === districtId)?.name 
    : null;

  if (!districtId) {
    return null;
  }

  return (
    <div className="card-gradient rounded-2xl p-6 shadow-card border border-border/50 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-water/10">
          <Cloud className="w-5 h-5 text-water" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Live Weather - {districtName}
          </h3>
          <p className="text-xs text-muted-foreground">Real-time monitoring</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
        </div>
      ) : weather ? (
        <div className="space-y-4">
          {/* Main Weather Display */}
          <div className="flex items-center gap-6">
            <div className="animate-bounce-slow">
              {getWeatherIcon(weather.condition)}
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground">
                {weather.temperature}°C
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {weather.condition.replace('-', ' ')}
              </div>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-water/5 border border-water/10 text-center">
              <Droplets className="w-5 h-5 text-water mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
              <CloudRain className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Rainfall</p>
              <p className="font-semibold text-foreground">{weather.rainfall}mm</p>
            </div>
            <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/10 text-center">
              <Wind className="w-5 h-5 text-secondary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">12 km/h</p>
            </div>
          </div>

          {/* Weather Alerts */}
          {weather.alerts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-risk-medium" />
                Weather Alerts
              </h4>
              {weather.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-3 rounded-xl border flex items-start gap-3',
                    getAlertColor(alert.severity)
                  )}
                >
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="text-sm font-medium capitalize">{alert.type} Warning</p>
                    <p className="text-xs opacity-80">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default WeatherMonitor;
