
import React from 'react';
import { Camera, CircleCheck } from 'lucide-react';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';

interface SuccessStepProps {
  userDetails: {
    currentWeight?: number;
    targetWeight?: number;
    activityLevel?: string;
    goalTimelineMonths?: number;
    proteinTarget?: number;
  };
  updateUserDetails: (details: Partial<SuccessStepProps['userDetails']>) => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ userDetails }) => {
  const { proteinTarget } = useProteinCalculator();
  
  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 w-20 h-20 flex items-center justify-center">
          <CircleCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold">You're All Set!</h2>
      
      <div>
        <p className="text-lg font-medium">Your Daily Protein Target</p>
        <p className="text-3xl font-bold text-primary mt-1">{proteinTarget}g</p>
      </div>
      
      <div className="p-4 bg-muted/40 rounded-lg mt-4">
        <div className="flex items-center justify-center mb-2 text-muted-foreground">
          <Camera className="w-5 h-5 mr-2" />
          <span className="font-medium">Next Step</span>
        </div>
        <p className="text-sm text-muted-foreground">
          We'll now take you to analyze your refrigerator so we can create personalized high-protein recipes!
        </p>
      </div>
    </div>
  );
};

export default SuccessStep;
