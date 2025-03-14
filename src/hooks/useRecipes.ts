
import { create } from 'zustand';
import { toast } from 'sonner';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  protein: number;
  calories: number;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  instructions: string[];
  image: string;
}

interface RecipesState {
  availableIngredients: string[];
  recipes: Recipe[];
  setAvailableIngredients: (ingredients: string[]) => void;
  generateRecipes: () => void;
  isLoading: boolean;
}

// Generate mock recipes based on available ingredients
const generateMockRecipes = (ingredients: string[]): Recipe[] => {
  if (ingredients.length === 0) return [];
  
  const mockRecipeTemplates = [
    {
      name: 'High Protein Greek Bowl',
      description: 'A protein-packed Mediterranean bowl with Greek yogurt and fresh vegetables.',
      protein: 35,
      calories: 450,
      time: 15,
      difficulty: 'easy' as const,
      baseIngredients: ['Greek yogurt', 'Chicken breast', 'Cucumber', 'Olive oil'],
      instructions: [
        'Slice the chicken breast into strips and season with salt, pepper, and oregano.',
        'Heat olive oil in a pan and cook the chicken until golden and cooked through.',
        'In a bowl, combine Greek yogurt with lemon juice, minced garlic, and dill.',
        'Arrange the chicken, cucumber, and other vegetables in a bowl.',
        'Top with the Greek yogurt sauce and a drizzle of olive oil.'
      ],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070'
    },
    {
      name: 'Power Protein Scramble',
      description: 'A quick and easy egg scramble loaded with protein and vegetables.',
      protein: 28,
      calories: 350,
      time: 10,
      difficulty: 'easy' as const,
      baseIngredients: ['Eggs', 'Spinach', 'Bell peppers', 'Cottage cheese'],
      instructions: [
        'Whisk eggs in a bowl with a pinch of salt and pepper.',
        'Heat a non-stick pan and add a little olive oil or butter.',
        'Add chopped bell peppers and spinach, sauté until softened.',
        'Pour in the eggs and scramble gently until almost set.',
        'Fold in cottage cheese, then remove from heat and serve immediately.'
      ],
      image: 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?auto=format&fit=crop&q=80&w=1974'
    },
    {
      name: 'Salmon Protein Bowl',
      description: 'A nutrient-dense bowl featuring salmon, quinoa, and a variety of vegetables.',
      protein: 40,
      calories: 520,
      time: 25,
      difficulty: 'medium' as const,
      baseIngredients: ['Salmon', 'Quinoa', 'Sweet potatoes', 'Spinach'],
      instructions: [
        'Cook quinoa according to package instructions.',
        'Season salmon fillet with salt, pepper, and herbs of choice.',
        'Bake or pan-fry the salmon until cooked through.',
        'Cube and roast sweet potatoes with olive oil and spices.',
        'Arrange quinoa, roasted sweet potatoes, salmon, and fresh spinach in a bowl.',
        'Drizzle with a simple lemon-olive oil dressing and serve.'
      ],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1974'
    },
    {
      name: 'Protein-Packed Smoothie Bowl',
      description: 'A thick, satisfying smoothie bowl filled with protein and topped with nuts and fruits.',
      protein: 25,
      calories: 380,
      time: 5,
      difficulty: 'easy' as const,
      baseIngredients: ['Greek yogurt', 'Cottage cheese', 'Almonds', 'Fruits'],
      instructions: [
        'Blend Greek yogurt, cottage cheese, a splash of milk, and frozen fruit until smooth.',
        'Pour into a bowl.',
        'Top with sliced fresh fruit, chopped almonds, and a drizzle of honey if desired.'
      ],
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&q=80&w=1974'
    }
  ];
  
  // Filter recipes that contain at least some of the available ingredients
  return mockRecipeTemplates
    .filter(template => {
      const matchedIngredients = template.baseIngredients.filter(
        ingredient => ingredients.some(available => 
          available.toLowerCase().includes(ingredient.toLowerCase()) || 
          ingredient.toLowerCase().includes(available.toLowerCase())
        )
      );
      return matchedIngredients.length >= 2; // Recipe must use at least 2 available ingredients
    })
    .map(template => {
      // Generate a list of actual ingredients by combining base ingredients and some available ones
      const usedIngredients = [...template.baseIngredients];
      
      // Add some random available ingredients that aren't already included
      ingredients.forEach(ingredient => {
        if (!usedIngredients.some(used => 
          used.toLowerCase().includes(ingredient.toLowerCase()) || 
          ingredient.toLowerCase().includes(used.toLowerCase()))
        ) {
          if (Math.random() > 0.6) { // 40% chance to include additional ingredient
            usedIngredients.push(ingredient);
          }
        }
      });
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: template.name,
        description: template.description,
        protein: template.protein,
        calories: template.calories,
        time: template.time,
        difficulty: template.difficulty,
        ingredients: usedIngredients,
        instructions: template.instructions,
        image: template.image
      };
    });
};

export const useRecipes = create<RecipesState>((set, get) => ({
  availableIngredients: [],
  recipes: [],
  isLoading: false,
  
  setAvailableIngredients: (ingredients: string[]) => {
    set({ availableIngredients: ingredients });
    if (ingredients.length > 0) {
      get().generateRecipes();
    }
  },
  
  generateRecipes: () => {
    const { availableIngredients } = get();
    
    if (availableIngredients.length === 0) {
      toast.error("No ingredients available. Please analyze your refrigerator first.");
      return;
    }
    
    set({ isLoading: true });
    
    // Simulate API delay
    setTimeout(() => {
      const generatedRecipes = generateMockRecipes(availableIngredients);
      
      if (generatedRecipes.length === 0) {
        toast.error("Couldn't generate recipes with your available ingredients. Try adding more!");
        set({ isLoading: false });
        return;
      }
      
      set({ 
        recipes: generatedRecipes,
        isLoading: false 
      });
      
      toast.success(`Generated ${generatedRecipes.length} protein-packed recipes!`);
    }, 1500);
  }
}));
