
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useOnboarding();
  
  // Always force users through onboarding
  const handleGetStarted = () => {
    // Reset onboarding state to ensure a fresh start
    console.log("Directing user to onboarding");
    resetOnboarding();
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Language selector in top right */}
      <div className="absolute top-6 right-6">
        <button className="px-5 py-3 text-base font-medium text-gray-700 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-10">
        {/* App logo/brand */}
        <div className="mb-6">
          <div className="font-bold text-3xl text-primary">BulkAI</div>
        </div>
        
        {/* Hero image - showing a refrigerator filled with food items */}
        <div className="relative w-72 h-72 mb-8 rounded-xl overflow-hidden">
          <img 
            src="/lovable-uploads/547e4c49-0421-4f0b-9cb2-bb0838d06b9a.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-gray-900 mb-5">
          Scan. Cook. Gain.
        </h1>
        
        <p className="text-xl text-center mb-10 max-w-md text-gray-600">
          Snap a photo of your fridge and get tailored high-protein recipes in seconds
        </p>
        
        <div className="w-full max-w-md space-y-4 px-4">
          <Button 
            className="w-full py-6 text-lg rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 shadow-md h-14"
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
