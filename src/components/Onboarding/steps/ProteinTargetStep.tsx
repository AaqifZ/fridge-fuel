
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Beef, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format, addMonths, addDays } from 'date-fns';

interface ProteinTargetStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
    goalTimelineMonths?: number;
    activityLevel?: 'sedentary' | 'moderate' | 'active';
  };
  updateUserDetails: (details: Partial<ProteinTargetStepProps['userDetails']>) => void;
}

const ProteinTargetStep: React.FC<ProteinTargetStepProps> = ({ userDetails, updateUserDetails }) => {
  const [calculatedProtein, setCalculatedProtein] = useState<number>(0);
  const [proteinAdjustment, setProteinAdjustment] = useState<number>(0);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState<number>(0);
  const [goalDate, setGoalDate] = useState<Date | null>(null);
  const [baseGoalDate, setBaseGoalDate] = useState<Date | null>(null);
  const useKg = userDetails.weightUnit === 'kg';
  
  // Calculate protein target and goal date based on the formula whenever relevant values change
  useEffect(() => {
    if (userDetails.currentWeight && userDetails.targetWeight && 
        userDetails.goalTimelineMonths && userDetails.activityLevel) {
      
      // Convert weights to kg if using lbs
      const currentWeightKg = useKg 
        ? userDetails.currentWeight 
        : Math.round(userDetails.currentWeight * 0.453592);
        
      const targetWeightKg = useKg
        ? userDetails.targetWeight
        : Math.round(userDetails.targetWeight * 0.453592);
      
      // Determine Activity Multiplier based on activity level
      let activityMultiplier = 0.5; // Default to moderate
      if (userDetails.activityLevel === 'sedentary') {
        activityMultiplier = 0.3;
      } else if (userDetails.activityLevel === 'active') {
        activityMultiplier = 0.7;
      }
      
      // Determine Timeline Factor based on goal timeline
      let timelineFactor = 0.04; // Default to 6 months
      if (userDetails.goalTimelineMonths <= 3) {
        timelineFactor = 0.08;
      } else if (userDetails.goalTimelineMonths >= 12) {
        timelineFactor = 0.02;
      }
      
      // Determine Activity Addition based on activity level
      let activityAddition = 0.3; // Default to moderate
      if (userDetails.activityLevel === 'sedentary') {
        activityAddition = 0.1;
      } else if (userDetails.activityLevel === 'active') {
        activityAddition = 0.6;
      }
      
      // Calculate the components
      const baseProtein = currentWeightKg * 1.6;
      const growthFactor = (targetWeightKg - currentWeightKg) * activityMultiplier * timelineFactor;
      const activityAdjustment = currentWeightKg * activityAddition;
      
      // Calculate total and round to nearest 5g
      let proteinTotal = baseProtein + growthFactor + activityAdjustment;
      proteinTotal = Math.round(proteinTotal / 5) * 5; // Round to nearest 5g
      
      // Apply bounds (100g minimum, 250g maximum)
      proteinTotal = Math.max(100, Math.min(250, proteinTotal));
      
      // Set the calculated protein value
      setCalculatedProtein(proteinTotal);
      
      // Reset adjustment to zero when calculation changes
      setProteinAdjustment(0);
      setAdjustmentPercentage(0);
      
      // Update the user details with the new protein target
      updateUserDetails({ proteinTarget: proteinTotal });
      
      // Calculate and set base goal date
      const today = new Date();
      const achievementDate = addMonths(today, userDetails.goalTimelineMonths);
      setBaseGoalDate(achievementDate);
      setGoalDate(achievementDate);
      
      console.log('Protein calculation:', {
        currentWeightKg,
        targetWeightKg,
        activityMultiplier,
        timelineFactor,
        activityAddition,
        baseProtein,
        growthFactor,
        activityAdjustment,
        proteinTotal,
        goalDate: achievementDate
      });
    }
  }, [userDetails.currentWeight, userDetails.targetWeight, userDetails.activityLevel, userDetails.goalTimelineMonths, userDetails.weightUnit]);
  
  // Handle protein adjustment slider changes and recalculate goal date
  const handleProteinAdjustmentChange = (value: number[]) => {
    const newAdjustment = value[0];
    setProteinAdjustment(newAdjustment);
    
    const newTotal = calculatedProtein + newAdjustment;
    updateUserDetails({ proteinTarget: newTotal });
    
    // Calculate percentage change from the baseline calculated value
    const percentageChange = (newAdjustment / calculatedProtein) * 100;
    setAdjustmentPercentage(percentageChange);
    
    // Show warning for large adjustments (more than ±25%)
    if (Math.abs(percentageChange) > 25 && !adjustmentWarningShown) {
      toast.warning("This is a significant adjustment from the recommended amount");
      setAdjustmentWarningShown(true);
    }
    
    // Adjust goal date based on protein adjustment if we have a base goal date
    if (baseGoalDate && userDetails.goalTimelineMonths) {
      // Calculate a factor to modify the timeline based on protein adjustment
      // More protein = faster progress, less protein = slower progress
      const timelineAdjustmentFactor = 1 - (percentageChange / 100);
      
      // Calculate new timeline in days
      const baseTimelineDays = userDetails.goalTimelineMonths * 30; // approximate
      const adjustedTimelineDays = baseTimelineDays * timelineAdjustmentFactor;
      
      // Calculate the adjusted goal date
      const today = new Date();
      const adjustedGoalDate = addDays(today, adjustedTimelineDays);
      setGoalDate(adjustedGoalDate);
      
      console.log('Goal date adjustment:', {
        percentageChange,
        timelineAdjustmentFactor,
        baseTimelineDays,
        adjustedTimelineDays,
        baseGoalDate,
        adjustedGoalDate
      });
    }
  };
  
  // State to track if adjustment warning has been shown
  const [adjustmentWarningShown, setAdjustmentWarningShown] = useState(false);
  
  // Protein visualization helper
  const getProteinVisualization = (proteinGrams: number) => {
    // Approximate protein amounts in common foods
    const chickenBreast = 25; // ~25g protein per chicken breast
    
    const breasts = proteinGrams / chickenBreast;
    if (breasts < 5) {
      return `That's about ${Math.round(breasts)} chicken breasts worth of protein`;
    } else {
      return `That's equivalent to ${Math.round(breasts)} chicken breasts per day`;
    }
  };
  
  // Format goal date
  const formattedGoalDate = goalDate ? format(goalDate, 'MMMM d, yyyy') : '';
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Daily Protein Target</h2>
        <p className="text-muted-foreground mt-1">
          Based on your goals, here's your recommended daily protein intake
        </p>
      </div>
      
      {/* Protein Target Display */}
      <div className="mt-8 p-6 bg-secondary/20 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Daily Protein Target</h3>
            <p className="text-muted-foreground text-sm">Customized to your goals</p>
          </div>
          <div className="text-4xl font-bold text-primary flex items-baseline">
            {userDetails.proteinTarget || 0}
            <span className="text-sm font-normal ml-1">g</span>
          </div>
        </div>
        
        {/* Goal Achievement Date */}
        {goalDate && (
          <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>
              You're expected to reach your weight goal by <strong>{formattedGoalDate}</strong> with this plan.
            </span>
          </div>
        )}
        
        {/* Protein Visualization */}
        <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
          <Beef className="h-5 w-5 text-red-500" />
          <span>{userDetails.proteinTarget ? getProteinVisualization(userDetails.proteinTarget) : ''}</span>
        </div>
        
        {/* Protein Target Adjustment */}
        <div className="pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Fine-tune your target</span>
            <span className={`font-medium ${Math.abs(adjustmentPercentage) > 25 ? 'text-orange-500' : ''}`}>
              {proteinAdjustment > 0 ? '+' : ''}{proteinAdjustment}g 
              {adjustmentPercentage !== 0 && ` (${adjustmentPercentage > 0 ? '+' : ''}${Math.round(adjustmentPercentage)}%)`}
            </span>
          </div>
          <Slider
            defaultValue={[0]}
            min={-50}
            max={50}
            step={5}
            value={[proteinAdjustment]}
            onValueChange={handleProteinAdjustmentChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Less protein</span>
            <span>More protein</span>
          </div>
        </div>
        
        {/* Formula Explanation - Optional */}
        <div className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
          <p>This target is calculated based on your current weight, goal weight, timeline, and activity level.</p>
        </div>
      </div>
    </div>
  );
};

export default ProteinTargetStep;
