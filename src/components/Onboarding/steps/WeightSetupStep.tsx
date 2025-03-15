
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Dumbbell } from 'lucide-react';

interface WeightSetupStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    weightUnit?: 'kg' | 'lbs';
  };
  updateUserDetails: (details: Partial<WeightSetupStepProps['userDetails']>) => void;
}

const WeightSetupStep: React.FC<WeightSetupStepProps> = ({ userDetails, updateUserDetails }) => {
  const [useKg, setUseKg] = useState<boolean>(userDetails.weightUnit === 'lbs' ? false : true);
  
  // Initialize weights with defaults if not set
  useEffect(() => {
    const defaultCurrentWeight = useKg ? 70 : 154;
    // If current weight not set, set it and calculate target weight
    if (!userDetails.currentWeight) {
      const currentWeight = defaultCurrentWeight;
      const targetWeight = currentWeight + 7; // Add 7 kg or 7 lbs by default for bulking
      updateUserDetails({ 
        currentWeight: currentWeight,
        targetWeight: targetWeight
      });
    } 
    // If only target weight not set, calculate based on current
    else if (!userDetails.targetWeight && userDetails.currentWeight) {
      const targetWeight = userDetails.currentWeight + 7;
      updateUserDetails({ targetWeight: targetWeight });
    }
    
    if (!userDetails.weightUnit) {
      updateUserDetails({ weightUnit: useKg ? 'kg' : 'lbs' });
    }
  }, []);
  
  // Toggle between kg and lbs
  const handleUnitToggle = (checked: boolean) => {
    setUseKg(checked);
    updateUserDetails({ weightUnit: checked ? 'kg' : 'lbs' });
    
    // Convert weights when switching units
    if (userDetails.currentWeight) {
      let newCurrentWeight;
      if (checked) {
        // Convert lbs to kg
        newCurrentWeight = Math.round(userDetails.currentWeight * 0.453592);
      } else {
        // Convert kg to lbs
        newCurrentWeight = Math.round(userDetails.currentWeight * 2.20462);
      }
      updateUserDetails({ currentWeight: newCurrentWeight });
      
      // Always set target weight to current weight + 7 units
      updateUserDetails({ targetWeight: newCurrentWeight + 7 });
    }
  };
  
  // Handle weight changes from slider or direct input
  const handleWeightChange = (type: 'current' | 'target', value: number) => {
    if (type === 'current') {
      updateUserDetails({ currentWeight: value });
      // Update target weight when current weight changes (if not manually set)
      updateUserDetails({ targetWeight: value + 7 });
    } else {
      updateUserDetails({ targetWeight: value });
    }
  };
  
  // Define slider min/max values based on units
  const minWeight = useKg ? 55 : 121;  // 55kg or 121lbs
  const maxWeight = useKg ? 130 : 286; // 130kg or 286lbs (130kg converted to lbs)
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Set Your Weight Goals</h2>
        <p className="text-muted-foreground mt-1">
          We'll use this to customize your daily protein target
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
      
      <div className="space-y-8">
        {/* Current Weight with Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="current-weight" className="text-base">Current Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="current-weight"
                type="number"
                value={userDetails.currentWeight || ''}
                onChange={(e) => handleWeightChange('current', parseFloat(e.target.value) || 0)}
                className="w-16 text-center p-1 h-8"
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative">
            <Slider
              value={[userDetails.currentWeight || 0]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleWeightChange('current', values[0])}
              className="py-4"
            />
            <div className="absolute top-1/2 left-[var(--slider-thumb-position,0%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{useKg ? '55 kg' : '121 lbs'}</span>
            <span>{useKg ? '130 kg' : '286 lbs'}</span>
          </div>
        </div>
        
        {/* Target Weight with Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="target-weight" className="text-base">Target Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="target-weight"
                type="number"
                value={userDetails.targetWeight || ''}
                onChange={(e) => handleWeightChange('target', parseFloat(e.target.value) || 0)}
                className="w-16 text-center p-1 h-8"
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative">
            <Slider
              value={[userDetails.targetWeight || 0]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleWeightChange('target', values[0])}
              className="py-4"
            />
            <div className="absolute top-1/2 left-[var(--slider-thumb-position,0%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{useKg ? '55 kg' : '121 lbs'}</span>
            <span>{useKg ? '130 kg' : '286 lbs'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSetupStep;
