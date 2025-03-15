
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

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
    if (!userDetails.currentWeight) {
      updateUserDetails({ currentWeight: useKg ? 70 : 154 });
    }
    if (!userDetails.targetWeight) {
      updateUserDetails({ targetWeight: useKg ? 65 : 143 });
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
      if (checked) {
        // Convert lbs to kg
        updateUserDetails({ 
          currentWeight: Math.round(userDetails.currentWeight * 0.453592) 
        });
      } else {
        // Convert kg to lbs
        updateUserDetails({ 
          currentWeight: Math.round(userDetails.currentWeight * 2.20462) 
        });
      }
    }
    
    if (userDetails.targetWeight) {
      if (checked) {
        // Convert lbs to kg
        updateUserDetails({ 
          targetWeight: Math.round(userDetails.targetWeight * 0.453592) 
        });
      } else {
        // Convert kg to lbs
        updateUserDetails({ 
          targetWeight: Math.round(userDetails.targetWeight * 2.20462) 
        });
      }
    }
  };
  
  // Handle input changes
  const handleWeightChange = (type: 'current' | 'target', value: number) => {
    if (type === 'current') {
      updateUserDetails({ currentWeight: value });
    } else {
      updateUserDetails({ targetWeight: value });
    }
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
              value={userDetails.currentWeight || ''}
              onChange={(e) => handleWeightChange('current', parseFloat(e.target.value) || 0)}
              className="text-lg"
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
              value={userDetails.targetWeight || ''}
              onChange={(e) => handleWeightChange('target', parseFloat(e.target.value) || 0)}
              className="text-lg"
            />
            <span className="text-sm font-medium">{useKg ? 'kg' : 'lbs'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightSetupStep;
