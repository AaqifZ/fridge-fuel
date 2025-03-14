
import { create } from 'zustand';

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
    gender: 'male' | 'female',
    activityLevel: string,
    goal: string
  ) => number;
}

export const useProteinCalculator = create<ProteinCalculatorState>((set, get) => ({
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
    gender: 'male' | 'female',
    activityLevel: string,
    goal: string
  ) => {
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
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
    
    // Calculate protein target
    const proteinTarget = Math.round(weight * proteinPerKg);
    
    return proteinTarget;
  }
}));
