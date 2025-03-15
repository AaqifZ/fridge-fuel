
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import Button from '@/components/Button';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { resetOnboarding } = useOnboarding();
  
  useEffect(() => {
    // Log component mounting for debugging
    console.log("Index component mounted");
    return () => console.log("Index component unmounted");
  }, []);
  
  const handleGetStarted = () => {
    console.log("Directing user to onboarding");
    resetOnboarding();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden" id="index-container">
      {/* Language selector */}
      <div className="absolute top-6 right-6 z-10">
        <button className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
        {/* App logo */}
        <h2 className="font-bold text-4xl text-[#1EAEDB] mb-8">BulkAI</h2>
        
        {/* Hero image */}
        <div className="w-full max-w-md mb-10 relative">
          <img 
            src="/lovable-uploads/547e4c49-0421-4f0b-9cb2-bb0838d06b9a.png" 
            alt="Open refrigerator filled with food items" 
            className="w-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#1EAEDB] p-4 rounded-full">
              <Camera size={24} className="text-white" />
            </div>
          </div>
        </div>
        
        {/* Heading and subheading */}
        <h1 className="text-4xl font-bold text-center tracking-tight text-gray-900 mb-4">
          Scan. Cook. Gain.
        </h1>
        
        <p className="text-xl text-center mb-8 max-w-md text-gray-600">
          Snap a photo of your fridge and get tailored high-protein recipes in seconds
        </p>
        
        {/* CTA Button */}
        <div className="w-full max-w-md px-4">
          <Button 
            className="w-full h-14 text-lg bg-[#1EAEDB] hover:bg-[#1EAEDB]/90 text-white rounded-full shadow-md"
            onClick={handleGetStarted}
            icon={<ChevronRight size={20} />}
            iconPosition="right"
          >
            Snap Your Fridge
          </Button>
          
          {/* Footer text */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              Join athletes and fitness enthusiasts saving time while hitting their protein goals
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
