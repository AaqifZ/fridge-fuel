
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Beef } from 'lucide-react';

interface GoalSetupStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
  };
  updateUserDetails: (details: Partial<GoalSetupStepProps['userDetails']>) => void;
}

const GoalSetupStep: React.FC<GoalSetupStepProps> = ({ userDetails, updateUserDetails }) => {
  const [useKg, setUseKg] = useState<boolean>(userDetails.weightUnit === 'lbs' ? false : true);
  const [proteinMultiplier, setProteinMultiplier] = useState<number>(1.8);
  
  // Define weight range based on units
  const minWeight = useKg ? 45 : 100;
  const maxWeight = useKg ? 160 : 350;
  
  // Initialize weights with defaults if not set
  useEffect(() => {
    const defaultCurrentWeight = useKg ? 70 : 154;
    const defaultTargetWeight = useKg ? 77 : 170;
    
    if (!userDetails.currentWeight) {
      updateUserDetails({ currentWeight: defaultCurrentWeight });
    }
    
    if (!userDetails.targetWeight) {
      updateUserDetails({ targetWeight: defaultTargetWeight });
    }
    
    if (!userDetails.weightUnit) {
      updateUserDetails({ weightUnit: useKg ? 'kg' : 'lbs' });
    }
  }, []);
  
  // Calculate protein target whenever weight or unit changes
  useEffect(() => {
    if (userDetails.currentWeight) {
      const weightInKg = useKg 
        ? userDetails.currentWeight 
        : Math.round(userDetails.currentWeight * 0.453592);
      const proteinGrams = Math.round(weightInKg * proteinMultiplier);
      updateUserDetails({ proteinTarget: proteinGrams });
    }
  }, [userDetails.currentWeight, useKg, proteinMultiplier]);
  
  // Toggle between kg and lbs
  const handleUnitToggle = (checked: boolean) => {
    setUseKg(checked);
    updateUserDetails({ weightUnit: checked ? 'kg' : 'lbs' });
    
    // Convert weights when switching units
    if (userDetails.currentWeight) {
      const newCurrentWeight = checked 
        ? Math.round(userDetails.currentWeight * 0.453592) // lbs to kg
        : Math.round(userDetails.currentWeight * 2.20462); // kg to lbs
      
      updateUserDetails({ currentWeight: newCurrentWeight });
    }
    
    if (userDetails.targetWeight) {
      const newTargetWeight = checked 
        ? Math.round(userDetails.targetWeight * 0.453592) // lbs to kg
        : Math.round(userDetails.targetWeight * 2.20462); // kg to lbs
      
      updateUserDetails({ targetWeight: newTargetWeight });
    }
  };
  
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
  
  // Handle weight changes
  const handleWeightChange = (type: 'current' | 'target', value: number) => {
    if (isNaN(value) || value < minWeight) {
      value = minWeight;
    } else if (value > maxWeight) {
      value = maxWeight;
    }
    
    if (type === 'current') {
      updateUserDetails({ currentWeight: value });
      
      // Update target weight if it's less than current weight
      if (userDetails.targetWeight && userDetails.targetWeight <= value) {
        updateUserDetails({ targetWeight: value + (useKg ? 5 : 10) });
      }
    } else {
      // Ensure target weight is greater than current weight
      if (userDetails.currentWeight && value <= userDetails.currentWeight) {
        value = userDetails.currentWeight + (useKg ? 1 : 2);
      }
      
      updateUserDetails({ targetWeight: value });
    }
  };
  
  // Handle slider changes for protein multiplier
  const handleProteinMultiplierChange = (value: number[]) => {
    setProteinMultiplier(value[0]);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Set Your Protein Target</h2>
        <p className="text-muted-foreground mt-1">
          We'll use this to customize your daily protein intake
        </p>
      </div>
      
      {/* Unit toggle switch */}
      <div className="flex items-center justify-center space-x-4 my-4">
        <span className={`text-sm font-medium ${!useKg ? 'text-primary' : 'text-muted-foreground'}`}>
          lbs
        </span>
        <Switch 
          checked={useKg}
          onCheckedChange={handleUnitToggle}
        />
        <span className={`text-sm font-medium ${useKg ? 'text-primary' : 'text-muted-foreground'}`}>
          kg
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Current Weight */}
        <div className="space-y-2">
          <Label htmlFor="current-weight" className="text-base">Current Weight</Label>
          <div className="flex items-center gap-4">
            <Input
              id="current-weight"
              type="number"
              value={userDetails.currentWeight || minWeight}
              onChange={(e) => handleWeightChange('current', parseFloat(e.target.value))}
              className="text-lg"
              min={minWeight}
              max={maxWeight}
            />
            <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
          </div>
        </div>
        
        {/* Target Weight */}
        <div className="space-y-2">
          <Label htmlFor="target-weight" className="text-base">Target Weight</Label>
          <div className="flex items-center gap-4">
            <Input
              id="target-weight"
              type="number"
              value={userDetails.targetWeight || (userDetails.currentWeight ? userDetails.currentWeight + (useKg ? 5 : 10) : minWeight)}
              onChange={(e) => handleWeightChange('target', parseFloat(e.target.value))}
              className="text-lg"
              min={minWeight}
              max={maxWeight}
            />
            <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
          </div>
        </div>
        
        {/* Protein Target Display */}
        <div className="mt-8 p-6 bg-secondary/20 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Daily Protein Target</h3>
              <p className="text-muted-foreground text-sm">Based on your current weight</p>
            </div>
            <div className="text-3xl font-bold text-primary flex items-baseline">
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
    </div>
  );
};

export default GoalSetupStep;
