
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
  
  // State to track slider value percentages for dumbbell positioning
  const [currentWeightPercent, setCurrentWeightPercent] = useState(0);
  const [targetWeightPercent, setTargetWeightPercent] = useState(0);
  
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

  // Update percentage positions whenever weights or min/max change
  useEffect(() => {
    if (userDetails.currentWeight) {
      setCurrentWeightPercent(calculatePercentage(userDetails.currentWeight));
    }
    if (userDetails.targetWeight) {
      setTargetWeightPercent(calculatePercentage(userDetails.targetWeight));
    }
  }, [userDetails.currentWeight, userDetails.targetWeight, useKg]);
  
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
  
  // Calculate percentage position for dumbbell
  const calculatePercentage = (weight: number) => {
    const minWeight = useKg ? 55 : 121;  // 55kg or 121lbs
    const maxWeight = useKg ? 130 : 286; // 130kg or 286lbs (130kg converted to lbs)
    
    return ((weight - minWeight) / (maxWeight - minWeight)) * 100;
  };
  
  // Handle weight changes from slider
  const handleSliderChange = (type: 'current' | 'target', values: number[]) => {
    if (type === 'current') {
      updateUserDetails({ currentWeight: values[0] });
      // Update target weight when current weight changes (if manually set)
      if (userDetails.targetWeight && userDetails.targetWeight <= values[0]) {
        updateUserDetails({ targetWeight: values[0] + 7 });
      }
    } else {
      updateUserDetails({ targetWeight: values[0] });
    }
  };
  
  // Handle weight changes from direct input
  const handleInputChange = (type: 'current' | 'target', value: number) => {
    if (type === 'current') {
      updateUserDetails({ currentWeight: value });
      // Update target weight when current weight changes (if not manually set)
      if (userDetails.targetWeight && userDetails.targetWeight <= value) {
        updateUserDetails({ targetWeight: value + 7 });
      }
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
                value={userDetails.currentWeight || ''}
                onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
                className="w-20 text-center p-1 h-10 text-lg font-medium"
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative py-6 mt-3">
            {/* Current weight slider track with gradient */}
            <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-gradient-to-r from-primary/40 to-secondary/40"></div>
            
            <Slider
              value={[userDetails.currentWeight || 0]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleSliderChange('current', values)}
              className="z-10"
            />
            
            {/* Dumbbell indicator with bubble */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${currentWeightPercent}%` }}
            >
              <div className="relative -mt-7">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold rounded-full px-2 py-1 w-16 text-center">
                  {userDetails.currentWeight || 0} {useKg ? 'kg' : 'lbs'}
                </div>
                <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 border-2 border-primary">
                  <Dumbbell className="h-5 w-5 text-primary" />
                </div>
              </div>
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
            <Label htmlFor="target-weight" className="text-base font-medium">Target Weight</Label>
            <div className="flex items-center gap-2">
              <Input
                id="target-weight"
                type="number"
                value={userDetails.targetWeight || ''}
                onChange={(e) => handleInputChange('target', parseFloat(e.target.value) || 0)}
                className="w-20 text-center p-1 h-10 text-lg font-medium"
              />
              <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
            </div>
          </div>
          
          <div className="relative py-6 mt-3">
            {/* Target weight slider track with gradient */}
            <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 rounded-full overflow-hidden bg-gradient-to-r from-primary/40 to-secondary/40"></div>
            
            <Slider
              value={[userDetails.targetWeight || 0]}
              min={minWeight}
              max={maxWeight}
              step={1}
              onValueChange={(values) => handleSliderChange('target', values)}
              className="z-10"
            />
            
            {/* Dumbbell indicator with bubble */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${targetWeightPercent}%` }}
            >
              <div className="relative -mt-7">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold rounded-full px-2 py-1 w-16 text-center">
                  {userDetails.targetWeight || 0} {useKg ? 'kg' : 'lbs'}
                </div>
                <div className="h-10 w-10 bg-white rounded-full shadow-md flex items-center justify-center -translate-x-1/2 border-2 border-secondary">
                  <Dumbbell className="h-5 w-5 text-secondary" />
                </div>
              </div>
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
