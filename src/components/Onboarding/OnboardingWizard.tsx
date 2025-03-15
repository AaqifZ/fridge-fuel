
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';
import { Button } from '@/components/ui/button';
import WelcomeStep from './steps/WelcomeStep';
import GenderSelectionStep from './steps/GenderSelectionStep';
import BasicInfoStep from './steps/BasicInfoStep';
import GoalSelectionStep from './steps/GoalSelectionStep';
import SuccessStep from './steps/SuccessStep';
import { toast } from 'sonner';

const OnboardingWizard = () => {
  const { 
    isCompleted, 
    currentStep, 
    userDetails, 
    setCurrentStep, 
    setIsCompleted,
    updateUserDetails 
  } = useOnboarding();
  
  const { calculateProteinNeeds, setProteinTarget } = useProteinCalculator();
  const navigate = useNavigate();
  
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  
  if (isCompleted) {
    return <Navigate to="/analyze" />;
  }
  
  const steps = [
    { id: 'welcome', component: WelcomeStep },
    { id: 'gender', component: GenderSelectionStep },
    { id: 'basic-info', component: BasicInfoStep },
    { id: 'goal', component: GoalSelectionStep },
    { id: 'success', component: SuccessStep },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep === 1 && !userDetails.gender) {
      toast.error("Please select your gender to continue");
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    const { weight, height, age, gender, activityLevel, goal } = userDetails;
    
    if (weight && height && age && gender && activityLevel && goal) {
      const proteinTarget = calculateProteinNeeds(
        weight, 
        height, 
        age, 
        gender, 
        activityLevel, 
        goal
      );
      
      setProteinTarget(proteinTarget);
      setIsCompleted(true);
      toast.success("Let's analyze your fridge and hit your protein goals!");
      navigate('/analyze');
    } else {
      toast.error("Please complete all required information");
    }
  };
  
  const isGenderStep = currentStep === 1;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-5 bg-white">
      <div className="w-full max-w-lg p-6 pb-4 rounded-2xl flex flex-col" style={{ minHeight: '85vh' }}>
        <div className="mb-4 flex-1">
          {!isGenderStep && (
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length - 1}
              </div>
              
              <div className="flex space-x-1">
                {steps.slice(1).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 w-8 rounded-full ${index < currentStep - 1 ? 'bg-primary' : 'bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {isGenderStep && (
            <div className="flex justify-between items-center mb-6">
              <div className="h-1.5 w-full bg-gray-200 rounded-full">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          )}
          
          <CurrentStepComponent 
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
            onBack={currentStep > 1 ? handleBack : undefined}
          />
        </div>
        
        <div className="mt-auto pt-4">
          {isGenderStep ? (
            <Button 
              onClick={handleNext}
              className="w-full h-14 rounded-full text-lg font-medium"
              size="lg"
            >
              Continue
            </Button>
          ) : (
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="rounded-full"
                >
                  Back
                </Button>
              )}
              
              <div className={`${currentStep > 1 ? 'ml-auto' : 'w-full'}`}>
                {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext} className="rounded-full">
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="rounded-full" size="lg">
                    Start Analyzing Your Fridge
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
