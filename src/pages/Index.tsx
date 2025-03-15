
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import Button from '@/components/Button';

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
      <div className="absolute top-4 right-4">
        <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* App logo/brand */}
        <div className="mb-4">
          <div className="font-bold text-3xl text-[#59B7E3]">BulkAI</div>
        </div>
        
        {/* Hero image with camera icons */}
        <div className="relative w-full max-w-xs mb-4">
          <img 
            src="/lovable-uploads/547e4c49-0421-4f0b-9cb2-bb0838d06b9a.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full object-cover rounded-lg"
          />
          
          {/* Middle camera icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#59B7E3] rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Bottom camera icon */}
          <div className="absolute -bottom-10 inset-x-0 flex justify-center">
            <div className="w-20 h-20 bg-[#59B7E3] rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        
        {/* Added margin to push content down past the bottom camera icon */}
        <div className="mt-16">
          <h1 className="text-3xl font-bold text-center tracking-tight text-gray-900 mb-2">
            Scan. Cook. Gain.
          </h1>
          
          <p className="text-base text-center mb-6 max-w-xs text-gray-600">
            Snap a photo of your fridge and get tailored high-protein recipes in seconds
          </p>
          
          <div className="w-full max-w-xs space-y-4">
            <Button 
              className="w-full py-3 text-base bg-[#59B7E3] hover:bg-[#59B7E3]/90 text-white rounded-full shadow-sm"
              onClick={handleGetStarted}
              icon={<ChevronRight size={16} />}
              iconPosition="right"
            >
              Snap Your Fridge
            </Button>
            
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                Join athletes and fitness enthusiasts saving time while hitting their protein goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
