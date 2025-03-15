
import React, { useState, useEffect } from 'react';
import { Check, Pencil, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    activityLevel?: string;
    goalTimelineMonths?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
    goalDate?: string;
  };
  updateUserDetails: (details: Partial<SuccessStepProps['userDetails']>) => void;
}

// Create a reusable circular progress component for the nutrition stats
const CircularProgress = ({ 
  label, 
  value, 
  unit, 
  color = "hsl(var(--primary))", 
  percentage = 75,
  onAdjust
}: { 
  label: string; 
  value: number; 
  unit: string; 
  color?: string; 
  percentage?: number;
  onAdjust?: (newValue: number) => void;
}) => {
  // SVG circle properties
  const size = 80; // Reduced from 100 for better consistency
  const strokeWidth = 3; // Reduced from 4 for better proportions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);
  
  const handleEdit = () => {
    if (!onAdjust) return;
    
    if (isEditing) {
      // Save the value
      onAdjust(editValue);
    }
    setIsEditing(!isEditing);
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setEditValue(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium mb-1">
        {label}
      </p>
      <div className="relative flex items-center justify-center">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Center text */}
        <div className="absolute text-center">
          {isEditing && onAdjust ? (
            <input
              type="number"
              value={editValue}
              onChange={handleValueChange}
              className="w-12 text-center bg-transparent border-b border-primary text-sm font-semibold"
              autoFocus
              onBlur={() => {
                onAdjust(editValue);
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAdjust(editValue);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span className="text-sm font-semibold">{value}{unit}</span>
          )}
        </div>
        {/* Edit icon */}
        {onAdjust && (
          <div className="absolute bottom-0 right-0">
            <Pencil 
              size={14} 
              className="text-muted-foreground hover:text-primary cursor-pointer" 
              onClick={handleEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const SuccessStep: React.FC<SuccessStepProps> = ({ userDetails }) => {
  const weightUnit = userDetails.weightUnit || 'kg';
  const [proteinTarget, setProteinTarget] = useState(userDetails.proteinTarget || 0);
  
  // Calculate weight difference
  const currentWeight = userDetails.currentWeight || 0;
  const targetWeight = userDetails.targetWeight || 0;
  const weightDifference = Math.abs(targetWeight - currentWeight);
  const isGain = targetWeight > currentWeight;
  
  // Use the goal date from userDetails, or fall back to a computed date if not available
  const targetDate = userDetails.goalDate || 
    (userDetails.goalTimelineMonths ? 
      format(new Date(new Date().setMonth(new Date().getMonth() + (userDetails.goalTimelineMonths || 3))), 'MMM d') : 
      'N/A');
  
  // Calculate estimated nutrition values based on protein target
  const [calories, setCalories] = useState(Math.round(proteinTarget * 24));
  const [carbs, setCarbs] = useState(Math.round(calories * 0.4 / 4));
  const [fats, setFats] = useState(Math.round(calories * 0.3 / 9));
  
  // Update macros when protein changes
  useEffect(() => {
    const newCalories = Math.round(proteinTarget * 24);
    setCalories(newCalories);
    setCarbs(Math.round(newCalories * 0.4 / 4));
    setFats(Math.round(newCalories * 0.3 / 9));
  }, [proteinTarget]);
  
  // Handle protein adjustment
  const handleProteinAdjust = (newValue: number) => {
    setProteinTarget(newValue);
  };
  
  // Handle carbs adjustment
  const handleCarbsAdjust = (newValue: number) => {
    const carbCalories = newValue * 4;
    const proteinCalories = proteinTarget * 4;
    const remainingCalories = calories - carbCalories - proteinCalories;
    
    // Ensure minimum fat calories (at least 10% of total)
    const minFatCalories = calories * 0.1;
    if (remainingCalories < minFatCalories) return;
    
    setCarbs(newValue);
    setFats(Math.round(remainingCalories / 9));
  };
  
  // Handle fats adjustment
  const handleFatsAdjust = (newValue: number) => {
    const fatCalories = newValue * 9;
    const proteinCalories = proteinTarget * 4;
    const remainingCalories = calories - fatCalories - proteinCalories;
    
    // Ensure minimum carb calories (at least 20% of total)
    const minCarbCalories = calories * 0.2;
    if (remainingCalories < minCarbCalories) return;
    
    setFats(newValue);
    setCarbs(Math.round(remainingCalories / 4));
  };
  
  // Generate social proof message based on weight goal
  const getSocialProofMessage = () => {
    const baseMessage = "You're joining 10,000+ others with similar goals";
    
    if (isGain) {
      if (weightDifference > 10) {
        return `${baseMessage} building serious muscle mass!`;
      } else {
        return `${baseMessage} on their muscle building journey!`;
      }
    } else {
      if (weightDifference > 10) {
        return `${baseMessage} on their transformation journey!`;
      } else {
        return `${baseMessage} in their fitness journey!`;
      }
    }
  };
  
  // Generate more specific social proof message with percentages
  const getDetailedSocialProofMessage = () => {
    if (isGain) {
      return `Join 847 others who gained ${weightDifference}${weightUnit}+ in ${userDetails.goalTimelineMonths || 3} months`;
    } else {
      return `92% of users hit their target following this plan`;
    }
  };
  
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/20 p-2 w-12 h-12 flex items-center justify-center">
          <Check className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold">Congratulations</h2>
        <p className="text-base font-medium">your custom plan is ready!</p>
      </div>
      
      <div className="py-1">
        <p className="text-sm font-medium mb-1">You should {isGain ? 'gain' : 'lose'}:</p>
        <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full">
          <p className="text-base font-bold">
            {weightDifference} {weightUnit} by {targetDate}
          </p>
        </div>
      </div>
      
      <div className="text-sm italic text-secondary-foreground font-medium">
        {getDetailedSocialProofMessage()}
      </div>
      
      <div className="text-sm text-secondary-foreground font-medium">
        {getSocialProofMessage()}
      </div>
      
      <div className="bg-secondary/20 rounded-lg p-3">
        <div className="grid grid-cols-2 gap-2">
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-2">
              <CircularProgress 
                label="Calories" 
                value={calories} 
                unit="" 
                color="hsl(var(--primary))" 
                percentage={70}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-2">
              <CircularProgress 
                label="Carbs" 
                value={carbs} 
                unit="g" 
                color="hsl(var(--secondary))" 
                percentage={60}
                onAdjust={handleCarbsAdjust}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-2">
              <CircularProgress 
                label="Protein" 
                value={proteinTarget} 
                unit="g" 
                color="hsl(var(--accent))" 
                percentage={75}
                onAdjust={handleProteinAdjust}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-2">
              <CircularProgress 
                label="Fats" 
                value={fats} 
                unit="g" 
                color="hsl(var(--muted-foreground))" 
                percentage={50}
                onAdjust={handleFatsAdjust}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-primary font-medium">
        Your first recommendation is 60 seconds away
      </div>
    </div>
  );
};

export default SuccessStep;
