import { Leaf, Sprout } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="hero-gradient text-primary-foreground py-12 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/15 blur-2xl" />
      </div>

      <div className="container mx-auto relative">
        <div className="absolute top-0 right-0">
          <UserMenu />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-float">
            <Sprout className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Smart Crop Advisor
            </h1>
            <p className="text-primary-foreground/80 text-lg mt-1">
              India & Tamil Nadu Agricultural Recommendation System
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">26 Tamil Nadu Districts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">5 Agricultural Zones</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Leaf className="w-4 h-4" />
            <span className="text-sm">Top 10 Crops per District</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
