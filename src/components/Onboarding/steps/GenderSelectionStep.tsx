
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GenderSelectionStepProps {
  userDetails: {
    gender?: 'male' | 'female' | 'other';
  };
  updateUserDetails: (details: Partial<GenderSelectionStepProps['userDetails']>) => void;
  onBack?: () => void;
}

const GenderSelectionStep: React.FC<GenderSelectionStepProps> = ({ 
  userDetails, 
  updateUserDetails,
  onBack 
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Choose your Gender</h2>
        <p className="text-muted-foreground mt-2">
          This will be used to calibrate your custom protein plan.
        </p>
      </div>
      
      {/* Gender Selection */}
      <RadioGroup
        value={userDetails.gender}
        onValueChange={(value) => updateUserDetails({ gender: value as 'male' | 'female' | 'other' })}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center space-x-2 rounded-xl p-4 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer">
          <RadioGroupItem value="male" id="male" className="mr-2" />
          <Label htmlFor="male" className="flex-1 cursor-pointer text-xl font-medium">Male</Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-xl p-4 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer">
          <RadioGroupItem value="female" id="female" className="mr-2" />
          <Label htmlFor="female" className="flex-1 cursor-pointer text-xl font-medium">Female</Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-xl p-4 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer">
          <RadioGroupItem value="other" id="other" className="mr-2" />
          <Label htmlFor="other" className="flex-1 cursor-pointer text-xl font-medium">Other</Label>
        </div>
      </RadioGroup>
      
      {/* Back button if needed */}
      {onBack && (
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full w-10 h-10">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default GenderSelectionStep;
