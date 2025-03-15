
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Language selector in top right - improved position and styling */}
      <div className="absolute top-6 right-6">
        <button className="px-3 py-1 text-sm font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
          EN
        </button>
      </div>
      
      {/* Main content - better vertical distribution */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-10">
        {/* App logo/brand */}
        <div className="mb-6">
          <div className="font-bold text-2xl text-primary">FridgeFuel</div>
        </div>
        
        {/* Hero image - smaller, more relevant */}
        <div className="relative w-48 h-48 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" 
            alt="Protein-rich food" 
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center tracking-tight text-gray-900 mb-3">
          Protein Made Simple
        </h1>
        
        <p className="text-xl text-center mb-10 max-w-md text-gray-700">
          Easy recipes to hit your protein goals without breaking the bank
        </p>
        
        <div className="w-full max-w-md space-y-4 px-4">
          <Button 
            className="w-full py-6 text-lg rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 shadow-md"
            onClick={handleGetStarted}
          >
            Start Cooking <ChevronRight size={20} />
          </Button>
          
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Join thousands of fitness enthusiasts who save money while eating better
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
