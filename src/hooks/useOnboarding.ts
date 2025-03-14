
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
    workoutFrequency?: string;
    activityLevel?: 'sedentary' | 'moderate' | 'active';
    goal?: string;
    currentWeight?: number;
    targetWeight?: number;
    proteinTarget?: number;
    weightUnit?: 'kg' | 'lbs';
    goalTimelineMonths?: number;
    goalDate?: string;
    dietaryPreference?: 'classic' | 'pescatarian' | 'vegetarian' | 'vegan';
    glutenFree?: boolean;
    dairyFree?: boolean;
  };
  setIsCompleted: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  updateUserDetails: (details: Partial<OnboardingState['userDetails']>) => void;
  resetOnboarding: () => void;
}

const initialState: Omit<OnboardingState, 'setIsCompleted' | 'setCurrentStep' | 'updateUserDetails' | 'resetOnboarding'> = {
  isCompleted: false,
  currentStep: 0,
  userDetails: {
    dietaryPreference: 'classic', // Set default value to prevent undefined state
  },
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setIsCompleted: (value) => set({ isCompleted: value }),
      setCurrentStep: (step) => set({ currentStep: step }),
      updateUserDetails: (details) => 
        set((state) => {
          console.log("Updating user details:", details);
          console.log("Previous state:", state.userDetails);
          return { 
            userDetails: { ...state.userDetails, ...details } 
          };
        }),
      resetOnboarding: () => set(initialState),
    }),
    {
      name: 'onboarding-storage',
      // Update version number to force refresh of existing storage
      version: 19, // Increment version to clear potentially corrupted state
    }
  )
);
