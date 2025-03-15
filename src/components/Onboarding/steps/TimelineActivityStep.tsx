
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TimelineActivityStepProps {
  userDetails: {
    goalTimelineMonths?: number;
    activityLevel?: 'sedentary' | 'moderate' | 'active';
  };
  updateUserDetails: (details: Partial<TimelineActivityStepProps['userDetails']>) => void;
}

const TimelineActivityStep: React.FC<TimelineActivityStepProps> = ({ userDetails, updateUserDetails }) => {
  // Initialize with defaults if not set
  useState(() => {
    if (!userDetails.goalTimelineMonths) {
      updateUserDetails({ goalTimelineMonths: 6 });
    }
    if (!userDetails.activityLevel) {
      updateUserDetails({ activityLevel: 'moderate' });
    }
  });

  const handleTimelineChange = (values: number[]) => {
    updateUserDetails({ goalTimelineMonths: values[0] });
  };

  const handleActivityChange = (value: 'sedentary' | 'moderate' | 'active') => {
    updateUserDetails({ activityLevel: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Customize Your Journey</h2>
        <p className="text-muted-foreground mt-1">
          Let's personalize your plan based on your preferences
        </p>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="timeline" className="text-base">How quickly do you want to reach your goal weight?</Label>
          <span className="text-base font-medium text-primary">
            {userDetails.goalTimelineMonths} months
          </span>
        </div>

        <Slider
          id="timeline"
          value={[userDetails.goalTimelineMonths || 6]}
          min={3}
          max={12}
          step={1}
          onValueChange={handleTimelineChange}
          className="py-4"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Faster (3 months)</span>
          <span>Gradual (12 months)</span>
        </div>
      </div>

      {/* Activity Level Radio Group */}
      <div className="space-y-4 pt-4">
        <Label className="text-base">How would you describe your physical activity?</Label>

        <RadioGroup
          value={userDetails.activityLevel}
          onValueChange={(value) => handleActivityChange(value as 'sedentary' | 'moderate' | 'active')}
          className="space-y-3"
        >
          <div className={`flex items-center space-x-3 rounded-lg p-4 ${userDetails.activityLevel === 'sedentary' ? 'bg-secondary/40' : 'bg-secondary/20'} cursor-pointer`}
            onClick={() => handleActivityChange('sedentary')}>
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary" className="flex-1 cursor-pointer">
              <div className="font-medium">Mostly sedentary</div>
              <p className="text-sm text-muted-foreground">Little to no regular exercise</p>
            </Label>
          </div>

          <div className={`flex items-center space-x-3 rounded-lg p-4 ${userDetails.activityLevel === 'moderate' ? 'bg-secondary/40' : 'bg-secondary/20'} cursor-pointer`}
            onClick={() => handleActivityChange('moderate')}>
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate" className="flex-1 cursor-pointer">
              <div className="font-medium">Moderately active</div>
              <p className="text-sm text-muted-foreground">Exercise 3-5 times per week</p>
            </Label>
          </div>

          <div className={`flex items-center space-x-3 rounded-lg p-4 ${userDetails.activityLevel === 'active' ? 'bg-secondary/40' : 'bg-secondary/20'} cursor-pointer`}
            onClick={() => handleActivityChange('active')}>
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active" className="flex-1 cursor-pointer">
              <div className="font-medium">Very active</div>
              <p className="text-sm text-muted-foreground">Daily exercise or intense training</p>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TimelineActivityStep;
