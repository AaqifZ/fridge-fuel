
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BasicInfoStepProps {
  userDetails: {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
  };
  updateUserDetails: (details: Partial<BasicInfoStepProps['userDetails']>) => void;
  onBack?: () => void;
}

type UnitSystem = 'metric' | 'imperial';

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ userDetails, updateUserDetails, onBack }) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  
  // Convert between unit systems
  const handleUnitToggle = (checked: boolean) => {
    const newSystem = checked ? 'imperial' : 'metric';
    setUnitSystem(newSystem);
    
    // Convert existing values if they exist
    if (userDetails.weight && newSystem === 'imperial') {
      // Convert kg to lb (1 kg ≈ 2.20462 lb)
      updateUserDetails({ weight: Math.round(userDetails.weight * 2.20462) });
    } else if (userDetails.weight && newSystem === 'metric') {
      // Convert lb to kg (1 lb ≈ 0.453592 kg)
      updateUserDetails({ weight: Math.round(userDetails.weight * 0.453592) });
    }
    
    if (userDetails.height && newSystem === 'imperial') {
      // Convert cm to inches (1 cm ≈ 0.393701 in)
      updateUserDetails({ height: Math.round(userDetails.height * 0.393701) });
    } else if (userDetails.height && newSystem === 'metric') {
      // Convert inches to cm (1 in ≈ 2.54 cm)
      updateUserDetails({ height: Math.round(userDetails.height * 2.54) });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Height & weight</h2>
        <p className="text-muted-foreground mt-1">
          This will be used to calibrate your custom plan.
        </p>
      </div>
      
      {/* Unit toggle switch */}
      <div className="flex items-center justify-center space-x-4 my-8">
        <span className={`text-sm font-medium ${unitSystem === 'imperial' ? 'text-primary' : 'text-muted-foreground'}`}>
          Imperial
        </span>
        <Switch 
          checked={unitSystem === 'metric'}
          onCheckedChange={handleUnitToggle}
        />
        <span className={`text-sm font-medium ${unitSystem === 'metric' ? 'text-primary' : 'text-muted-foreground'}`}>
          Metric
        </span>
      </div>
      
      <div className="space-y-6">
        {unitSystem === 'metric' ? (
          <>
            {/* Metric measurements */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={userDetails.weight || ''}
                  onChange={(e) => updateUserDetails({ weight: parseFloat(e.target.value) || undefined })}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={userDetails.height || ''}
                  onChange={(e) => updateUserDetails({ height: parseFloat(e.target.value) || undefined })}
                  className="text-lg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={userDetails.age || ''}
                onChange={(e) => updateUserDetails({ age: parseFloat(e.target.value) || undefined })}
                className="text-lg"
              />
            </div>
          </>
        ) : (
          <>
            {/* Imperial measurements */}
            <div className="space-y-2">
              <Label htmlFor="height-imperial">Height</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="height-feet"
                  type="number"
                  placeholder="5"
                  aria-label="Feet"
                  className="text-lg text-center"
                  onChange={(e) => {
                    const feet = parseFloat(e.target.value) || 0;
                    const inches = userDetails.height ? (userDetails.height % 12) : 0;
                    const totalInches = (feet * 12) + inches;
                    updateUserDetails({ height: totalInches });
                  }}
                  value={userDetails.height ? Math.floor(userDetails.height / 12) : ''}
                />
                
                <Input
                  id="height-inches"
                  type="number"
                  placeholder="10"
                  aria-label="Inches"
                  className="text-lg text-center"
                  min="0"
                  max="11"
                  onChange={(e) => {
                    const inches = parseFloat(e.target.value) || 0;
                    const feet = userDetails.height ? Math.floor(userDetails.height / 12) : 0;
                    const totalInches = (feet * 12) + inches;
                    updateUserDetails({ height: totalInches });
                  }}
                  value={userDetails.height ? (userDetails.height % 12) : ''}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>ft</span>
                <span>in</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight-imperial">Weight (lb)</Label>
              <Input
                id="weight-imperial"
                type="number"
                placeholder="160"
                value={userDetails.weight || ''}
                onChange={(e) => updateUserDetails({ weight: parseFloat(e.target.value) || undefined })}
                className="text-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age-imperial">Age</Label>
              <Input
                id="age-imperial"
                type="number"
                placeholder="30"
                value={userDetails.age || ''}
                onChange={(e) => updateUserDetails({ age: parseFloat(e.target.value) || undefined })}
                className="text-lg"
              />
            </div>
          </>
        )}
        
        {/* Display selected gender */}
        <div className="mt-4">
          <Label>Selected Gender</Label>
          <div className="p-3 rounded-md bg-secondary/20 text-sm font-medium mt-2">
            {userDetails.gender === 'male' ? 'Male' : 
             userDetails.gender === 'female' ? 'Female' : 
             userDetails.gender === 'other' ? 'Other' : 'Not selected'}
          </div>
        </div>
      </div>
      
      {/* Navigation buttons are handled by the parent component */}
    </div>
  );
};

export default BasicInfoStep;
