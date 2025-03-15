
import React from 'react';
import { Check, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

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
  percentage = 75 
}: { 
  label: string; 
  value: number; 
  unit: string; 
  color?: string; 
  percentage?: number 
}) => {
  // SVG circle properties
  const size = 80; // Reduced from 100 for better consistency
  const strokeWidth = 3; // Reduced from 4 for better proportions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
          <span className="text-sm font-semibold">{value}{unit}</span>
        </div>
        {/* Edit icon */}
        <div className="absolute bottom-0 right-0">
          <Pencil size={14} className="text-muted-foreground hover:text-primary cursor-pointer" />
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
  
  // Use the goal date from userDetails, or fall back to a computed date if not available
  const targetDate = userDetails.goalDate || 
    (userDetails.goalTimelineMonths ? 
      format(new Date(new Date().setMonth(new Date().getMonth() + (userDetails.goalTimelineMonths || 3))), 'MMM d') : 
      'N/A');
  
  // Calculate estimated nutrition values based on protein target
  const calories = Math.round(proteinTarget * 24);
  const carbs = Math.round(calories * 0.4 / 4);
  const fats = Math.round(calories * 0.3 / 9);
  
  // Get protein meal plan with personality
  const getProteinMealPlan = () => {
    if (proteinTarget > 160) {
      return "Crush your goals with 3 shakes, 2 chicken breasts, Greek yogurt, and a protein bar!";
    } else if (proteinTarget >= 120) {
      return "Power through with 2 shakes, a chicken breast, yogurt, and a protein bar!";
    } else {
      return "Fuel up with a shake, a chicken breast, and some cottage cheese!";
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
              />
            </CardContent>
          </Card>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3 italic">
          {getProteinMealPlan()}
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
