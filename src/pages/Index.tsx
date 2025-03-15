
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
        {/* Protein-focused image */}
        <div className="w-64 h-64 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" 
            alt="Protein-rich food preparation" 
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
              Hit your daily protein target, without breaking the bank
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
