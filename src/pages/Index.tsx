
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Camera } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useOnboarding();
  
  const handleGetStarted = () => {
    console.log("Directing user to onboarding");
    resetOnboarding();
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Language selector in top right */}
      <div className="absolute top-6 right-6">
        <button className="w-16 h-16 flex items-center justify-center text-base font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
        {/* App logo/brand */}
        <div className="mb-8">
          <div className="font-bold text-5xl text-primary">BulkAI</div>
        </div>
        
        {/* Hero image with camera overlay */}
        <div className="relative w-72 h-72 mb-12">
          <img 
            src="/lovable-uploads/547e4c49-0421-4f0b-9cb2-bb0838d06b9a.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full h-full object-cover rounded-xl"
          />
          
          {/* Small camera icon on top */}
          <div className="absolute top-4 right-1/2 transform translate-x-1/2">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Large camera icon overlay */}
          <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/3">
            <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-center tracking-tight text-gray-900 mb-6">
          Scan. Cook. Gain.
        </h1>
        
        <p className="text-xl text-center mb-12 max-w-md text-gray-600">
          Snap a photo of your fridge and get tailored high-protein recipes in seconds
        </p>
        
        <div className="w-full max-w-md space-y-4 px-4">
          <Button 
            className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-md"
            onClick={handleGetStarted}
          >
            Snap Your Fridge <ChevronRight className="ml-1" size={20} />
          </Button>
          
          <div className="text-center pt-6">
            <p className="text-sm text-gray-500">
              Join athletes and fitness enthusiasts saving time while hitting their protein goals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
