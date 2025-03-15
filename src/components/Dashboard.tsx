
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Camera, ChefHat, TrendingUp } from 'lucide-react';
import ProgressBar from './ProgressBar';
import Button from '@/components/Button';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { proteinTarget, consumedProtein } = useProteinCalculator();
  
  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-primary" />,
      title: 'Protein Calculator',
      description: 'Set your personalized protein targets based on your body stats and goals',
      action: () => navigate('/calculator')
    },
    {
      icon: <Camera className="w-6 h-6 text-primary" />,
      title: 'Analyze Fridge',
      description: 'Scan your refrigerator to identify available ingredients',
      action: () => navigate('/analyze')
    },
    {
      icon: <ChefHat className="w-6 h-6 text-primary" />,
      title: 'Get Recipes',
      description: 'Discover high-protein recipes from your available ingredients',
      action: () => navigate('/recipes')
    }
  ];

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="glass-card rounded-xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Protein Tracker</h2>
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Daily Protein Target</span>
              <span className="text-sm font-bold">{proteinTarget}g</span>
            </div>
            <ProgressBar 
              value={consumedProtein} 
              max={proteinTarget} 
              size="lg"
              color="secondary"
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Current intake</span>
            <span className="font-semibold">{consumedProtein}g / {proteinTarget}g</span>
          </div>
          
          <div className="pt-2 text-center">
            {consumedProtein >= proteinTarget ? (
              <div className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg inline-flex items-center">
                <span className="text-sm font-medium">🎯 Target achieved!</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg inline-flex items-center">
                <span className="text-sm font-medium">{proteinTarget - consumedProtein}g to go</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="glass-card rounded-xl p-5 animate-slide-up transition-all duration-300 hover:shadow-md"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                {feature.icon}
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={feature.action}
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                {index === 0 ? 'Calculate' : index === 1 ? 'Scan Now' : 'Get Recipes'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
