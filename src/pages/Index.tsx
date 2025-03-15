
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
      <div className="absolute top-6 right-6">
        <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
        {/* App logo/brand */}
        <div className="mb-8">
          <div className="font-bold text-4xl text-[#1EAEDB]">BulkAI</div>
        </div>
        
        {/* Hero image */}
        <div className="w-full max-w-md mb-12">
          <img 
            src="/lovable-uploads/547e4c49-0421-4f0b-9cb2-bb0838d06b9a.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full object-cover rounded-xl"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900 mb-6">
          Scan. Cook. Gain.
        </h1>
        
        <p className="text-xl text-center mb-10 max-w-md text-gray-600">
          Snap a photo of your fridge and get tailored high-protein recipes in seconds
        </p>
        
        <div className="w-full max-w-md space-y-4 px-4">
          <Button 
            className="w-full h-14 text-lg bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white rounded-full shadow-md"
            onClick={handleGetStarted}
            icon={<ChevronRight size={20} />}
            iconPosition="right"
          >
            Snap Your Fridge
          </Button>
          
          <div className="text-center pt-4">
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
