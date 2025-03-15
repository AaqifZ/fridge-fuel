
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';
import { Button } from '@/components/ui/button';
import WelcomeStep from './steps/WelcomeStep';
import WeightSetupStep from './steps/WeightSetupStep';
import ProteinTargetStep from './steps/ProteinTargetStep';
import WorkoutFrequencyStep from './steps/WorkoutFrequencyStep';
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
  
  const { setProteinTarget } = useProteinCalculator();
  const navigate = useNavigate();
  
  // Set to weight setup step (index 1) when component mounts, skipping welcome step
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  
  // If onboarding is already completed, redirect to analyze
  if (isCompleted) {
    return <Navigate to="/analyze" />;
  }
  
  // Keep the welcome step in the array but start from goal setup step
  const steps = [
    { id: 'welcome', component: WelcomeStep },
    { id: 'weight-setup', component: WeightSetupStep },
    { id: 'protein-target', component: ProteinTargetStep },
    { id: 'workout-frequency', component: WorkoutFrequencyStep },
    { id: 'basic-info', component: BasicInfoStep },
    { id: 'goal', component: GoalSelectionStep },
    { id: 'success', component: SuccessStep },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    // For the weight setup step, we need to validate selection before proceeding
    if (currentStep === 1 && (!userDetails.currentWeight || !userDetails.targetWeight)) {
      toast.error("Please enter your current and target weights to continue");
      return;
    }
    
    // For the workout frequency step, validate selection before proceeding
    if (currentStep === 3 && !userDetails.workoutFrequency) {
      toast.error("Please select your workout frequency to continue");
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
    // Set the protein target from the goalSetup step directly
    if (userDetails.proteinTarget) {
      setProteinTarget(userDetails.proteinTarget);
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
          
          <CurrentStepComponent 
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
            onBack={currentStep > 1 ? handleBack : undefined}
          />
        </div>
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          
          <div className={`${currentStep > 1 ? 'ml-auto' : 'w-full'}`}>
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext} 
                className={currentStep === 1 || currentStep === 2 || currentStep === 3 ? "w-full py-3 text-lg rounded-full" : ""}
              >
                Continue
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
