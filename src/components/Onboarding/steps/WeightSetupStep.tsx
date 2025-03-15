
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
  
  // Define slider min/max values based on units
  const minWeight = useKg ? 45 : 100;  // Lower minimum for more flexibility
  const maxWeight = useKg ? 160 : 350; // Higher maximum for more flexibility
  
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
  
  // Handle current weight changes from slider or input
  const handleCurrentWeightChange = (value: number) => {
    if (isNaN(value) || value < minWeight) {
      value = minWeight;
    } else if (value > maxWeight) {
      value = maxWeight;
    }
    
    updateUserDetails({ currentWeight: value });
    
    // Update target weight if it's less than current weight
    if (userDetails.targetWeight && userDetails.targetWeight <= value) {
      updateUserDetails({ targetWeight: value + (useKg ? 5 : 10) });
    }
  };
  
  // Handle target weight changes from slider or input
  const handleTargetWeightChange = (value: number) => {
    if (isNaN(value) || value < minWeight) {
      value = minWeight;
    } else if (value > maxWeight) {
      value = maxWeight;
    }
    
    // Ensure target weight is greater than current weight
    if (userDetails.currentWeight && value <= userDetails.currentWeight) {
      value = userDetails.currentWeight + (useKg ? 1 : 2);
    }
    
    updateUserDetails({ targetWeight: value });
  };
  
  // Calculate percentage position for the visual indicators
  const getCurrentWeightPercent = () => {
    if (!userDetails.currentWeight) return 0;
    return Math.max(0, Math.min(100, ((userDetails.currentWeight - minWeight) / (maxWeight - minWeight)) * 100));
  };
  
  const getTargetWeightPercent = () => {
    if (!userDetails.targetWeight) return 0;
    return Math.max(0, Math.min(100, ((userDetails.targetWeight - minWeight) / (maxWeight - minWeight)) * 100));
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Set Your Weight Goals</h2>
        <p className="text-muted-foreground mt-1">
          We'll use this to customize your daily protein target
        </p>
      </div>
      
      {/* Unit toggle switch */}
      <div className="flex items-center justify-center space-x-4 my-6">
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
      
      <div className="space-y-10">
        {/* Current Weight with Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="current-weight" className="text-base font-medium">Current Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="current-weight"
                type="number"
                value={userDetails.currentWeight || minWeight}
                onChange={(e) => handleCurrentWeightChange(parseFloat(e.target.value))}
                className="w-20 text-center p-1 h-10 text-lg font-medium"
                min={minWeight}
                max={maxWeight}
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative py-8">
            {/* Current weight slider track with gradient */}
            <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-gradient-to-r from-primary/40 to-secondary/40"></div>
            
            <Slider
              value={[userDetails.currentWeight || minWeight]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleCurrentWeightChange(values[0])}
            />
            
            {/* Dumbbell indicator with bubble */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${getCurrentWeightPercent()}%` }}
            >
              <div className="relative -mt-10">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold rounded-full px-2 py-1 min-w-16 text-center">
                  {userDetails.currentWeight || minWeight} {useKg ? 'kg' : 'lbs'}
                </div>
                <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 border-2 border-primary">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minWeight} {useKg ? 'kg' : 'lbs'}</span>
            <span>{maxWeight} {useKg ? 'kg' : 'lbs'}</span>
          </div>
        </div>
        
        {/* Target Weight with Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="target-weight" className="text-base font-medium">Target Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="target-weight"
                type="number"
                value={userDetails.targetWeight || (userDetails.currentWeight ? userDetails.currentWeight + (useKg ? 5 : 10) : minWeight + (useKg ? 5 : 10))}
                onChange={(e) => handleTargetWeightChange(parseFloat(e.target.value))}
                className="w-20 text-center p-1 h-10 text-lg font-medium"
                min={minWeight}
                max={maxWeight}
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative py-8">
            {/* Target weight slider track with gradient */}
            <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-gradient-to-r from-primary/40 to-secondary/40"></div>
            
            <Slider
              value={[userDetails.targetWeight || (userDetails.currentWeight ? userDetails.currentWeight + (useKg ? 5 : 10) : minWeight + (useKg ? 5 : 10))]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleTargetWeightChange(values[0])}
            />
            
            {/* Dumbbell indicator with bubble */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${getTargetWeightPercent()}%` }}
            >
              <div className="relative -mt-10">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full px-2 py-1 min-w-16 text-center">
                  {userDetails.targetWeight || (userDetails.currentWeight ? userDetails.currentWeight + (useKg ? 5 : 10) : minWeight + (useKg ? 5 : 10))} {useKg ? 'kg' : 'lbs'}
                </div>
                <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 border-2 border-secondary">
                  <Dumbbell className="h-5 w-5 text-secondary" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{minWeight} {useKg ? 'kg' : 'lbs'}</span>
            <span>{maxWeight} {useKg ? 'kg' : 'lbs'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSetupStep;
