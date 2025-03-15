
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useProteinCalculator } from '@/hooks/useProteinCalculator';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import WelcomeStep from './steps/WelcomeStep';
import WeightSetupStep from './steps/WeightSetupStep';
import TimelineActivityStep from './steps/TimelineActivityStep';
import DietaryPreferenceStep from './steps/DietaryPreferenceStep';
import ProteinTargetStep from './steps/ProteinTargetStep';
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
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  
  if (isCompleted) {
    return <Navigate to="/analyze" />;
  }
  
  const steps = [
    { id: 'welcome', component: WelcomeStep },
    { id: 'weight-setup', component: WeightSetupStep },
    { id: 'timeline-activity', component: TimelineActivityStep },
    { id: 'dietary-preference', component: DietaryPreferenceStep },
    { id: 'protein-target', component: ProteinTargetStep },
    { id: 'success', component: SuccessStep },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep === 1 && (!userDetails.currentWeight || !userDetails.targetWeight)) {
      toast.error("Please enter your current and target weights to continue");
      return;
    }
    
    if (currentStep === 2 && (!userDetails.goalTimelineMonths || !userDetails.activityLevel)) {
      toast.error("Please complete both sections before continuing");
      return;
    }
    
    // Modified validation for dietary preference step
    // Only check if dietaryPreference exists, gluten/dairy settings can be undefined
    if (currentStep === 3 && userDetails.dietaryPreference === undefined) {
      toast.error("Please select your dietary preference to continue");
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
    if (userDetails.proteinTarget) {
      setProteinTarget(userDetails.proteinTarget);
      setIsCompleted(true);
      toast.success("Let's analyze your fridge and hit your protein goals!");
      navigate('/analyze');
    } else {
      toast.error("Please complete all required information");
    }
  };
  
  const totalStepsShown = steps.length - 1;
  const currentVisibleStep = currentStep === 0 ? 1 : currentStep;
  
  // Set FIXED height for content instead of minimum height to ensure consistency
  const contentHeight = isMobile ? 'h-[580px]' : 'h-[620px]';
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="glass-card w-full max-w-lg p-6 rounded-2xl shadow-xl border border-primary/10 animate-fade-in">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-muted-foreground">
              Step {currentStep === 0 ? 1 : currentStep} of {totalStepsShown}
            </div>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalStepsShown }, (_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 w-8 rounded-full ${index < currentVisibleStep ? 'bg-primary' : 'bg-muted'}`}
                />
              ))}
            </div>
          </div>
          
          {/* Content container with fixed height and ScrollArea for overflow */}
          <div className={`${contentHeight} relative overflow-hidden`}>
            <ScrollArea className="h-full pr-4">
              <div className="pb-4">
                <CurrentStepComponent 
                  userDetails={userDetails}
                  updateUserDetails={updateUserDetails}
                />
              </div>
            </ScrollArea>
          </div>
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
                className={currentStep >= 1 && currentStep <= 3 ? "w-full py-3 text-lg rounded-full" : ""}
              >
                Continue
              </Button>
            ) : (
              <Button 
                onClick={handleComplete}
                className="w-full py-3 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Take Photo Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
