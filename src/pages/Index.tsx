
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Language selector in top right */}
      <div className="absolute top-6 right-6 flex items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">EN</span>
        </div>
      </div>
      
      {/* Main content - vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-end pb-32">
        {/* Cooking image */}
        <div className="w-64 h-64 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Fresh ingredients for cooking" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <h1 className="text-5xl font-bold text-center tracking-tight">
          Cooking meals<br />made easy
        </h1>
        
        <div className="w-full max-w-md space-y-4 mt-10 px-8">
          <Button 
            className="w-full py-6 text-lg rounded-full bg-black text-white hover:bg-black/90"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          
          <div className="text-center pt-3">
            <p className="text-muted-foreground">
              Purchased on the web? <a href="#" className="text-black font-semibold">Sign In</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom indicator line */}
      <div className="pb-8 flex justify-center">
        <div className="w-16 h-1 bg-black/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
