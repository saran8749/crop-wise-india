import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import LocationSelector from '@/components/LocationSelector';
import CropGrid from '@/components/CropGrid';
import CropDetailModal from '@/components/CropDetailModal';
import CropComparison from '@/components/CropComparison';
import { Crop } from '@/data/cropData';

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <LocationSelector onLocationChange={handleLocationChange} />
        
        <CropGrid 
          location={location} 
          onCropSelect={handleCropSelect} 
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
