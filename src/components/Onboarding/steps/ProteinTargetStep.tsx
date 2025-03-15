import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Beef, Calendar, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';
import { format, addMonths, addDays } from 'date-fns';

interface ProteinTargetStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
    goalTimelineMonths?: number;
    goalDate?: string;
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
  
  const getScientificExplanation = (proteinTarget: number, currentWeight?: number, activityLevel?: string) => {
    if (!currentWeight) return "";
    
    const weightInKg = useKg ? currentWeight : Math.round(currentWeight * 0.453592);
    const gramsPerKg = (proteinTarget / weightInKg).toFixed(1);
    const gramsPerKgNum = parseFloat(gramsPerKg);
    
    let baseMessage = "";
    if (gramsPerKgNum > 2.1) {
      baseMessage = `${gramsPerKg}g/kg is on the higher end, maximizing muscle growth`;
    } else if (gramsPerKgNum < 1.5) {
      baseMessage = `${gramsPerKg}g/kg is on the lower end, supporting essential functions`;
    } else {
      baseMessage = `${gramsPerKg}g/kg supports recovery and metabolic health`;
    }
    
    if (activityLevel === 'active') {
      return `${baseMessage} for your active lifestyle.`;
    } else if (activityLevel === 'moderate') {
      return `${baseMessage} for your moderate activity level.`;
    } else {
      return `${baseMessage} while maintaining overall health.`;
    }
  };
  
  const getProteinSourcesBreakdown = (proteinGrams: number) => {
    if (proteinGrams > 160) {
      return "Reach your goal with homemade meals like a hearty lentil soup (28g), a savory chicken stir-fry (35g), a protein-rich pasta with turkey meatballs (38g), and a quinoa bowl with roasted vegetables (25g).";
    } 
    else if (proteinGrams >= 120) {
      return "Reach your goal with homemade meals like a quick veggie-packed frittata (24g), a savory chicken stir-fry (35g), and a protein-rich pasta with turkey meatballs (38g).";
    } 
    else if (proteinGrams >= 100) {
      return "Boost your protein with homemade meals like a bean and vegetable chili (20g), a grilled salmon with roasted sweet potatoes (30g), and a Greek yogurt parfait with nuts and berries (15g).";
    }
    else {
      return "Start your day with protein-packed meals like an egg and avocado toast (15g), a hearty lentil soup (18g), and a bean burrito bowl (22g).";
    }
  };
  
  useEffect(() => {
    if (userDetails.currentWeight && userDetails.targetWeight && 
        userDetails.goalTimelineMonths && userDetails.activityLevel) {
      
      const currentWeightKg = useKg 
        ? userDetails.currentWeight 
        : Math.round(userDetails.currentWeight * 0.453592);
        
      const targetWeightKg = useKg
        ? userDetails.targetWeight
        : Math.round(userDetails.targetWeight * 0.453592);
      
      let activityMultiplier = 0.5; // Default to moderate
      if (userDetails.activityLevel === 'sedentary') {
        activityMultiplier = 0.3;
      } else if (userDetails.activityLevel === 'active') {
        activityMultiplier = 0.7;
      }
      
      let timelineFactor = 0.04; // Default to 6 months
      if (userDetails.goalTimelineMonths <= 3) {
        timelineFactor = 0.08;
      } else if (userDetails.goalTimelineMonths >= 12) {
        timelineFactor = 0.02;
      }
      
      let activityAddition = 0.3; // Default to moderate
      if (userDetails.activityLevel === 'sedentary') {
        activityAddition = 0.1;
      } else if (userDetails.activityLevel === 'active') {
        activityAddition = 0.6;
      }
      
      const baseProtein = currentWeightKg * 1.6;
      const growthFactor = (targetWeightKg - currentWeightKg) * activityMultiplier * timelineFactor;
      const activityAdjustment = currentWeightKg * activityAddition;
      
      let proteinTotal = baseProtein + growthFactor + activityAdjustment;
      proteinTotal = Math.round(proteinTotal / 5) * 5;
      
      proteinTotal = Math.max(100, Math.min(250, proteinTotal));
      
      setCalculatedProtein(proteinTotal);
      
      setProteinAdjustment(0);
      setAdjustmentPercentage(0);
      
      updateUserDetails({ proteinTarget: proteinTotal });
      
      const today = new Date();
      const achievementDate = addMonths(today, userDetails.goalTimelineMonths);
      setBaseGoalDate(achievementDate);
      setGoalDate(achievementDate);
      
      updateUserDetails({ 
        proteinTarget: proteinTotal,
        goalDate: format(achievementDate, 'MMM d')
      });
      
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
  
  const handleProteinAdjustmentChange = (value: number[]) => {
    const newAdjustment = value[0];
    setProteinAdjustment(newAdjustment);
    
    const newTotal = calculatedProtein + newAdjustment;
    updateUserDetails({ proteinTarget: newTotal });
    
    const percentageChange = (newAdjustment / calculatedProtein) * 100;
    setAdjustmentPercentage(percentageChange);
    
    if (Math.abs(percentageChange) > 25 && !adjustmentWarningShown) {
      toast.warning("This is a significant adjustment from the recommended amount");
      setAdjustmentWarningShown(true);
    }
    
    if (baseGoalDate && userDetails.goalTimelineMonths) {
      const timelineAdjustmentFactor = 1 + (percentageChange * -0.01);
      const baseTimelineDays = userDetails.goalTimelineMonths * 30;
      const adjustedTimelineDays = baseTimelineDays * timelineAdjustmentFactor;
      
      const today = new Date();
      const adjustedGoalDate = addDays(today, adjustedTimelineDays);
      setGoalDate(adjustedGoalDate);
      
      updateUserDetails({ goalDate: format(adjustedGoalDate, 'MMM d, yyyy') });
      
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
  
  const [adjustmentWarningShown, setAdjustmentWarningShown] = useState(false);
  
  const formattedGoalDate = goalDate ? format(goalDate, 'MMMM d, yyyy') : '';
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Your Protein Plan</h2>
      </div>
      
      <div className="mt-6 p-6 bg-secondary/20 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary font-semibold text-base uppercase tracking-wide">Daily Target</p>
          </div>
          <div className="text-5xl font-bold text-primary flex items-baseline">
            {userDetails.proteinTarget || 0}
            <span className="text-sm font-normal ml-1">g</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
          <FlaskConical className="h-5 w-5 text-purple-500 flex-shrink-0" />
          <span>
            {userDetails.proteinTarget && userDetails.currentWeight ? 
              getScientificExplanation(userDetails.proteinTarget, userDetails.currentWeight, userDetails.activityLevel) : 
              ''}
          </span>
        </div>
        
        {goalDate && (
          <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
            <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>
              Target date: <strong>{formattedGoalDate}</strong>
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
          <Beef className="h-5 w-5 text-red-500 flex-shrink-0" />
          <span className="flex-1">
            {userDetails.proteinTarget ? getProteinSourcesBreakdown(userDetails.proteinTarget) : ''}
          </span>
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Personalize</span>
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
            <span>Less</span>
            <span>More</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
          <p>Calculated based on your weight, goals, and activity level</p>
        </div>
      </div>
    </div>
  );
};

export default ProteinTargetStep;
