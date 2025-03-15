
import React from 'react';
import { Check, Heart, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format, addMonths } from 'date-fns';

interface SuccessStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    activityLevel?: string;
    goalTimelineMonths?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
  };
  updateUserDetails: (details: Partial<SuccessStepProps['userDetails']>) => void;
}

// Create a reusable circular progress component for the nutrition stats
const CircularProgress = ({ 
  label, 
  value, 
  unit, 
  color = "#000", 
  percentage = 75 
}: { 
  label: string; 
  value: number; 
  unit: string; 
  color?: string; 
  percentage?: number 
}) => {
  // SVG circle properties
  const size = 120;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-medium mb-2">{label}</p>
      <div className="relative flex items-center justify-center">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
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
          <span className="text-2xl font-bold">{value}{unit}</span>
        </div>
        {/* Edit icon */}
        <div className="absolute bottom-0 right-0">
          <Pencil size={18} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

const SuccessStep: React.FC<SuccessStepProps> = ({ userDetails }) => {
  const weightUnit = userDetails.weightUnit || 'kg';
  const proteinTarget = userDetails.proteinTarget || 0;
  
  // Calculate weight difference
  const currentWeight = userDetails.currentWeight || 0;
  const targetWeight = userDetails.targetWeight || 0;
  const weightDifference = Math.abs(targetWeight - currentWeight);
  const isGain = targetWeight > currentWeight;
  
  // Calculate target date based on timeline
  const months = userDetails.goalTimelineMonths || 3;
  const targetDate = format(addMonths(new Date(), months), 'MMM d');
  
  // Calculate estimated nutrition values based on protein target
  // These are simplified calculations for demo purposes
  const calories = Math.round(proteinTarget * 24); // ~24 calories per gram of protein for overall diet
  const carbs = Math.round(calories * 0.4 / 4); // 40% of calories from carbs, 4 calories per gram
  const fats = Math.round(calories * 0.3 / 9); // 30% of calories from fats, 9 calories per gram
  
  // Health score calculation (simplified)
  const healthScore = Math.min(10, Math.max(1, Math.round((proteinTarget / (currentWeight * 2)) * 10)));
  
  return (
    <div className="text-center space-y-8 py-2">
      <div className="flex justify-center">
        <div className="rounded-full bg-black p-4 w-16 h-16 flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold">Congratulations</h2>
        <p className="text-3xl font-bold">your custom plan is ready!</p>
      </div>
      
      <div className="py-4">
        <p className="text-2xl font-medium mb-3">You should {isGain ? 'gain' : 'lose'}:</p>
        <div className="inline-block px-6 py-3 bg-gray-100 rounded-full">
          <p className="text-2xl font-bold">
            {weightDifference} {weightUnit} by {targetDate}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-4">
              <CircularProgress 
                label="Calories" 
                value={calories} 
                unit="" 
                color="#000000" 
                percentage={70}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-4">
              <CircularProgress 
                label="Carbs" 
                value={carbs} 
                unit="g" 
                color="#F97316" 
                percentage={60}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-4">
              <CircularProgress 
                label="Protein" 
                value={proteinTarget} 
                unit="g" 
                color="#EF4444" 
                percentage={75}
              />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-none bg-white">
            <CardContent className="p-4">
              <CircularProgress 
                label="Fats" 
                value={fats} 
                unit="g" 
                color="#3B82F6" 
                percentage={50}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center justify-between bg-white p-4 mt-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
            <span className="text-xl font-medium">Health Score</span>
          </div>
          <span className="text-xl font-bold">{healthScore}/10</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
