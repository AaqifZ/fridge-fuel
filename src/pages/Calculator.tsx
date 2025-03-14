
import React from 'react';
import ProteinCalculator from '@/components/ProteinCalculator';

const Calculator: React.FC = () => {
  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-bold">Protein Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Calculate your personalized protein needs based on your body metrics and goals
          </p>
        </div>
        
        <ProteinCalculator />
      </div>
    </div>
  );
};

export default Calculator;
