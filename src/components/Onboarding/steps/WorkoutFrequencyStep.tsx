
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Circle, CircleDot, MoreHorizontal } from 'lucide-react';

interface WorkoutFrequencyStepProps {
  userDetails: {
    workoutFrequency?: string;
  };
  updateUserDetails: (details: Partial<WorkoutFrequencyStepProps['userDetails']>) => void;
  onBack?: () => void;
}

const WorkoutFrequencyStep: React.FC<WorkoutFrequencyStepProps> = ({ 
  userDetails, 
  updateUserDetails,
  onBack 
}) => {
  // Create a function to handle selection
  const handleSelection = (value: string) => {
    updateUserDetails({ workoutFrequency: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">How many workouts do you do per week?</h2>
        <p className="text-muted-foreground mt-2">
          This will be used to calibrate your custom plan.
        </p>
      </div>
      
      {/* Workout Frequency Selection */}
      <RadioGroup
        value={userDetails.workoutFrequency}
        onValueChange={(value) => updateUserDetails({ workoutFrequency: value })}
        className="flex flex-col gap-4"
      >
        <div 
          className={`flex items-center space-x-3 rounded-xl p-5 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer ${userDetails.workoutFrequency === '0-2' ? 'border-2 border-primary' : ''}`}
          onClick={() => handleSelection('0-2')}
        >
          <RadioGroupItem value="0-2" id="frequency-0-2" className="mr-1" />
          <Circle className="h-6 w-6 mr-3" />
          <div>
            <Label htmlFor="frequency-0-2" className="flex-1 cursor-pointer text-xl font-medium">0-2</Label>
            <p className="text-muted-foreground text-sm">Workouts now and then</p>
          </div>
        </div>
        
        <div 
          className={`flex items-center space-x-3 rounded-xl p-5 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer ${userDetails.workoutFrequency === '3-5' ? 'border-2 border-primary' : ''}`}
          onClick={() => handleSelection('3-5')}
        >
          <RadioGroupItem value="3-5" id="frequency-3-5" className="mr-1" />
          <div className="mr-3 flex flex-wrap w-6 h-6 justify-center items-center">
            <CircleDot className="h-2 w-2" />
            <CircleDot className="h-2 w-2" />
            <CircleDot className="h-2 w-2" />
          </div>
          <div>
            <Label htmlFor="frequency-3-5" className="flex-1 cursor-pointer text-xl font-medium">3-5</Label>
            <p className="text-muted-foreground text-sm">A few workouts per week</p>
          </div>
        </div>
        
        <div 
          className={`flex items-center space-x-3 rounded-xl p-5 bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer ${userDetails.workoutFrequency === '6+' ? 'border-2 border-primary' : ''}`}
          onClick={() => handleSelection('6+')}
        >
          <RadioGroupItem value="6+" id="frequency-6+" className="mr-1" />
          <MoreHorizontal className="h-6 w-6 mr-3" />
          <div>
            <Label htmlFor="frequency-6+" className="flex-1 cursor-pointer text-xl font-medium">6+</Label>
            <p className="text-muted-foreground text-sm">Dedicated athlete</p>
          </div>
        </div>
      </RadioGroup>
      
      {/* Back button if needed */}
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} className="absolute top-4 left-4 rounded-full w-10 h-10">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      )}
    </div>
  );
};

export default WorkoutFrequencyStep;
