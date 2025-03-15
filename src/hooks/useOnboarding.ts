
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  isCompleted: boolean;
  currentStep: number;
  userDetails: {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    activityLevel?: string;
    goal?: string;
  };
  setIsCompleted: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateUserDetails: (details: Partial<OnboardingState['userDetails']>) => void;
  resetOnboarding: () => void;
}

const initialState = {
  isCompleted: false,
  currentStep: 0,
  userDetails: {},
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setIsCompleted: (value) => set({ isCompleted: value }),
      setCurrentStep: (step) => set({ currentStep: step }),
      updateUserDetails: (details) => 
        set((state) => ({ 
          userDetails: { ...state.userDetails, ...details } 
        })),
      resetOnboarding: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
      // Add a version to bust any existing storage
      version: 2,
    }
  )
);
