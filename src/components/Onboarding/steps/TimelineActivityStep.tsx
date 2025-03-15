
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Clock, Activity } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Customize Your Journey</h2>
        <p className="text-muted-foreground mt-1">
          Let's personalize your plan based on your preferences
        </p>
      </div>

      {/* Timeline Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">How quickly do you want to reach your goal weight?</Label>
        </div>
        
        <div className="bg-blue-50/30 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">Timeline</span>
            <span className="text-lg font-semibold text-primary">
              {userDetails.goalTimelineMonths} months
            </span>
          </div>

          <Slider
            value={[userDetails.goalTimelineMonths || 6]}
            min={3}
            max={12}
            step={1}
            onValueChange={handleTimelineChange}
            className="py-4"
          />

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Faster (3 months)</span>
            <span>Gradual (12 months)</span>
          </div>
        </div>
      </div>

      {/* Activity Level Section */}
      <div className="space-y-3 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-5 w-5 text-primary" />
          <Label className="text-base font-medium">How would you describe your physical activity?</Label>
        </div>

        <RadioGroup
          value={userDetails.activityLevel}
          onValueChange={(value) => handleActivityChange(value as 'sedentary' | 'moderate' | 'active')}
          className="space-y-3"
        >
          <div 
            className={`flex items-center space-x-3 rounded-xl border p-4 hover:bg-muted/50 transition-colors cursor-pointer ${userDetails.activityLevel === 'sedentary' ? 'bg-blue-50/30 border-primary/30' : ''}`}
            onClick={() => handleActivityChange('sedentary')}
          >
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary" className="flex-1 cursor-pointer">
              <div className="font-medium">Mostly sedentary</div>
              <p className="text-sm text-muted-foreground">Little to no regular exercise</p>
            </Label>
          </div>

          <div 
            className={`flex items-center space-x-3 rounded-xl border p-4 hover:bg-muted/50 transition-colors cursor-pointer ${userDetails.activityLevel === 'moderate' ? 'bg-blue-50/30 border-primary/30' : ''}`}
            onClick={() => handleActivityChange('moderate')}
          >
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate" className="flex-1 cursor-pointer">
              <div className="font-medium">Moderately active</div>
              <p className="text-sm text-muted-foreground">Exercise 3-5 times per week</p>
            </Label>
          </div>

          <div 
            className={`flex items-center space-x-3 rounded-xl border p-4 hover:bg-muted/50 transition-colors cursor-pointer ${userDetails.activityLevel === 'active' ? 'bg-blue-50/30 border-primary/30' : ''}`}
            onClick={() => handleActivityChange('active')}
          >
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
