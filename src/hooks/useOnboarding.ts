
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  userDetails: {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female';
    activityLevel?: string;
    goal?: string;
  };
  setIsCompleted: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateUserDetails: (details: Partial<OnboardingState['userDetails']>) => void;
  resetOnboarding: () => void;
}

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      isCompleted: false,
      currentStep: 0,
      userDetails: {},
      
      setIsCompleted: (value) => set({ isCompleted: value }),
      setCurrentStep: (step) => set({ currentStep: step }),
      updateUserDetails: (details) => 
        set((state) => ({ 
          userDetails: { ...state.userDetails, ...details } 
        })),
      resetOnboarding: () => 
        set({ 
          isCompleted: false, 
          currentStep: 0, 
          userDetails: {} 
        }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
