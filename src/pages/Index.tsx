
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, ChevronRight } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Language selector in top right */}
      <div className="absolute top-6 right-6">
        <button className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
        {/* App logo/brand */}
        <div className="mb-6">
          <div className="font-bold text-2xl text-primary">BulkAI</div>
        </div>
        
        {/* Hero image - showing a refrigerator filled with food items */}
        <div className="relative w-56 h-56 mb-8">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <img 
            src="/lovable-uploads/48950a23-302f-4015-87c5-6ddc85fbea8d.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-gray-900 mb-3">
          Scan. Cook. Gain.
        </h1>
        
        <p className="text-xl text-center mb-10 max-w-md text-gray-700">
          Snap a photo of your fridge and get tailored high-protein recipes in seconds
        </p>
        
        <div className="w-full max-w-md space-y-4 px-4">
          <Button 
            className="w-full py-6 text-lg rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 shadow-md"
            onClick={handleGetStarted}
          >
            Snap Your Fridge <ChevronRight size={20} />
          </Button>
          
          <div className="text-center pt-2">
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
