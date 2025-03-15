
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProteinCalculatorState {
  proteinTarget: number;
  consumedProtein: number;
  setProteinTarget: (target: number) => void;
  addConsumedProtein: (amount: number) => void;
  resetConsumedProtein: () => void;
  calculateProteinNeeds: (
    weight: number,
    height: number,
    age: number,
    gender: 'male' | 'female' | 'other',
    activityLevel: string,
    goal: string,
    workoutFrequency?: string // Make workoutFrequency optional
  ) => number;
}

export const useProteinCalculator = create<ProteinCalculatorState>()(
  persist(
    (set, get) => ({
      proteinTarget: 160,
      consumedProtein: 98,
      
      setProteinTarget: (target: number) => set({ proteinTarget: target }),
      
      addConsumedProtein: (amount: number) => 
        set(state => ({ consumedProtein: state.consumedProtein + amount })),
      
      resetConsumedProtein: () => set({ consumedProtein: 0 }),
      
      calculateProteinNeeds: (
        weight: number,
        height: number,
        age: number,
        gender: 'male' | 'female' | 'other',
        activityLevel: string,
        goal: string,
        workoutFrequency?: string // Make workoutFrequency optional
      ) => {
        // Basic BMR calculation using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
          // For 'other', we'll use an average of the male and female equations
          const maleBmr = 10 * weight + 6.25 * height - 5 * age + 5;
          const femaleBmr = 10 * weight + 6.25 * height - 5 * age - 161;
          bmr = (maleBmr + femaleBmr) / 2;
        }
        
        // Activity multiplier
        let activityMultiplier;
        switch (activityLevel) {
          case 'sedentary':
            activityMultiplier = 1.2;
            break;
          case 'light':
            activityMultiplier = 1.375;
            break;
          case 'moderate':
            activityMultiplier = 1.55;
            break;
          case 'active':
            activityMultiplier = 1.725;
            break;
          case 'very-active':
            activityMultiplier = 1.9;
            break;
          default:
            activityMultiplier = 1.55;
        }
        
        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityMultiplier;
        
        // Adjust based on goal
        let proteinPerKg;
        switch (goal) {
          case 'cutting':
            proteinPerKg = 2.2; // Higher protein needs during caloric deficit
            break;
          case 'bulking':
            proteinPerKg = 1.8; // Moderate protein needs during caloric surplus
            break;
          case 'maintenance':
          default:
            proteinPerKg = 1.6; // Baseline protein needs
        }
        
        // Optional adjustment based on workout frequency
        if (workoutFrequency) {
          if (workoutFrequency === '6+') {
            proteinPerKg += 0.2; // Add a bit more protein for very frequent training
          } else if (workoutFrequency === '0-2') {
            proteinPerKg -= 0.1; // Slightly less protein for infrequent training
          }
        }
        
        // Calculate protein target
        const proteinTarget = Math.round(weight * proteinPerKg);
        
        return proteinTarget;
      }
    }),
    {
      name: 'protein-calculator-storage',
    }
  )
);
