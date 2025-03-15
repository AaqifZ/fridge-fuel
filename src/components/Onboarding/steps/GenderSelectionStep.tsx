
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
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold tracking-tight">Choose your Gender</h2>
        <p className="text-muted-foreground mt-3 text-lg">
          This will be used to calibrate your custom plan.
        </p>
      </div>
      
      {/* Gender Selection */}
      <RadioGroup
        value={userDetails.gender}
        onValueChange={(value) => updateUserDetails({ gender: value as 'male' | 'female' | 'other' })}
        className="flex flex-col gap-5"
      >
        <div className={`flex items-center justify-center h-16 rounded-xl transition-all cursor-pointer ${userDetails.gender === 'male' ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary/5 hover:bg-secondary/10 border border-secondary/20'}`}>
          <RadioGroupItem value="male" id="male" className="hidden" />
          <Label htmlFor="male" className="cursor-pointer text-xl font-medium">Male</Label>
        </div>
        
        <div className={`flex items-center justify-center h-16 rounded-xl transition-all cursor-pointer ${userDetails.gender === 'female' ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary/5 hover:bg-secondary/10 border border-secondary/20'}`}>
          <RadioGroupItem value="female" id="female" className="hidden" />
          <Label htmlFor="female" className="cursor-pointer text-xl font-medium">Female</Label>
        </div>
        
        <div className={`flex items-center justify-center h-16 rounded-xl transition-all cursor-pointer ${userDetails.gender === 'other' ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary/5 hover:bg-secondary/10 border border-secondary/20'}`}>
          <RadioGroupItem value="other" id="other" className="hidden" />
          <Label htmlFor="other" className="cursor-pointer text-xl font-medium">Other</Label>
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
