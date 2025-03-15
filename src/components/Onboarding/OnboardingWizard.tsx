
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
  
  // Reset to first step when component mounts
  useEffect(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);
  
  // If onboarding is already completed, redirect to analyze
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
    // For the gender step, we need to validate selection before proceeding
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
    
    // Calculate protein target based on user data
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
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="glass-card w-full max-w-lg p-6 rounded-2xl shadow-xl border border-primary/10 animate-fade-in">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
            
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 w-8 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
          </div>
          
          <CurrentStepComponent 
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
            onBack={currentStep > 0 ? handleBack : undefined}
          />
        </div>
        
        <div className="flex justify-between mt-8">
          {currentStep > 0 && currentStep !== 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          
          <div className={`${currentStep > 0 && currentStep !== 1 ? 'ml-auto' : 'w-full'}`}>
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext} 
                className={currentStep === 1 ? "w-full py-3 text-lg rounded-full" : ""}
              >
                {currentStep === 1 ? "Continue" : "Continue"}
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Start Analyzing Your Fridge
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
