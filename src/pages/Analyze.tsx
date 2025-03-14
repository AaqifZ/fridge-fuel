
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';
import RefrigeratorAnalysis from '@/components/RefrigeratorAnalysis';
import Button from '@/components/Button';
import { useRecipes } from '@/hooks/useRecipes';

const Analyze: React.FC = () => {
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const navigate = useNavigate();
  const { setAvailableIngredients } = useRecipes();
  
  const handleAnalysisComplete = (ingredients: string[]) => {
    setDetectedIngredients(ingredients);
    setIsAnalysisComplete(true);
  };
  
  const handleFindRecipes = () => {
    setAvailableIngredients(detectedIngredients);
    navigate('/recipes');
  };

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-bold">Analyze Your Fridge</h1>
          <p className="text-muted-foreground mt-2">
            Take a photo of your refrigerator to identify available ingredients
          </p>
        </div>
        
        <RefrigeratorAnalysis onAnalysisComplete={handleAnalysisComplete} />
        
        {isAnalysisComplete && (
          <div className="glass-card rounded-xl p-6 mt-6 w-full max-w-lg mx-auto animate-slide-up">
            <div className="flex items-center space-x-2 mb-4">
              <CircleCheck className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-medium">Analysis Complete</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm">We found the following ingredients:</p>
              
              <div className="flex flex-wrap gap-2 pb-3">
                {detectedIngredients.map((ingredient, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
              
              <Button 
                onClick={handleFindRecipes} 
                className="w-full"
              >
                Find High-Protein Recipes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyze;
