
import React from 'react';
import { Check } from 'lucide-react';

interface SuccessHeaderProps {
  isGain: boolean;
  weightDifference: number;
  weightUnit: string;
  targetDate: string;
}

const SuccessHeader: React.FC<SuccessHeaderProps> = ({
  isGain,
  weightDifference,
  weightUnit,
  targetDate
}) => {
  const getSocialProofMessage = () => {
    if (isGain) {
      return `Join 847 others who gained ${weightDifference}${weightUnit}+ in 3 months`;
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
      
      <div className="text-sm italic text-muted-foreground">
        {getSocialProofMessage()}
      </div>
    </div>
  );
};

export default SuccessHeader;
