
import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import NutritionCards from '../components/NutritionCards';
import SuccessHeader from '../components/SuccessHeader';

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

const SuccessStep: React.FC<SuccessStepProps> = ({ userDetails }) => {
  const weightUnit = userDetails.weightUnit || 'kg';
  const [proteinTarget, setProteinTarget] = useState(userDetails.proteinTarget || 0);
  
  const currentWeight = userDetails.currentWeight || 0;
  const targetWeight = userDetails.targetWeight || 0;
  const weightDifference = Math.abs(targetWeight - currentWeight);
  const isGain = targetWeight > currentWeight;
  
  const targetDate = userDetails.goalDate || 
    (userDetails.goalTimelineMonths ? 
      format(new Date(new Date().setMonth(new Date().getMonth() + (userDetails.goalTimelineMonths || 3))), 'MMM d') : 
      'N/A');
  
  const [calories, setCalories] = useState(Math.round(proteinTarget * 24));
  const [carbs, setCarbs] = useState(Math.round(calories * 0.4 / 4));
  const [fats, setFats] = useState(Math.round(calories * 0.3 / 9));
  
  useEffect(() => {
    const newCalories = Math.round(proteinTarget * 24);
    setCalories(newCalories);
    setCarbs(Math.round(newCalories * 0.4 / 4));
    setFats(Math.round(newCalories * 0.3 / 9));
  }, [proteinTarget]);
  
  const handleProteinAdjust = (newValue: number) => {
    setProteinTarget(newValue);
  };
  
  const handleCarbsAdjust = (newValue: number) => {
    const carbCalories = newValue * 4;
    const proteinCalories = proteinTarget * 4;
    const remainingCalories = calories - carbCalories - proteinCalories;
    
    if (remainingCalories < 0) return;
    
    setCarbs(newValue);
    setFats(Math.round(remainingCalories / 9));
  };
  
  const handleFatsAdjust = (newValue: number) => {
    const fatCalories = newValue * 9;
    const proteinCalories = proteinTarget * 4;
    const remainingCalories = calories - fatCalories - proteinCalories;
    
    if (remainingCalories < 0) return;
    
    setFats(newValue);
    setCarbs(Math.round(remainingCalories / 4));
  };
  
  return (
    <div className="text-center space-y-4">
      <SuccessHeader 
        isGain={isGain}
        weightDifference={weightDifference}
        weightUnit={weightUnit}
        targetDate={targetDate}
      />
      
      <div className="bg-secondary/20 rounded-lg p-3">
        <NutritionCards 
          calories={calories}
          carbs={carbs}
          protein={proteinTarget}
          fats={fats}
          onProteinAdjust={handleProteinAdjust}
          onCarbsAdjust={handleCarbsAdjust}
          onFatsAdjust={handleFatsAdjust}
        />
      </div>
      
      <div className="mt-3 text-sm text-primary font-medium">
        Your first recommendation is 60 seconds away
      </div>
    </div>
  );
};

export default SuccessStep;
