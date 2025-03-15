
import React from 'react';
import { X, HelpCircle, Camera, Zap, Image, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Camera interface */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* Camera viewfinder area */}
        <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden mb-8">
          {/* Top action buttons */}
          <div className="absolute top-4 left-0 right-0 flex justify-between px-4 z-10">
            <button className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded-full">
              <X className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded-full">
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Scanner frame corners */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-4/5 aspect-square">
              {/* Top left corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/70 rounded-tl"></div>
              {/* Top right corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/70 rounded-tr"></div>
              {/* Bottom left corner */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/70 rounded-bl"></div>
              {/* Bottom right corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/70 rounded-br"></div>
            </div>
          </div>
          
          {/* Bottom action buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center px-4 z-10">
            {/* Scan Food button */}
            <div className="bg-white/90 rounded-full px-4 py-2 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Scan className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-black">Scan Food</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600">
                  <Image className="w-5 h-5" />
                </button>
                <button className="text-gray-600">
                  <span className="block w-5 h-5 border border-gray-600 rounded"></span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Camera button */}
          <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
            <div className="relative">
              <button className="w-16 h-16 rounded-full bg-white border-4 border-gray-200"></button>
              <button className="absolute -left-12 bottom-4 w-10 h-10 flex items-center justify-center bg-gray-800/90 rounded-full">
                <Zap className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom text and CTA */}
      <div className="px-6 pb-12 pt-24 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center mb-4 tracking-tight">
          Protein tracking<br />made easy
        </h1>
        
        <div className="w-full max-w-md space-y-4 mt-8">
          <Button 
            className="w-full py-6 text-lg rounded-full"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          
          <div className="text-center">
            <p className="text-muted-foreground">
              Purchased on the web? <a href="#" className="text-foreground font-semibold">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
