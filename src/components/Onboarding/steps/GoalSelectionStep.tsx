
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GoalSelectionStepProps {
  userDetails: {
    activityLevel?: string;
    goal?: string;
  };
  updateUserDetails: (details: Partial<typeof userDetails>) => void;
}

const GoalSelectionStep: React.FC<GoalSelectionStepProps> = ({ userDetails, updateUserDetails }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Your Fitness Goals</h2>
        <p className="text-muted-foreground mt-1">
          Let us know your activity level and goals to personalize your protein targets
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="activity">Activity Level</Label>
          <Select
            value={userDetails.activityLevel}
            onValueChange={(value) => updateUserDetails({ activityLevel: value })}
          >
            <SelectTrigger id="activity">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
              <SelectItem value="moderate">Moderate (exercise 3-5 times/week)</SelectItem>
              <SelectItem value="active">Active (exercise 6-7 times/week)</SelectItem>
              <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="goal">Primary Goal</Label>
          <Select
            value={userDetails.goal}
            onValueChange={(value) => updateUserDetails({ goal: value })}
          >
            <SelectTrigger id="goal">
              <SelectValue placeholder="Select your goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cutting">Weight Loss / Cutting</SelectItem>
              <SelectItem value="maintenance">Maintenance / Toning</SelectItem>
              <SelectItem value="bulking">Muscle Gain / Bulking</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-1">Protein intake varies based on your goal:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Weight Loss: Higher protein (2.2g per kg) to preserve muscle</li>
            <li>• Maintenance: Moderate protein (1.6g per kg) for recovery</li>
            <li>• Muscle Gain: Substantial protein (1.8g per kg) for growth</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GoalSelectionStep;
