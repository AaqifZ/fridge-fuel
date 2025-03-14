
import React from 'react';
import { Dumbbell } from 'lucide-react';

const WelcomeStep = () => {
  return (
    <div className="text-center space-y-6 py-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-6 w-24 h-24 flex items-center justify-center">
          <Dumbbell className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold">Welcome to GainChef</h1>
      
      <p className="text-muted-foreground">
        Let's set up your profile to create the perfect high-protein recipes with what's in your fridge.
      </p>
      
      <div className="pt-4">
        <ul className="space-y-2 text-sm text-left mx-auto w-fit">
          <li className="flex items-center gap-2">
            <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-primary text-xs">✓</div>
            <span>Calculate your protein needs</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-primary text-xs">✓</div>
            <span>Analyze your refrigerator ingredients</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center text-primary text-xs">✓</div>
            <span>Get personalized high-protein recipes</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeStep;
