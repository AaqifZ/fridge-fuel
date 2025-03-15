
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Beef } from 'lucide-react';

interface ProteinTargetStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
  };
  updateUserDetails: (details: Partial<ProteinTargetStepProps['userDetails']>) => void;
}

const ProteinTargetStep: React.FC<ProteinTargetStepProps> = ({ userDetails, updateUserDetails }) => {
  const [proteinMultiplier, setProteinMultiplier] = useState<number>(1.8);
  const useKg = userDetails.weightUnit === 'kg';
  
  // Calculate protein target whenever weight or unit changes
  useEffect(() => {
    if (userDetails.currentWeight) {
      const weightInKg = useKg 
        ? userDetails.currentWeight 
        : Math.round(userDetails.currentWeight * 0.453592);
      const proteinGrams = Math.round(weightInKg * proteinMultiplier);
      updateUserDetails({ proteinTarget: proteinGrams });
    }
  }, [userDetails.currentWeight, userDetails.weightUnit, proteinMultiplier]);
  
  // Protein visualization helper
  const getProteinVisualization = (proteinGrams: number) => {
    // Approximate protein amounts in common foods
    const chickenBreast = 25; // ~25g protein per chicken breast
    
    const breasts = proteinGrams / chickenBreast;
    if (breasts < 5) {
      return `That's about ${Math.round(breasts)} chicken breasts worth of protein`;
    } else {
      return `That's equivalent to ${Math.round(breasts)} chicken breasts per day`;
    }
  };
  
  // Handle slider changes for protein multiplier
  const handleProteinMultiplierChange = (value: number[]) => {
    setProteinMultiplier(value[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Daily Protein Target</h2>
        <p className="text-muted-foreground mt-1">
          Here's your recommended daily protein intake
        </p>
      </div>
      
      {/* Protein Target Display */}
      <div className="mt-8 p-6 bg-secondary/20 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Daily Protein Target</h3>
            <p className="text-muted-foreground text-sm">Based on your current weight</p>
          </div>
          <div className="text-4xl font-bold text-primary flex items-baseline">
            {userDetails.proteinTarget || 0}
            <span className="text-sm font-normal ml-1">g</span>
          </div>
        </div>
        
        {/* Protein Visualization */}
        <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
          <Beef className="h-5 w-5 text-red-500" />
          <span>{userDetails.proteinTarget ? getProteinVisualization(userDetails.proteinTarget) : ''}</span>
        </div>
        
        {/* Protein Multiplier Adjustment */}
        <div className="pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Adjustment</span>
            <span className="font-medium">{proteinMultiplier}g per kg</span>
          </div>
          <Slider
            defaultValue={[1.8]}
            min={1.2}
            max={2.4}
            step={0.1}
            value={[proteinMultiplier]}
            onValueChange={handleProteinMultiplierChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Less protein</span>
            <span>More protein</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinTargetStep;
