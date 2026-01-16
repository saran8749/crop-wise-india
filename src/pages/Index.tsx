import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import LocationSelector from '@/components/LocationSelector';
import CropGrid from '@/components/CropGrid';
import CropDetailModal from '@/components/CropDetailModal';
import CropComparison from '@/components/CropComparison';
import WeatherMonitor from '@/components/WeatherMonitor';
import MarketPrices from '@/components/MarketPrices';
import AIRecommendation from '@/components/AIRecommendation';
import SoilTypeFilter from '@/components/SoilTypeFilter';
import { Crop, SoilType, tamilNaduDistricts } from '@/data/cropData';

interface LocationState {
  country: string;
  state: string;
  region?: string;
  district?: string;
}

const Index = () => {
  const [location, setLocation] = useState<LocationState | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSoilType, setSelectedSoilType] = useState<SoilType | null>(null);

  const handleLocationChange = useCallback((newLocation: LocationState) => {
    setLocation(newLocation);
  }, []);

  const handleCropSelect = (crop: Crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCrop(null), 200);
  };

  // Get available soil types for selected district
  const availableSoilTypes = location?.district
    ? tamilNaduDistricts.find(d => d.id === location.district)?.soilType
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <LocationSelector onLocationChange={handleLocationChange} />
        
        {/* Weather and Market Row */}
        {location?.district && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherMonitor districtId={location.district} />
            <MarketPrices districtId={location.district} />
          </div>
        )}

        {/* Soil Type Filter and AI Recommendations */}
        {location?.district && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SoilTypeFilter 
              selectedSoilType={selectedSoilType}
              onSoilTypeChange={setSelectedSoilType}
              availableSoilTypes={availableSoilTypes}
            />
            <AIRecommendation 
              districtId={location.district}
              selectedSoilType={selectedSoilType}
              onCropSelect={handleCropSelect}
            />
          </div>
        )}
        
        <CropGrid 
          location={location} 
          onCropSelect={handleCropSelect}
          selectedSoilType={selectedSoilType}
        />
      </main>

      <CropDetailModal 
        crop={selectedCrop}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <CropComparison />

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Smart Crop Recommendation System for India & Tamil Nadu</p>
          <p className="mt-1">Helping farmers make informed decisions for better yields</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
